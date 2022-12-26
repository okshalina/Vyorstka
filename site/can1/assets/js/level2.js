const can = document.getElementById('can')
const cv = canvas.getContext('2d')
canvas.width=innerWidth;
canvas.height=innerHeight;

var rockets = [];
var planets = []; 
var planetCounter=6; // Число всех планет
var click_count = 0;
var counter2 = Number(localStorage.getItem("counter2"));

const rocket1 = new Image();
const rocket2 = new Image();
const rocket3 = new Image();
const rocket4 = new Image();
const rocket5 = new Image();
const rocket6 = new Image();
const rocket7 = new Image();
const rocket8 = new Image();
rocket1.src="../assets/imgages/8.png";
rocket2.src="../assets/imgages/9.png";
rocket3.src="../assets/imgages/10.png";
rocket4.src="../assets/imgages/11.png";
rocket5.src="../assets/imgages/12.png";
rocket6.src="../assets/imgages/13.png";
rocket7.src="../assets/imgages/14.png";
rocket8.src="../assets/imgages/15.png";


const planet1 = new Image();
const planet2 = new Image();
const planet3 = new Image();
const planet4 = new Image();
const planet5 = new Image();
const planet6 = new Image();
planet1.src="../assets/imgages/1.png";
planet2.src="../assets/imgages/2.png";
planet3.src="../assets/imgages/3.png";
planet4.src="../assets/imgages/4.png";
planet5.src="../assets/imgages/5.png";
planet6.src="../assets/imgages/6.png";

var rndFlyObject = randomInteger(1,4);
var rndTime = Math.floor(randomInteger(5000, 15000)/1000);
var rndNumRockets = randomInteger(5,8);
var rndNumPlanets = randomInteger(4,planetCounter);


function randomInteger(min, max) {
    let rand = min + (1 - Math.random()) * (max - min);
    return Math.floor(rand);
};


class FlyObject {

    constructor(xpos, ypos, velx, vely, image) {
        this.position = {
            x: xpos,
            y: ypos
        }

        this.velocity = {
            x: velx,
            y: vely
        }

        this.rotation=0;

        image.onload = () => {
            this.image=image
            this.width=image.width*0.1
            this.height=image.height*0.1
        } 
    }
    draw () {
        c.save();
        if(this.image) {
            cv.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
        c.restore();
    }
    updatee() {
        if(this.image) {   
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.x +  this.width/2 < 0) {
            this.velocity.x = -this.velocity.x;
        } 
        else if (this.position.x + this.width/2 > cv.canvas.width) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y + this.height/2 < 0) {
            this.velocity.y = -this.velocity.y;
        } 
        else if (this.position.y + this.height/2 > cv.canvas.height) {
            this.velocity.y = -this.velocity.y;
        }
    }
    }
    stop() {
        if(this.image) {
        this.draw();
        this.velocity.x = 0;
        this.velocity.y = 0;
        }
    }
}


function stopAnimate() {
    requestAnimationFrame(stopAnimate);
    rockets.forEach((rocket) => {
        rocket.stop();
    });
}

function animatee() {
    requestAnimationFrame(animatee);

    planets.forEach((planet) => {
        planet.width=planet.image.width*0.3;
        planet.height=planet.image.height*0.3;
        planet.draw();
    });

    rockets.forEach((rocket) => {
        rocket.updatee();
    });

};

function myClick() {
    var end = Date.now();
    console.log(end);
    stopAnimate();
    var start = localStorage.getItem('start');
    console.log(start);
    var result = (end-start)/1000;
    
    console.log((end-start)/1000);
      
    click_count++;  
    if(click_count == 1) {
       document.removeEventListener('dblclick', myClick);
       checkResult(result);
    }  
}




