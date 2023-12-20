---
title: Lesson learned from running a community tech conference
desc: A story behind TeknumConf 2023 from the organizer's perspective
author: Reinaldy Rafli
github: aldy505
twitter:
telegram: aldy505
date: 2023-12-01
cover: /image/lesson-learned-from-running-a-community-tech-conference/header.jpg
categories:
    - teknumconf
---

_Cross-posted from https://blog.reinaldyrafli.com/47922/lesson-learned-from-running-a-community-tech-conference_

Yes, I basically led a team of 5 people to run what came to be TeknumConf 2023. An independent, no-sponsor, paid, self-sufficient community-based meetup consisting of keynote talks, career advice talkshow, and bunch of networking sessions that allows people to talk to each other and gain new connection. And yes, we created our own website, our own ticketing system, in which I will talk about it later.

![Riza Ramadan's keynote on TeknumConf 2023](/image/lesson-learned-from-running-a-community-tech-conference/moment.jpg)

## Why did we go independent?

The way the community grows, whilst being a public tech-oriented community, we rarely have any commercial promotion to sustain anything. If someone wants to pay for token of gratitude or just helping paying the Virtual Machines to host the server, they would go to the GitHub sponsor page or to the Saweria page -- it's like Ko-fi but for Indonesian only. Being independent itself is both freeing and scary. It's freeing because you can practically do whatever you want, you can experiment things and focus on stuff you actually care about. It's also scary. because you won't have any guarantee of what to come, you don't have any guarantee whether you'd be able to sustain yourself in the future.

That duality always haunts me wherever I need to make a decision for the community. I personally wanted to make the community grow more, but that would mean it has to be paid by someone's pocket. More often than not, it's my pocket.

In the end, we decided to go independent, because we can't guarantee what the sponsors will get if they sponsored the event. It's not a win-win solution for both parties.

## Hardship on finding speakers

Being a community that covers wide range of tech topics is... not ideal for having a conference. Well, obviously, because you don't have any specific topic to talk to. This is not a career conference, this is not a Go conference, this is not a Rust conference, you'd have to end with mixing everything up.

Luckily, the community was consisted by some of high ranking person from the tech industry, and there are very small number of people that wanted to participate as speakers. That relaxed me a bit as I got 3 people that wanted to be a speaker. But to make everything as a full-day event, ideally I need more speakers. Me and Taufiq each reached out to some people in the Jakarta Greater Area that we assume want to give a talk at events like that. I reached out to the team at Algobash, as they have previously showed up on the community's Telegram group to promote their stuff, and they also got feedbacks from the community on what they're working on. It's safe to assume that by being on the community, they gain some benefits. I asked if they are interested to give a talk on TeknumConf, with assumption that most of the people that will attend the event already knew what Algobash is. Taufiq on the other hand, approached his friend that he met on Twitter, and we got Muhammad Gilang Januar.

This reminds me about one thing that [I've read a few years back](https://www.amazon.com/One-Plus-Equals-Three-Masterclass/dp/1447287053): You must gain a lot of connections. Don't ever think that you don't need to connect with them now because you currently don't need anything from them. Just connect, you'll need them in the future. Also, from [this unsolicited advice YouTube video](https://www.youtube.com/watch?v=Zz70rcguxwk), "99% of success is just showing up". Having previous connections surely helped a lot.

## Promotion and an afterthought on exclusivity

An event is not yet complete without any promotion.

But yeah, we really need promotion because we have a quota to fill. Otherwise, we'd have to cover all the costs by ourselves.

Being an independent event, we have nothing that backed us up. We'd need to rely from the ticket sales to cover venue and snack costs. The venue itself costs around 4 million rupiahs for 8 hours rent. That's not much compared to other venue that we think would be better for an event like this. Most venues asks for around 8 million rupiahs or more, because we're running the event on weekends. Even one venue asks us to run the venue on weekdays, in which we obviously can't. Like I said, we have a quota to fill to cover those costs. We can't be sure that people will come by solely relying on the people that already joined the community, and we can't rely on people that would go to the event by the last minute.

Taufiq has lots of followes on his Twitter, as well as two of the speakers. So, obviously the only good platform to market the event was Twitter.

We made a few routine promotions on Twitter, with some of them is done by hosting a Twitter Space about technology. I can tell that we hosted around 2 or 3 Twitter Space, I can't remember the exact amount. For every Twitter Space event, the registration would go up. We are being closer to our quota.

I can't say that I'm pleased with this event go big in a sudden. Where's the exclusivity of the community? Isn't this a community event? What about going independent, would some other company wants to take over the event and make it a commercial event, instead of a community event?

Time goes by, and I think that it's an ego I have with a community. I want things to be exclusive, yet I forgot the value of being in the community. It's a tech community that's strong with the open source world. With that in mind, why bother closing it for exclusivity? Open community should made and remain open, including for those who wants to join and participate to the event.

## You can hardly solve a venue problem

Venue is something that people might look away because it's just a small thing, and the bigger thing to take care about is content. No, you're wrong. Venue is the most complicated and hard thing to take care about for an event.

There are a few checklist that I had in mind for finding the (at least close to) perfect venue

-   Close to public transport as possible (it's even better if it's near MRT station [subway] rather than Transjakarta [bus] or Commuter Line [train])
-   People with wheelchair can easily enter the venue
-   Cheap, obviously, we had very small budget
-   Can fit a minimum of 30 people
-   Fit well to the community's value and culture
-   Good air conditioning, or at least good ventilation

There are a few venues that I really liked, that would perfectly fits the theme of TeknumConf that's covers a lot of ranges in the tech industry. But sadly, it obviously didn't tick the "cheap" requirement. So, we'd have to tone down everything and make sure we have booked the venue 1 month prior.

It turns out, during the day of the event, the air conditioning wasn't able to hold that many attendees (around 50 people) in one room. So, that's one thing that we would evaluate as the organizers.

## Our own ticketing platform

Ticketing platform are expensive, if you don't know about it. They're free if you're hosting the event for free with no ticket sales. But we aren't, we asks people to pay for ticket. Most ticketing platform's fees are high, some goes with a minimum fee that they would charge. We can't afford that.

What do we do then? We make our own ticketing platform. Every verification and confirmation is done manually by a human, because we don't have time to build a full scale and feature complete ticketing system. We just need a system that:

-   Let attendees be in the waitlist
-   Get an email for payment
-   Submit proof of payment via website
-   Get a confirmation email for their payment; and
-   Get a ticket via email that's just a simple QR image verified using Ed25519 signature.
-   The organizer team can scan the QR code to verifies the ticket

The code for the entire website is open sourced at [github.com/teknologi-umum/conf](https://github.com/teknologi-umum/conf).

Am I proud of making my own ticketing platform? Not at all. There are a lot of things that the platform must do better. One thing for sure is that we shouldn't use PostgreSQL sitting on the server, instead we should use a cloud database that can be read easily by human, that's as close as possible to something similar to Google Sheet or Microsoft Excel. One thing that pops in my mind about this is Airtable or NocoDB (they offer [a cloud version](https://www.nocodb.com/) now).

## Something you want to bring along

I don't think I'd be interested to become next year's organizer if there were one. But, I'd like to have others that would continue this journey of this community conference to know a few things and preferably bring along these things that have worked on previous event:

-   Don't be afraid of not going independent. Money is a hard problem to solve, even most people don't want to come unless it's free.
-   Don't host a strict event. Be organic, be as close as possible to the audience.
-   Demand honest answer and feedbacks from the attendees.
-   Be very clear on communicating, through website, social media, or even in-person. Put as much information as possible. There are no "too much information" for an event.
-   Know that being a part of the organizer doesn't mean you can enjoy the event. You are running the event, you should pay attention not just on the content, but to everywhere around you.
-   Food (mostly just snacks) and drink should always be free.

![Group photo of the speakers and attendeees of TeknumConf 2023](/image/lesson-learned-from-running-a-community-tech-conference/lastpic.jpg)
