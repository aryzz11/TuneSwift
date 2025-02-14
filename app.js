const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const musicCard = document.getElementById('music-card');

const songs = [
  { title: 'Song 1', artist: 'Artist 1', src: 'songs/Number 1.mp3', cover: 'images/cover1.jpg' },
  { title: 'Song 2', artist: 'Artist 2', src: 'songs/Number 2.mp3', cover: 'images/cover2.jpg' },
  { title: 'Song 3', artist: 'Artist 3', src: 'songs/song3.mp3', cover: 'images/cover3.jpg' },
];

let currentSongIndex = 0;
let isAnimating = false;

function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = encodeURI(song.src);  // Use encodeURI to handle spaces
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  albumArt.style.backgroundImage = `url(${encodeURI(song.cover)})`;  // Ensure the cover image URL is encoded
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
