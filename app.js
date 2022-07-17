const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title  = document.querySelector("#music-details .title");
const singer  = document.querySelector("#music-details .singer")
const prev  = document.querySelector("#controls #prev")
const play  = document.querySelector("#controls #play")
const next  = document.querySelector("#controls #next")
const duration = document.querySelector("#duration")
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar")

const player = new MusicPlayer(musicList);
let music = player.getMusic();
window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
})

function displayMusic(music){
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
function prevMusic(){
    player.previous();
    music = player.getMusic();
    displayMusic(music);
    playMusic()
}
function nextMusic(){
    player.next();
    music = player.getMusic();
    displayMusic(music);
    playMusic()
}
const pauseMusic = () => {
    audio.pause();
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play"
}
const playMusic = () =>{
    audio.play();
    play.classList = "fa-solid fa-pause"
    container.classList.add("playing")
}


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration)
    console.log(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})


function calculateTime(time){
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


progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value
}) 

// console.log(music.getName());
// player.next();
// music = player.getMusic()
// console.log(music.getName());
// player.next();
// music = player.getMusic()

// console.log(music.getName());

// player.previous();
// music = player.getMusic()

// console.log(music.getName());