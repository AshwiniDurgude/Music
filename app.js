



const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const slidePrevSong = document.getElementById('slide-prev-song');
const slideNextSong = document.getElementById('slide-next-song');
const transitionSongSlider = document.getElementsByClassName('card-1');
const playSongBtn = document.getElementsByClassName('playSongImage');

let currentIndex = 0;
let currentSlide = 1;

prevButton.addEventListener('click', () => {
  if (currentSlide > 1) {
    showSlide(--currentSlide);
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
  else {
    currentIndex = slides.length - 3
    currentSlide = slides.length - 2;
    showSlide(currentSlide);
    updateSlider();
  }
});

nextButton.addEventListener('click', () => {
  if (currentSlide < slides.length - 2) {
    showSlide(++currentSlide);
    currentIndex = (currentIndex + 1 + slides.length) % slides.length;
    updateSlider();
  }
  else {
    currentIndex = 0;
    currentSlide = 1;
    showSlide(currentSlide);
    updateSlider();
  }
});

function updateSlider() {
  console.table({ currentIndex, currentSlide });
  const translateX = -currentIndex * 33.33;
  slider.style.transform = `translateX(${translateX}%)`;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('previous');
    slide.classList.remove('active');
    slide.classList.remove('next');

    if (i === index - 1) {
      slide.classList.add('previous');
    } else if (i === index) {
      slide.classList.add('active');
    } else if (i === index + 1) {
      slide.classList.add('next');
    }
    currentSlide = index;
  });
}
// Trending Song Slider function
let transitionSongSliderCurrentIndex = 0;
slideNextSong.addEventListener('click', () => {
  let sliderLength = document.getElementsByClassName('transition-sng')[0].offsetWidth;
  let scrollWidth = document.getElementsByClassName('transition-sng')[0].scrollWidth;
  if (transitionSongSliderCurrentIndex < (scrollWidth - sliderLength - 195)) {
    transitionSongSliderCurrentIndex += 195;
  } else {
    // transitionSongSliderCurrentIndex = 0;
    //disable next button
  }
  for (var i = 0; i < transitionSongSlider.length; i++ ) {
    transitionSongSlider[i].style.transform = `translateX(-${transitionSongSliderCurrentIndex}px)`;
  }
});

slidePrevSong.addEventListener('click', () => {
  if (transitionSongSliderCurrentIndex > 0) {
    transitionSongSliderCurrentIndex -= 195;
  } else {
    //disable prev button
    // transitionSongSliderCurrentIndex = 0;
  }
  for (var i = 0; i < transitionSongSlider.length; i++ ) {
    transitionSongSlider[i].style.transform = `translateX(${transitionSongSliderCurrentIndex}px)`;
  }
});

// showLyrics function
function showLyrics() {
  // showSongLyrics();
  let showLyricsDiv = document.getElementById('show-lyrics');
  document.getElementById('main-section').classList.toggle('disp-none')  
  showLyricsDiv.scrollIntoView();
  showLyricsDiv.classList.toggle('disp-none')

  if(document.getElementById('main-section').classList.contains('disp-none')) {
    document.getElementsByClassName('footer')[0].classList.add('footer-main')
    document.getElementsByClassName("show-lyrics-btn")[0].innerHTML = "Hide Lyrics"
  }
  else {
    document.getElementsByClassName('footer')[0].classList.remove('footer-main')
    document.getElementsByClassName(" show-lyrics-btn")[0].innerHTML = "Show Lyrics"
  }
  
}

// Song Play Pause function
const playSong = document.getElementById('playSong');
const pauseSong = document.getElementById('pauseSong');
const audioPlay = document.getElementById('audioPlay');
const audioProgressBar = document.getElementById('audioProgressBar');
playSong.style.display = "none";

function pauseSongFun() {
  audioPlay.play();
  pauseSong.style.display = "none";
  playSong.style.display = "inline";
}

pauseSong.addEventListener('click', () => {
  pauseSongFun()
  document.querySelector('.songPlayGif.disp-none').classList.toggle('disp-none')
  document.querySelector('.playSongImage:not(.disp-none)').classList.toggle('disp-none')
});

function playSongFun() {
  audioPlay.pause();
  playSong.style.display = "none";
  pauseSong.style.display = "inline";
}

function timeupdateFun() {
  const liveTime = audioPlay.currentTime;
  const songDuration = audioPlay.duration;
  const result = (liveTime / songDuration) * 100;
  audioProgressBar.value = result;
  // console.log("ff", result);
}

playSong.addEventListener('click', () => {
  playSongFun();
  document.querySelector('.songPlayGif:not(.disp-none)').classList.toggle('disp-none')
  document.querySelector('.playSongImage.disp-none').classList.toggle('disp-none')
});

audioPlay.addEventListener('timeupdate', timeupdateFun);

audioProgressBar.addEventListener('input', function () {
  const result = audioProgressBar.value;
  const songDuration = audioPlay.duration;
  const liveTime = (result / 100) * songDuration;
  audioPlay.currentTime = liveTime;

});

