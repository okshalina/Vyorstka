let reset = document.getElementById("reset");
let nname = localStorage.getItem('name');
let save = document.getElementById("save");
let a = localStorage.getItem('lvl1');
let b = localStorage.getItem('lvl2');
let v = localStorage.getItem('lvl3');

let score = Number(a) + Number(b) + Number(v);

var sum = document.getElementById('sum');
var lev1 = document.getElementById('lvl1');
var lev2 = document.getElementById('lvl2');
var lev3 = document.getElementById('lvl3');
var name1 = document.getElementById('name');
sum.innerHTML="Всего: " + score;
lev1.innerHTML="Уровень 1:  " + a;
lev2.innerHTML="Уровень 2:  " + b;
lev3.innerHTML="Уровень 3:  " + v;

name1.innerHTML = "Так держать, " + nname + "!";

reset.onclick = function reset() {
    localStorage.setItem('counter1', 0);
    localStorage.setItem('counter2', 0);
    localStorage.setItem('counter3', 0);
    document.location.href = "level1.html";
}

var date = new Date();

var hrs = date.getHours();
var mins = date.getMinutes();
var month = Number(date.getMonth())+1;
let data = nname+" "+"\nРезультат: " + score + "\nУровень 1: " + a + "\nУровень 2: " + b + "\nУровень 3: " + v;
let filename;
if (Number(mins) < 10) {
     filename = nname+"_"+date.getDate()+"."+month+"."+date.getFullYear()+"_"+hrs+"."+0+mins+".txt"; 
}
else filename = nname+"_"+date.getDate()+"."+month+"."+date.getFullYear()+"_"+hrs+"."+mins+".txt"; 
let type = "txt";
save.onclick = function () {
    download(data, filename, type);
    function download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var aa = document.createElement("a"),
                url = URL.createObjectURL(file);
            aa.href = url;
            aa.download = filename;
            document.body.appendChild(aa);
            aa.click();
            setTimeout(function () {
                document.body.removeChild(aa);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    document.location.href = "../index.html";
}