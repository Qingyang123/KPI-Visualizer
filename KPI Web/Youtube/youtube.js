var title = document.querySelector('h2');
var numberButton = document.getElementById('numberButton');
var chartButton = document.getElementById('chartButton');
var slideShowNumber = document.getElementsByClassName('slideShow')[0];
var slideShowChart = document.getElementsByClassName('slideShow')[1];
var dataTables = document.querySelectorAll('table');
var charts = document.getElementsByClassName('chart');
var startPauseButton = document.getElementById('startPauseButton');
var dots = document.getElementsByClassName('dot');
var youtubeDropdown = document.getElementById('youtube-dropdown');
var youtubeNoDropdown = document.getElementById('youtube-no-dropdown');
var slideShowState = true;


// If numberButton is selected:
numberButton.addEventListener('click', function() {
  title.style.display = 'block';
  title.style.marginTop = '55px';
  slideShowNumber.style.display = 'block';
  slideShowChart.style.display = 'none';
  numberButton.style.display = 'none';
  chartButton.style.display = 'none';
  youtubeDropdown.style.display = 'block';
  youtubeNoDropdown.style.display = 'none';
});


// If chartButton is selected:
chartButton.addEventListener('click', function() {
  title.style.display = 'block';
  title.style.marginTop = '55px';
  slideShowNumber.style.display = 'none';
  slideShowChart.style.display = 'block';
  numberButton.style.display = 'none';
  chartButton.style.display = 'none';
  startPauseButton.style.display = 'block';
  youtubeDropdown.style.display = 'block';
  youtubeNoDropdown.style.display = 'none';
  title.textContent = 'Youtube Data Viewed in Chart';
  title.className += ' colorfulText';
  slideShowState = true;
});



// Click Start/Pause Button to start or pause the slide show.
startPauseButton.addEventListener('click', function(e) {
  if (slideShowState) {
    e.target.textContent = 'Start';
    slideShowState = false;
  } else {
    e.target.textContent = 'Pause';
    slideShowState = true;
    automaticSlideShowChart();
  }
});





// Youtube Selection => Number / Chart:
function youtubeSelection(choice) {
  if (choice == 'number') {
    slideShowNumber.style.display = 'block';
    slideShowChart.style.display = 'none';
    startPauseButton.style.display = 'none';
    title.innerHTML = titlesNumber[slideIndex];
  }
  else {
    slideShowChart.style.display = 'block';
    slideShowNumber.style.display = 'none';
    startPauseButton.style.display = 'block';
    title.textContent = 'Youtube Data Viewed in Chart';
    title.className += ' colorfulText';
    slideShowState = true;
    // automaticSlideShowChart();
  }
}



// Load data from google spreadsheet.
var parsedData = [];
var monthlySubscribersData = [];
var cumulativeSubscribersData = [];
var monthlyViewsData = [];
var cumulativeViewsData = [];
var monthlyVideosPublishedData = [];
var cumulativeVideosPublishedData = [];
var commentsAndLikesData = [
  {
    seriesname: 'Comments',
    data: []
  },
  {
    seriesname: 'Number of Likes',
    data: []
  }
];
var commentsAndLikesCategory = [];
var averageDeviceTypePercentage = [
  {
    label: 'Desktop',
    displayValue: '',
    value: ''
  },
  {
    label: 'Mobile',
    displayValue: '',
    value: ''
  },
  {
    label: 'Tablet',
    displayValue: '',
    value: ''
  },
  {
    label: 'TV',
    displayValue: '',
    value: ''
  },
  {
    label: 'Others',
    displayValue: '',
    value: ''
  }
];

var averageViews = 0;
var desktop = 0;
var mobile = 0;
var tablet = 0;
var tv = 0;
var others = 0;

