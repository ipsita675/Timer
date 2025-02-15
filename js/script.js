let pomodoro=document.getElementById("pomodoro-timer")
let short=document.getElementById("short-timer")
let long=document.getElementById("long-timer")
let timers=document.querySelectorAll(".timer-display")
let session=document.getElementById("session")
let shortBreak=document.getElementById("short")
let longBreak=document.getElementById("long")
let startBtn=document.querySelector(".start")
let stopBtn=document.querySelector(".stop")
let timerMsg=document.getElementById("timer-msg")
let button=document.querySelector(".button")

let currentTimer=null
let myInterval=null

function showDefaultTimer(){
    pomodoro.style.display="block"
    short.style.display="none"
    long.style.display="none"
}
showDefaultTimer()

function hideAll(){
    timers.forEach((timer)=>{
        timer.style.display="none"
    })
}

session.addEventListener("click",()=>{
    hideAll()
    pomodoro.style.display="block"
    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer=pomodoro
})
shortBreak.addEventListener("click",()=>{
    hideAll()
    short.style.display="block"
    shortBreak.classList.add("active")
    session.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer=short
})
longBreak.addEventListener("click",()=>{
    hideAll()
    long.style.display="block"
    longBreak.classList.add("active")
    shortBreak.classList.remove("active")
    session.classList.remove("active")

    currentTimer=long
})

function startTimer(timerDisplay){
    if(myInterval){
        clearInterval(myInterval)
    }
    timerDuration=timerDisplay.getAttribute("data-duration").split(":")[0]
    
    let durationInMS=timerDuration*60*1000
    let endTS=Date.now()+durationInMS

    myInterval = setInterval(() => {
        const timeremain=new Date(endTS-Date.now())

        if (timeremain <= 0) {
            clearInterval(myInterval);
            timerDisplay.querySelector("h1").textContent = "00:00";
            const alarm = new Audio("image/alrm.wav");
            alarm.play();
        } else { 
            const displayMinutes = Math.floor(timeremain / 60000);
            const displaySeconds = ((timeremain % 60000)/1000).toFixed(0);
    
            timerDisplay.querySelector("h1").textContent = `${displayMinutes}:${displaySeconds.toString().padStart(2, "0")}`;
        }
    }, 1000);
}


startBtn.addEventListener("click",()=>{
    if(currentTimer){
        startTimer(currentTimer)
        timerMsg.style.display="none"
    }
    else{
        timerMsg.style.display="block"
    }
})

stopBtn.addEventListener("click",()=>{
    if(currentTimer){
        clearInterval(myInterval)
    }
})