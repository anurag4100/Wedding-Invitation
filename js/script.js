/**
 * @author Anurag <vinitshahdeo@gmail.com>
 */
(function ($) {
    "use strict";
      $('.sakura-falling').sakura();
})(jQuery);

/**
 *
 * Despite so many new Bollywood and English song options, I prefered to use two-decade-old song, Din Shagna Da!
 *
 * Ever attended a North Indian Wedding? As soon as the DJ plays Din Shagna Da song, it means that the much-awaited moment is here
 * and the bride is all set to put her first foot forward to the wedding venue under a breathtaking phoolon ki chaadar.
 * Let's keep the sky-high status of this song untouched!
 *
 * When the website is backed up with a soul-stirring track, the feeling becomes absolutely surreal. 
 * Choose a heart-touching track! 🎵 ❤️
 *
 * Listen here: https://youtu.be/X0MDALpV29s
 *
 */
$(document).on('click', function(){
    document.getElementById("my_audio").play();
    console.log('Shaadi me zaroor aana');
});

// Set the date we're counting down to
var countDownDate = new Date("May 02, 2023 00:00:00").getTime();


// being a bit cool :p  
var styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 4px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 2px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles1 = [
    'color: #FF6C37'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

var styles2 = [
    'color: teal'
    , 'display: block'
    , 'text-shadow: 0 2px 0 rgba(0, 0, 0, 1)'
    , 'line-height: 40px'
    , 'font-weight: bold'
    , 'font-size: 32px'
].join(';');

console.log('\n\n%c SAVE THE DATE: 02nd May, 2023!', styles);

console.log('%cYour presence is requested!%c\n\nRegards: Anurag', styles1, styles2);

console.log(
    `%cShaadi me zaroor aana!\n\n`,
    'color: yellow; background:tomato; font-size: 24pt; font-weight: bold',
)

var labels = ['weeks', 'days', 'hours', 'minutes', 'seconds'],
	TimerCount = (new Date().getFullYear() + 1) + '/01/01',
	template = _.template( jQuery('#main-example-template').html()),
	currDate = '00:00:00:00:00',
	nextDate = '00:00:00:00:00',
	parser = /([0-9]{2})/gi,
	$example = jQuery('#main-example');

	if( $example.data("timer").length ){
		TimerCount = $example.data("timer");	
	}

// Parse countdown string to an object
function strfobj(str) {
	var parsed = str.match(parser),
		obj = {};
	labels.forEach(function(label, i) {
		obj[label] = parsed[i]
	});
	return obj;
}
// Return the time components that diffs
function diff(obj1, obj2) {
	var diff = [];
	labels.forEach(function(key) {
		if (obj1[key] !== obj2[key]) {
			diff.push(key);
		}
	});
	return diff;
}
// Build the layout
var initData = strfobj(currDate);
labels.forEach(function(label, i) {
	$example.append(template({
		curr: initData[label],
		next: initData[label],
		label: label
	}));
});
// Starts the countdown
$example.countdown(TimerCount, function(event) {
	var newDate = event.strftime('%w:%d:%H:%M:%S'),
		data;

	if (newDate !== nextDate) {
		currDate = nextDate;
		nextDate = newDate;
		// Setup the data
		data = {
			'curr': strfobj(currDate),
			'next': strfobj(nextDate)
		};
		// Apply the new values to each node that changed
		diff(data.curr, data.next).forEach(function(label) {
			var selector = '.%s'.replace(/%s/, label),
				$node = $example.find(selector);
			// Update the node
			$node.removeClass('flip');
			$node.find('.curr').text(data.curr[label]);
			$node.find('.next').text(data.next[label]);
			// Wait for a repaint to then flip
			_.delay(function($node) {
				$node.addClass('flip');
			}, 50, $node);
		});
	}
});