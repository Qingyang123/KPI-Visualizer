var backgroundImage1 = document.getElementById('backgroundImage1');
var backgroundImage2 = document.getElementById('backgroundImage2');
var cm_logo = document.getElementById('cm_logo');
var body = document.getElementById('body');
var header = document.getElementsByClassName('header')[0];
var section = document.getElementsByClassName('section')[0];
var title = document.getElementsByClassName('title')[0];
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
var run = false;
var monthNames = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
"07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"};


$(document).ready(function() {
	setTimeout(function(){
		$('body').addClass('loaded');
    $('body').removeClass('preloaded');
	}, 500);

	// $(window).on('scroll', function() {
	// 	if (($(window).scrollTop() >= 600) && !run) {
	// 			fillgauge();
	// 	}
	// });
	// if (($(window).scrollTop() >= 600) && !run) {
	// 		fillgauge();
	// }

	$('.buttons').delay(1400).animate({'top': '23%', 'opacity': 1}, 700);
	// setTimeout(function() {
	// 	d3.select("#fillgauge1").call(d3.liquidfillgauge, 55, {
	// 	  displayPercent: false
	// 	});
	// }, 2000);
});

function fillgauge(number) {
	run = true;
	d3.select("#fillgauge1").call(d3.liquidfillgauge, number, {
		maxValue: 10000,
		circleColor: '#00c0ff',
		waveRiseTime: 3000,
		waveColor: '#00c0ff',
		textColor: 'white',
		waveTextColor: 'rgb(24, 47, 109)',
		displayPercent: false
	});
	// d3.select("#fillgauge1").on("valueChanged")(12);
}

function showFillGauge(number) {
	$(window).on('scroll', function() {
		if (($(window).scrollTop() >= 600) && !run) {
				fillgauge(number);
		}
	});
	if (($(window).scrollTop() >= 600) && !run) {
			fillgauge(number);
	}
}


