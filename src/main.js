const hover = document.querySelectorAll(".video");
const notification = document.querySelector("footer .toast-message");
const notiSpan = document.getElementById("name-song");
function animateMessage(target, wrap, title) {
  target.style.animation = "message-show 5s ease-in-out";
  wrap.innerText = title;
}
function removeAnimatedMessage(target) {
  target.style.animation = "none";
}
hover.forEach((element) => {
  element.addEventListener("click", function (event) {
    const video = element.firstElementChild;
    const name = video.getAttribute("title");
    video.onended = () => {
      element.classList.remove("play");
      video.currentTime = 0;
    };
    if (video.paused) {
      hover.forEach((other) => {
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
        entry.target.style.transform = "translateY(50px)";
        entry.target.style.opacity = "0";
        if (entry.target.classList.contains("float-left")) {
          entry.target.style.transform = "translateX(-50px)";
        }
        if (entry.target.classList.contains("float-right")) {
          entry.target.style.transform = "translateX(50px)";
        }
      } else {
        entry.target.style.transform = "translate(0, 0)";
        entry.target.style.opacity = "1";
      }
    }
  },
  {
    threshold: 0.2,
  }
);

animatedElements.forEach((element) => {
  element.style.transition = "all 0.5s ease-in-out";
  observer.observe(element);
});

function obseverVideoLactroi() {
  const list = [
    "<li>Lac troi</li>",
    "<li>Son tung</li>",
    "<li>1/1/17</li>",
    "<li>250M view</li>",
  ];
  const ul = document.querySelector(".content-body ul");
  const observerVideo = new IntersectionObserver((entries) => {
    var i = 0;
    for (let entry of entries) {
    }
  });
  observerVideo.observe(ul);
}

obseverVideoLactroi();
