const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer")
const prev = document.querySelector("#controls #prev")
const play = document.querySelector("#controls #play")
const next = document.querySelector("#controls #next")
const duration = document.querySelector("#duration")
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul")

const player = new MusicPlayer(musicList);
let music = player.getMusic();
window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlaying();
})

function displayMusic(music) {
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "images/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
})

prev.addEventListener("click", () => {
    prevMusic()
});

next.addEventListener("click", () => {
    nextMusic()
});
const prevMusic = () => {
    player.previous();
    music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlaying();
}
const nextMusic = () => {
    player.next();
    music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlaying();

}
const pauseMusic = () => {
    audio.pause();
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play"
}
const playMusic = () => {
    audio.play();
    play.querySelector("i").classList = "fa-solid fa-pause"
    container.classList.add("playing")
}
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration)
    progressBar.max = Math.floor(audio.duration);
})

function calculateTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const updatingTime = seconds < 10 ? `0${seconds}` : seconds
    const result = `${minutes}:${updatingTime}`;
    return result
}
audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value)
})

audio.addEventListener("ended", () => {
        nextMusic()
    
})
progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value
})
const defineVolumeLevel = (level = 100) => {
    if (muteState !== "muted") {
        audio.muted = false;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = level;
    } else {
        audio.muted = true;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }
}
let muteState = "muted";
volume.addEventListener("click", () => {
    defineVolumeLevel()
})

volumeBar.addEventListener("input", (e) => {
    const volumeLevel = e.target.value;
    audio.volume = volumeLevel / 100;
    defineVolumeLevel(volumeLevel)
})

const displayMusicList = (list) => {
    for (let item of list) {
        console.log(item.file.duration)
        let liTag = `
        <li li-index=${list.indexOf(item)} onclick="selectedMusic(this)" class="list-group-item d-flex align-items-center justify-content-between">
        <span>${item.getName()}</span>
        <span id="music-${list.indexOf(item)}" class="badge bg-primary rounded-pill">3:40</span>
        <audio class="music-${list.indexOf(item)}" src="mp3/${item.file}"></audio>
    </li>`

        ul.insertAdjacentHTML("beforeend", liTag)
        let liAudioDuration = ul.querySelector(`#music-${list.indexOf(item)}`);
        let liAudioTag = ul.querySelector(`.music-${list.indexOf(item)}`)
        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration)
        })
    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");;
    displayMusic(player.getMusic());
    playMusic();isPlaying();
}

const isPlaying = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing")
        }

        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing")
        }
    }
}