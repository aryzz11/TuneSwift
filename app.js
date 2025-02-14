const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const musicCard = document.getElementById('music-card');

// Use raw GitHub URLs for songs and cover images
const songs = [
  { title: 'Song 1', artist: 'Artist 1', src: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/songs/Number%201.mp3', cover: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/images/cover1.jpg' },
  { title: 'Song 2', artist: 'Artist 2', src: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/songs/Number%202.mp3', cover: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/images/cover2.jpg' },
  { title: 'Song 3', artist: 'Artist 3', src: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/songs/song3.mp3', cover: 'https://raw.githubusercontent.com/aryzz11/TuneSwift/main/images/cover3.jpg' },
];

let currentSongIndex = 0;
let isAnimating = false;

function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumArt.style.backgroundImage = `url(${song.cover})`;
}

function playSong() {
  audioPlayer.play();
}

function pauseSong() {
  audioPlayer.pause();
}

function nextSong() {
  if (isAnimating) return;
  isAnimating = true;

  musicCard.style.transform = 'translateX(-100%)';
  setTimeout(() => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    musicCard.style.transition = 'none';
    musicCard.style.transform = 'translateX(100%)';

    setTimeout(() => {
      musicCard.style.transition = 'transform 0.4s ease-in-out';
      musicCard.style.transform = 'translateX(0)';
      isAnimating = false;
    }, 50);
  }, 400);
  playSong();
}

function prevSong() {
  if (isAnimating) return;
  isAnimating = true;

  musicCard.style.transform = 'translateX(100%)';
  setTimeout(() => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    musicCard.style.transition = 'none';
    musicCard.style.transform = 'translateX(-100%)';

    setTimeout(() => {
      musicCard.style.transition = 'transform 0.4s ease-in-out';
      musicCard.style.transform = 'translateX(0)';
      isAnimating = false;
    }, 50);
  }, 400);
  playSong();
}

playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

loadSong(currentSongIndex);
