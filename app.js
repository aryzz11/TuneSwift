// Ensure paths work correctly on GitHub Pages
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const progressBar = document.getElementById('progress-bar');

const songs = [
  { title: 'Number 1', artist: 'Artist 1', src: 'songs/number1.mp3', cover: 'images/cover1.jpg' },
  { title: 'Number 2', artist: 'Artist 2', src: 'songs/number2.mp3', cover: 'images/cover2.jpg' },
  { title: 'Song 3', artist: 'Artist 3', src: 'songs/song3.mp3', cover: 'images/cover3.jpg' },
];

let currentSongIndex = 0;

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
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = progress + '%';
});

playButton.addEventListener('click', playSong);
pauseButton.addEventListener('click', pauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

audioPlayer.addEventListener('ended', nextSong);
loadSong(currentSongIndex);
