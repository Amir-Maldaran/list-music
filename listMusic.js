

window.addEventListener("load", function () {

    let divLoader = document.querySelector(".middle");
    divLoader.className = "middle hidden";
});



const data = [
    {
        music: "music/sami-beigi_eshveh-bi-andazeh-dari.mp3",
        cover: "cover/ice\cream.jpg",
        nameMusic: "Eshveh",
        artist: "sami beigi"
    },
    {
        music: "music/Hichkas Anjam Vazife.mp3",
        cover: "cover/Hichkas.jpg",
        nameMusic: "Anjam Vazife",
        artist: "Hichkas"
    },
    {
        music: "music/Reza\ Pishro\ -\ Mardomak\ \(Ft\ Babak\).mp3",
        cover: "cover/TUPAC.jpg",
        nameMusic: "Mardomak",
        artist: "Reza Pishro"
    },
    {
        music: "music/Shahin\ Najafi\ -\ Chiz.mp3",
        cover: "cover/Rose\Black.jpg",
        nameMusic: "Chiz",
        artist: "Shahin Najafi"
    },
    {
        music: "music/SheryM\ -\ Heley.mp3",
        cover: "cover/SheryMHeley.jpg",
        nameMusic: "Heley",
        artist: "SheryM"
    }

];


//*************/ music data Element **************************************
let audio = document.getElementById('music');
let ul = document.getElementById("ulList");

var tempIndex = -1;
let index = 0;
//*************/ control Element ***********************************
let keyPlay = document.querySelector("#playOrpause");
let backWard = document.querySelector(".fa-backward-fast");
let forWard = document.querySelector(".fa-forward-fast");
//*************/ Progres Bar Element *******************************
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const progressBar = document.querySelector('.progress-bar');
const now = document.querySelector('.now');
//*************/ input search **************************************
let input = document.getElementById("inputSearch");
let iconSearch = document.querySelector(".fa-search");
//************/ collapse theme *************************************
let collapseTheme = document.querySelector(".haderTheme").children;
let thems = document.querySelectorAll(".color");



//animation for collapse theme
for (let item of collapseTheme) {
    item.addEventListener("click", function () {
        if (collapseTheme[1].classList.toggle("turn")) {

            document.querySelector(".colors").style.height = "60px";
            document.querySelector(".colors").style.transform = "scale(1)";

        } else {

            document.querySelector(".colors").style.height = "0px";
            document.querySelector(".colors").style.transform = "scale(0)";
        }
    });
}

//set theme
thems.forEach(function setTheme(params) {
    params.addEventListener("click", function (event) {
        let bg = event.target.style.background;
        let bg2 = bg.replace("90deg", "0deg");


        document.documentElement.style.setProperty("--backgroundColor", bg);
        document.documentElement.style.setProperty("--backgroundColor2", bg2);

        document.documentElement.style.setProperty("--loadercolor1", bg.substr(23, 17));
        document.documentElement.style.setProperty("--loadercolor2", bg.substr(45, 17));

        let dataTheme =
        {
            backgroundColor: bg ,
            backgroundColor2: bg2 ,
            loadercolor1: bg.substr(23, 17) ,
            loadercolor2: bg.substr(45, 17) ,
        }

        localStorage.setItem("theme" , JSON.stringify(dataTheme));
    });
});







function styleInputSearch() {
    input.style.width = "180px";
    input.style.padding = "0px 15px";
    iconSearch.style.transform = "rotate(360deg)";
};



function loadData() {

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = element.cover;
        img.alt = "cover music";
        let divInfo = document.createElement("div");
        divInfo.id = "info";
        let artistName = document.createElement("h3");
        artistName.innerHTML = data[i].artist;
        let Name = document.createElement("h3");
        Name.innerHTML = data[i].nameMusic;
        divInfo.appendChild(artistName);
        divInfo.appendChild(Name);
        let icon = document.createElement("i");
        icon.dataset.index = i;
        icon.className = "fa-solid fa-play iconList";
        icon.addEventListener("click", function (event) {

            console.log(tempIndex);
            index = icon.dataset.index;
            if (tempIndex == -1) {

                if (event.target.className == "fa-solid fa-play iconList") {
                    event.target.className = "fa-solid fa-pause iconList";
                    event.target.style.color = "white";
                    event.target.style.border = "2px solid white";
                    keyPlay.className = "fa-solid fa-pause";
                    setMusicInMusicPlyar(event.target.dataset.index);

                } else {

                    event.target.className = "fa-solid fa-play iconList";
                    event.target.style.color = "black";
                    event.target.style.border = "2px solid black";
                    keyPlay.className = "fa-solid fa-play";
                    audio.pause();
                }

            } else {

                if (tempIndex == icon.dataset.index) {

                    if (event.target.className == "fa-solid fa-play iconList") {
                        event.target.className = "fa-solid fa-pause iconList";
                        event.target.style.color = "white";
                        event.target.style.border = "2px solid white";
                        keyPlay.className = "fa-solid fa-pause";
                        audio.play();
                    } else {

                        event.target.className = "fa-solid fa-play iconList";
                        event.target.style.color = "black";
                        event.target.style.border = "2px solid black";
                        keyPlay.className = "fa-solid fa-play";
                        audio.pause();
                    }

                } else {
                    let icosPlay = document.getElementsByClassName("iconList");
                    icosPlay[tempIndex].className = "fa-solid fa-play iconList";
                    icosPlay[tempIndex].style.color = "black";
                    icosPlay[tempIndex].style.border = "2px solid black";
                    keyPlay.className = "fa-solid fa-pause";

                    event.target.className = "fa-solid fa-pause iconList";
                    event.target.style.color = "white";
                    event.target.style.border = "2px solid white";
                    setMusicInMusicPlyar(event.target.dataset.index);
                }

            }
            console.log(tempIndex);

            tempIndex = icon.dataset.index;

        });
        li.appendChild(img);
        li.appendChild(divInfo);
        li.appendChild(icon);
        ul.appendChild(li);

    }

};
loadData();



