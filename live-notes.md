---
title: live notes
layout: page
date:   2013-09-21 15:00:00
permalink: /live-notes/
---

### show format

On the actual day, at **11am** sharp our live audio stream goes silent and we start the show! It is a fast-paced lively conversation with our guest and audience.

<pre><code class="language-javascript">(function() {
  import 'episode';

  var topics = ['building', 'learning', 'sharing'];
  var guest = ['maker', 'engineer' , 'designer'];
  var audience = 'live audience in Gitter chat webuildsg/live';
  var hosts = ['time keeper', 'sound controller'];

  // first 5 minutes
  welcome(guest, topics);
  guestDeclaration('current projects', guest);
  malformedQuery('lame riddle', guest, hosts[1]);

  // next 30 minutes
  discussion(topics, guest);

  // next 10 minutes
  ioPolling('live questions', guest, audience);
  rapidFire('fast answers', guest, hosts[1]);

  // final 5 minutes
  picks([
    'books',
    'apps',
    'food',
    'meetups',
    'tools'
  ], hosts, guest);
  eventLoop('upcoming events', hosts[0]);
  electricPlug('personal project links', guest);

  return 0;
})();</code>
</pre>

___

### show script

We have a fun guideline script to follow for each episode too! And it goes something like this:

**[11:00 am] (5 min - START)**

import episode `numbber`

It's `date`, streaming directly from Singapore - It's We Build LIVE!

This episode we'll be talking about `topic 1` and `topic 2`!

Welcome to episode `number` of We Build LIVE, I'm your host Sayanee, and on the soundboard is Chinmay.

Our special guest is today is `full name of guest`.

Hi `firstname of guest`! Welcome!

`intro of guest by the host`

`Let guest intro himself / herself`

`Malformed queries - a fun riddle for the guest to solve`

**[11:05 am] (15 min)**

Announce how live audience can ask questions via twitter or irc

Topic 1 (technology): 3 questions

**[11:20 am] (10 min)**

Announce how live audience can ask questions via twitter or irc

Topic 2 (community): 2 questions


**[11:30 am] (10 min)**

`I/O Polling - live audience questions for the guest`

**[11:40 am]  (5 min)**

`Rapid fire - fast short answer questions`

**[11:45 am]  (2 min)**

`Doubly Linked-list - new software/hardware released`

`Eventloop - upcoming developer, designer, maker events`

**[11:47 am] (0 min - STOP)**

`Electric Plugs - guest contacts`


Thanks `firstname of guest`!

That's it for this episode [number] of We Build LIVE. We will get together again online on a Saturday morning again with another cool guest.

Until then,

`return 0;`
