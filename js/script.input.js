(function () {

    var config = {
        extraTime: {
            days: 0,
            hours: 0,
            minutes: 0
        },
        podcastTimeString: '2013-12-7 11:00 +0800',
        timeFormatString: 'YYYY-MM-DD HH:mm Z',
        preMoment: {
            unit: "hours",
            amount: 15
        },
        startMoment: {
            unit: "seconds",
            amount: 15
        },
        liveEndMoment: {
            unit: "minutes",
            amount: 30
        },
        stopMoment: {
            unit: "hours",
            amount: 2
        },
        streamingServerName: 'http://listen.webuild.sg:8000/',
        usingiFrameIRC : 0
    }

    var podcastTime = moment(config.podcastTimeString, config.timeFormatString);
    var remainingTime;
    var live = document.getElementById('liveDiv');

    // -hours, -seconds, +hour around the podcast live time
    var preMoment = podcastTime.clone().subtract(config.preMoment.unit, config.preMoment.amount);
    var startMoment = podcastTime.clone().subtract(config.startMoment.unit, config.startMoment.amount);
    var stopMoment = podcastTime.clone().add(config.stopMoment.unit, config.stopMoment.amount);
    var liveEndMoment = podcastTime.clone().add(config.liveEndMoment.unit, config.liveEndMoment.amount);
    var testStream;
    var testCount = 0;

    // click red header to link back to the homepage
    document.getElementsByTagName('header')[0].addEventListener('click', function() {
        window.parent.location.href = '/';
    });

    // countdown
    countdown();
    setInterval(countdown, 1000);

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
        updateCountdown('full');
    }

     function addPreMomentToDOM() {
        if (needsToBeUpdated('pre')){
            removeLiveTime();

            addHeadingLive('Catch We Build SG LIVE');
            addCountdown();
            addAudioAndIRC('radio', false);

            live.setAttribute('data-state','pre');
        }
        updateCountdown('full');
    }

     function addCountdownMomentToDOM() {
        if (needsToBeUpdated('countdown')){
            removeLiveTime();

            addHeadingLive('We Build SG LIVE is airing soon');
            addCountdown();
            addAudioAndIRC('live', true);

            live.setAttribute('data-state','countdown');
        }

        updateCountdown('short');
    }

    function addInitDuringMomentToDOM() {
        if (needsToBeUpdated('during-live')){
            removeLiveTime();
            addHeadingLive('We Build SG LIVE is airing now!');
            addSubtitle("join us in the chat and conversation below");
            addAudioAndIRC('live', true);
            //console.log("Switching to Live");
             live.setAttribute('data-state','during-live');
          }
   }

    function addDuringMomentToDOM() {

        isStreamAvailable(
            'live',
            function (){
                if (needsToBeUpdated('during-live')){
                    removeLiveTime();
                    addHeadingLive('We Build SG LIVE is airing now!');
                    addSubtitle("join us in the chat and conversation below");
                    addAudioAndIRC('live', true);
                    //console.log("Switching to Live");
                    live.setAttribute('data-state','during-live');
             }
         },
         function (){
            if (needsToBeUpdated('during-radio')){
                addHeadingLive('We Build SG LIVE just finished airing');
                addSubtitle("continue to join us in the chat below");
                addAudioAndIRC('radio', true);
                //console.log("Switching to Radio");
                live.setAttribute('data-state','during-radio');
            }
        });
    }

    function addAfterMomentToDOM() {
        if (needsToBeUpdated('after')){
            removeLiveTime();
            removeAudioAndIRC();
            removeSubtitle();

            addHeadingLive('We Build SG LIVE just finished!');
            addSubtitle("we will publish info on the next live show shortly");

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
            heading.setAttribute('class', 'important');
            live.appendChild(heading);
        }
        heading.innerHTML = content;
    }

    function addAudioAndIRC(station, autoPlay) {
        var audioElement = document.getElementById('liveAudio');
        if (audioElement == null){
            audioElement = document.createElement('audio');
            audioElement.setAttribute('class', 'liveaudio');
            audioElement.setAttribute("id", "liveAudio");
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

        if (autoPlay)
            audioElement.play();

        if (usingiFrameIRC){
            var chatElement = document.getElementById('liveChat');

            if (chatElement == null){
                chatElement = document.createElement('iframe');
                chatElement.setAttribute("id", "liveChat");
                chatElement.setAttribute('class', 'livechat');
                chatElement.setAttribute('src', 'http://webchat.freenode.net?channels=webuildsg&uio=MT1mYWxzZSY5PXRydWUmMTE9NTEfe');
                live.appendChild(chatElement);
            }
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
        liveTime.setAttribute('class', 'podcastTime');
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

    function addSubtitle(content){
        addCountdown();
        var countdownElement = document.getElementById('liveCountdown');
        countdownElement.innerHTML = content;
    }

    function removeSubtitle(){
        var countdownElement = document.getElementById('liveCountdown');
        if (countdownElement != null)
            live.removeChild(countdownElement);
    }

    function updateCountdown(length) {
        var now = moment().add(config.extraTime);

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

        if (length == 'short'){
            diff = 'in <strong> ' + seconds + '</strong>...';
       }
       else{
            diff = 'in <strong>' + days + '</strong> days <strong>' + hours + '</strong> hours <strong>' + minutes + '</strong> minutes <strong>' + seconds + '</strong> seconds';
    }

        var countdownElement = document.getElementById('liveCountdown');
        countdownElement.innerHTML = diff;

    }


    function isStreamAvailable(streamName, ifAvailable, ifNotAvailable){

        if (!Modernizr.audio.mp3) station += '-ogg';

       if (testStream == null){
         //console.log("Making new test stream for " + config.streamingServerName + streamName);
         testStream = new Audio(config.streamingServerName + streamName);
         testStream.preLoad = 'none';
         testStream.pause();
         testCount = 0;
      }
      else if(testStream.src != config.streamingServerName + streamName) {
         testStream.src = config.streamingServerName + streamName;
         testStream.preLoad = 'none';
         testStream.pause();
         testCount = 0;
      }
      else{

        testCount++;

        /*Ignore the first 3 seconds of checks (network lag)*/
        if (testCount < 3)
         return;
        else if (testCount > 10){
            /*Re check after 10 seconds*/
            testStream.src = "";
            return;
        }

      //console.log("Test Stream error " + testStream.error + " networkState " + testStream.networkState);
      //console.log(testStream);

      if (testStream.error != null ||
        testStream.networkState == HTMLMediaElement.NETWORK_NO_SOURCE ||
        testStream.networkState == HTMLMediaElement.NETWORK_EMPTY){
               //console.log("Not Available");
                ifNotAvailable();
             }
             else{
                //console.log("Available");
                ifAvailable();
             }
      }
}

})();
