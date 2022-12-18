const can = document.getElementById('can');
const cann = document.getElementById('cann');
const cans = document.getElementById('cans');
const cv = canvas.getContext('2d');
const ctx = cans.getContext('2d');
const cx= cann.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;
cans.width=innerWidth;
cans.height=innerHeight;
cann.width=innerWidth;
cann.height=innerHeight;

let counter3 = Number(localStorage.getItem("counter3"));
localStorage.setItem('levelNum', 1);
var planets = [];
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

const rocket1 = new Image();
const rocket2 = new Image();
const rocket3 = new Image();
const rocket4 = new Image();
rocket1.src="../assets/imgages/8.png";
rocket2.src="../assets/imgages/9.png";
rocket3.src="../assets/imgages/10.png";
rocket4.src="../assets/imgages/11.png";

var timer = document.getElementById('timer');
var maxTime = 11000;

var isDragging = false;
offset = {};
function randomInteger(min, max) {
    let rand = min + (1 - Math.random()) * (max - min);
    return Math.floor(rand);
};

function formatTime(time) {
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor(time / 1000 % 60);
    if(seconds > 9) return minutes + ':' + seconds;
    else return minutes + ':0' + seconds;
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
            this.width=image.width*0.3
            this.height=image.height*0.3
        } 
    }
    draw() {
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
};

var player = new FlyObject(canvas.width/1.09-50, canvas.height/1.3-30,0,0,rocket4);

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
};

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

function getRandomRoute(num) {

    ctx.setLineDash([7,10]);
    ctx.lineJoin = "round";
    ctx.strokeStyle='#5e2bc4';
    ctx.shadowColor='#fff';
    ctx.shadowBlur = 2;
    ctx.shadowColor='#fff';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 1;
    ctx.lineWidth=5;

    if (num == 1) {
    ctx.lineTo(canvas.width/2.3, canvas.height/2.3);
    ctx.quadraticCurveTo(canvas.width/2, 2*canvas.height/2, canvas.width/4, 1.5*canvas.height/2.5);
    
    ctx.moveTo(canvas.width/4+18, 1.5*canvas.height/2.5);
    ctx.quadraticCurveTo(canvas.width/2, canvas.height/20, canvas.width/8+10, canvas.height/4-3, canvas.width/2, 2*canvas.height/3);
    
    ctx.moveTo(canvas.width/8, canvas.height/4);
    ctx.quadraticCurveTo(canvas.width/20, 2*canvas.height/5.5, canvas.width/4, 1.5*canvas.height/2.5);
    
    ctx.moveTo(canvas.width/2.3, canvas.height/2.3-9);
    ctx.quadraticCurveTo(canvas.width/2.5, canvas.height/5, canvas.width/1.7, canvas.height/4);
    
    ctx.moveTo(canvas.width/1.7+5, canvas.height/4+4);
    ctx.quadraticCurveTo(canvas.width/1.64, canvas.height/4.1, canvas.width/1.2, canvas.height/1.5);

    ctx.moveTo(canvas.width/4+10, 1.5*canvas.height/2.5+20);
    ctx.quadraticCurveTo(canvas.width/5, canvas.height/1.3, canvas.width/10, canvas.height/1.2);
    ctx.stroke();
    }
    else if (num == 2) {

        ctx.moveTo(canvas.width/4+18, 1.5*canvas.height/2.5);
        ctx.quadraticCurveTo(canvas.width/2, canvas.height/20, canvas.width/8+10, canvas.height/4-3, canvas.width/2, 2*canvas.height/3);
        
        ctx.moveTo(canvas.width/8, canvas.height/4);
        ctx.quadraticCurveTo(canvas.width/20, 2*canvas.height/5.5, canvas.width/4, 1.5*canvas.height/2.5);
       
        ctx.moveTo(5*canvas.width/7+70, canvas.height/4);
        ctx.quadraticCurveTo(canvas.width/2, canvas.height/13, canvas.width/2.2+2, canvas.height/1.5);

        ctx.moveTo(canvas.width/2.2+3, canvas.height/1.5+10);
        ctx.quadraticCurveTo(canvas.width/1.8, canvas.height/0.95, canvas.width/1.55, canvas.height/1.5);

        ctx.moveTo(canvas.width/2.2, canvas.height/2);
        ctx.quadraticCurveTo(canvas.width/1.4, canvas.height/5, canvas.width/1.55-5, canvas.height/1.5+7);
        
        ctx.moveTo(canvas.width/2.2-10, canvas.height/2+7);
        ctx.quadraticCurveTo(canvas.width/3, 6*canvas.height/8, canvas.width/4+3, 1.5*canvas.height/2.5-3);
        
        ctx.moveTo(canvas.width/4+10, 3*canvas.height/5+20);
        ctx.quadraticCurveTo(canvas.width/5, canvas.height/1.3, canvas.width/10, canvas.height/1.2);

        ctx.moveTo(5*canvas.width/7+80, canvas.height/4+5);
        ctx.quadraticCurveTo(canvas.width/1, canvas.height/2, canvas.width/1.09, canvas.height/1.3);
        
        ctx.stroke();
        }

};


function isMouseInObject(x,y,object) {
    let objectLeft = object.position.x;
    let objectRight = object.position.x + object.width;
    let objectTop = object.position.y;
    let objectBottom = object.position.y + object.height;

    if(x > objectLeft && x < objectRight && y > objectTop && y < objectBottom) {
        return true;
    }
    return false;
};

