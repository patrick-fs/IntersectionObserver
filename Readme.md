## Find out when and how often individual page elements have been viewed using FullStory
### Replay
![IntersectionObserver2](https://user-images.githubusercontent.com/45576380/56548378-f5aaa800-654d-11e9-82ec-1193519ccea0.gif)

### Search
![IntersectionObserver4](https://user-images.githubusercontent.com/45576380/56548466-27237380-654e-11e9-97e9-a345c715c5ca.gif)
You can also filter by the number of views: https://github.com/patrick-fs/IntersectionObserver/issues/3
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
### How does this work?
The FullStory [Custom Event API](https://help.fullstory.com/develop-js/363565-fs-event-api-sending-custom-event-data-into-fullstory) is integrated with the [IntersectionObserver](https://webkit.org/blog/8582/intersectionobserver-in-webkit/) browser API. See the `extension.js` file in this repository for details.
### How to run the demo
```Bash
npm install
npm run serve
```
### Additonal FAQ
1. What data are being sent to FullStory?
The value of the `data-fs-view` attribute as well as the number of times the element was viewed while the user was on the page.

2. What is the behavior when the targeted element or an ancestor of the targeted element is blocked?
No impact on behavior: a blocked element (or the child of a blocked element) will be tracked as "Viewed" but he actual content of the blocked element will not be sent to FullStory's servers. Read more about privacy controls here: https://help.fullstory.com/spp/138664.

3. Does this stay within FullStory's API quotas?

Yes, likely. It uses the [Custom Event API](https://help.fullstory.com/develop-js/363565-fs-event-api-sending-custom-event-data-into-fullstory) which limits event names to 250 characters and API requests to 30 calls per minute (burst to 10 per second). More information about API limits are here: https://help.fullstory.com/develop-js/367098-fs-recording-client-api-requirements.
