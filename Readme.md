## Find out when and how often individual page elements have been viewed using FullStory
![IntersectionObserver](https://user-images.githubusercontent.com/45576380/56431089-aab33b00-6296-11e9-9a81-41b86f077650.gif)
### How to use
1. Place `<script src="extension.js"></script>` ahead of the [FullStory snippet](https://help.fullstory.com/using/recording-snippet)
2. Add this callback to the snippet
```JavaScript
window['_fs_ready'] = function () {
    initExtension();
};
```
3. Add the `data-fs-view` attribute on any element you want to track
```HTML
<div id="pink" class="box" data-fs-view="Pink Box">Pink Box</div>
<div id="blue" class="box" data-fs-view="Blue Box">Blue Box</div>
```
4. (Optional) add the `data-fs-view-threshold` attribute to the element to change how long the element must be in view before being tracked
```HTML
<div id="pink" class="box" data-fs-view="Pink Box">Pink Box</div>
<!-- data-fs-view-threshold is in milliseconds -->
<div id="blue" class="box" data-fs-view="Blue Box" data-fs-view-threshold="2000">Blue Box</div>
```
### How to run the demo
```Bash
npm install
npm run serve
```