const hoverVideoEvent = document.querySelectorAll(".video");
const notification = document.querySelector("footer .toast-message");
const notiSpan = document.getElementById("name-song");
function animateMessage(target, wrap, title) {
  target.style.animation = "message-show 5s ease-in-out";
  wrap.innerText = title;
}
function removeAnimatedMessage(target) {
  target.style.animation = "none";
}
hoverVideoEvent.forEach((element) => {
  element.addEventListener("click", function (event) {
    const video = element.firstElementChild;
    const name = video.getAttribute("title");
    video.onended = () => {
      element.classList.remove("play");
      video.currentTime = 0;
    };
    if (video.paused) {
      hoverVideoEvent.forEach((other) => {
        const otherVid = other.firstElementChild;
        otherVid.pause();
        removeAnimatedMessage(notification);
        if (other.classList.contains("play")) {
          other.classList.remove("play");
        }
      });
      video.play();
      animateMessage(notification, notiSpan, name);
    } else {
      video.pause();
      removeAnimatedMessage(notification);
    }
    element.classList.toggle("play");
  });
});

// for animation

const animatedElements = document.querySelectorAll(".float");

const observer = new IntersectionObserver(
  (entries) => {
    for (let entry of entries) {
      if (!entry.isIntersecting) {
        entry.target.style.transform = "translateY(30px)";
        entry.target.style.opacity = "0";
        if (screen.width <= 550) {
          return;
        }
        if (entry.target.classList.contains("float-left")) {
          entry.target.style.transform = "translateX(-30px)";
        }
        if (entry.target.classList.contains("float-right")) {
          entry.target.style.transform = "translateX(30px)";
        }
      } else {
        entry.target.style.transform = "translate(0, 0)";
        entry.target.style.opacity = "1";
      }
    }
  },
  {
    threshold: 0,
  }
);

animatedElements.forEach((element) => {
  element.style.transition = "all 0.5s ease-in-out";
  observer.observe(element);
});

// special thanks audio
const btn = document.querySelector("button[title='play']");
const specialthanksAudio = new Audio(
  "\\videos\\SƠN TÙNG M-TP - SKY DECADE - Lời Tri Ân.mp3"
);
function playIcon() {
  return `<i class="fa-solid fa-play"></i>`;
}
function pauseIcon() {
  return `<i class="fa-duotone fa-pause"></i>`;
}
specialthanksAudio.onended = () => {
  specialthanksAudio.currentTime = 0;
  btn.innerHTML = playIcon();
};
btn.onclick = () => {
  if (specialthanksAudio.paused) {
    specialthanksAudio.play();
    btn.innerHTML = pauseIcon();
    animateMessage(notification, notiSpan, "Lời tri ân");
  } else {
    specialthanksAudio.pause();
    btn.innerHTML = playIcon();
    removeAnimatedMessage(notification);
  }
};

// showing up nav bar when click:
const controlBtn = document.querySelector(".control");
const nav = document.querySelector(".main-nav");
function menuIcon() {
  return `<i class="fa-solid fa-bars"></i>`;
}
function cancelIcon() {
  return `<i class="fa-solid fa-x"></i>`;
}
controlBtn.onclick = () => {
  if (nav.classList.contains("hide")) {
    controlBtn.innerHTML = cancelIcon();
    nav.classList.remove("hide");
  } else {
    controlBtn.innerHTML = menuIcon();
    nav.classList.add("hide");
  }
};

// audio element:

const audio = document.getElementById("play-audio");
const playBtn = document.getElementById("play-btn");
const timer = document.getElementById("timer");
playBtn.onclick = function () {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = pauseIcon();
    animateMessage(notification, notiSpan, "Chúng ta của hiện tại");
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon();
    removeAnimatedMessage(notification);
  }
};
audio.ontimeupdate = function () {
  timer.value = (audio.currentTime / audio.duration) * 100;
};
