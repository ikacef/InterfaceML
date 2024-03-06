let currentSession;
let currentMediaSession;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;
let lastVolumeLevel = 1;
const muteToggle = document.getElementById('muteToggle');
const currentTimeElement = document.getElementById('currentTime');
const totalTimeElement = document.getElementById('totalTime');
const defaultContentType = 'video/mp4';
const videoList = [
    'https://github.com/ikacef/InterfaceML/raw/develop/tournage-informatique-ogelvy.mov',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
];

document.getElementById('connectButton').addEventListener('click', () => {
    initializeApiOnly();
});

document.getElementById('startBtn').addEventListener('click', () => {
    if (currentSession) {
        if(localStorage.getItem('currentVideoIndexLS')) {
            loadMedia(videoList[localStorage.getItem('currentVideoIndexLS')]);
        } else {
            loadMedia(videoList[currentVideoIndex]);
        }
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        localStorage.setItem('currentVideoIndexLS', currentVideoIndex);
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('previousBtn').addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex - 1) % videoList.length;
        localStorage.setItem('currentVideoIndexLS', currentVideoIndex);
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    let playPauseIcon = document.getElementById("playBtn"); // Récupère l'icône du bouton
    if (currentMediaSession) {
        if (isPlaying) {
            currentMediaSession.pause(null, onMediaCommandSuccess, onError); // Met la vidéo en pause
            playPauseIcon.classList = ["fi", "fi-br-play"]; // Change l'icône en icône de lecture
        } else {
            currentMediaSession.play(null, onMediaCommandSuccess, onError); // Rejoue la vidéo
            playPauseIcon.classList = ["fi", "fi-br-pause"]; // Change l'icône en icône de pause
        }
        isPlaying = !isPlaying; // Inverse l'état de lecture
    }
});


function sessionListener(newSession) {
    currentSession = newSession;
}


function initializePauseButton(remotePlayerController, remotePlayer, mediaSession) {
    const pauseButton = document.getElementById('playBtn');

    pauseButton.addEventListener('click', () => {
        if (remotePlayer.isPaused) {
            remotePlayerController.playOrPause();
        } else {
            remotePlayerController.playOrPause();
        }
    });

    remotePlayerController.addEventListener(
        cast.framework.RemotePlayerEventType.IS_PAUSED_CHANGED,
        () => {
            pauseButton.textContent = remotePlayer.isPaused ? 'Play' : 'Pause';
        }
    );
}


function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectButton').style.display = '';
    } else {
        document.getElementById('connectButton').style.display = '';
    }
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const remotePlayer = new cast.framework.RemotePlayer();
    const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
        initializeSeekSlider(remotePlayerController, mediaSession);
        initializeMuted(remotePlayerController, remotePlayer, mediaSession);
      }, onError);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    
}

function increaseVolume() {
    if (!currentMediaSession) return;

    let newVolumeLevel = currentMediaSession.volume.level + 0.1;
    if (newVolumeLevel > 1) newVolumeLevel = 1; // S'assurer que le volume ne dépasse pas 1


    const volumeRequest = new chrome.cast.media.VolumeRequest(new chrome.cast.Volume(newVolumeLevel, false));
    currentMediaSession.setVolume(volumeRequest, onVolumeChangeSuccess, onError);
}

function decreaseVolume() {
    if (!currentMediaSession) return;

    let newVolumeLevel = currentMediaSession.volume.level - 0.1;
    if (newVolumeLevel < 0) newVolumeLevel = 0; 

    const volumeRequest = new chrome.cast.media.VolumeRequest(new chrome.cast.Volume(newVolumeLevel, false));
    currentMediaSession.setVolume(volumeRequest, onVolumeChangeSuccess, onError);
}

function onVolumeChangeSuccess() {
    console.log('Changement de volume réussi');
}

document.getElementById('plus').addEventListener('click', increaseVolume);
document.getElementById('minus').addEventListener('click', decreaseVolume);