document.body.addEventListener("mousedown", function(event) {
     if(isMouseInObject(event.clientX, event.clientY, player)) {
        isDragging = true;
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
        offset.x = event.clientX - player.position.x;
        offset.y = event.clientY - player.position.y;
    }
});

function onMouseMove(event) {
    player.position.x = event.clientX - offset.x;
    player.position.y = event.clientY - offset.y;
};

function onMouseUp(event) {
    isDragging = false;
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
};


function animatee() {
    requestAnimationFrame(animatee);
    planets.forEach((planet) => {
        planet.width=planet.image.width*0.3;
        planet.height=planet.image.height*0.3;
        planet.draw();
    });
    player.width=player.image.width*0.1;
    player.height=player.image.height*0.1;
    player.draw();
};

function createNewLevel(rndTime) {
    player.position.x = canvas.width/1.09-50;
    player.position.y = canvas.height/1.3-30;
    player.image = rocket1;
    var div = document.createElement('div');
    div.className = "center";
    div.id="start";
    div.innerHTML = "<h3>Перемести объект за время:</h3>";
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
        console.log(player.position.x, player.position.y, player.image);
        localStorage.setItem('levelNum', Number(localStorage.getItem('levelNum'))+1);
        var startTime = null;
        var timerId = setInterval(function() {
            if (startTime === null) {
                startTime = Date.now()
            }
        let now = Date.now();
            if(Math.abs(player.position.x - canvas.width/10) <= 50 && Math.abs(player.position.y - canvas.height/1.2) <= 50 && (now - startTime <= maxTime - 2000 - 500)) {
                clearInterval(timerId);
                counter3 += 200;
                levelInformation(counter3);
            }
            else  if ((now - startTime >= maxTime - 2000 - 500)) {
                clearInterval(timerId);
                counter3 += 50;
                levelInformation(counter3);
            }
        timer.innerText = formatTime(maxTime- 2000 - (Date.now() - startTime));
        }, 100); 
    });

};

function levelInformation(score) {
    console.log(score);
    planets.forEach((planet) => {
        delete planet.image;
    });
    delete planets;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    localStorage.setItem('lvl3', score);
    var div = document.createElement('div');
    div.className = "center";
    div.innerHTML = "<h3>Баллы за 3 уровень:</h3>";
    var p = document.createElement('p');
    p.classList.add("scores");
    p.innerHTML = score;
    div.appendChild(p);
    var btn = document.createElement('button');
    btn.classList.add("button");
    btn.innerHTML="К результатам";
    btn.addEventListener('click', () => {
        document.location.href = "../pages/results.html";
    });
    div.appendChild(btn);
    document.body.append(div);
    var timerId = setInterval(function() { 
        document.location.href = "../pages/results.html";
    }, 360000);
};

function getStarted (rndTime) {
    var div = document.createElement('div');
    div.className = "center";
    div.id="start";
    div.innerHTML = "<h3>Перемести объект за время:</h3>";
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
        getRandomRoute(2);
        var startTime = null;
        var timerId = setInterval(function() {
            if (startTime === null) {
                startTime = Date.now()
            }
        let now = Date.now();
            if(Math.abs(player.position.x - canvas.width/10) <= 50 && Math.abs(player.position.y - canvas.height/1.2) <= 50 && (now - startTime <= maxTime - 500)) {
                clearInterval(timerId);
                counter3 += 200;
                if(Number(localStorage.getItem('levelNum')) == 1) {
                    let div = document.createElement('div');
                    div.className = "center";
                    div.id="start";
                    div.innerHTML = "<h1>Успешно!</h1>";
                    var p = document.createElement('p');
                    p.classList.add("scores");
                    p.innerHTML =counter3 + " баллов";
                    div.appendChild(p);
                    var btn = document.createElement('button');
                    btn.classList.add("button");
                    div.appendChild(btn);
                    document.body.append(div);
                    btn.innerHTML="Попробовать ещё раз";
                    btn.addEventListener('click',  () => {
                        document.getElementById("start").remove();
                        createNewLevel(8);
                    });
                } 
                else {
                        levelInformation(counter3);
                }
            }
            else  if ((now - startTime >= maxTime - 500)) {
                clearInterval(timerId);
                counter3 += 50;
                if(Number(localStorage.getItem('levelNum')) == 1) {
                    let div = document.createElement('div');
                    div.className = "center";
                    div.id="start";
                    div.innerHTML = "<h1>Время вышло :(</h1>";
                    var p = document.createElement('p');
                    p.classList.add("scores");
                    p.innerHTML =counter3 + " баллов";
                    div.appendChild(p);
                    var btn = document.createElement('button');
                    btn.classList.add("button");
                    btn.innerHTML="Попробовать ещё раз";
                    div.appendChild(btn);
                    document.body.append(div); 
                    btn.addEventListener('click',  () => {
                        document.getElementById("start").remove();
                        createNewLevel(8);
                    });
                }
                else {
                    document.getElementById("start").remove();
                    levelInformation(counter3);
                }
            }
        timer.innerText = formatTime(maxTime - (Date.now() - startTime));
        }, 100);
    });
     
};

getStarted(10);
rndPlanets();
animatee();
