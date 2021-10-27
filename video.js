// const Video = Twilio.Video;
// const toggleableVideo = false;
// const videoDevices = [];
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const roomName = urlParams.get('room') ?? 'default-room';
// let room;

// const registerMuteButton = function(room) {
// 	$('.mic-holder').show();
// 	console.log('resgitering mute button');
// 	$('.mic-holder').on('click', function() {
// 		room.localParticipant.audioTracks.forEach(publication => {
// 			if(publication.track.isEnabled) {
// 				publication.track.disable();
// 				$('.unmuted').hide();
// 				$('.muted').show();
// 			}
// 			else {
// 				publication.track.enable();
// 				$('.unmuted').show();
// 				$('.muted').hide();
// 			}
// 		});
// 	});
// }

// const registerRemoteTracks = function(participant) {
// 	console.log('registering remote tracks');
// 	participant.tracks.forEach(publication => {
// 		if (publication.isSubscribed) {
// 			const track = publication.track;
// 			track.attach('#remote');
// 		}
// 	});

// 	participant.on('trackSubscribed', track => {
// 		track.attach('#remote');
// 	});
// }

// const deregisterRemoteTracks = function(participant) {
// 	participant.tracks.forEach(publication => {
// 		if (publication.isSubscribed) {
// 			const track = publication.track;
// 			track.detach();
// 		}
// 	});
// }

// const registerRemoteEvents = function(room) {
// 	// Log any Participants already connected to the Room
// 	room.participants.forEach(participant => {
// 	  console.log(`Participant "${participant.identity}" is connected to the Room`);
// 	  registerRemoteTracks(participant);
// 	});

// 	room.on('participantConnected', participant => {
// 	  console.log(`Participant connected: ${participant.identity}`);
// 	  registerRemoteTracks(participant);
// 	});

// 	room.on('participantDisconnected', participant => {
// 	  console.log(`Participant disconnected: ${participant.identity}`);
// 	  deregisterRemoteTracks(participant);
// 	});
// }

// const switchCameras = function(track) {
// 	console.log('resgitering switcher');
// 	$('.switch-camera').on('click', function() {
// 		let current = track.mediaStreamTrack.getSettings().facingMode;
// 		if (current === 'user') {
// 			track.restart({ facingMode: 'environment' });
// 			console.log(track);
// 		}
// 		else {
// 			track.restart({ facingMode: 'user' });
// 			console.log(track);
// 		}
// 	});
// }

// const getToken = function(callback) {
// 	return $.getJSON('https://proxy-demo-7914.twil.io/video_token')
// 	.then((data) => callback(data));
// }

// const connect = function(tracks) {
// 	return getToken(function(token) {
// 		return Video.connect(token, {
// 			name: roomName,
// 			tracks: tracks
// 		});
// 	});
// }


// Video.createLocalTracks({ 
// 		name: 'testing',
// 		audio: true,
// 		video: {
// 			height: 480, 
// 			frameRate: 24, 
// 			width: 640,
// 			facingMode: 'user'
// 		}
// 	}).then(localTracks => {
// 	 	localTracks.forEach(function(track) {
// 	 		if (track.kind === 'video') {

// 	 			console.log(track);
	 			
// 	 			track.attach('#local');
// 	 			track.restart({ facingMode: 'user' });

// 	 			console.log(track);

//             	$( ".preview-container" ).draggable({
//             		containment : ".videos-container"
//             	});

//             	let switchable = track.mediaStreamTrack.getSettings().facingMode;
//             	if (switchable) {
//             		$('.switch-camera').show(0, switchCameras(track));
//             	}
// 	 		}
// 	 	})
// 	 	return connect(localTracks);
// 	}).then(room => {
// 		console.log('Room connected!');
// 		registerMuteButton(room);
// 		registerRemoteEvents(room);
// 	});









const loginElm = $('#login');
const { Player } = Twilio.Live;
const {
  host,
  protocol,
} = window.location;

loginElm.hide();

console.log(Player.setLogLevel = 'debug');

function getPlayerGrant(callback) {
$.getJSON('https://twilio-live-interactive-video-0584-1789-dev.twil.io/join-stream-as-viewer?user_identity=ankur&stream_name=ankit')
  .then(function(data) {
  	console.log(data);
    callback(data.token);
  });
}

getPlayerGrant(async function(token) {    
	// Join a live stream.
	const player = await Player.connect(token, {
	  playerWasmAssetsPath: `${protocol}//${host}/video_stuff`,
	});

	// player.setLogLevel('debug');

	const videoElement = document.querySelector('#remote');
	// This is required for inline playback on iOS.
	videoElement.playsInline = true;

	player.on(Player.Event.StateChanged, () => {
	  	if (player.state == 'ready') {
	  		console.log('player_ready');
	  		player.play();
	  		player.isMuted = false;
	  		player.attach(videoElement);
	  	}
	  });

	player.on(Player.Event.TimedMetadataReceived, () => {
	  console.log(player.TimedMetadata)
	  console.log('time');
	});

});



feather.replace({'stroke-width': 1.5 });


//Clicks
document.getElementById("up").addEventListener("click", upClicked);
document.getElementById("down").addEventListener("click", downClicked);


//Functions
function upClicked(){
  var upicon = document.createElement("i");
  upicon.setAttribute("data-feather", "thumbs-up");
  upicon.setAttribute("class", "reaction up");
  document.getElementById("reactions").appendChild(upicon);
  feather.replace();
  animateThatShit();
}


function downClicked(){
  var upicon = document.createElement("i");
  upicon.setAttribute("data-feather", "thumbs-down");
  upicon.setAttribute("class", "reaction down");
  document.getElementById("reactions").appendChild(upicon);
  feather.replace();
  animateThatShit();
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
    easing: 'easeInQuad'
  });
}
