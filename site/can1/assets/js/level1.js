const can = document.getElementById("can")
const ctx = can.getContext("2d")
can.width=innerWidth/21
can.height=innerHeight/7.5


var planets = []; // Массив индексов планет
var diffx=[]; // Массив для хранения расстояний по х до планет
var diffy=[]; // Массив для хранения расстояний по y до планет
var planetCounter=6; // Число всех планет
var planetCount1 = 3; // Число планет для уровня 1.1
var planetCount2 = 4; // Число планет для уровня 1.1

var rocketWidth = innerWidth*0.043;
var rocketHeight = innerHeight*0.12;

localStorage.setItem('lvl1', 0);
localStorage.setItem('lvl2', 0);
localStorage.setItem('lvl3', 0);
localStorage.setItem('levelNum', 1);

let counter1 = Number(localStorage.getItem("counter1"));


function randomInteger(min, max) {
    let rand = min + (1 - Math.random()) * (max - min);
    return Math.floor(rand);
};

function getPlanets (count) {               // Получаем массив рандомных планет
    for(var i=1; i<=count; i++) {
        var randomNumber = randomInteger(1,planetCounter);
        while(planets.includes(randomNumber)) {
            randomNumber = randomInteger(1,planetCounter);
        }
    planets.push(randomNumber);
    }
    
};

function getPlanetsField(num) {        // Получаем поле рандомных планет
    for(var i=1; i<=planets.length; i++) {
        document.getElementById(planets[i-1]).classList.remove("hidden");
        var newClass = 'image'+num+i;
        document.getElementById(planets[i-1]).classList.add(newClass);
    }
    
};

function clearPlanets() {
    planets.length=0;
};

function clearPlanetsField(num) {
    for(var i=1; i<=planets.length; i++) {
        var newClass = 'image'+num+i;
        document.getElementById(planets[i-1]).classList.remove(newClass);
        document.getElementById(planets[i-1]).classList.add("hidden");
    }
};

function initiateRocket(num) {
    fly.style.removeProperty("display");
    fly.style.width=rocketWidth+"px";
    fly.style.height=rocketHeight+"px";
    fly.style.position="relative";
    var newClass = 'image'+num+1;
    fly.classList.add(newClass);
    fly.classList.remove("hidden");
};

function clearRocket(num) {
    var newClass = 'image'+num+1;
    fly.classList.remove(newClass);
    fly.classList.add("hidden");
};

