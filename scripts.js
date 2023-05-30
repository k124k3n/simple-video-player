let toggle = document.querySelector('.toggle');
let video = document.querySelector('video');
let slider = document.querySelector('.progress__filled');
let prog = document.querySelector('.progress');

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function playVideo() {
    const stat = video.paused ? 'play' : 'pause';
    video[stat]();
}

function vswitch(event){
    if((event.type==='mousemove' && !clickExist)) return;
    video[this.name] = this.value;
}

function syncProgressBar(event){
    slider.style.flexBasis = `${video.currentTime/video.duration*100}%`;
}

// toggle on/off
toggle.addEventListener("click", playVideo);
video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// sync progress bar
video.addEventListener('timeupdate', syncProgressBar);

// slider change
function sliderSwitch(event){
    if((event.type==='mousemove' && !clickExist)) return;
    this.focus();
    let res = (event.offsetX / prog.offsetWidth) * video.duration;
    video.currentTime = res;
    slider.style.flexBasis = `${event.offsetX / prog.offsetWidth*100}%`;
}


let clickExist = false;

document.addEventListener('mousedown', (e)=>{clickExist = true;});
document.addEventListener('mouseup', (e)=>{clickExist = false;});
video.addEventListener('mouseup', (e)=>{clickExist = false;});

prog.addEventListener('mousemove', sliderSwitch);
prog.addEventListener('click', sliderSwitch);

// slider 
// volume control
let volumeSel = document.querySelector('input[name="volume"]');

volumeSel.addEventListener('change', vswitch);
volumeSel.addEventListener('mousemove', vswitch);

// playbackRate
let playbackSel = document.querySelector('input[name="playbackRate"]');
playbackSel.addEventListener('change', vswitch);
playbackSel.addEventListener('mousemove', vswitch);

// forward/backward
let forwardSel = document.querySelector('button[data-skip="25"]');
let backwardSel = document.querySelector('button[data-skip="-10"]');

function moveState(event){
    let finalTime = video.currentTime + Number(this.dataset.skip);
    finalTime = Math.min(video.duration, Math.max(finalTime, 0));
    video.currentTime = finalTime;
}

forwardSel.addEventListener('click', moveState);
backwardSel.addEventListener('click', moveState);