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

const attachObserver = (target) => {
  const observer = new IntersectionObserver(makeIntersectedCallback(), {
    threshold: [ 0.8 ]
  });          
  observer.observe(target);     
}

const observeFsView = (root) => {
  if (root.getAttribute('data-fs-view')) {
    attachObserver(root);
  }

  const targets = root.querySelectorAll('[data-fs-view]');
  targets.forEach((target) => {
    attachObserver(target);
  });
};

const initExtension = () => {                                
  const body = document.getElementsByTagName('body')[0];
  observeFsView(body);
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const addedNode of mutation.addedNodes) {
        observeFsView(addedNode);
      }
    }
  });
  
  observer.observe(body, { childList: true, subtree: true });
}