// If numberButton is selected:
numberButton.addEventListener('click', function() {
  title.style.display = 'block';
  title.style.marginTop = '55px';
	// console.log(title);
	// backgroundImage1.parentNode.removeChild(backgroundImage1);
	// backgroundImage2.parentNode.removeChild(backgroundImage2);
	cm_logo.parentNode.removeChild(cm_logo);
	// body.style.backgroundColor = '#d1e751';
	header.parentNode.removeChild(header);
	section.parentNode.removeChild(section);

  if (! window.navigator.onLine && localStorage.getItem("careerMap_data") != null) {
    document.getElementById('datatime').innerHTML = "Using data from " + JSON.parse(localStorage.getItem("date"))[0].substring(0, 10);
    document.getElementById('datatime').style.display = 'block';
  } else {
    document.getElementById('datatime').style.display = 'none';
  }
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
	// backgroundImage1.parentNode.removeChild(backgroundImage1);
	// backgroundImage2.parentNode.removeChild(backgroundImage2);
	cm_logo.parentNode.removeChild(cm_logo);
	// body.style.backgroundColor = '#d1e751';
	header.parentNode.removeChild(header);
	section.parentNode.removeChild(section);

  if (! window.navigator.onLine && localStorage.getItem("careerMap_data") != null) {
    document.getElementById('datatime').innerHTML = "Using data from " + JSON.parse(localStorage.getItem("date"))[0].substring(0, 10);
    document.getElementById('datatime').style.display = 'block';
  } else {
    document.getElementById('datatime').style.display = 'none';
  }
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


if (! window.navigator.onLine) {
  if (localStorage.getItem("careerMap_data") == null) {
    alert("Requires Internet connection.");
  } else {
    alert("You're offline. Using data from " + JSON.parse(localStorage.getItem("date"))[0].substring(0, 10) + ".");
    parsedData = JSON.parse(localStorage.getItem("careerMap_data"));
		var thisyear = false;
		var labelColor = "";
		var yearstart = false;

    for (var i = 0; i < parsedData.length; i++) {
			if (!thisyear) {
				if (parsedData[i]['label'].substring(5) == "01" && i > 0) {
					thisyear = true;
					labelColor = "#1354b9";
				} else {
					labelColor = "#4e5867";
				}
			}
			if (parsedData[i]['label'].substring(5) == "01" || i == 0) {
				yearstart = true;
			} else {
				yearstart = false;
			}
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
				label: yearstart
          ? monthNames[parsedData[i]['label'].substring(5)] + "\n" + parsedData[i]['label'].substring(0, 4)
          : monthNames[parsedData[i]['label'].substring(5)],
        labelFontColor: labelColor,
        labelFontSize: "12px"
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
      td1[0].innerHTML = (i == 1 || parsedData[i - 1]['label'].substring(5) == "01")
        ? parsedData[i - 1]['label'].substring(0, 5) + monthNames[parsedData[i - 1]['label'].substring(5)]
        : monthNames[parsedData[i - 1]['label'].substring(5)];

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
          'xAxisName': '{br} Date',
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
} else {
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

      localStorage.setItem("careerMap_data", JSON.stringify(parsedData));
      var curdate = new Date();
      localStorage.setItem("date", JSON.stringify([curdate]));

			var thisyear = false;
			var labelColor = "";
			var yearstart = false;
      for (var i = 0; i < parsedData.length; i++) {
				if (!thisyear) {
					if (parsedData[i]['label'].substring(5) == "01" && i > 0) {
						thisyear = true;
						labelColor = "#1354b9";
					} else {
						labelColor = "#4e5867";
					}
				}
				if (parsedData[i]['label'].substring(5) == "01" || i == 0) {
					yearstart = true;
				} else {
					yearstart = false;
				}
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
					label: yearstart
								? monthNames[parsedData[i]['label'].substring(5)] + "\n" + parsedData[i]['label'].substring(0, 4)
								: monthNames[parsedData[i]['label'].substring(5)],
							labelFontColor: labelColor,
							labelFontSize: "12px"
        });
      }

			var maxSession = maxSessionUser(careerMapSessionUserData)[0];
			var maxUser = maxSessionUser(careerMapSessionUserData)[1];
			document.getElementsByClassName('data-description')[0].querySelector('span').textContent += String(maxSession);
			showFillGauge(maxUser);


      for (var i = 1; i < 14; i++) {
        $('#table1').append('<tr></tr>');
        var tr1 = document.querySelectorAll('#table1 tr');

        for (var j = 0; j < 3; j++) {
          var td1 = document.createElement('TD');
          tr1[i].appendChild(td1);
        }
        var td1 = tr1[i].querySelectorAll('td');
        td1[0].innerHTML = (i == 1 || parsedData[i - 1]['label'].substring(5) == "01")
          ? parsedData[i - 1]['label'].substring(0, 5) + monthNames[parsedData[i - 1]['label'].substring(5)]
          : monthNames[parsedData[i - 1]['label'].substring(5)];

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
            'xAxisName': '{br} Date',
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
}


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


function maxSessionUser(data) {
	var sessions = [];
	var users = [];
	for (var i = 0; i < data[0]['data'].length; i++) {
		var str1 = data[0]['data'][i]['value'];
		var str2 = data[1]['data'][i]['value'];
		sessions.push(Number(str1.replace(/\s/g, '')));
		users.push(Number(str2.replace(/\s/g, '')));
	}
	return [Math.max(...sessions), Math.max(...users)];
}

const LiquidButton = class LiquidButton {
  constructor(svg) {
    const options = svg.dataset;
    this.id = this.constructor.id || (this.constructor.id = 1);
    this.constructor.id++;
    this.xmlns = 'http://www.w3.org/2000/svg';
    this.tension = options.tension * 1 || 0.4;
    this.width   = options.width   * 1 || 200;
    this.height  = options.height  * 1 ||  50;
    this.margin  = options.margin  ||  40;
    this.hoverFactor = options.hoverFactor || -0.1;
    this.gap     = options.gap     ||   5;
    this.debug   = options.debug   || false;
    this.forceFactor = options.forceFactor || 0.2;
    this.color1 = options.color1 || '#36DFE7';
    this.color2 = options.color2 || '#8F17E1';
    this.color3 = options.color3 || '#BF09E6';
    this.textColor = options.textColor || '#FFFFFF';
    this.text = options.text    || 'Button';
    this.svg = svg;
    this.layers = [{
      points: [],
      viscosity: 0.5,
      mouseForce: 100,
      forceLimit: 2,
    },{
      points: [],
      viscosity: 0.8,
      mouseForce: 150,
      forceLimit: 3,
    }];
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      layer.viscosity = options['layer-' + (layerIndex + 1) + 'Viscosity'] * 1 || layer.viscosity;
      layer.mouseForce = options['layer-' + (layerIndex + 1) + 'MouseForce'] * 1 || layer.mouseForce;
      layer.forceLimit = options['layer-' + (layerIndex + 1) + 'ForceLimit'] * 1 || layer.forceLimit;
      layer.path = document.createElementNS(this.xmlns, 'path');
      this.svg.appendChild(layer.path);
    }
    this.wrapperElement = options.wrapperElement || document.body;
    if (!this.svg.parentElement) {
      this.wrapperElement.append(this.svg);
    }

    this.svgText = document.createElementNS(this.xmlns, 'text');
    this.svgText.setAttribute('x', '50%');
    this.svgText.setAttribute('y', '50%');
    this.svgText.setAttribute('dy', ~~(this.height / 8) + 'px');
    this.svgText.setAttribute('font-size', ~~(this.height / 3));
    this.svgText.style.fontFamily = 'sans-serif';
    this.svgText.setAttribute('text-anchor', 'middle');
    this.svgText.setAttribute('pointer-events', 'none');
    this.svg.appendChild(this.svgText);

    this.svgDefs = document.createElementNS(this.xmlns, 'defs')
    this.svg.appendChild(this.svgDefs);

    this.touches = [];
    this.noise = options.noise || 0;
    document.body.addEventListener('touchstart', this.touchHandler);
    document.body.addEventListener('touchmove', this.touchHandler);
    document.body.addEventListener('touchend', this.clearHandler);
    document.body.addEventListener('touchcancel', this.clearHandler);
    this.svg.addEventListener('mousemove', this.mouseHandler);
    this.svg.addEventListener('mouseout', this.clearHandler);
    this.initOrigins();
    this.animate();
  }

  get mouseHandler() {
    return (e) => {
      this.touches = [{
        x: e.offsetX,
        y: e.offsetY,
        force: 1,
      }];
    };
  }

  get touchHandler() {
    return (e) => {
      this.touches = [];
      const rect = this.svg.getBoundingClientRect();
      for (let touchIndex = 0; touchIndex < e.changedTouches.length; touchIndex++) {
        const touch = e.changedTouches[touchIndex];
        const x = touch.pageX - rect.left;
        const y = touch.pageY - rect.top;
        if (x > 0 && y > 0 && x < this.svgWidth && y < this.svgHeight) {
          this.touches.push({x, y, force: touch.force || 1});
        }
      }
      e.preventDefault();
    };
  }

  get clearHandler() {
    return (e) => {
      this.touches = [];
    };
  }

  get raf() {
    return this.__raf || (this.__raf = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){ setTimeout(callback, 10)}
    ).bind(window));
  }

  distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  update() {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = layer.points;
      for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
        const point = points[pointIndex];
        const dx = point.ox - point.x + (Math.random() - 0.5) * this.noise;
        const dy = point.oy - point.y + (Math.random() - 0.5) * this.noise;
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = d * this.forceFactor;
        point.vx += f * ((dx / d) || 0);
        point.vy += f * ((dy / d) || 0);
        for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
          const touch = this.touches[touchIndex];
          let mouseForce = layer.mouseForce;
          if (
            touch.x > this.margin &&
            touch.x < this.margin + this.width &&
            touch.y > this.margin &&
            touch.y < this.margin + this.height
          ) {
            mouseForce *= -this.hoverFactor;
          }
          const mx = point.x - touch.x;
          const my = point.y - touch.y;
          const md = Math.sqrt(mx * mx + my * my);
          const mf = Math.max(-layer.forceLimit, Math.min(layer.forceLimit, (mouseForce * touch.force) / md));
          point.vx += mf * ((mx / md) || 0);
          point.vy += mf * ((my / md) || 0);
        }
        point.vx *= layer.viscosity;
        point.vy *= layer.viscosity;
        point.x += point.vx;
        point.y += point.vy;
      }
      for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
        const prev = points[(pointIndex + points.length - 1) % points.length];
        const point = points[pointIndex];
        const next = points[(pointIndex + points.length + 1) % points.length];
        const dPrev = this.distance(point, prev);
        const dNext = this.distance(point, next);

        const line = {
          x: next.x - prev.x,
          y: next.y - prev.y,
        };
        const dLine = Math.sqrt(line.x * line.x + line.y * line.y);

        point.cPrev = {
          x: point.x - (line.x / dLine) * dPrev * this.tension,
          y: point.y - (line.y / dLine) * dPrev * this.tension,
        };
        point.cNext = {
          x: point.x + (line.x / dLine) * dNext * this.tension,
          y: point.y + (line.y / dLine) * dNext * this.tension,
        };
      }
    }
  }

  animate() {
    this.raf(() => {
      this.update();
      this.draw();
      this.animate();
    });
  }

  get svgWidth() {
    return this.width + this.margin * 2;
  }

  get svgHeight() {
    return this.height + this.margin * 2;
  }

  draw() {
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      if (layerIndex === 1) {
        if (this.touches.length > 0) {
          while (this.svgDefs.firstChild) {
            this.svgDefs.removeChild(this.svgDefs.firstChild);
          }
          for (let touchIndex = 0; touchIndex < this.touches.length; touchIndex++) {
            const touch = this.touches[touchIndex];
            const gradient = document.createElementNS(this.xmlns, 'radialGradient');
            gradient.id = 'liquid-gradient-' + this.id + '-' + touchIndex;
            const start = document.createElementNS(this.xmlns, 'stop');
            start.setAttribute('stop-color', this.color3);
            start.setAttribute('offset', '0%');
            const stop = document.createElementNS(this.xmlns, 'stop');
            stop.setAttribute('stop-color', this.color2);
            stop.setAttribute('offset', '100%');
            gradient.appendChild(start);
            gradient.appendChild(stop);
            this.svgDefs.appendChild(gradient);
            gradient.setAttribute('cx', touch.x / this.svgWidth);
            gradient.setAttribute('cy', touch.y / this.svgHeight);
            gradient.setAttribute('r', touch.force);
            layer.path.style.fill = 'url(#' + gradient.id + ')';
          }
        } else {
          layer.path.style.fill = this.color2;
        }
      } else {
        layer.path.style.fill = this.color1;
      }
      const points = layer.points;
      const commands = [];
      commands.push('M', points[0].x, points[0].y);
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        commands.push('C',
          points[(pointIndex + 0) % points.length].cNext.x,
          points[(pointIndex + 0) % points.length].cNext.y,
          points[(pointIndex + 1) % points.length].cPrev.x,
          points[(pointIndex + 1) % points.length].cPrev.y,
          points[(pointIndex + 1) % points.length].x,
          points[(pointIndex + 1) % points.length].y
        );
      }
      commands.push('Z');
      layer.path.setAttribute('d', commands.join(' '));
    }
    this.svgText.textContent = this.text;
    this.svgText.style.fill = this.textColor;
  }

  createPoint(x, y) {
    return {
      x: x,
      y: y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
    };
  }

  initOrigins() {
    this.svg.setAttribute('width', this.svgWidth);
    this.svg.setAttribute('height', this.svgHeight);
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      const layer = this.layers[layerIndex];
      const points = [];
      for (let x = ~~(this.height / 2); x < this.width - ~~(this.height / 2); x += this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin
        ));
      }
      for (let alpha = ~~(this.height * 1.25); alpha >= 0; alpha -= this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          Math.sin(angle) * this.height / 2 + this.margin + this.width - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      for (let x = this.width - ~~(this.height / 2) - 1; x >= ~~(this.height / 2); x -= this.gap) {
        points.push(this.createPoint(
          x + this.margin,
          this.margin + this.height
        ));
      }
      for (let alpha = 0; alpha <= ~~(this.height * 1.25); alpha += this.gap) {
        const angle = (Math.PI / ~~(this.height * 1.25)) * alpha;
        points.push(this.createPoint(
          (this.height - Math.sin(angle) * this.height / 2) + this.margin - this.height / 2,
          Math.cos(angle) * this.height / 2 + this.margin + this.height / 2
        ));
      }
      layer.points = points;
    }
  }
}


const redraw = () => {
  button.initOrigins();
};

const buttons = document.getElementsByClassName('liquid-button');
for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
  const button = buttons[buttonIndex];
  button.liquidButton = new LiquidButton(button);
}
