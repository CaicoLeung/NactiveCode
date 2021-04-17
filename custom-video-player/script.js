"use strict";
var video = document.getElementById('video');
var playBtn = document.getElementById('play');
var stopBth = document.getElementById('stop');
var process = document.getElementById('process');
var timestamp = document.getElementById('timestamp');
var flag = false;
var Controls = /** @class */ (function () {
    function Controls(el) {
        this.playBtn = el;
    }
    Controls.prototype.showPause = function () {
        this.playBtn.getElementsByTagName('i')[0].className = 'fa fa-pause fa-2x';
    };
    Controls.prototype.showPlay = function () {
        this.playBtn.getElementsByTagName('i')[0].className = 'fa fa-play fa-2x';
    };
    return Controls;
}());
var controls = new Controls(playBtn);
function fill(time) {
    if (time < 10) {
        return "0" + time;
    }
    else {
        return time;
    }
}
function formatTime(timestamp) {
    var hour = parseInt("" + timestamp / 60 / 60);
    var min = parseInt("" + (timestamp - hour * 60) / 60);
    var sec = parseInt("" + (timestamp - hour * 60 - min * 60));
    return fill(hour) + " : " + fill(min) + " : " + fill(sec);
}
function handlePlay(el) {
    el.preventDefault();
    if (video && playBtn) {
        if (video.paused) {
            video.play();
        }
        else {
            pauseVideo();
        }
    }
}
function handleStop(el) {
    el.preventDefault();
    if (video && stopBth && playBtn) {
        controls.showPlay();
        pauseVideo();
        video.currentTime = 0;
    }
}
function handleTimeupdate(el) {
    el.preventDefault();
    if (video && process && timestamp) {
        process.value = Math.floor(video.currentTime / video.duration * 100);
        timestamp.innerText = formatTime(Math.floor(video.currentTime));
        if (process.value >= 100) {
            pauseVideo();
        }
    }
}
function handleVideoPause(el) {
    el.preventDefault();
    controls.showPlay();
}
function handleVideoPlay(el) {
    el.preventDefault();
    controls.showPause();
}
function handleProcess(el) {
    el.preventDefault();
    if (video && process && timestamp) {
        video.currentTime = video.duration * (process.value / 100);
    }
}
function handleSetCurrentTimeEnd(el) {
    el.preventDefault();
    if (flag && video && process && timestamp) {
        var positionRate = (el.offsetX) / process.clientWidth;
        video.currentTime = positionRate * video.duration;
        video.addEventListener('timeupdate', handleTimeupdate);
    }
    setFlagFalse();
}
function handleSetCurrentTimeStart(el) {
    el.preventDefault();
    flag = true;
    video.removeEventListener('timeupdate', handleTimeupdate);
}
function handleSetCurrentTime(el) {
    el.preventDefault();
    if (flag) {
        var positionRate = (el.offsetX) / process.clientWidth;
        process.value = positionRate * 100;
    }
}
function setFlagFalse() {
    flag = false;
}
function pauseVideo() {
    video.pause();
}
window.onload = function () {
    playBtn === null || playBtn === void 0 ? void 0 : playBtn.addEventListener('click', handlePlay);
    stopBth === null || stopBth === void 0 ? void 0 : stopBth.addEventListener('click', handleStop);
    video.addEventListener('dblclick', handlePlay);
    video.addEventListener('timeupdate', handleTimeupdate);
    video.addEventListener('pause', handleVideoPause);
    video.addEventListener('play', handleVideoPlay);
    process.addEventListener('change', handleProcess);
    process.addEventListener('mouseup', handleSetCurrentTimeEnd);
    process.addEventListener('mouseleave', handleSetCurrentTimeEnd);
    process.addEventListener('mousedown', handleSetCurrentTimeStart);
    process.addEventListener('mousemove', handleSetCurrentTime);
};
window.onbeforeunload = function () {
    playBtn === null || playBtn === void 0 ? void 0 : playBtn.removeEventListener('click', handlePlay);
    stopBth === null || stopBth === void 0 ? void 0 : stopBth.removeEventListener('click', handleStop);
    stopBth === null || stopBth === void 0 ? void 0 : stopBth.removeEventListener('dblclick', handleStop);
    video.removeEventListener('timeupdate', handleTimeupdate);
    video.removeEventListener('pause', handleVideoPause);
    video.removeEventListener('play', handleVideoPlay);
    process.removeEventListener('change', handleProcess);
    process.removeEventListener('mouseup', handleSetCurrentTimeEnd);
    process.removeEventListener('mouseleave', handleSetCurrentTimeEnd);
    process.removeEventListener('mousedown', handleSetCurrentTimeStart);
    process.removeEventListener('mousemove', handleSetCurrentTime);
};
