// Inspired by: https://www.youtube.com/watch?v=W5LhLZqj76s
function loadScript(url) {
    var index = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default loadScript;