var spreadsheet = '19KvaY04qRaUYvk_rPWC5qHUgzdwr06Eq4b37VGuHjgY';
var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheet + '/od6/public/basic?alt=json';
$.getJSON({
  url: url,
  success: function(response) {
    var data = response.feed.entry;

    // parsedData is a list of objects which contains all the data imported from spreadsheet
    for (var i = 3; i < data.length; i++) {
      parsedData.push({
        label: data[i].title.$t,
        value: data[i].content.$t.split(', ')
      });
    }

    // Assign different types of data to different arrays for the purpose of making the charts.
    for (var i = 0; i < parsedData.length; i++) {
      var values = parsedData[i]['value'];
      for (var j = 0; j < values.length; j++) {
        values[j] = values[j].substring(values[j].indexOf(":") + 1);
      }
      monthlySubscribersData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][0].substring(1)
      });

      cumulativeSubscribersData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][1]
      });
      monthlyViewsData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][2]
      });
      cumulativeViewsData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][3]
      });
      monthlyVideosPublishedData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][4]
      });
      cumulativeVideosPublishedData.push({
        label: parsedData[i]['label'],
        value: parsedData[i]['value'][5]
      });
      commentsAndLikesData[0]['data'].push({
        value: parsedData[i]['value'][6]
      });
      commentsAndLikesData[1]['data'].push({
        value: parsedData[i]['value'][7]
      });
      commentsAndLikesCategory.push({
        label: parsedData[i]['label']
      });

      averageViews += Number(parsedData[i]['value'][2]);
      desktop += parseFloat(parsedData[i]['value'][8]);
      mobile += parseFloat(parsedData[i]['value'][9]);
      tablet += parseFloat(parsedData[i]['value'][10]);
      tv += parseFloat(parsedData[i]['value'][11]);
      others += parseFloat(parsedData[i]['value'][12]);
    }

    // Device Type Data from percentage to real number.
    averageViews = averageViews / 13;
    averageDeviceTypePercentage[0]['value'] = String((desktop / 1300) * averageViews);
    averageDeviceTypePercentage[0]['displayValue'] = String((desktop/13).toFixed(2)) + '%';

    averageDeviceTypePercentage[1]['value'] = String(mobile / 1300 * averageViews);
    averageDeviceTypePercentage[1]['displayValue'] = String((mobile/13).toFixed(2)) + '%';

    averageDeviceTypePercentage[2]['value'] = String(tablet / 1300 * averageViews);
    averageDeviceTypePercentage[2]['displayValue'] = String((tablet/13).toFixed(2)) + '%';

    averageDeviceTypePercentage[3]['value'] = String(tv / 1300 * averageViews);
    averageDeviceTypePercentage[3]['displayValue'] = String((tv/13).toFixed(2)) + '%';

    averageDeviceTypePercentage[4]['value'] = String(others / 1300 * averageViews);
    averageDeviceTypePercentage[4]['displayValue'] = String((others/13).toFixed(2)) + '%';


    // Update table1:
    var tr1 = document.querySelectorAll('#table1 tr');
    for (var i = 1; i < tr1.length; i++) {
      var td1 = tr1[i].querySelectorAll('td');
      td1[0].innerHTML = parsedData[i - 1]['label'];
      for (var j = 1; j < td1.length; j++) {
        td1[j].innerHTML = parsedData[i - 1]['value'][j - 1];
      }
    }

    // Update table2:
    var tr2 = document.querySelectorAll('#table2 tr');
    for (var i = 1; i < tr2.length; i++) {
      var td2 = tr2[i].querySelectorAll('td');
      td2[0].innerHTML = parsedData[i - 1]['label'];
      for (var j = 1; j < td2.length; j++) {
        td2[j].innerHTML = parsedData[i - 1]['value'][j - 1 + 6];
      }
    }

    // Update table3:
    var tr3 = document.querySelectorAll('#table3 tr');
    for (var i = 1; i < tr3.length; i++) {
      var td3 = tr3[i].querySelectorAll('td');
      td3[0].innerHTML = parsedData[i - 1]['label'];
      for (var j = 1; j < td3.length; j++) {
        td3[j].innerHTML = parsedData[i - 1]['value'][j - 1 + 8];
      }
    }

    // Monthly Subscribers Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'monthlySubscribers',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Monthly Subscribers',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Subscribers(Monthly)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#66b3ff',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#6666ff',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#0080ff',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #0080ff">$label: $value</div>'
        },
        "data": monthlySubscribersData
      }
    }).render();


    // Cumulative Subscribers Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'cumulativeSubscribers',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Cumulative Subscribers',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Subscribers(Cumulative)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#ff9999',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#ff4d4d',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#ff3333',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #ff3333">$label: $value</div>'
        },
        "data": cumulativeSubscribersData
      }
    }).render();

    // Monthly Views Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'monthlyViews',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Monthly Views',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Views(Monthly)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#bfff00',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#80ff00',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#00ff00',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #00ff00">$label: $value</div>'
        },
        "data": monthlyViewsData
      }
    }).render();

    // Cumulative Views Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'cumulativeViews',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Cumulative Views',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Views(Cumulative)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#ffbf00',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#ff9966',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#ff8c66',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #ff8c66">$label: $value</div>'
        },
        "data": cumulativeViewsData
      }
    }).render();

    // Monthly Videos Published Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'monthlyVideosPublished',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Monthly Videos Published',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Videos Published(Monthly)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#b3b3ff',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#6666ff',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#9966ff',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #9966ff">$label: $value</div>'
        },
        "data": monthlyVideosPublishedData
      }
    }).render();

    // Cumulative Videos Published Bar Plot:
    new FusionCharts({
      type: 'column2d',
      renderAt: 'cumulativeVideosPublished',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Cumulative Videos Published',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Youtube Videos Published(Cumulative)',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#ff99cc',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#ff4da6',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#ff4d88',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #ff4d88">$label: $value</div>'
        },
        "data": cumulativeVideosPublishedData
      }
    }).render();

    // Comments and Number of Likes:
    new FusionCharts({
      type: 'MSColumn2D',
      renderAt: 'commentsAndLikes',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Youtube Monthly Comments and Number of Likes',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Number of Comments and Likes',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#ff9999, #66ccff',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#bf80ff',
          'valueFontSize': '12',
          'valueFontBold': '0.7',
          'valueFontAlpha': '50',
          'divlineColor': '#999999',
          'divlineIsDashed': '1',
          'showAlternateHGridColor': '0',
          'showHoverEffect': '1',
          'showToolTip': '1',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'toolTipBorderColor': '#7300e6',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #7300e6">$label $seriesname: $value</div>',
          'legendBgAlpha': '0',
          'legendBorderAlpha': '0',
          'legendShadow': '0',
          'legendItemFontSize': '15',
          'legendItemFontColor': '#666666',
          'showHoverEffect': '1'
        },
        "categories": [{
          'category': commentsAndLikesCategory
        }],
        "dataset": commentsAndLikesData
      }
    }).render();

    // Average Views grouped by Device type
    new FusionCharts({
      type: 'pie2d',
      renderAt: 'averageDeviceTypePercentage',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Average Views Grouped by Device Type',
          'captionFontSize': '20',
          'paletteColors': '#99ccff, #80ff80, #ffff66, #ff9966, #ff8080',
          'bgColor': '#ffffff',
          'showBorder': '0',
          'use3DLighting': '0',
          'showShadow': '0',
          'enableSmartLabels': '1',
          'startingAngle': '0',
          'showPercentValues': '1',
          'showPercentInTooltip': '1',
          'decimals': '1',
          'toolTipColor': '#7575a3',
          'toolTipBorderThickness': '1',
          'toolTipBorderRadius': '3',
          'toolTipBorderColor': '#7575a3',
          'toolTipBgColor': 'transparent',
          'toolTipPadding': '12',
          'plotToolText': '<div style="font-size: 14px; font-weight: bold">$label: $displayValue</div>',
          'showHoverEffect': '1',
          'showLegend': '1',
          'labelFontColor': '#7e8589',
          'labelFontSize': '13',
          'labelFontBold': '1',
          'legendBorderAlpha': '0',
          'legendItemFontSize': '13'
        },
        "data": averageDeviceTypePercentage
      }
    }).render();
  }
});




