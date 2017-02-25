
$(document).ready(function()
{
	(new mainClass());
});

var mainClass = function()
{
	var main = this;

	var data = [];				// position of each item
	data.push(new Item(0, 0, 0));     //fill the first element data[0], so that the index == DOM li sequence

	var current_index = 1;		// the sequence number of current item
	var max_index = 0;			// the sequence number of the last item
	var page = document.getElementById('page');	// the DOM element where the items are placed

	var space = -1000;			// offset between neighboring items on Y and Z axis
	var	pageSize = 10;			// number of items each page
	var angle = 0;
	var MAX_SIZE = jsonData.length;

	var fRate = window.innerWidth / 1212;
	var slider_timeline = $('#slider_timeline')[0];
	var slider_scrollbar = $('#slider_scrollbar')[0];

	var dataTimelinePos = [];
	var dateMonthNames = [
		'JANUARY',
		'FABRARY',
		'MARCH',
		'APRIL',
		'MAY',
		'JUNE',
		'JULY',
		'AUGUST',
		'SEPTEMBER',
		'OCTOVER',
		'NOVEMBER',
		'DECEMBER',
	]

	this.init = function()
	{
		for(var i = 0; i < jsonData.length; i++)
		{
			var val = jsonData[i].date.yy + jsonData[i].date.mm * (1 / 12);
			var value = this.getTimelinePos(val);
			dataTimelinePos.push(value);
		}
		this.initAnimation();
		this.initEvent();
		this.initView();
		// $( "#slider" ).slider();
	}


	$(window).resize(function()
	{
		main.initView();
	});

	this.initView = function()
	{
		fRate = window.innerWidth / 1212;
		$('#scrollbar').css('top', 200 * fRate);
		$('#scrollbar').css('height', 620 * fRate - $('#scrollbar').offset().top);
		$('#slider_scrollbar').css('top', 200 * fRate);
		$('#slider_scrollbar').css('height', $('#scrollbar').height());
		$('#slider_scrollbar').css('margin-right', -0.5 - 2.5 / fRate);

		// $('#scrollbar_head').css('width', $('#scrollbar').width());
		$('#view').css('width', 800 * fRate);
		$('#view').css('height', 480 * fRate);

		// var header_height = $('.header').height();
		$('#timeline_bar').css('top', (81 + 60) * fRate);
		$('#timeline_bar').css('width', 1074 * fRate);
		$('#timeline_bar').css('height', 45 * fRate);
		$('#timeline_bar').css('left', 60 * fRate);
		$('#slider_timeline').css('top', (81 + 60 + 3) * fRate);
		$('#slider_timeline').css('width', 1058 * fRate);
		$('#slider_timeline').css('height', 45);
		$('#slider_timeline').css('left', 70 * fRate);
		// $('#slider_timeline').css('margin', '0px calc(5% + 10px)')；
		// $('#timeline_head').css('width', 12 * fRate);
		// $('#timeline_head').css('left', $('#timeline_bar').offset().left + 3 * fRate);
		// $('#timeline_head').css('top', (81 + 60) * fRate);
		$('#btn_addtimeline').css('top', 81 * fRate + (60 - 26) * fRate * 0.5);
		$('#btn_addtimeline img').css('width', 124 * fRate);
		$('#btn_addtimeline img').css('height', 26 * fRate);

		$('#page').css('margin-top', 50 * fRate);

		$('#page .dataType1').css('width', 530 * fRate);
		$('#page .dataType1').css('height', 530 * fRate);
		$('#page .dataType2').css('width', 1500 * fRate);
		$('#page .dataType2').css('height', 530 * fRate);
		$('#page .dataType3').css('width', 530 * fRate);
		$('#page .dataType3').css('height', 530 * fRate);
		$('#page .dataType3').css('padding-left', 950 * fRate);
		$('#page .lineType1').css('width', 1000 * fRate);
		$('#page .lineType1').css('padding-left', 250 * fRate);
		$('#page .lineType2').css('width', 1000 * fRate);
		$('#page .lineType2').css('padding-left', 230 * fRate);
		$('#page .symbol').css('width', 100 * fRate);
		$('#page .symbol').css('margin-left', 700 * fRate);
		$('#page .symbol').css('margin-top', -60 * fRate);
		$('#page .symbol:hover').css('opacity', 0.8);

		$('#page .text_content1').css('margin-left', 40 * fRate);
		$('#page .text_content2').css('margin-left', 55 * fRate);
		$('#page .text_content3').css('margin-left', 990 * fRate);
		$('#page .text_content1').css('margin-top', -185 * fRate);
		$('#page .text_content2').css('margin-top', -185 * fRate);
		$('#page .text_content3').css('margin-top', -185 * fRate);
		$('#page .text_content1').css('height', 90 * fRate);
		$('#page .text_content2').css('height', 90 * fRate);
		$('#page .text_content3').css('height', 90 * fRate);

		$('#page video').css('left', 40 * fRate);
		$('#page video').css('top', 40 * fRate);

		$('.text_date').css('width', 100 * fRate);
		$('.text_date').css('margin-left', 700 * fRate);
		$('.text_date').css('margin-top', 30 * fRate);
		$('.text_date').css('font-size', 12 * fRate);

		$('.text_content_title').css('font-size', 14 * fRate);
		$('.text_content_date').css('font-size', 12 * fRate);
		$('.text_content_text').css('font-size', 14 * fRate);
		$('.text_content_title').css('padding-left', 10 * fRate);
		$('.text_content_date').css('padding-left', 10 * fRate);
		$('.text_content_text').css('padding-left', 10 * fRate);
		$('.text_content_title').css('padding-top', 5 * fRate);
		$('.text_content_date').css('padding-top', 5 * fRate);
		$('.text_content_text').css('padding-top', 5 * fRate);

		$('li').css('left', -350 * fRate);

		// this.updateScrollVertical(current_index);
		// this.updateScrollTimeline(current_index);
	}

	var lastDataType = false;
	this.getItemHTML = function(imageurl, title, text, yy, mm, dd, videoUrl)
	{
		var dataType = 0;
		if(imageurl.indexOf('data2.png') > 0)
		{
			dataType = 1;
		}
		else
		{
			if(lastDataType)
				dataType = 2;
			else
				dataType = 0;
			lastDataType = !lastDataType;
		}
		var html1, html2;
		var content = 'text_content1';
		if(dataType == 0)
		{
			html1 = "<img src='" + imageurl + "' class='dataType1'>";
			content = 'text_content1';
			lineType = 0;
		}
		if(dataType == 1)
		{
			html1 = "<img src='" + imageurl + "' class='dataType2'>";
			content = 'text_content2';
			lineType = 1;
		}
		if(dataType == 2)
		{
			html1 = "<img src='" + imageurl + "' class='dataType3'>";
			content = 'text_content3';
			lineType = 1;
		}

		var html6 = "";
		if(videoUrl)
		{
			fRate = window.innerWidth / 1212;
			var v_w = 450 * fRate;
			var v_h = 353 * fRate;
			html6 = '<video width="' + v_w + '" height="' + v_h + '" controls >\
						<source src="data/1.mp4" type="video/mp4">\
					</video>';
		}

		if(lineType == 0)
			html2 = "<img src='image/line_2.png' class='lineType1'>";
		if(lineType == 1)
			html2 = "<img src='image/line_3.png' class='lineType2'>";

		var html3 = "<img src='image/symbol_date.png' class='symbol'>"
		var strDate = mm + ' ' + dd + ', ' + yy;
		var html4 = "<div class=" + 
						content + ">" +  
						"<p class='text_content_title'>" + title + "</p>" + 
						"<p class='text_content_date'>" + strDate + "</p>" + 
						"<p class='text_content_text'>" + text + "</p></div>";
		var html5 = "<div class='text_date'><p class='text_month'>" + mm + "</p>" + "<p class='text_year'>" + yy + "</p></div>";
		return html1 + html2 + html3 + html4 + html5 + html6;
	}

	function Item(translate_y, translate_z, rotate_z)	// data structure for storing the positions
	{
		this.translate_y = translate_y;
		this.translate_z = translate_z;
		this.rotate_z = rotate_z;
	}

	this.addEvent = function(n)	// put a new item
	{
		if(!data[n])
		{
			data.push(new Item(data[max_index].translate_y + space, data[max_index].translate_z + space, data[max_index].rotate_z + 3));
		}
		var item = document.createElement('li');
		item.id = n;
		item.style.zIndex = (1000 - n);
	//		        item.style.opacity = 0;			// new item is invisible initially, will be displayed by animate() function
		// item.onclick = function() { main.jumpTo(n) };			// if an item is clicked, it will move to the first place in the screen

		// console.log(n);
		if(jsonData[n - 1].video)
			item.innerHTML = this.getItemHTML('image/video_bg.png', jsonData[n - 1].title, jsonData[n - 1].text, jsonData[n - 1].date.yy, dateMonthNames[jsonData[n - 1].date.mm - 1], jsonData[n - 1].date.dd, jsonData[n - 1].video);
		else
			item.innerHTML = this.getItemHTML(jsonData[n - 1].image, jsonData[n - 1].title, jsonData[n - 1].text, jsonData[n - 1].date.yy, dateMonthNames[jsonData[n - 1].date.mm - 1], jsonData[n - 1].date.dd);

		item.style.left = -350 * fRate + 'px';
		page.appendChild(item);
		max_index ++;

	}

	this.initAnimation = function()
	{
		for(var n = 1; n < pageSize + 1; n++)			// put 10 items initially
		{
			data.push(new Item(n * space, (n - 0.7) * space, (n - 1) * angle));
			this.addEvent(n);
		}

		for(var n = 1; n < pageSize + 1; n++)
		{
			this.animate(n, 0, 1);			// animate 10 items added
		}
	}

	this.jumpTo = function(n)							// keep moving forward to show the n th item
	{
		if(n > current_index)
		{
			for(var i = current_index; i < n; i++)
			{
				this.next(true);
			}
		}
		else
		{
			for(var i = current_index; i >= n; i--)
			{
				this.prev(true);
			}
		}
	}

	this.animate = function(n, y, opacity, isNoScroll)
	{
		if(n <= MAX_SIZE)
		{
			var new_y = data[n].translate_y + y;
			var new_z = data[n].translate_z + y;
			var new_rz = data[n].rotate_z + angle*y/space;		// calculate new position of n th item

			var elementN = document.getElementById(n);
			// elementN.onclick = function() { main.jumpTo(n) };
			// animate n th item with CSS3 translate3d and rotate3d methods
			elementN.style.webkitTransform = 'translateZ(' + new_z + 'px)';
			elementN.style.transform = 'translateZ(' + new_z + 'px)';
			elementN.style.opacity = opacity;

			data[n].translate_y = new_y;
			data[n].translate_z = new_z;
			data[n].rotate_z = new_rz;						// save its new position


			// if(!isNoScroll)
			// {
			// 	// this.setScrollPos(current_index);
			// 	// this.setTimelinePos(current_index);
			// 	console.log(current_index);
			// 	var index = current_index;
			// 	if(slider_timeline.noUiSlider)
			// 		slider_timeline.noUiSlider.set([current_index / MAX_SIZE * 100], false);
			// 	if(slider_scrollbar.noUiSlider)
			// 		slider_scrollbar.noUiSlider.set([current_index / MAX_SIZE * 100], false);
			// }
		}
	}

	this.updateScrollTimeline = function(nDataIndex)
	{
		var nIndex = nDataIndex;
		if(typeof(nDataIndex) =='undefined')
		{
			nIndex = current_index;
		}
		if(slider_timeline.noUiSlider)
			slider_timeline.noUiSlider.set([nIndex / MAX_SIZE * 100], false);
	}
	this.updateScrollVertical = function(nDataIndex)
	{
		var nIndex = nDataIndex;
		if(typeof(nDataIndex) =='undefined')
		{
			nIndex = current_index;
		}
		if(slider_scrollbar.noUiSlider)
			slider_scrollbar.noUiSlider.set([100 - nIndex / MAX_SIZE * 100], false);
	}

	this.prev = function(isNoScroll)
	{
		if(current_index > 1)
		{
			document.getElementById(current_index - 1).style.opacity = 1;	// show last item
			current_index--;
			for(var n = 1; n < current_index; n++)	// update the positions of previous invisible items
			{
				this.animate(n, space, 0, isNoScroll);
			}
			for(var n = current_index; n < current_index + pageSize; n++)	// update the positions of current visible items
			{
				this.animate(n, space, 1, isNoScroll);
			}
			for(var n = current_index + pageSize; n <= max_index; n++)	// update the positions of next invisible items
			{
				this.animate(n, space, 0, isNoScroll);
			}
		}
	}

	this.next = function(isNoScroll)
	{
		if(current_index < data.length && current_index < MAX_SIZE)
		{
			document.getElementById(current_index).style.opacity = 0;	//hide current item
			current_index++;
			if(current_index + pageSize - 1 > max_index && max_index < MAX_SIZE)	// maximum 60 items allowed
			{
				this.addEvent(current_index + pageSize - 1);		// load a new item if available
			}
			for(var n = 1; n < current_index; n++)	// update the positions of previous invisible items
			{
				this.animate(n, -1 * space, 0, isNoScroll);
			}
			for(var n = current_index; n < current_index + pageSize; n++)	// update the positions of current visible items
			{
				this.animate(n, -1 * space, 1, isNoScroll);
			}
			for(var n = current_index + pageSize; n <= max_index; n++)
			{
				this.animate(n, -1 * space, 0, isNoScroll);
			}
		}
	}

	this.initEvent = function()
	{
		noUiSlider.create(slider_timeline, {
			start: 0,
			animate: false,
			behaviour: 'tap',
			// orientation: 'vertical',
			connect: [false, true],
			range: {
				'min':  0,
				'max':  100
			}
		});
		noUiSlider.create(slider_scrollbar, {
			start: 100,
			animate: false,
			behaviour: 'tap',
			orientation: 'vertical',
			connect: [false, true],
			range: {
				'min':  0,
				'max':  100
			}
		});
		var lastDate = new Date().getTime();
		$('#page').bind('mousewheel', function(event)
		{
			var sss = $(this).offset();
			if(event.clientY > sss.top && event.clientY < sss.top + $(this).height())
			{
			    var delayInMs = event.timeStamp - lastDate;
			    // console.log(delayInMs);
			    lastDate = event.timeStamp;
			    if(Math.abs(delayInMs) < 100)
			    {
					event.preventDefault();
			    	return;
			    }

				if(event.originalEvent.wheelDelta > 0)				// mouse wheel rolls forward
				{
					main.next();
					main.updateScrollTimeline();
					main.updateScrollVertical();
				}
				else if(event.originalEvent.wheelDelta < 0)
				{
					main.prev();								// mouse wheel rolls backward
					main.updateScrollTimeline();
					main.updateScrollVertical();
				}
			}
			event.preventDefault();
		});

		function shortCutFF(event)				// only for Firefox, because it doesn't support onmousewheel event
		{
			if(event.detail < 0)
			{					// mouse wheel rolls forward
				main.next();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
			else if(event.detail > 0)
			{
				main.prev();
				main.updateScrollTimeline();
				main.updateScrollVertical();							// mouse wheel rolls backward
			}
			event.preventDefault();
		}

		document.onkeydown = function(event)
		{
			if(event.keyCode == '37' || event.keyCode == '40')   //left or down  --> previous
			{
				main.prev();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
			else if(event.keyCode == '39' || event.keyCode == '38')
			{    //right or up --> next
				main.next();
				main.updateScrollTimeline();
				main.updateScrollVertical();
			}
		};

		$('#btn_addtimeline').click(function(e)
		{
			$('#dlg_register').fadeIn();
		})

		$('.btn_close').click(function(e)
		{
			$('#dlg_register').fadeOut();
		})

		slider_timeline.noUiSlider.on('update', function(value, handle)
		{
			var scroll_val = parseFloat(value) / 100;
			var limit_min = 0xffff;
			for(var nIndex = 0; nIndex < MAX_SIZE; nIndex++)
			{
				if(dataTimelinePos[nIndex] > scroll_val)
					break;
			}
			main.jumpTo(nIndex);
			main.updateScrollVertical(nIndex);
		});

		slider_scrollbar.noUiSlider.on('update', function(value, handle)
		{
			var scroll_val = 1 - parseFloat(value) / 100;
			var nIndex = MAX_SIZE * scroll_val;
			main.jumpTo(nIndex);
			main.updateScrollTimeline(nIndex);
		});
	}

	this.getTimelinePos = function(date)
	{
		var xPos = 0;
		if(date < 2015) //1037 : (1950 - 2015)
			xPos = ((date - 1950) / (2015 - 1950) * 1037);
		else //39: 2015-2016
			xPos = (1037 + (date - 2015) / (2016-2015) * 39);

		return xPos / 1076;
		return xPos;
	}


	this.getTimelineDate = function(pos)
	{

	}

	this.init();
}
