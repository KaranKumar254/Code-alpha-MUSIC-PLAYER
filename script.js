const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let songs = [
    { name: "Aayi Nai", artist: "Ft. Pawan Singh", src: "songs/Aayi Nai Stree 2 320 Kbps.mp3" },
    { name: "Bewafa Se Pyaar Kiya", artist: "Ft. Jubin Nautiyal", src: "songs/Bewafa Se Pyaar Kiya _Payal Dev Ft.Jubin Nautiyal _ Riva_ Gautam_ Manoj M _ Donati Media _ Bhushan K(MP3_320K).mp3" },
];

let index = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(i) {
    title.innerText = songs[i].name;
    artist.innerText = songs[i].artist;
    audio.src = songs[i].src;
}


const playBtn = document.querySelector(".play");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";  
    } else {
        audio.pause();
        playBtn.innerText = "▶"; 
    }
}


function nextSong() {
    if (isShuffle) {
        index = Math.floor(Math.random() * songs.length);
    } else {
        index = (index + 1) % songs.length;
    }

    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
    loadPlaylist();
}


function prevSong() {
    index = (index - 1 + songs.length) % songs.length;

    loadSong(index);
    audio.play();

    playBtn.innerText = "⏸";
    loadPlaylist();
}


audio.addEventListener("timeupdate", () => {
    let percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
});

function setProgress(e) {
    let width = e.currentTarget.clientWidth;
    audio.currentTime = (e.offsetX / width) * audio.duration;
}

function formatTime(time) {
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
}

function setVolume(value) {
    audio.volume = value;
}

audio.addEventListener("ended", () => {
    isRepeat ? audio.play() : nextSong();
});

function toggleShuffle() {
    isShuffle = !isShuffle;
    alert("Shuffle " + (isShuffle ? "ON" : "OFF"));
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    alert("Repeat " + (isRepeat ? "ON" : "OFF"));
}

function loadPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, i) => {
        let li = document.createElement("li");
        li.innerText = song.name + " - " + song.artist;

        if (i === index) {
            li.style.background = "#1db954";
            li.style.color = "black";
        }

        li.onclick = () => {
            index = i;
            loadSong(index);
            audio.play();
            playBtn.innerText = "⏸";
            loadPlaylist();
        };

        playlistEl.appendChild(li);
    });
}



loadSong(index);
loadPlaylist();
