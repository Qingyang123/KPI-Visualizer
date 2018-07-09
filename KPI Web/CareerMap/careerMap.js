var title = document.querySelector('h2');
var numberButton = document.getElementById('numberButton');
var chartButton = document.getElementById('chartButton');
var slideShowNumber = document.getElementsByClassName('slideShow')[0];
var slideShowChart = document.getElementsByClassName('slideShow')[1];
var dataTables = document.querySelectorAll('table');
var charts = document.getElementsByClassName('chart');
var startPauseButton = document.getElementById('startPauseButton');
var dots = document.getElementsByClassName('dot');
var careerMapDropdown = document.getElementById('CM-dropdown');
var careerMapNoDropdown = document.getElementById('CM-no-dropdown');
var slideShowState = true;

$(document).ready(function() {

	setTimeout(function(){
		$('body').addClass('loaded');
    $('body').removeClass('preloaded');
	}, 3000);

});

// If numberButton is selected:
numberButton.addEventListener('click', function() {
  title.style.display = 'block';
  title.style.marginTop = '55px';
  slideShowNumber.style.display = 'block';
  slideShowChart.style.display = 'none';
  numberButton.style.display = 'none';
  chartButton.style.display = 'none';
  careerMapDropdown.style.display = 'block';
  careerMapNoDropdown.style.display = 'none';
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
  careerMapDropdown.style.display = 'block';
  careerMapNoDropdown.style.display = 'none';
  title.textContent = 'Career Map Data Viewed in Chart';
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
function careerMapSelection(choice) {
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
    title.textContent = 'Career Map Data Viewed in Chart';
    title.className += ' colorfulText';
    slideShowState = true;
  }
}




var parsedData = [];
var careerMapSessionUserData = [
  {
    seriesname: 'Career Map Sessions',
    data: []
  },
  {
    seriesname: 'Career Map Users',
    data: []
  }
];
var careerMapSessionUserCategory = [];



var spreadsheet = '19KvaY04qRaUYvk_rPWC5qHUgzdwr06Eq4b37VGuHjgY';
var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheet + '/od6/public/basic?alt=json';
$.getJSON({
  url: url,
  success: function(response) {
    var data = response.feed.entry;
    for (var i = 3; i < data.length; i++) {
      parsedData.push({
        label: data[i].title.$t,
        value: data[i].content.$t.split(', ')
      });
    }
		// console.log(parsedData);
		localData = dataStoredLocally(parsedData);
		
		if (!testInternet()) {
			parsedData = localData
		}

    for (var i = 0; i < parsedData.length; i++) {
      var values = parsedData[i]['value'];
      for (var j = 0; j < values.length; j++) {
        values[j] = values[j].substring(values[j].indexOf(":") + 1);
      }
      careerMapSessionUserData[0]['data'].push({
        value: parsedData[i]['value'][29]
      });
      careerMapSessionUserData[1]['data'].push({
        value: parsedData[i]['value'][30]
      });
      careerMapSessionUserCategory.push({
        label: parsedData[i]['label']
      });
    }

    for (var i = 1; i < 14; i++) {
      $('#table1').append('<tr></tr>');
      var tr1 = document.querySelectorAll('#table1 tr');

      for (var j = 0; j < 3; j++) {
        var td1 = document.createElement('TD');
        tr1[i].appendChild(td1);
      }
      var td1 = tr1[i].querySelectorAll('td');
      td1[0].innerHTML = parsedData[i - 1]['label'];

      for (var j = 1; j < td1.length; j++) {
        td1[j].innerHTML = parsedData[i - 1]['value'][j - 1 + 29];
      }
    }

    new FusionCharts({
      type: 'MSColumn2D',
      renderAt: 'careerMapSessionUser',
      width: '95%',
      height: '500',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          'caption': 'Career Map Sessions and Users',
          'captionFontSize': '20',
          'xAxisName': 'Date',
          'xAxisNameFontSize': '15',
          'yAxisName': 'Number of Sessions and Users',
          'yAxisNameFontSize': '15',
          'formatNumberScale': '0',
          'paletteColors': '#ffe699, #bf80ff',
          'bgColor': '#ffffff',
          'borderAlpha': '0',
          'canvasBorderAlpha': '0',
          'usePlotGradientColor': '0',
          'plotBorderAlpha': '0',
          'plotBorderColor': '#ffffff',
          'placevaluesInside': '0',
          'valueFontColor': '#668cff',
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
          'toolTipBorderColor': '#6666ff',
          'toolTipBorderRadius': '3',
          'toolTipBorderThickness': '1',
          'plotToolText': '<div style="font-size: 14px; color: #6666ff">$label $seriesname: $value</div>',
          'legendBgAlpha': '0',
          'legendBorderAlpha': '0',
          'legendShadow': '0',
          'legendItemFontSize': '15',
          'legendItemFontColor': '#666666',
          'showHoverEffect': '1'
        },
        "categories": [{
          'category': careerMapSessionUserCategory
        }],
        "dataset": careerMapSessionUserData
      }
    }).render();
  }
});







// Move slides with slider arrows:
var slideIndex = 0;
title1 = 'Career Map Sessions <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> ' +
         'Users';

titlesNumber = [title1];


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


// Test if the Internet connection is good or not.
function testInternet() {
	var online;
	// check whether this function works (online only)
	try {
	  var x = google.maps.MapTypeId.TERRAIN;
	  online = true;
		return online;
	} catch (e) {
	  online = false;
		return false;
	}
}


// Store data into localStorage
function dataStoredLocally(parsedData) {
	localStorage.setItem('CareerMap', JSON.stringify(parsedData));
	localData = JSON.parse(localStorage.getItem('CareerMap'));
	return localData
}


// function doesConnectionExist() {
//     var xhr = new XMLHttpRequest();
//     var file = "file:///Users/apple/Desktop/Katalyst_Education/KPI_Visualizer/KPI%20Web/CareerMap/careerMap.html";
//     var randomNum = Math.round(Math.random() * 10000);
//
//     xhr.open('HEAD', file + "?rand=" + randomNum, true);
//     xhr.send();
//
//     xhr.addEventListener("readystatechange", processRequest, false);
//
//     function processRequest(e) {
//       if (xhr.readyState == 4) {
//         if (xhr.status >= 200 && xhr.status < 304) {
//           alert("connection exists!");
//         } else {
//           alert("connection doesn't exist!");
//         }
//       }
//     }
// }
// doesConnectionExist();
