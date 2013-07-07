(function () {

  var podcastTimeString = "2013-7-13 11:00 +0800";
  var timeFormatString = "YYYY-MM-DD HH:mm Z";

  // click red header to link back to the homepage
  document.getElementsByTagName('header')[0].addEventListener('click', function() {
    window.parent.location.href = '/';
  });

  // countdown
  countdown();
  setInterval(countdown, 1000);
  function countdown () {

    var now = moment();
    var podcastTime = moment(podcastTimeString, timeFormatString);
    var remainingTime = podcastTime.clone();

    ms = remainingTime.diff(now, 'milliseconds', true);
    days = Math.floor(moment.duration(ms).asDays());

    if (days >= 0) {
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

      $('.countdown').html(diff);
    } else {
      $('.countdown').html('');
    }

    $('#livetime').html( podcastTime.format('D MMM YYYY, ddd @h:mm a Z' ) + ' GMT' );
  }
})();
