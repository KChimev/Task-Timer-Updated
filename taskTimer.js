let hours=0;
let interval;  
let minutes=0;
let seconds=0;
let timeArr=[];
let arrHours=0;
let arrSeconds=0;
let arrMinutes=0;
let typingTimer;             
let doneTypingInterval = 2000;  //CONTROLS USER TIME OUT OF INPUT
let input=document.getElementById("time-taken");

input.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    if (input.value) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});
function doneTyping () {
    document.querySelector("button").innerHTML=`<span class="material-icons">stop</span>`;
    document.querySelector("button").setAttribute("id", "stop");
    start();
}

function start(){
    let userInput=input.value;
    let regex=/\d{1,2}[:]\d{1,2}[:]\d{1,2}/;
    if(regex.test(userInput)!=true){
        checkInput();
    }
    else{
        timeArr=userInput.split(":");
    }
    hours=parseInt(timeArr[0],10);
    minutes=parseInt(timeArr[1],10);
    seconds=parseInt(timeArr[2],10);
    let totalSeconds=hours*3600+minutes*60+seconds;
    if(document.getElementById("start")!=null){
            function startInterval(){
                interval=setInterval(()=>{
                totalSeconds++;
                let currentSeconds=(totalSeconds%60);
                let currentMinutes=(Math.floor((totalSeconds%3600)/60));
                let currentHours=(Math.floor(totalSeconds/3600));
                timeArr[0]=currentHours.toString().padStart(2,"00");
                timeArr[1]=currentMinutes.toString().padStart(2,"0");
                timeArr[2]=currentSeconds.toString().padStart(2,"0");
                updateInterfaceTime();
                },1000);    
            }
        startInterval();
        updateInterfaceControls();
        }

    else if(document.getElementById("stop")!=null){
       updateInterfaceTime();
       updatePassedTime();
       clearInterval(interval);
       interval=null;
       updateInterfaceControls();
    }
    function updateInterfaceTime(){
        let regex=/[,]/g;
        input.value=timeArr.toString().replace(regex,":");
    }
    
    function updateInterfaceControls(){
        if(interval!=null){
            document.querySelector("button").innerHTML=`<span class="material-icons">stop</span>`;
            document.querySelector("button").setAttribute("id", "stop");
        }
        else if(interval==null){
            document.querySelector("button").innerHTML=`<span class="material-icons">play_arrow</span>`;
            document.querySelector("button").setAttribute("id", "start");
        }
    }

    function updatePassedTime(){
    hours=parseInt(timeArr[0],10);
    minutes=parseInt(timeArr[1],10);
    seconds=parseInt(timeArr[2],10);
    }
    
    function checkInput(){
        userInput=userInput.toLowerCase();
        let inputArr=userInput.split(" ");
        let numberObject={
        "един":1,"една":1,"два":2,"две":2,"три":3,"четири":4,"пет":5,"шест":6,"седем":7,"осем":8,"девет":9,"десет":10,
        "единадесет":11,"дванадесет":12,"тринадесет":13,"четиринадесет":14,"петнадесет":15,"шестнадесет":16,"седемнадесет":17,"осемнадесет":18,
        "деветнадесет":19,"двадесет":20,"тридесет":30,"четиридесет":40,"петдесет":50,"шестдесет":60,
        }
        let hoursObject={
            "час":0,
            "часа":0,
        }
        let minutesObject={
            "минута":0,   
            "минути":0,
        }
        let secondsObject={
            "секунди":0,
            "секунда":0,
        }
        for(let i=0;i<inputArr.length;i++){
        for(const key in numberObject){
                if(key==(inputArr[i])){
                    inputArr[i]=numberObject[key];
                }
            }
        }
        for(let k=0;k<inputArr.length;k++){
        if(hoursObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]!="number"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
            }
            arrHours=inputArr[k-1];
        }
        if(minutesObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]!="number"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
            }
            arrMinutes=inputArr[k-1];
        }
        if(secondsObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]!="number"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
            }
            arrSeconds=inputArr[k-1];
        }
        }
        timeArr[0]=arrHours.toString().padStart(2,"00");
        timeArr[1]=arrMinutes.toString().padStart(2,"0");
        timeArr[2]=arrSeconds.toString().padStart(2,"0");
    }
}