function getStarted (rndTime) {
    var start;
    var div = document.createElement('div');
    div.className = "center";
    div.id="start";
    div.innerHTML = "<h3>Останови движущиеся объекты спустя время:</h3>";
    var p = document.createElement('p');
    p.classList.add("scores");
    p.innerHTML = rndTime ;
    switch (rndTime) {
        case 1: p.innerHTML = p.innerHTML  + " секунду"
        break;
        case 2: p.innerHTML = p.innerHTML + " секунды"
        break;
        case 3: p.innerHTML = p.innerHTML + " секунды"
        break;
        case 4: p.innerHTML = p.innerHTML + " секунды"
        break;
        default: p.innerHTML = p.innerHTML + " секунд"
        break;
    }
    div.appendChild(p);
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="Начать";
    div.appendChild(btn);
    document.body.append(div);

    btn.addEventListener('click', () => {
        document.getElementById("start").remove();
        start = Date.now(); 
        console.log(start);
        localStorage.setItem('start', start);
        animatee();
        document.addEventListener('dblclick', myClick);
        var timerId = setInterval(function() { 
            myClick();
            }, 30000);   
            
        var timerIdd = setInterval(function() { 
            document.location.href = "../pages/results.html";
        }, 360000);
    });
   
};


function  levelInformation(score){
    rockets.forEach((rocket) => {
        delete rocket.image;
    });
    delete rockets;
    planets.forEach((planet) => {
        delete planet.image;
    });
    delete planets;
    console.log(score);
    mouseDown=true;
    addEventListener('mousedown', () => {
        mouseDown = true;
    });
      
    addEventListener('mouseup', () => {
        mouseDown = true;
    });
    localStorage.setItem('lvl2', score);
    var div = document.createElement('div');
    div.className = "center";
    div.innerHTML = "<h3>Баллы за 2 уровень:</h3>";
    var p = document.createElement('p');
    p.classList.add("scores");
    p.innerHTML = score;
    div.appendChild(p);
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="Следующий уровень";
    btn.addEventListener('click', () => {
        document.location.href = "../pages/level3.html";
    });
    div.appendChild(btn);
    document.body.append(div);
    var timerId = setInterval(function() { 
        document.location.href = "../pages/results.html";
    }, 360000);
}

function getRandomImageString (rndFlyObject) {
    switch (rndFlyObject) {
        case 1: return rocket1
        break;
        case 2: return rocket4
        break;
        case 3: return rocket3
        break;
        case 4: return rocket2
        break;
        case 5: return rocket5
        break;
        case 6: return rocket6
        break;
        case 7: return rocket7
        break;
        case 8: return rocket8
        break;
    }
}

function getRandomPlanetString (rndFlyObject) {
    switch (rndFlyObject) {
        case 1: return planet1
        break;
        case 2: return planet2
        break;
        case 3: return planet3
        break;
        case 4: return planet4
        break;
        case 5: return planet5
        break;
        case 6: return planet6
        break;
    }
}

function rndFlyObj(rndNumRockets) {
    var x, y, velx, vely;
    var img;
    for(var i=0; i < rndNumRockets; i++) {
        x = randomInteger(1,canvas.width - 100);
        y=randomInteger(1,canvas.height-200);
        velx = randomInteger(5,10);
        vely=randomInteger(5,10);
        img =  getRandomImageString (i+1);
        rockets.push(new FlyObject(x,y,velx,vely,img));
    }
};

function rndPlanets() {

    planets[0] = new FlyObject(canvas.width/2,canvas.height/2,0,0,planet2);
    planets[1] = new FlyObject(canvas.width/5,canvas.height/4,0,0,planet1);
    planets[2] = new FlyObject(0,canvas.height-200,0,0,planet3);
    planets[3] = new FlyObject(canvas.width/2+canvas.width/4,canvas.height/5,0,0,planet4);
    planets[4] = new FlyObject(canvas.width-canvas.width/5,canvas.height-canvas.height/3,0,0,planet5);
    planets[5] = new FlyObject(0,0,0,0,planet6);
};

function checkResult(res) {
    console.log(rndTime);
    console.log(rndTime - res);
        if ((Math.abs(Math.floor(rndTime)-res) <= 1 || Math.abs(Math.round(rndTime)-res) <=1.5)) {
            counter2+=200;
            levelInformation(counter2);   
        }

        else {
            counter2+=50;
            levelInformation(counter2); 
        }
    console.log(counter2);
    localStorage.removeItem('start');
};

rndFlyObj(rndNumRockets);
rndPlanets();
getStarted(rndTime);