function openFooterDivToPlaySong(index) {
  document.getElementsByClassName('songPlayGif')[index].classList.toggle('disp-none')
  document.getElementsByClassName('playSongImage')[index].classList.toggle('disp-none')
  document.getElementsByTagName('footer')[0].scrollIntoView()
  document.getElementsByTagName('footer')[0].classList.toggle('disp-none')
  pauseSongFun()
}

function hideFooterDivToPlaySong(index) {
  document.getElementsByClassName('songPlayGif')[index].classList.toggle('disp-none')
  document.getElementsByClassName('playSongImage')[index].classList.toggle('disp-none')
  document.getElementsByTagName('footer')[0].classList.toggle('disp-none')
  playSongFun()
}

// Lyrics play
const lyricsContent = document.getElementById('lyrics-content');
// const audioPlay = document.getElementById('audioPlay');

const lyrics = [
  { time: 19, text: "Heeriye, Heeriye, aa",},
  { time: 24, text: "Heeriye, Heeriye, aa",},
  { time: 28, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 32, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 37, text: "Heeriye, Heeriye, aa",},
  { time: 42, text: "Heeriye, Heeriye, aa",},
  { time: 63, text: "Neendan vi Tutt Tutt gaiyan",},
  { time: 66, text: "Chundi main Taare rahiyaan",},
  { time: 69, text: "Sochan vich Teriyan paiyaaan",},
  { time: 71, text: "Haaniyaaa",},
  { time: 74, text: "Saari saar raat Jaga ve",},
  { time: 76, text: "Yadan nu Zikar Tera Ve",},
  { time: 78, text: "Aaye kyun na aaye subha ve",},
  { time: 80, text: "Haaniyaa",},
  { time: 82, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 87, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 92, text: "Heeriye, Heeriye, aa",},
  { time: 97, text: "Heeriye, Heeriye, aa",},
  { time: 106, text: "Chheti aa Chheti Sohne Raat na lange",},
  { time: 110, text: "Aaja ve Aaja Sohne Raat na lange",},
  { time: 115, text: "Chheti aa Chheti Sohne Raat na lange",},
  { time: 120, text: "Aaja ve Aaja Sohne Raat na lange",},
  { time: 124, text: "Jad vi tenu takdi haan ve",},
  { time: 126, text: "Akhiyan vi shukar manave",},
  { time: 128, text: "Kole aa door na jaave, haaniya",},
  { time: 133, text: "Palkaan di kar ke chhaanva",},
  { time: 135, text: "Dil de tenu kol bithaanva",},
  { time: 138, text: "Tak Tak tenu Khairan paanva, haaniya",},
  { time: 142, text: "teri... haaniya, teri",},
  { time: 146, text: "teri... haaniya, teri",},
  { time: 151, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 155, text: "Teri hoke maraan Jind Jaan karaan",},
  { time: 161, text: "Heeriye, Heeriye, aa",},
  { time: 165, text: "Heeriye, Heeriye, aa",},
  { time: 174, text: "haaniya, teri",},
  { time: 177, text: "haaniya teri"},
];

let currentLine = 0;

const prevLine = document.getElementById('prev-line');
const lyricLine = document.getElementById('lyric-line');
const nextLine = document.getElementById('next-line');

audioPlay.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audioPlay.currentTime);

  console.log({currentTime})

  while (currentLine < lyrics.length && lyrics[currentLine].time < currentTime) {
    currentLine++;
  }

  // Display the current lyric line
  if (currentLine > 0) {
    // for(let i= currentLine - 2; i > currentLine - 5 && i >= 0; currentLine-- ) {
      if(currentLine > 1)
         prevLine.textContent = lyrics[currentLine-2].text + "\n"
    // }
      lyricLine.textContent = lyrics[currentLine - 1].text;
    // for(let i= currentLine; i < currentLine + 5 && i < lyrics.length ; currentLine++ ) {
      if(lyrics.length-1  > currentLine)
      nextLine.textContent = lyrics[currentLine].text + "\n"
    // }
  } else {
    prevLine.textContent = lyrics[0].text
    nextLine.textContent = lyrics[1].text
  }
});

audioPlay.addEventListener('play', (event) => {
  isPlaying = true;
  currentLine = 0;
  // updateLyrics(event);
});

audioPlay.addEventListener('pause', () => {
  isPlaying = false;
});

//  ExpandButton
const expandButton = document.getElementById('expandButton');
const optionShow = document.getElementById('expandOption');

expandButton.addEventListener('click', () => {
  optionShow.classList.toggle('disp-none')
});

// setup nav
const navBtn=document.getElementById("nav-btn");
const navbar=document.getElementById("navbar");
const navClose=document.getElementById("nav-close");
// show nav
navBtn.addEventListener("click", () => {
    navbar.classList.add("showNav");
});
// close nav
navClose.addEventListener("click", () => {
    navbar.classList.remove("showNav");
});
