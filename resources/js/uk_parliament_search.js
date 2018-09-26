UK_Parliament_Search = {};
window.UK_Parliament_Search = UK_Parliament_Search;

UK_Parliament_Search.getResultObjectArray = function () {

  cardArray = document.querySelectorAll('.card__details');
  resultObjectArray = [];

  for (var i = 0; i < cardArray.length; i++) {
    resultObject = {
      resultPosition: null,
      resultHints: [],
      resultHintCount: 0
    };

    startIndex = UK_Parliament_Search.getParameterByName('start_index');
    (startIndex) ? resultObject.resultPosition = i + parseInt(startIndex): resultObject.resultPosition = i + 1;

    hintNodes = cardArray[i].querySelectorAll('ul>li>span');
    if (hintNodes !== []) {
      resultObject.resultHints = UK_Parliament_Search.resultHintArray(hintNodes);
      resultObject.resultHintCount = resultObject.resultHints.length;
    }

    linkNodes = cardArray[i].querySelectorAll('h2>a');
    if (linkNodes.length > 0)
      linkNode = linkNodes[0];

    if (linkNode) {
      linkNode.addEventListener('click', function (e) {
        if (resultObject.resultHintCount > 0) {
          appInsights.trackEvent('resultLinkClicked', {
            url: this.href,
            hints: resultObject.resultHints
          }, {
            position: resultObject.resultPosition,
            hintCount: resultObject.resultHintCount
          });
        } else {
          appInsights.trackEvent('resultLinkClicked', {
            url: this.href
          }, {
            position: resultObject.resultPosition
          });
        }

      }, false);
    }
  }
};

UK_Parliament_Search.resultHintArray = function (hintNodes) {
  resultHints = [];
  for (var i = 0; i < hintNodes.length; i++) {
    resultHints.push(hintNodes[i].innerHTML);
  }
  return resultHints;
};

UK_Parliament_Search.getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

window.addEventListener('load', function () {
  UK_Parliament_Search.getResultObjectArray();
});
