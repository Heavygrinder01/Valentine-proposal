var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

var player;
var isYouTubeReady = false;
var ytStarted = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    videoId: "09R8_2nJtjg",
    playerVars: {
      start: 40,
      autoplay: 0,
      mute: 1,
      controls: 0,
      rel: 0
    },
    events: {
      onReady: function () {
        isYouTubeReady = true;
      }
    }
  });
}

function showMessage(response) {

  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const card = document.querySelector(".card");

    document.getElementsByClassName("image")[0].src = "images/gun.gif";
    document.getElementById("question").textContent = "Choose wisely";
    document.getElementById("name").style.display = "none";

    noButton.style.position = "absolute";

    function moveButtonAndPlayMusic() {
      const cardRect = card.getBoundingClientRect();
      const btnRect = noButton.getBoundingClientRect();

      const maxX = cardRect.width - btnRect.width;
      const maxY = cardRect.height - btnRect.height;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      noButton.style.left = randomX + "px";
      noButton.style.top = randomY + "px";

      if (isYouTubeReady && player && !ytStarted) {
        player.unMute();
        player.playVideo();
        ytStarted = true;
      }
    }

    // Mobile + Desktop
    noButton.addEventListener("touchstart", moveButtonAndPlayMusic);
    noButton.addEventListener("mouseover", moveButtonAndPlayMusic);
  }

  if (response === "Yes") {
    // STOP YOUTUBE CLEANLY
    if (player) {
      player.stopVideo();
      player.destroy();
    }

    const yt = document.getElementById("youtube-player-container");
    if (yt) yt.remove();

    document.getElementById("name").remove();
    document.getElementById("no-button").remove();
    document.getElementById("yesButton").remove();

    document.getElementById("question").textContent =
      "See you on the 14th my princess";

    document.getElementsByClassName("image")[0].src = "images/dance.gif";

    // ✅ THIS AUDIO IS NOW 100% USER-TRIGGERED
    const cheerAudio = new Audio("./Minions Cheering.mp4");
    cheerAudio.play();

    document.getElementById("moreButton").style.display = "block";
  }
}

function showLetter() {
  document.getElementById("moreButton").style.display = "none";
  document.getElementById("letter").style.display = "block";
}
