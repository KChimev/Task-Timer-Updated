var interval;  
var hours=0;
var minutes=0;
var seconds=0;
var timeArr=[];
var arrHours=0;
var arrSeconds=0;
var arrMinutes=0;
function start(){
    let input=document.getElementById("time-taken");
    let userInput=input.value;
    var regex=/\d{1,2}[:]\d{1,2}[:]\d{1,2}/;
    if(regex.test(userInput)!=true){
        checkInput();

    }
    else{
        timeArr=userInput.split(":");
    }
    // let timeArr=userInput.split(":");
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
       var selectedRadius=document.getElementById("radius-select").value;
       if(selectedRadius!="0"){
         var zero=0;
         var leftSecs=parseInt(timeArr[2],10);
         timeArr[2]=zero.toString().padStart(2,"00");
         var mins=parseInt(timeArr[1],10);
         var leftMins=mins%selectedRadius+leftSecs/60;
         if(leftMins>(selectedRadius/2)){
            mins=mins-(mins%parseInt(selectedRadius,10))+parseInt(selectedRadius,10);
         }
         else if(leftMins<(selectedRadius/2)){
            mins=mins-(mins%parseInt(selectedRadius,10));
         }
         timeArr[1]=mins.toString().padStart(2,"00");
         updatePassedTime();
         updateInterfaceTime();
    }
    }
    function updateInterfaceTime(){
        var regex=/[,]/g;
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
    var numberObject={
    "????????":1,"????????":1,"??????":2,"??????":2,"??????":3,"????????????":4,"??????":5,"????????":6,"??????????":7,"????????":8,"??????????":9,"??????????":10,"????????????????????":11,"????????????????????":12,"????????????????????":13,"??????????????????????????":14,"????????????????????":15,"??????????????????????":16,"????????????????????????":17,"??????????????????????":18,"????????????????????????":19,"????????????????":20,"????????????????":30,"??????????????????????":40,"????????????????":50,"??????????????????":60,
    }
    let hoursObject={
        "??????":0,
        "????????":0,
    }
    let minutesObject={
        "????????????":0,   
        "????????????":0,
    }
    let secondsObject={
        "??????????????":0,
        "??????????????":0,
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
            arrHours=arrHours+inputArr[k-1];
        }
        if(minutesObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]!="number"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
            }
            arrMinutes=arrMinutes+inputArr[k-1];
        }
        if(secondsObject.hasOwnProperty(inputArr[k])){
            if(typeof inputArr[k-1]!="number"){
                inputArr[k-1]=parseInt(inputArr[k-1],10);
            }
            arrSeconds=arrSeconds+inputArr[k-1];
        }
        }
        userInput=arrHours+":"+arrMinutes+":"+arrSeconds;
        return timeArr=userInput.split(":");
    }
}
