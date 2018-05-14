const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds)
{
    clearInterval(countdown);
    var now=Date.now();
    var then= seconds*1000 + now;
    displayTime(seconds);
    displayEndTime(then);
    countdown=setInterval(()=>{
        var secondsleft=Math.round((then-Date.now())/1000);
        if(secondsleft<0)
        {
             clearInterval(countdown);
             return;
        }
        console.log(secondsleft);
        displayTime(secondsleft);
    },1000);

}

function displayTime(seconds)
{
    const min=Math.floor(seconds/60);
    const sec=seconds%60;
    timerDisplay.textContent=`${min<10?'0':''}${min}:${sec<10?'0':''}${sec}`;
}

function displayEndTime(timestamp)
{
    const time=new Date(timestamp);
    const hr=time.getHours()%12;
    const min=time.getMinutes();
    endTime.textContent=`Be Back At ${hr}:${min<10?'0':''}${min}`;
}

function setTimer()
{
    
    const seconds=this.dataset.time;
    timer(seconds);
}

function getMinutes(e)
{
    e.preventDefault();
    const text=this.querySelector("[name='minutes']");
    timer(parseInt(text.value)*60);
}

buttons.forEach( (button) => button.addEventListener("click",setTimer));

const form=document.querySelector("#custom");
console.dir(form);
form.addEventListener("submit",getMinutes);