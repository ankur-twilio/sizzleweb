const loginElm = $('#login');
const videoContainerElm = $('#video-container');
const launchButtonElm = $('#launch_button');
const upvoteElm = $('#up');
const downvoteElm = $('#down');

const { Player } = Twilio.Live;
const urlParams = new URLSearchParams(window.location.search);
const {
  host,
  protocol,
} = window.location;

!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="vHg3IX68uF3Ftnh1evMzEuj5I7zufV24";;analytics.SNIPPET_VERSION="4.15.3";

    analytics.load("vHg3IX68uF3Ftnh1evMzEuj5I7zufV24");
    analytics.page();
   
}}();

let identifyingPhoneNumber = urlParams.get('phone');
analytics.identify(identifyingPhoneNumber);

loginElm.show();
videoContainerElm.hide();

launchButtonElm.attr('disabled', true);
launchButtonElm.text('Preparing sizzle...');

createPlayer().then(function () {
	launchButtonElm.attr('disabled', false);
	launchButtonElm.text('Launch');
	launchButtonElm.on('click', function() {
		window.player.isMuted = false;
		launchVideo();
	});
});

getASyncToken().then(function(token) {
	startListeningForItemChanges(token);
});

async function getASyncToken() {
	const data = await $.getJSON('https://segment-test-3208.twil.io/synctokener');
	let token = data.token;
	return token;
}

function startListeningForItemChanges(token) {
    let syncClient = new Twilio.Sync.Client(token);

    syncClient.on('tokenAboutToExpire', function() {
      var token = getSyncToken(function(token) {
        syncClient.updateToken(token);
      });
    });

    syncClient.document('current_item').then(function(document) {
      document.on('updated', function(event) {
      	console.log(event.data.item);
        let newitem = event.data.item;
        updateButtons(newitem);
      });
    });
}

function updateButtons(item) {

	upvoteElm.attr('data-item', item);
	downvoteElm.attr('data-item', item);
}


async function launchVideo() {
	launchButtonElm.attr('disabled', true);
	launchButtonElm.text('Launching sizzle...');

	console.log(window.player);
	
	window.player.on(Player.Event.TimedMetadataReceived, () => {
	  console.log(player.TimedMetadata)
	  console.log('time');
	});

	window.player.on(Player.Event.VolumeChanged, () => {
	  if (player.isMuted) {
	    console.log('is_muted');
	  } else {
	    console.log('is_not_muted');
	  }
	});

	loginElm.hide();
	videoContainerElm.show();
}

async function createPlayer() {
	const data = await $.getJSON('https://twilio-live-interactive-video-0584-1789-dev.twil.io/join-stream-as-viewer?user_identity=ankur&stream_name=' + urlParams.get('stream'));
	const token = data.token;
	const videoElement = document.querySelector('#remote');
	videoElement.playsInline = true;

	const player = await Player.connect(token, {
	  playerWasmAssetsPath: `${protocol}//${host}/video_stuff`,
	});


	return new Promise((resolve, reject) => {
		player.on(Player.Event.StateChanged, () => {
		  	if (player.state == 'ready') {
		  		console.log('player_ready');
		  		player.play();
		  		player.attach(videoElement);
		  		window.player = player;
		  		resolve(player);
		  	}
		  });
	});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

feather.replace({'stroke-width': 1.5 });


//Clicks
document.getElementById("up").addEventListener("click", upClicked);
document.getElementById("down").addEventListener("click", downClicked);


//Functions
function upClicked(e){
  let itemStatus = upvoteElm.attr('data-item');
	let segmentEvent = 'up-' + itemStatus;
	var upicon = document.createElement("i");
	upicon.setAttribute("data-feather", "thumbs-up");
	upicon.setAttribute("class", "reaction up");
	document.getElementById("reactions").appendChild(upicon);
	feather.replace();
	animateThatShit();
  analytics.track(segmentEvent, {
    segmentEvent: 1,
    eventName: segmentEvent
  });
}


function downClicked(e){
  let itemStatus = downvoteElm.attr('data-item');
  let segmentEvent = 'down-' + itemStatus;
	var upicon = document.createElement("i");
	upicon.setAttribute("data-feather", "thumbs-down");
	upicon.setAttribute("class", "reaction down");
	document.getElementById("reactions").appendChild(upicon);
	feather.replace();
	animateThatShit();
  analytics.track(segmentEvent, {
    segmentEvent: 1,
    eventName: segmentEvent
  });
}


function animateThatShit(shit){
  var liveReactions = document.getElementById("reactions").childNodes;
  
  var lastReaction = liveReactions[liveReactions.length - 1];
  anime({
    targets: lastReaction,
    translateY: -400,
      translateX: {
        value:function() {return anime.random(-50,50);},
        direction: 'alternate',
        loop: true
      },
    opacity: {
      value: -0.3,
      duration: function() { return anime.random(3000,5500); }
    },
    duration: function() { return anime.random(3000,7000); },
    easing: 'easeOutCubic'
  });
}