function moveRocket(i, rndTime) {
    var fx = fly.getBoundingClientRect().x + 0.5*fly.getBoundingClientRect().width;
    var fy = fly.getBoundingClientRect().y + 0.5*fly.getBoundingClientRect().height;
    diffx[0]= 0;
    diffy[0] = 0;
    for (var j=1; j<planets.length; j++) {
        var x = document.getElementById(planets[j]).getBoundingClientRect().x + 0.5*document.getElementById(planets[j]).getBoundingClientRect().width;
        var y = document.getElementById(planets[j]).getBoundingClientRect().y + 0.5*document.getElementById(planets[j]).getBoundingClientRect().height;
        diffx[j]= Math.abs(fx-x);
        diffy[j] = y - fy;    
    }
    
    if (i == 1 && planets.length==3)  {
    var mov=[
        {transform: 'translate3d(0px, 0px, 0px)'},
        {transform: 'rotate(90deg)'},
        {transform: 'translate3d('+diffx[i]+'px, '+diffy[i]+'px, 0px)'},
        {transform: 'rotate(-90deg)'},
        {transform: 'translate3d(0px, 0px, 0px)'},
        {transform: 'rotate(90deg)'},
        {transform: 'translate3d('+diffx[i+1]+'px, '+diffy[i+1]+'px, 0px)'},
        {transform: 'rotate(-90deg)'},
        {transform: 'translate3d(0px, 0px, 0px)'}
    ];
      
    var timing = {
        duration:rndTime,
        iterations:1
    }
        
        var animation = fly.animate(mov, timing);
            animation.addEventListener('finish', function() {
                fly.style.transform = 'translate3d('+diffx+'px, '+diffy+'px, 0px)';
                checkResult(rndTime);
        });
    }
    else  if (i == 2 && planets.length==3)  {
        var mov=[
            {transform: 'translate3d(0px, 0px, 0px)'},
            {transform: 'rotate(90deg)'},
            {transform: 'translate3d('+diffx[i]+'px, '+diffy[i]+'px, 0px)'},
            {transform: 'rotate-90deg)'},
            {transform: 'translate3d(0px, 0px, 0px)'},
            {transform: 'rotate(90deg)'},
            {transform: 'translate3d('+diffx[i-1]+'px, '+diffy[i-1]+'px, 0px)'},
            {transform: 'rotate(-90deg)'},
            {transform: 'translate3d(0px, 0px, 0px)'}
        ];
          
        var timing = {
            duration:rndTime,
            iterations:1
        }
           var animation = fly.animate(mov, timing);
            animation.addEventListener('finish', function() {
                fly.style.transform = 'translate3d('+diffx+'px, '+diffy+'px, 0px)';
                checkResult(rndTime);
            });
    }
        else  if (i == 1 && planets.length==4)  {
            var mov=[
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i]+'px, '+diffy[i]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i+1]+'px, '+diffy[i+1]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i+2]+'px, '+diffy[i+2]+'px, 0px)'},
            ];
              
            var timing = {
                duration:rndTime,
                iterations:1
            }
                
            var animation = fly.animate(mov, timing);
                animation.addEventListener('finish', function() {
                    fly.style.transform = 'translate3d('+diffx[i+2]+'px, '+diffy[i+2]+'px, 0px)';
                    checkResult(rndTime);
                });
        }
        else  if (i == 2 && planets.length==4)  {
            var mov=[
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i]+'px, '+diffy[i]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i+1]+'px, '+diffy[i+1]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i-1]+'px, '+diffy[i-1]+'px, 0px)'},
            ];
              
            var timing = {
                duration:rndTime,
                iterations:1
            }
                
            var animation = fly.animate(mov, timing);
                animation.addEventListener('finish', function() {
                    fly.style.transform = 'translate3d('+diffx[i-1]+'px, '+diffy[i-1]+'px, 0px)';
                    checkResult(rndTime);
                });
        }
        else  if (i == 3 && planets.length==4)  {
            var mov=[
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i]+'px, '+diffy[i]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i-2]+'px, '+diffy[i-2]+'px, 0px)'},
                {transform: 'rotate(-90deg)'},
                {transform: 'translate3d(0px, 0px, 0px)'},
                {transform: 'rotate(90deg)'},
                {transform: 'translate3d('+diffx[i-1]+'px, '+diffy[i-1]+'px, 0px)'},
            ];
              
            var timing = {
                duration:rndTime,
                iterations:1
            }
                
            var animation = fly.animate(mov, timing);
                animation.addEventListener('finish', function() {
                    fly.style.transform = 'translate3d('+diffx[i-1]+'px, '+diffy[i-1]+'px, 0px)';
                    checkResult(rndTime);
                });
        }
};

function generateRoute (planetCount) {
    return randomInteger(1, planetCount);
};

function getStarted (rnd, rndTime) {
    var div = document.createElement('div');
    div.className = "center";
    div.id="start";
    div.innerHTML = "<h3>Посчитай время в секундах от начала движения объекта до его остановки</h3>";
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="Начать";
    div.appendChild(btn);
    document.body.append(div);
    btn.addEventListener('click', () => {
        document.getElementById("start").remove();
        moveRocket(rnd, rndTime, rndIterations);
    });
};

function createNewLevel (rnd, rndTime){    
        localStorage.setItem('levelNum', Number(localStorage.getItem('levelNum'))+1);
        diffx.length=0;
        diffy.length=0;
        clearRocket(1);
        clearPlanetsField(1);
        clearPlanets(1);
        getPlanets(planetCount2);
        getPlanetsField(2);
        moveRocket(planetCount2);
        initiateRocket(2);
        moveRocket(rnd, rndTime);  
        console.log(rndTime);
}

