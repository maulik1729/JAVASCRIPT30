const player=document.querySelector(".player");
const video=player.querySelector(".viewer");
const toggle=player.querySelector(".toggle");
const skipButtons=player.querySelectorAll("[data-skip]");
const ranges=player.querySelectorAll(".player__slider");
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const fbutton=player.querySelector('#F');

function togglePlay()
{
    video[video.paused?'play':'pause']();
}

function updateButton()
{
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.innerHTML=icon;
}

function skip()
{
    console.log(this.dataset);
    video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRangeUpdate()
{
    console.log(this.name);
    video[this.name]=this.value;
}

function handleProgress()
{
    const persent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${persent}%`;
}

function  scrub(e)
{
    console.log(e);
    const scrubTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    video.currentTime=scrubTime; 
}

function handleFullScreen(e)
{
    console.log(e);
    console.dir(video);
   video.webkitEnterFullscreen();

}
console.log(progressBar);
let mouseDown=false;

video.addEventListener("click",togglePlay);
toggle.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",handleProgress);
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",(e)=>mouseDown&&scrub(e));
progress.addEventListener("mousedown",()=>mouseDown=true);
progress.addEventListener("mouseup",()=>mouseDown=false);
fbutton.addEventListener("click",handleFullScreen);
console.dir(fbutton);
skipButtons.forEach( skipButton => skipButton.addEventListener("click",skip));
ranges.forEach( range => range.addEventListener("change",handleRangeUpdate));
ranges.forEach( range => range.addEventListener("mousemove",handleRangeUpdate));