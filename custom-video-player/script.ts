const video = document.getElementById('video') as HTMLVideoElement
const playBtn = document.getElementById('play') as HTMLButtonElement
const stopBth = document.getElementById('stop') as HTMLButtonElement
const process = document.getElementById('process') as HTMLProgressElement
const timestamp = document.getElementById('timestamp')
let flag = false

class Controls {
  playBtn: HTMLButtonElement
  constructor(el: HTMLButtonElement) {
    this.playBtn = el
  }
  showPause() {
    this.playBtn.getElementsByTagName('i')[0].className = 'fa fa-pause fa-2x'
  }
  showPlay() {
    this.playBtn.getElementsByTagName('i')[0].className = 'fa fa-play fa-2x'
  }
}

const controls = new Controls(playBtn)

function fill(time: number) {
  if (time < 10) {
    return `0${time}`
  } else {
    return time
  }
}

function formatTime(timestamp: number) {
  const hour = parseInt(`${timestamp / 60 / 60}`)
  const min = parseInt(`${(timestamp - hour * 60) / 60}`)
  const sec = parseInt(`${(timestamp - hour * 60 - min * 60)}`)

  return `${fill(hour)} : ${fill(min)} : ${fill(sec)}`
}

function handlePlay(el: Event) {
  el.preventDefault()
  if (video && playBtn) {
    if (video.paused) {
      video.play()
    } else {
      pauseVideo()
    }
  }
}

function handleStop(el: Event) {
  el.preventDefault()
  if (video && stopBth && playBtn) {
    controls.showPlay()
    pauseVideo()
    video.currentTime = 0
  }
}

function handleTimeupdate(el: Event) {
  el.preventDefault()
  if (video && process && timestamp) {
    process.value = Math.floor(video.currentTime / video.duration * 100)
    timestamp.innerText = formatTime(Math.floor(video.currentTime));
    if (process.value >= 100) {
      pauseVideo()
    }
  }
}

function handleVideoPause(el: Event) {
  el.preventDefault()
  controls.showPlay()
}

function handleVideoPlay(el: Event) {
  el.preventDefault()
  controls.showPause()
}

function handleProcess(el: Event) {
  el.preventDefault()
  if (video && process && timestamp) {
    video.currentTime = video.duration * (process.value / 100);
  }
}

function handleSetCurrentTimeEnd(el: MouseEvent) {
  el.preventDefault()
  if (flag && video && process && timestamp) {
    const positionRate = (el.offsetX) / process.clientWidth
    video.currentTime = positionRate * video.duration
    video.addEventListener('timeupdate', handleTimeupdate)
  }
  setFlagFalse()
}

function handleSetCurrentTimeStart(el: MouseEvent) {
  el.preventDefault()
  flag = true
  video.removeEventListener('timeupdate', handleTimeupdate)
}

function handleSetCurrentTime(el: MouseEvent) {
  el.preventDefault()
  if (flag) {
    const positionRate = (el.offsetX) / process.clientWidth
    process.value = positionRate * 100
  }
}

function setFlagFalse() {
  flag = false
}

function pauseVideo() {
  video.pause()
}

window.onload = function () {
  playBtn?.addEventListener('click', handlePlay)
  stopBth?.addEventListener('click', handleStop)
  video.addEventListener('dblclick', handlePlay)
  video.addEventListener('timeupdate', handleTimeupdate)
  video.addEventListener('pause', handleVideoPause)
  video.addEventListener('play', handleVideoPlay)
  process.addEventListener('change', handleProcess)
  process.addEventListener('mouseup', handleSetCurrentTimeEnd)
  process.addEventListener('mouseleave', handleSetCurrentTimeEnd)
  process.addEventListener('mousedown', handleSetCurrentTimeStart)
  process.addEventListener('mousemove', handleSetCurrentTime)
}

window.onbeforeunload = function () {
  playBtn?.removeEventListener('click', handlePlay)
  stopBth?.removeEventListener('click', handleStop)
  stopBth?.removeEventListener('dblclick', handleStop)
  video.removeEventListener('timeupdate', handleTimeupdate)
  video.removeEventListener('pause', handleVideoPause)
  video.removeEventListener('play', handleVideoPlay)
  process.removeEventListener('change', handleProcess)
  process.removeEventListener('mouseup', handleSetCurrentTimeEnd)
  process.removeEventListener('mouseleave', handleSetCurrentTimeEnd)
  process.removeEventListener('mousedown', handleSetCurrentTimeStart)
  process.removeEventListener('mousemove', handleSetCurrentTime)
}
