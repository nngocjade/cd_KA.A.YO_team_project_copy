const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".cbtn--right");
const preBtn = document.querySelector(".cbtn--left");
const indicatorNav = document.querySelector(".carousel_nav");
const barNav = Array.from(indicatorNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
console.log(slideWidth);

// --Stack images next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

const updateBar = (currenBar, targetBar) => {
  // changing black color between bar
  currenBar.classList.remove("current-picture");
  targetBar.classList.add("current-picture");
};

slides.forEach(setSlidePosition);

const moveSlide = (track, currentPic, targetPic) => {
  // move from current pic to the target pic
  track.style.transform = "translateX(-" + targetPic.style.left + ")";
  currentPic.classList.remove("current-picture");
  targetPic.classList.add("current-picture");
};
const hideShowArrow = (targetIndex) => {
  if (targetIndex === 0) {
    preBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    preBtn.classList.remove("is-hidden");
    nextBtn.classList.add("is-hidden");
  } else {
    preBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");
  }
};
// click right, move right
nextBtn.addEventListener("click", (e) => {
  const currentPic = track.querySelector(".current-picture");
  const nextPic = currentPic.nextElementSibling;
  const currentBar = indicatorNav.querySelector(".current-picture");
  const nextBar = currentBar.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextPic);
  moveSlide(track, currentPic, nextPic);
  updateBar(currentBar, nextBar);
  hideShowArrow(nextIndex);
});

// click left, move left
preBtn.addEventListener("click", (e) => {
  const currentPic = track.querySelector(".current-picture");
  const prePic = currentPic.previousElementSibling;
  const currentBar = indicatorNav.querySelector(".current-picture");
  const preBar = currentBar.previousElementSibling;
  const preIndex = slides.findIndex((slide) => slide === prePic);
  moveSlide(track, currentPic, prePic);
  updateBar(currentBar, preBar);
  hideShowArrow(preIndex);
});

indicatorNav.addEventListener("click", (e) => {
  const targetBar = e.target.closest("button");
  if (!targetBar) return;
  const currentPic = track.querySelector(".current-picture");
  const currentBar = indicatorNav.querySelector(".current-picture");
  const targetIndex = barNav.findIndex((bar) => bar === targetBar);
  const nextPicture = slides[targetIndex];
  moveSlide(track, currentPic, nextPicture);
  updateBar(currentBar, targetBar);
  hideShowArrow(targetIndex);
});