function setMusicInMusicPlyar(INDEX) {
    audio.src = data[INDEX].music;
    updateMusicPlayer();
    audio.play()
}



//*************/ Progres Bar **************************************
function conversion(value) {
    let minute = Math.floor(value / 60);
    minute = minute.toString().length === 1 ? ('0' + minute) : minute
    let second = Math.round(value % 60);
    second = second.toString().length === 1 ? ('0' + second) : second
    return `${minute}:${second}`;
};

audio.onloadedmetadata = function () {
    end.innerHTML = conversion(audio.duration);
    start.innerHTML = conversion(audio.currentTime);
};

progressBar.addEventListener('click', function (event) {
    let coordStart = this.getBoundingClientRect().left;
    let coordEnd = event.pageX;
    let p = (coordEnd - coordStart) / this.offsetWidth;
    now.style.width = p.toFixed(3) * 100 + '%';

    audio.currentTime = p * audio.duration;
    pauseOrPlay(1);
});

setInterval(() => {
    start.innerHTML = conversion(audio.currentTime);
    now.style.width = audio.currentTime / audio.duration.toFixed(3) * 100 + '%';
});


//*************/ control **************************************

audio.addEventListener("ended", Next);

keyPlay.addEventListener("click", pauseOrPlay);

forWard.addEventListener("click", Next);

backWard.addEventListener("click", prev);

function pauseOrPlay(sw) {



    let icosPlay = document.getElementsByClassName("iconList");

    if (keyPlay.classList[1] == "fa-play" || sw == 1) {

        keyPlay.className = "fa-solid fa-pause";

        icosPlay[index].className = "fa-solid fa-pause iconList";
        icosPlay[index].style.color = "white";
        icosPlay[index].style.border = "2px solid white";

        audio.play();

    } else if (sw != 1) {

        keyPlay.className = "fa-solid fa-play";

        icosPlay[index].className = "fa-solid fa-play iconList";
        icosPlay[index].style.color = "black";
        icosPlay[index].style.border = "2px solid black";

        audio.pause();
    }
}


function Next() {

    let icosPlay = document.getElementsByClassName("iconList");
    if (index >= data.length - 1) {

        index = -1;
    }
    audio.src = data[++index].music;
    updateMusicPlayer();

    if (index - 1 == -1) {

        icosPlay[data.length - 1].className = "fa-solid fa-play iconList";
        icosPlay[data.length - 1].style.color = "black";
        icosPlay[data.length - 1].style.border = "2px solid black";

    } else {

        icosPlay[index - 1].className = "fa-solid fa-play iconList";
        icosPlay[index - 1].style.color = "black";
        icosPlay[index - 1].style.border = "2px solid black";
    }

    pauseOrPlay(1);
    tempIndex = index;

};

function prev() {

    let icosPlay = document.getElementsByClassName("iconList");

    if (index <= 0) {

        index = data.length;
    }
    audio.src = data[--index].music;
    updateMusicPlayer();

    if (index + 1 == data.length) {

        icosPlay[0].className = "fa-solid fa-play iconList";
        icosPlay[0].style.color = "black";
        icosPlay[0].style.border = "2px solid black";

    } else {

        icosPlay[index + 1].className = "fa-solid fa-play iconList";
        icosPlay[index + 1].style.color = "black";
        icosPlay[index + 1].style.border = "2px solid black";
    }

    pauseOrPlay(1);
    tempIndex = index;
};



function updateMusicPlayer() {
    let infoMusic = document.getElementById("artist");
    infoMusic.innerHTML = data[index].artist + "-" + data[index].nameMusic;
}


// load window
window.addEventListener("load" , function () {
    let dataTheme = JSON.parse(localStorage.getItem("theme"));

    document.documentElement.style.setProperty("--backgroundColor", dataTheme.backgroundColor);
    document.documentElement.style.setProperty("--backgroundColor2", dataTheme.backgroundColor2);

    document.documentElement.style.setProperty("--loadercolor1", dataTheme.loadercolor1);
    document.documentElement.style.setProperty("--loadercolor2", dataTheme.loadercolor2);
});