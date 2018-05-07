var play = document.getElementsByClassName('play')[0],
    pause = document.getElementsByClassName('pause')[0],
    next = document.getElementsByClassName('next')[0],
    goingtime = document.getElementsByClassName('goingtime')[0],
    duration = document.getElementsByClassName('duration')[0],
    control = document.getElementsByClassName('control')[0],
    singer = document.getElementsByClassName('singer')[0],
    song = document.getElementsByClassName('song')[0],
    albumcover = document.getElementsByClassName('albumcover')[0];
    onOff = true;
var myaudio = new Audio();
var duranum;
var num = -1;
//play.style.display = 'none';
var minuts = 0;
var seconds = 0;
var progresstimer = null; //定时器号码
function counttime() {
    if (myaudio.currentTime < 10) {
        seconds = '0' + parseInt(myaudio.currentTime)
    } else {
        seconds = parseInt(myaudio.currentTime)
        if (myaudio.currentTime > 60) {
            minuts = parseInt(myaudio.currentTime / 60);
            seconds = parseInt(myaudio.currentTime) - minuts * 60;
            if (seconds < 10) {
                seconds = '0' + seconds
            }
        }
    }
    runningtime = minuts + ':' + seconds;
    goingtime.innerText = runningtime
}

function toplay() {
    if (num == arr.length - 1) { num = -1 }
    num += 1;
    song.innerText = arr[num]['song'];
    singer.innerText = arr[num]['singer'];
    myaudio.src = 'audio/' + arr[num]['songsrc'];
    albumcover.setAttribute('src', arr[num]['imgsrc'])
    myaudio.volume = 0.5;
    myaudio.play();
}
//toplay(num);                            //初始化       
play.addEventListener('click', function () {
    if(onOff){
        toplay(num);
        onOff = false;
    }
    myaudio.play();
    pause.style.display = 'block';
    play.style.display = 'none';
    clearInterval(progresstimer);
    progresstimer = setInterval(getprogress, 1000); //按下播放键时，启动定时器

});
pause.addEventListener('click', function () {
    myaudio.pause();
    play.style.display = 'block';
    pause.style.display = 'none';
    clearInterval(progresstimer);//按下暂停键时，停止计时器

});
next.addEventListener('click', function () {      //点击next播放下一首
    toplay(num);
    pause.style.display = 'block';
    play.style.display = 'none';
    curprogress.style.width = 0;  //清零进度条
    stepdistance = 0;
    minuts = 0;
});
myaudio.addEventListener('canplay', function () {     //音乐准备就绪后
    duranum = (parseInt(myaudio.duration / 60)) + ':' + (parseInt(myaudio.duration % 60));
    duration.innerText = duranum;
    setInterval(counttime, 1000);
    clearInterval(progresstimer);
    progresstimer = setInterval(getprogress, 1000);          //音乐准备就绪后，启动进度条定时器      
})
myaudio.addEventListener('waiting', function () {
    clearInterval(progresstimer);
})
myaudio.addEventListener('ended', function () {    // 结束后自动播放下一首
    toplay(num);
    curprogress.style.width = 0;
    stepdistance = 0;

})

var volumbox = document.getElementsByClassName('volumbox')[0];  /*音量部分*/
var volumwrap = document.getElementsByClassName('volumwrap')[0];
var select = document.getElementsByClassName('select')[0];
var conwidth = volumbox.offsetLeft;
volumwrap.addEventListener('click', function (e) {
    select.style.width = (e.clientX - conwidth - 20 - 30) + 'px';
    myaudio.volume = (e.clientX - conwidth - 20 - 30) / 50      /*音量部分*/
})
var progresswidth = document.getElementsByClassName('progress')[0].scrollWidth; //获取包裹进度条元素总宽度
var curprogress = document.getElementsByClassName('cur-progress')[0];       //获取进度条元素
var stepdistance = 0;                                                       //当前进度条元素宽度初始化
function getprogress() {
    stepdistance += progresswidth / myaudio.duration                       //每一秒要走的距离
    curprogress.style.width = stepdistance + 'px';
}                         