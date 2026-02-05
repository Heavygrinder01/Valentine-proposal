var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var isYouTubeReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    videoId: '09R8_2nJtjg',
    playerVars: {
      start: 40,
      controls: 0,
      autoplay: 1,
      mute: 1,
      rel: 0
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady() {
  isYouTubeReady = true;
}

function showMessage(response) {
  let videoPlayed = false;

  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    noButton.style.position = "absolute";
    document.getElementsByClassName("image")[0].src = "images/gun.gif";

    document.getElementById("question").textContent = "Choose wisely";
    document.getElementById("name").style.display = "none";

    noButton.addEventListener("mouseover", () => {
      if (!videoPlayed && isYouTubeReady && player) {
        player.unMute();
        player.playVideo();
        videoPlayed = true;
      }

      noButton.style.left = Math.floor(Math.random() * maxWidth) + "px";
      noButton.style.top = Math.floor(Math.random() * maxHeight) + "px";
    });
  }

  if (response === "Yes") {
    document.getElementById("name").remove();
    document.getElementById("no-button").remove();

    const playerContainer = document.getElementById("youtube-player-container");
    if (playerContainer) playerContainer.remove();

    if (player) {
      player.stopVideo();
      player.destroy();
    }

    const audioElement = document.createElement("audio");
    audioElement.src = "./Minions Cheering.mp4";
    audioElement.play();

    document.getElementById("question").textContent = "See you on the 14th my princess";
    document.getElementsByClassName("image")[0].src = "images/dance.gif";

    document.getElementById("yesButton").remove();
    document.getElementById("moreButton").style.display = "inline-block";
  }
}

function showLetter() {
  document.getElementById("moreButton").remove();
  document.getElementById("letter").style.display = "block";
}