function  levelInformation(score){
    console.log(score);
    mouseDown=true;
    addEventListener('mousedown', () => {
        mouseDown = true
      })
      
      addEventListener('mouseup', () => {
        mouseDown = true
      })
    localStorage.setItem('lvl1', score);
    clearRocket(2);
    clearPlanetsField(2);
    localStorage.setItem('lvl1', score);
    var div = document.createElement('div');
    div.className = "center";
    div.innerHTML = "<h3>Баллы за 1 уровень:</h3>";
    var p = document.createElement('p');
    p.classList.add("scores");
    p.innerHTML = score;
    div.appendChild(p);
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="Следующий уровень";
    btn.addEventListener('click', () => {
        document.location.href = "../pages/level2.html";
    });
    div.appendChild(btn);
    document.body.append(div);
    var timerId = setInterval(function() { 
        document.location.href = "../pages/results.html";
        }, 360000);
}


function checkResult(rndTime) {
    var div = document.createElement('div');
    div.className = "center";
    div.id="answer";
    var input = document.createElement('input');
    input.placeholder="Введите ваш ответ";
    input.className="text";
    input.id="inp";
    div.appendChild(input);
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="Подтвердить";
    div.appendChild(btn);
    document.body.append(div);
    var timerId = setInterval(function() { 
        document.location.href = "../pages/results.html";
        }, 360000);
    btn.addEventListener('click', () => {
        res=document.getElementById("inp").value;
        document.getElementById("answer").remove();
        res=Number(res);
        if (!isNaN(res) && (Math.abs(Math.floor(rndTime/1000)-res) <= 1 || Math.abs(Math.round(rndTime/1000)-res) <=1.5) && Number(localStorage.getItem('levelNum'))<2) {
            counter1+=200;
            var div = document.createElement('div');
            div.className = "center";
            div.id="start";
            div.innerHTML = "<h1>Успешно!</h1>";
            var p = document.createElement('p');
            p.classList.add("scores");
            p.innerHTML =counter1 + " баллов";
            div.appendChild(p);
            var btn = document.createElement('button');
            btn.classList.add("button");
            btn.innerHTML="Попробовать ещё раз";
            div.appendChild(btn);
            document.body.append(div);
            btn.addEventListener('click', () => {
                document.getElementById("start").remove();
                createNewLevel(rnd2, rndTime2);  
            });  
            var timerId = setInterval(function() { 
                document.location.href = "../pages/results.html";
            }, 360000);
        }
        else if(!isNaN(res) && (Math.abs(Math.floor(rndTime/1000)-res) <= 1 || Math.abs(Math.round(rndTime/1000)-res) <=1.5) && Number(localStorage.getItem('levelNum')) == 2) {
            counter1+=200;
            levelInformation(counter1);
        }
        else if(Number(localStorage.getItem('levelNum')) == 2){
            counter1+=50;
            levelInformation(counter1);
        }
        else {
            counter1+=50;
            var div = document.createElement('div');
            div.className = "center";
            div.id="start";
            div.innerHTML = "<h1>Ответ не совпал :(</h1>";
            var p = document.createElement('p');
            p.classList.add("scores");
            p.innerHTML =counter1 + " баллов";
            div.appendChild(p);
            var btn = document.createElement('button');
            btn.classList.add("button");
            btn.innerHTML="Попробовать ещё раз";
            div.appendChild(btn);
            document.body.append(div);
            btn.addEventListener('click', () => {
                document.getElementById("start").remove();
                createNewLevel(rnd2, rndTime2);  
            });   
            var timerId = setInterval(function() { 
                document.location.href = "../pages/results.html";
            }, 360000);
        }
    });
    
};

var rndFly = randomInteger(8,11);
var fly = document.getElementById(rndFly);
var rndTime = randomInteger(4000, 11000);
var rndTime2 = randomInteger(5000, 9000);
var rndIterations = randomInteger(1, 2);
var rnd = generateRoute(planetCount1);
var rnd2 = generateRoute(planetCount2);
getPlanets(planetCount1); 
getPlanetsField(1); 
initiateRocket(1); 
getStarted(rnd, rndTime);
console.log(rndTime);

