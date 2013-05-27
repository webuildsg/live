(function () {
  // countdown
  countdown();
  setInterval(countdown, 1000);
  function countdown () {

    var now = moment(),
    livedate = moment("2013-6-8 11:00 +0800", "YYYY-MM-DD HH:mm Z"),
    then = moment("2013-6-8 11:00 +0800", "YYYY-MM-DD HH:mm Z");

    ms = then.diff(now, 'milliseconds', true);
    days = Math.floor(moment.duration(ms).asDays());

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
    $('#livetime').html( livedate.format('D MMM YYYY, ddd @h:mm a Z' ) + ' GMT' );
  }
})();
