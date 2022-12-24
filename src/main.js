const hoverVideoEvent = document.querySelectorAll(".video");
const notification = document.querySelector(".message-box .toast-message");
const notiSpan = document.getElementById("name-song");
/**
 *
 * @param {*} target  element thông báo
 * @param {*} span   thẻ chứa tên bài hát nằm trong `target`
 * @param {*} title tên bài hát
 * @summary hàm này dùng để hiện thông báo đang phát bài hát mà người dùng nhấn vào
 */
function animateMessage(target, span, title) {
  target.style.animation = "message-show 5s ease-in-out";
  span.innerText = title;
}
/**
 *
 * @param {*} target thẻ thông báo
 * @summary hàm này để xóa animation đã gắn cho thẻ `target` ở hàm `animateMessage`
 * @see {@link animateMessage}
 */
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

/**
 * @summary khởi tạo một đối tượng `IntersectionObserver`, có tác dụng tracking các element liệu nó có đang được hiển thị lên màn hình hay không
 * @see {@link IntersectionObserver}
 *
 */
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
/**
 * @summary khi nhạc hết thì đổi icon
 */
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

const songs = {
  ctcht: {
    logo: "/images/ctcht.png",
    audio: "/songs/Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Chúng ta của hiện tại",
  },
  atbe: {
    logo: "/images/amthambenem.jpg",
    audio: "/songs/AmThamBenEm-SonTungMTP-4066476.mp3",
    name: "Âm thầm bên em",
  },
  cngd: {
    logo: "/images/amthambenem.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Chạy ngay đi",
  },
  mrmsc: {
    logo: "/images/amthambenem.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Muộn rồi mà sao còn",
  },
  htca: {
    logo: "/images/haytraochoanh.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Hãy trao cho anh",
  },
  nnca: {
    logo: "/images/amthambenem.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Nơi này có anh",
  },
  lt: {
    logo: "/images/lactroilogo.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "Lạc trôi",
  },
  tnoaa: {
    logo: "/images/nooneatall.jpg",
    audio: "\\songs\\Chung Ta Cua Hien Tai - Son Tung M-TP.mp3",
    name: "There's no one at all",
  },
};

const liTags = document.querySelectorAll(".nav-selection li");
const logoTag = document.getElementById("logo-album");
const timer = document.getElementById("timer");
var audio = document.getElementById("song-play");
const playBtn = document.getElementById("play-btn");
liTags.forEach(function (li) {
  li.addEventListener("click", function () {
    const liValue = this.getAttribute("value");
    audio.src = songs[liValue]["audio"];
    audio.currentTime = 0;
    logoTag.src = songs[liValue]["logo"];
    document.querySelector(".playing").classList.remove("playing");
    this.classList.add("playing");
    playBtn.innerHTML = playIcon();
  });
});
playBtn.onclick = function () {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = pauseIcon();
    const liValue = document.querySelector(".playing").getAttribute("value");
    animateMessage(notification, notiSpan, songs[liValue]["name"]);
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon();
    removeAnimatedMessage(notification);
  }
};

audio.onended = function () {
  playBtn.innerHTML = playIcon();
};
audio.ontimeupdate = function () {
  timer.value = (audio.currentTime / audio.duration) * 100;
  // em cũng không hiểu tại sao khi chuyển bài hát thì cái sự kiện này lại xảy
  // ra và làm cho timer.value = 50, nên thêm if này để bắt nó buộc trở về 0.
  // cái này thì em nhận thấy có vẻ là do đổi src của thẻ audio nên thành ra như thế
  // em xin cách tối ưu cái này và nếu có cách chữa tốt hơn thì mong thầy góp ý
  if (audio.currentTime == 0) {
    timer.value = 0;
  }
};
timer.oninput = function () {
  audio.currentTime = (timer.value * audio.duration) / 100;
};
