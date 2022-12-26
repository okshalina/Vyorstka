var username = document.getElementById("username");
localStorage.setItem('lvl1', 0);
localStorage.setItem('lvl2', 0);
localStorage.setItem('lvl3', 0);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
localStorage.setItem('counter1', 0);
localStorage.setItem('counter2', 0);
localStorage.setItem('counter3', 0);

function start() {
    console.log(username.value);
    if (isEmpty(username.value)) {
        localStorage.setItem('name', 'Гость');
    }
    else {
        localStorage.setItem('name', username.value.trim());
    }
    document.location.href = "pages/level1.html";
}
function isEmpty(str) {
    return str.trim() == '';
}