// Move slides with slider arrows:
var slideIndex = 0;
title1 = 'Subscribers <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
         'Views <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
         'Videos Published';
title2 = 'Monthly Comments <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
         'Monthly Number of Likes';
title3 = 'Desktop, Mobile, Tablet, TV <span class="ampersand">&</span> Other Views';

titlesNumber = [title1, title2, title3];


function changeSlide(n) {
  slideIndex += n;
  changeSlideHelper(slideIndex);
}

function currentSlide(n) {
  slideIndex = n;
  changeSlideHelper(slideIndex);
}

function changeSlideHelper(idx) {
  if (idx < 0) {
    slideIndex = dataTables.length - 1;
  }
  if (idx == dataTables.length) {
    slideIndex = 0;
  }
  for (var i = 0; i < dataTables.length; i++) {
    dataTables[i].style.display = 'none';
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  dots[slideIndex].className += ' active';
  title.innerHTML = titlesNumber[slideIndex];
  dataTables[slideIndex].style.display = 'table';
}






// Automatics slide show for chart display
var index2 = 0;
function automaticSlideShowChart() {
  if (slideShowState) {
    for (var j = 0; j < charts.length; j++) {
      charts[j].style.display = 'none';
    }
    index2 += 1;
    if (index2 > charts.length) {
      index2 = 1;
    }
    charts[index2 - 1].style.display = 'block';
    setTimeout(automaticSlideShowChart, 10000);
  } else {
    clearTimeout(automaticSlideShowChart);
  }
}

automaticSlideShowChart();









// console.log(monthlySubscribersData);
// Mark Charts:

// Monthly Subscribers:
// new FusionCharts({
//   type: 'column2d',
//   renderAt: 'monthlySubscribers',
//   width: '95%',
//   height: '500',
//   dataFormat: 'json',
//   dataSource: {
//     "chart": {
//       'caption': 'Youtube Monthly Subscribers',
//       'xAxisName': 'Date',
//       'yAxisName': 'Youtube Subscribers(Monthly)',
//
//     },
//     "data": monthlySubscribersData
//   }
// }).render();



// Automatics slide show for number display
// var index1 = 0;
// title1 = 'Subscribers <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
//          'Views <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
//          'Videos Published';
// title2 = 'Monthly Comments <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
//          'Monthly Number of Likes';
// title3 = 'Desktop, Mobile, Tablet, TV <span class="ampersand">&</span> Other Views';
//
// titlesNumber = [title1, title2, title3];

// function automaticSlideShowNumber() {
//   if (slideShowState == 'Start') {
//     for (var j = 0; j < dataTables.length; j++) {
//       dataTables[j].style.display = 'none';
//     }
//     index1 += 1;
//     if (index1 > dataTables.length) {
//         index1 = 1;
//     }
//     dataTables[index1 - 1].style.display = 'table';
//     title.innerHTML = titlesNumber[index1 - 1];
//     setTimeout(automaticSlideShowNumber, 5000);
//   } else {
//     clearTimeout(automaticSlideShowNumber);
//   }
// }
