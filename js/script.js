(function () {
  // countdown
  countdown();
  setInterval(countdown, 1000);
  function countdown () {

    var now = moment(),
    podcastDate = "2013-6-8 11:00 +0800",
    dateFormat = "YYYY-MM-DD HH:mm Z",
    livedate = moment(podcastDate, dateFormat),
    then = moment(podcastDate, dateFormat);

    ms = then.diff(now, 'milliseconds', true);
    days = Math.floor(moment.duration(ms).asDays());

    if (days >= 0) {
      then.subtract('days', days);
      ms = then.diff(now, 'milliseconds', true);
      hours = Math.floor(moment.duration(ms).asHours());

      then.subtract('hours', hours);
      ms = then.diff(now, 'milliseconds', true);
      minutes = Math.floor(moment.duration(ms).asMinutes());

      then.subtract('minutes', minutes);
      ms = then.diff(now, 'milliseconds', true);
      seconds = Math.floor(moment.duration(ms).asSeconds());

      diff = 'in <strong>' + days + '</strong> days <strong>' + hours + '</strong> hours <strong>' + minutes + '</strong> minutes <strong>' + seconds + '</strong> seconds';

      $('.countdown').html(diff);
    } else {
      $('.countdown').html('');
    }

    $('#livetime').html( livedate.format('D MMM YYYY, ddd @h:mm a Z' ) + ' GMT' );
  }
})();
