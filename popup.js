function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += '\"' + array[i][index] + '\"';
        }

        str += line + '\r\n';
    }

    return str;
};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

let page = 1;
let currentTab;
let collect = document.getElementById('collect');
collect.onclick = function(element) {
 
  chrome.tabs.query({}, function(tabs) {

      var result = [];
      for (var i = 0; i < tabs.length; i++) {
        let o = {};
        o.title = tabs[i].title;
        o.url = tabs[i].url;
        console.log(o);
        result.push(o);
      }
      download("tab.csv", ConvertToCSV(result));
  });
};
