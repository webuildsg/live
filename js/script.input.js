(function() {

    // responsive video
    fluidvids.init({
        selector: [ 'iframe' ], // runs querySelectorAll()
        players: [ 'www.youtube.com' ] // players to support
    });

    // search input box
    var searchInput = document.getElementById('search');

    if (searchInput !== null) {
        var searchStyle = document.createElement('style');
        searchStyle.setAttribute('id', 'search_style');
        document.head.appendChild(searchStyle);

        searchInput.addEventListener('input', function() {
        if (!this.value) {
            searchStyle.innerHTML = '';
            return;
        }
        searchStyle.innerHTML = '.searchable:not([data-index*=\"' + this.value.toLowerCase() + '\"]) { display: none; }';
        });
    }

    // live show countdown
    var config = {
        extraTime: {
            days: 0,
            hours: 0,
            minutes: 0
        },
        podcastTimeString: '',
        timeFormatString: 'YYYY-MM-DD HH:mm Z',
        preMoment: {
            unit: 'hours',
            amount: 15
        },
        startMoment: {
            unit: 'seconds',
            amount: 15
        },
        liveEndMoment: {
            unit: 'minutes',
            amount: 30
        },
        stopMoment: {
            unit: 'hours',
            amount: 2
        },
        streamingServerName: 'http://listen.webuild.sg:8000/',
        usingiFrameIRC: 0
    };

    var preMoment = null;
    var startMoment = null;
    var stopMoment = null;
    var liveEndMoment = null;

    var testStream;
    var testCount = 0;

    var podcastTime;
    var remainingTime;
    var live = document.getElementById('liveDiv');
    var request = new XMLHttpRequest();

    request.open('GET', '/api/v1/podcasts.json', true);
    request.responseType = 'json';
    request.onload = function() {
        var response =  request.response;
        if (typeof request.response === 'string') {
            // Safari doesn't honor the responseType of 'json'.
            response = JSON.parse(request.response);
        }
        config.podcastTimeString = response.meta.next_live_show.start_time;
        podcastTime = moment(config.podcastTimeString, config.timeFormatString);

        // -hours, -seconds, +hour around the podcast live time
        preMoment = podcastTime.clone().subtract(config.preMoment.unit, config.preMoment.amount);
        startMoment = podcastTime.clone().subtract(config.startMoment.unit, config.startMoment.amount);
        stopMoment = podcastTime.clone().add(config.stopMoment.unit, config.stopMoment.amount);
        liveEndMoment = podcastTime.clone().add(config.liveEndMoment.unit, config.liveEndMoment.amount);

        // countdown
        countdown();
        setInterval(countdown, 1000);
    };
    request.send();

    // click red header to link back to the homepage
    document.getElementsByTagName('header')[0].addEventListener('click', function() {
        window.parent.location.href = '/';
    });

    // Add support for hash timestamps
    window.addEventListener('hashchange', function() {
        var fHash = window.location.hash;
        var tStamp;
        var tSec;
        var aP;

        if (fHash.substring(0, 3) == '#t=') {
            tStamp = fHash.replace(/#t=/, '').split(':');
            tSec = parseInt (tStamp[tStamp.length - 1]);

            if (tStamp[tStamp.length - 2]) {
                tSec += (parseInt (tStamp[tStamp.length - 2]) * 60);
            }
            if (tStamp[tStamp.length - 3]) {
                tSec += (parseInt (tStamp[tStamp.length - 3]) * 60 * 60);
            }

            aP = document.getElementsByTagName('audio')[0];
            if (aP && tSec) {
                aP.currentTime = tSec;
                aP.play();
            }
        }
    });

    function countdown () {

        var now = moment().add(config.extraTime);
        //console.log(now);

        if (now.clone().diff(preMoment) < 0) {
            // before -15 hours
            addBeforeMomentToDOM();
        } else if (now.clone().diff(startMoment) < 0) {
            // from -15 hours to -15 seconds
            addPreMomentToDOM();
        } else if (now.clone().diff(podcastTime) < 0) {
            // from -15 seconds to 0
            addCountdownMomentToDOM();
        } else if (now.clone().diff(liveEndMoment) < 0) {
            // from 0 seconds to +30mins
            addInitDuringMomentToDOM();
        } else if (now.clone().diff(stopMoment) < 0) {
            // from +30min  to +2 hour
            addDuringMomentToDOM();
        } else {
            // after 2 hours
            addAfterMomentToDOM();
        }

    }

    // before -15 hours
    function addBeforeMomentToDOM() {
        if (needsToBeUpdated('before')) {
            removeAudioAndIRC();

            addHeadingLive('Catch We Build LIVE');
            addCountdown();
            removeLiveTime();
            addLivetime();

            live.setAttribute('data-state', 'before');
        }
        updateCountdown('full');
    }

    // from -15 hours to -15 seconds
    function addPreMomentToDOM() {
        if (needsToBeUpdated('pre')) {
            removeLiveTime();

            addHeadingLive('Catch We Build LIVE');
            addCountdown();
            addAudioAndIRC('radio', true);

            live.setAttribute('data-state', 'pre');
        }
        updateCountdown('full');
    }

    // from -15 seconds to 0
    function addCountdownMomentToDOM() {
        if (needsToBeUpdated('countdown')) {
            removeLiveTime();

            addHeadingLive('Starting');
            addCountdown();
            addAudioAndIRC('live', true);

            live.setAttribute('data-state', 'countdown');
        }

        updateCountdown('short');
    }

    // from 0 seconds to +30mins
    function addInitDuringMomentToDOM() {
        if (needsToBeUpdated('during-live')) {
            removeLiveTime();
            addHeadingLive('We are LIVE now!');
            addSubtitle('join us in the chat');
            addAudioAndIRC('live', true);
            live.setAttribute('data-state', 'during-live');
        }
    }

    // from +30min  to +2 hour
    function addDuringMomentToDOM() {

        isStreamAvailable(
            'live',
            function() {
                if (needsToBeUpdated('during-live')) {
                    removeLiveTime();
                    addHeadingLive('We are LIVE now!');
                    addSubtitle('join us in the chat');
                    addAudioAndIRC('live', true);
                    //console.log("Switching to Live");
                    live.setAttribute('data-state', 'during-live');
                }
            },
            function() {
                if (needsToBeUpdated('during-radio')) {
                    addHeadingLive('We just ended!');
                    addSubtitle('continue to join us in the chat');
                    addAudioAndIRC('radio', true);
                    //console.log("Switching to Radio");
                    live.setAttribute('data-state', 'during-radio');
                }
            }
        );
    }

    // after 2 hours
    function addAfterMomentToDOM() {
        if (needsToBeUpdated('after')) {
            removeLiveTime();
            removeAudioAndIRC();
            removeSubtitle();

            addHeadingLive('We Build LIVE ended!');
            addSubtitle('next episode coming soon');

            live.setAttribute('data-state', 'after');
        }
    }

    function needsToBeUpdated(state) {
        return (live.getAttribute('data-state') != state);
    }

    function addHeadingLive(content) {
        var heading = document.getElementById('liveHeading');
        if (heading === null){
            heading = document.createElement('h3');
            heading.setAttribute('id', 'liveHeading');
            heading.setAttribute('class', 'important');
            live.appendChild(heading);
        }
        heading.innerHTML = content;
    }

    function addAudioAndIRC(station, autoPlay) {
        var audioElement = document.getElementById('liveAudio');
        if (audioElement === null){
            audioElement = document.createElement('audio');
            audioElement.setAttribute('class', 'liveaudio');
            audioElement.setAttribute('id', 'liveAudio');
            audioElement.setAttribute('controls', 'controls');
            live.appendChild(audioElement);
        }

        if (!Modernizr.audio.mp3) {
            station += '-ogg';
            console.log('Because FF is *&!%@%!$@ we\'re using ogg now.. Happy?? ');
        }

        if (audioElement.src !==  config.streamingServerName + station){
            audioElement.setAttribute('src', config.streamingServerName + station);
        }

        if (autoPlay) {
            audioElement.play();
        }

        if (config.usingiFrameIRC) {
            var chatElement = document.getElementById('liveChat');

            if (chatElement === null) {
                chatElement = document.createElement('iframe');
                chatElement.setAttribute('id', 'liveChat');
                chatElement.setAttribute('class', 'livechat');
                chatElement.setAttribute('src', 'http://webchat.freenode.net?channels=webuildsg&uio=MT1mYWxzZSY5PXRydWUmMTE9NTEfe');
                live.appendChild(chatElement);
            }
        }
    }

    function removeAudioAndIRC(){
        var audioElement = document.getElementById('liveAudio');
        if (audioElement !== null) {
            live.removeChild(audioElement);
        }

        var chatElement = document.getElementById('liveChat');
        if (chatElement !== null) {
            live.removeChild(chatElement);
        }
    }

    function addLivetime() {
        var liveTime = document.createElement('p');
        liveTime.setAttribute('id', 'liveTime');
        liveTime.setAttribute('class', 'podcastTime');
        liveTime.innerHTML = podcastTime.format('D MMM YYYY, ddd @h:mm a Z' ) + ' GMT';
        live.appendChild(liveTime);
    }

    function removeLiveTime(){
        var liveElement = document.getElementById('liveTime');
        if (liveElement !== null) {
            live.removeChild(liveElement);
        }
    }

    function addCountdown() {
        var element = document.getElementById('liveCountdown');
        if (element === null) {
            var countdownElement = document.createElement('p');
            countdownElement.setAttribute('class', 'countdown');
            countdownElement.setAttribute('id', 'liveCountdown');
            live.appendChild(countdownElement);
        }
    }

    function addSubtitle(content) {
        addCountdown();
        var countdownElement = document.getElementById('liveCountdown');
        countdownElement.innerHTML = content;
    }

    function removeSubtitle() {
        var countdownElement = document.getElementById('liveCountdown');
        if (countdownElement !== null) {
            live.removeChild(countdownElement);
        }
    }

    function updateCountdown(length) {
        var now = moment().add(config.extraTime);
        var countdownElement;

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

        if (length == 'short') {
            diff = 'in <strong> ' + seconds + '</strong>...';
        } else {
            diff = 'in <strong>' + days + '</strong> days <strong>' + hours + '</strong> hr <strong>' + minutes + '</strong> min <strong>' + seconds + '</strong> s';
        }

        countdownElement = document.getElementById('liveCountdown');
        countdownElement.innerHTML = diff;

    }

    function isStreamAvailable(streamName, ifAvailable, ifNotAvailable){

        if (!Modernizr.audio.mp3) {
            station += '-ogg';
        }

        if (!testStream) {
           testStream = new Audio(config.streamingServerName + streamName);
           testStream.preLoad = 'none';
           testStream.pause();
           testCount = 0;
       } else if (testStream.src != config.streamingServerName + streamName) {
           testStream.src = config.streamingServerName + streamName;
           testStream.preLoad = 'none';
           testStream.pause();
           testCount = 0;
       } else {

            testCount++;

            // Ignore the first 3 seconds of checks (network lag)
            if (testCount < 3) {
               return;
            } else if (testCount > 10) {
                // Re check after 10 seconds
                testStream.src = '';
                return;
            }

            if (testStream.error !== null ||
            testStream.networkState == HTMLMediaElement.NETWORK_NO_SOURCE ||
            testStream.networkState == HTMLMediaElement.NETWORK_EMPTY){
                ifNotAvailable();
            } else {
                ifAvailable();
            }
        }
    }

})();
