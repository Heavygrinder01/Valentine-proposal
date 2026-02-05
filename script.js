var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

var player;
var isYouTubeReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    videoId: "09R8_2nJtjg",
    playerVars: {
      start: 40,
      autoplay: 1,
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

    noButton.addEventListener("touchstart", moveButton);
    noButton.addEventListener("mouseover", moveButton);

    function moveButton() {
      const cardRect = card.getBoundingClientRect();
      const btnRect = noButton.getBoundingClientRect();

      const maxX = cardRect.width - btnRect.width;
      const maxY = cardRect.height - btnRect.height;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      noButton.style.left = randomX + "px";
      noButton.style.top = randomY + "px";

      if (isYouTubeReady && player) {
        player.unMute();
        player.playVideo();
      }
    }
  }

  if (response === "Yes") {
    document.getElementById("name").remove();
    document.getElementById("no-button").remove();
    document.getElementById("yesButton").remove();

    document.getElementById("question").textContent =
      "See you on the 14th my princess";

    document.getElementsByClassName("image")[0].src = "images/dance.gif";

    document.getElementById("moreButton").style.display = "block";

    const audio = document.createElement("audio");
    audio.src = "./Minions Cheering.mp4";
    audio.play();

    const yt = document.getElementById("youtube-player-container");
    if (yt) yt.remove();

    if (player) {
      player.stopVideo();
      player.destroy();
    }
  }
}

function showLetter() {
  document.getElementById("moreButton").style.display = "none";
  document.getElementById("letter").style.display = "block";
}
