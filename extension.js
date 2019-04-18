const getFsViewName = (entry) => {
  return entry.target.attributes.getNamedItem('data-fs-view').value;
};

const getFsThreshold = (entry) => {
  const item = entry.target.attributes.getNamedItem('data-fs-view-threshold');
  // TODO: validate item.value before parsing
  return item ? parseInt(item.value) : undefined;
}

const fireEvent = (entry, count) => {
  
  // TODO: validate that name exists
  // if not, console.warn about it and return
  FS.event(`Viewed ${getFsViewName(entry)}`, {
      name: getFsViewName(entry),
      numberOfViews: count,
  });
  
  
  console.log(`sent event ${getFsViewName(entry)} at ${(new Date()).getTime()} with count ${count}`);
};

const makeIntersectedCallback = () => {
  let count = 0;
  let inView = false;
  let timeoutHandle;
  
  return entries => {
      for (const entry of entries) {
          //console.log(entry);
          inView = entry.isIntersecting;
          if (inView) {
              console.log('intersecting');
              const delay = getFsThreshold(entry) || 500;
              timeoutHandle = window.setTimeout(() => {
                  if (inView) { // this test might not be needed since the timeout is being cleared
                      count++;
                      fireEvent(entry, count);
                  }
              }, delay);
              
          } else {
              window.clearTimeout(timeoutHandle);                            
          }
      }
  };
}

const initExtension = () => {                                
  const targets = document.querySelectorAll('[data-fs-view]');
  targets.forEach((target) => {
      // TODO: inspect DOM tree to deterine if target or any ancester is blocked
      // (also need to look at rec/page data)
      // if yes, return without setting observer

      const observer = new IntersectionObserver(makeIntersectedCallback(), {
          threshold: [ 0.8 ]
      });          
      observer.observe(target);                
  });
}