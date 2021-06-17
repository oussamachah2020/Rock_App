
import { playlist , Names } from './Playlist.js';

console.log(playlist,Names);

const SideBar = document.querySelector('.list');
const BarBtn = document.querySelector('.sideBar');
const playBtn = document.querySelector('.Playbtn');
const prevBtn = document.querySelector('.prevbtn');
const nextBtn = document.querySelector('.Nextbtn');
const audio = document.getElementById('music');
const Bands = document.querySelector('.Bands');
const Playlist = document.querySelector('.Playlist');
const BtnImage = document.getElementById('switch');
const Cover = document.querySelector('.cover');
const ProgressCon = document.querySelector('.ProgressContainer');
const Progress = document.querySelector('.progress');
const Name = document.querySelectorAll('.SongName');
const File = document.querySelector('#add');

let id = 5;

playlist.push(
    {
        id:id,
        song: `song/${File.value}`,
        cover: `image/${File.value}`
    },
);

console.log(File.value);
console.log(SideBar,BarBtn);

let SongIndex = 0;

function ShowCover() {
    Cover.innerHTML = `<img src="${playlist[SongIndex].cover}" width="327px" height="350px">`
}ShowCover();

function addSong() {
    audio.src = playlist[SongIndex].song;
}

BarBtn.addEventListener('click',() => {
    if(SideBar.classList.contains('active')) {
        SideBar.classList.remove('active');
        SideBar.style.transform = 'translateX(160%)'; 
        Playlist.style.transform = 'translateY(40%)'; 
    }else {
        SideBar.classList.add('active');
        SideBar.style.transform = 'translateX(-150%)'; 
        Playlist.style.transform = 'translateY(-2%)';
    }
});

function RockIt() {
    Bands.classList.add('Play');
    BtnImage.src = "./image/pauseBtn.png";
    addSong();
    audio.play();
    //ProgressCon.classList.add('show-timeLine');
}

function DropIt() {
    Bands.classList.remove('Play');
    BtnImage.src = "./image/playBtn.png";
    addSong();
    audio.pause();
    //ProgressCon.classList.remove('show-timeLine');
}

playBtn.addEventListener('click',() => {
    const Rock = Bands.classList.contains('Play');

    if(Rock) {
        DropIt();
    }else {
        RockIt();
    }
})

function nextSong() {
    SongIndex++;

    if(SongIndex > playlist.length - 1) {
        SongIndex = 0;
    }

    addSong();
    ShowCover(SongIndex);

    id++;
}

function prevSong() {
    SongIndex--;
    if(SongIndex < 0) {
	    SongIndex = playlist.length - 1;
    }
	ShowCover();
	addSong();

    id--;
}

nextBtn.addEventListener('click',() => {
    nextSong();
})

prevBtn.addEventListener('click',() => {
    prevSong();
})

function updateProgress(el) {
    const {duration,currentTime} = el.srcElement;
    const ProgressPer = (currentTime/duration) * 100;
    Progress.style.width = `${ProgressPer}%`;
}

function follow(e) {
    const width = this.clientWidth;
    const ClickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (ClickX/width) * duration;
}

function showPlaylist() {
    for (const [key,value] of Names) {
        if(Number(key)) {
            Name[key - 1].innerHTML = value;
        }
    }
}showPlaylist();

Name.forEach(nameSong => {
    nameSong.addEventListener('click',PlayTheList);
});

function Btns() {
    Bands.classList.add('Play');
    BtnImage.src = "./image/pauseBtn.png";
}

function PlayTheList(e) {
    Btns();
    let id = e.currentTarget.dataset.id;
    console.log(id);
    Cover.innerHTML = `<img src="${playlist[id].cover}" width="327px" height="350px">`
    audio.src = playlist[id].song; 
    audio.play();
}

audio.addEventListener('timeupdate',updateProgress);
ProgressCon.addEventListener('click',follow);
audio.addEventListener('ended',nextSong);

