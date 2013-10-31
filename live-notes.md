---
title: live notes
layout: page
date:   2013-09-21 15:00:00
permalink: /live-notes/
---
On the actual day, at 11am sharp our live audio stream goes silent and we start the show! It is a fast-paced lively conversation with our guest and audience.

<pre><code class="language-javascript">(function() {

  import 'episode';

  var topics = ['building', 'learning', 'sharing'],
    guest = {'maker', 'developer' , 'designer'},
    audience = 'live audience in IRC #webuildsg',
    hosts = ['time keeper', 'sound controller'];

  // first 5 minutes
  welcome(guest, topics);
  guestDeclaration('current projects', guest);
  malformedQuery('lame riddle', guest, hosts[1]);

  // next 20 minutes
  discussion(topics, guest);

  // next 10 minutes
  ioPolling('live questions', guest, audience);
  rapidFire('fast answers', guest, hosts[1]);

  // final 5 minutes
  doublyLinkedList('recent tools released', hosts[0]);
  eventLoop('upcoming local events', hosts[0]);
  electricPlug('personal project links', guest);

  return 0;

})();</code>
</pre>
