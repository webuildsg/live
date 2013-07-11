(function () {

	var extraTime = {
		days: 0,
		hours: 0,
		minutes: 0
	};

	var podcastTimeString = "2013-7-13 11:00 +0800";
	var timeFormatString = "YYYY-MM-DD HH:mm Z";

	var podcastTime = moment(podcastTimeString, timeFormatString);
	var remainingTime;
	var live = document.getElementById('liveDiv');

	// -15 hours, -15 seconds, +1 hour around the podcast live time
	var preMoment = podcastTime.clone().subtract('hours', 15);
	var startMoment = podcastTime.clone().subtract('seconds', 15);
	var stopMoment = podcastTime.clone().add('hours', 1);

	// click red header to link back to the homepage
	document.getElementsByTagName('header')[0].addEventListener('click', function() {
		window.parent.location.href = '/';
	});

	// countdown
	countdown();
	setInterval(countdown, 1000);

	function countdown () {

		var now = moment().add(extraTime);

		if (now.clone().diff(preMoment) < 0) {
			// before -15 hours
			addBeforeMomentToDOM();
		} else if (now.clone().diff(startMoment) < 0) {
			// from -15 hours to -15 seconds
			addPreMomentToDOM();
		} else if (now.clone().diff(stopMoment) < 0) {
			// from -15 seconds to +1 hour
			addDuringMomentToDOM();
		} else {
			// after 1 hours
			addAfterMomentToDOM();
		}

	}

	function addBeforeMomentToDOM() {
		if (needsToBeUpdated('before')){
			removeAudioAndIRC();

			addHeadingLive('Catch We Build SG LIVE');
			addCountdown();
			addLivetime();

			live.setAttribute('data-state','before');
		}
		updateCountdown();
	}

	function addPreMomentToDOM() {
		if (needsToBeUpdated('pre')){
			removeLiveTime();

			addHeadingLive('Catch We Build SG LIVE');
			addCountdown();
			addAudioAndIRC('radio');

			live.setAttribute('data-state','pre');
		}
		updateCountdown();
	}

	function addDuringMomentToDOM() {
		if (needsToBeUpdated('during')){
			removeLiveTime();

			addHeadingLive('We Build SG LIVE is airing now!');
			addSubtitle();
			addAudioAndIRC('live');

			live.setAttribute('data-state','during');
		}
	}

	function addAfterMomentToDOM() {
		if (needsToBeUpdated('after')){
			removeLiveTime();
			removeAudioAndIRC();
			removeSubtitle();

			addHeadingLive('Catch We Build SG LIVE next month!');

			live.setAttribute('data-state','after');
		}
	}

	function needsToBeUpdated(state){
		return (live.getAttribute('data-state') != state)
	}

	function addHeadingLive(content) {
		var heading = document.getElementById('liveHeading')
		if (heading == null){
			heading = document.createElement('h3');
			heading.setAttribute("id", "liveHeading");
			live.appendChild(heading);
		}
		heading.innerHTML = content;
	}

	function addAudioAndIRC(station) {
		var audioElement = document.getElementById('liveAudio');
		if (audioElement == null){
			audioElement = document.createElement('audio');
			audioElement.setAttribute('class', 'liveaudio');
			audioElement.setAttribute("id", "liveAudio");
			audioElement.setAttribute('controls', '');
			live.appendChild(audioElement);
		}

		audioElement.setAttribute('src', 'http://listen.webuild.sg:8000/' + station);
		if (station == 'live')
			audioElement.play();

		var chatElement = document.getElementById('liveChat');

		if (chatElement == null){
			chatElement = document.createElement('iframe');
			chatElement.setAttribute("id", "liveChat");
			chatElement.setAttribute('class', 'livechat');
			chatElement.setAttribute('src', 'http://webchat.freenode.net?channels=webuildsg&uio=MT1mYWxzZSY5PXRydWUmMTE9NTEfe');
			live.appendChild(chatElement);
		}
	}

	function removeAudioAndIRC(){
		var audioElement = document.getElementById('liveAudio');
		if (audioElement != null)
			live.removeChild(audioElement);

		var chatElement= document.getElementById('liveChat');
		if (chatElement != null)
			live.removeChild(chatElement);
	}

	function addLivetime() {
		var liveTime = document.createElement('p');
		liveTime.setAttribute('id', 'liveTime');
		liveTime.innerHTML = podcastTime.format('D MMM YYYY, ddd @h:mm a Z' ) + ' GMT';
		live.appendChild(liveTime);
	}

	function removeLiveTime(){
		var liveElement = document.getElementById('liveTime');
		if (liveElement != null)
			live.removeChild(liveElement);
	}

	function addCountdown(){
		var element = document.getElementById('liveCountdown');
		if (element == null){
			var countdownElement = document.createElement('p');
			countdownElement.setAttribute("class", "countdown");
			countdownElement.setAttribute("id", "liveCountdown");
			live.appendChild(countdownElement);
		}
	}

	function addSubtitle(){
		addCountdown();
		var countdownElement = document.getElementById('liveCountdown');
		countdownElement.innerHTML = "join us in the chat and conversation below"
	}

	function removeSubtitle(){
		var countdownElement = document.getElementById('liveCountdown');
		if (countdownElement != null)
			live.removeChild(countdownElement);
	}

	function updateCountdown() {
		 var now = moment().add(extraTime);

		remainingTime = podcastTime.clone();

		ms = remainingTime.diff(now, 'milliseconds', true);
		days = Math.floor(moment.duration(ms).asDays());

		remainingTime.subtract('days', days);
		ms = remainingTime.diff(now, 'milliseconds', true);
		hours = Math.floor(moment.duration(ms).asHours());

		remainingTime.subtract('hours', hours);
		ms = remainingTime.diff(now, 'milliseconds', true);
		minutes = Math.floor(moment.duration(ms).asMinutes());

		remainingTime.subtract('minutes', minutes);
		ms = remainingTime.diff(now, 'milliseconds', true);
		seconds = Math.floor(moment.duration(ms).asSeconds());

		diff = 'in <strong>' + days + '</strong> days <strong>' + hours + '</strong> hours <strong>' + minutes + '</strong> minutes <strong>' + seconds + '</strong> seconds';

		var countdownElement = document.getElementById('liveCountdown');
		countdownElement.innerHTML = diff;

	}

})();
