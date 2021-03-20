let flag = false;
let repeatAudio = true;

// script for keyborde

const pianoKeys = document.querySelectorAll('.piano-key');

window.addEventListener('keydown', (event)=>{
    if(event.repeat !== undefined){
        repeatAudio = true;
    }
    if(!repeatAudio) return;
    repeatAudio = false;
    const key = document.querySelector(`.piano-key[data-letter="${event.code.slice(-1)}"]`);
    if(key) {
        const audio = document.querySelector(`audio[data-note="${key.dataset.note}"]`);
        key.classList.add('piano-key-active');
        audio.currentTime = 0;
        audio.play();
    }
})

window.addEventListener('keyup', (event)=>{
    const key = document.querySelector(`.piano-key[data-letter="${event.code.slice(-1)}"]`);
    if(!key) {
        return;
    }
    else {
    key.classList.remove('piano-key-active')}
})

// script for mouseevent

const checkClick = (event) =>{
    if (!flag) return;
    playClick(event);
}

const playClick = event=>{
    let dataKey = event.target.dataset.key;
    if(!dataKey) return;
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const pianoKey = document.querySelector(`.piano-key[data-key="${dataKey}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    pianoKey.classList.add('piano-key-active');
}

const removeActiveClick = event =>{
    event.target.classList.remove('piano-key-active');
}

document.addEventListener('mouseup', ()=> flag = false);

pianoKeys.forEach((key)=>{
    key.addEventListener('mousedown' , (event)=>{
        flag = true;
        checkClick(event);
    })

    key.addEventListener('mouseover', checkClick);

    key.addEventListener('mouseleave', removeActiveClick);

    key.addEventListener('mouseup', removeActiveClick);

    key.addEventListener('contextmenu', (event)=> event.preventDefault());
});

// script for Notes/Letters

const btnContainer = document.querySelector('.btn-container');

const btn = document.querySelectorAll('.btn');

const changeBtn = (event) => {
    if(!event.target.classList.contains('btn-active')){
        btn.forEach(i=> i.classList.toggle('btn-active'));
        pianoKeys.forEach(i=>i.classList.toggle('piano-key-letter'))
    }
}

btnContainer.addEventListener('click', changeBtn);

// sctipt for FillScreen

const fullScreen = document.documentElement;
const fullScreenId = document.getElementById('fullscreen');

const turnOnFullScreen = ()=> {
    if(!document.fullscreenElement){
        fullScreen.requestFullscreen();
    }
    else {
        if(document.exitFullscreen){
            document.exitFullscreen();
            turnOffFullScreen();
        }
    }
}

const turnOffFullScreen = () =>{
    document.addEventListener("keypress", (event)=> {
        if(event.key === 'Escape') {
           turnOnFullScreen();
        }
    }, false);
}

fullScreenId.addEventListener('click', turnOnFullScreen)
