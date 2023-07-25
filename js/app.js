const startBt = document.getElementById('startBt');
const cube = document.getElementById('cube');
const cube2 = document.getElementById('cube2');
const scoreBt = document.querySelector('.div1');
const timeDv = document.getElementById('div2');
const menuBt =  document.getElementById('div4');

const timeP = document.getElementById('time');
const scoreP = document.getElementById('score');
const bestScoreP = document.getElementById('bestScore');
const scoresDv =  document.getElementById('scores');
const scoresDv2 =  document.getElementById('scores2');

//sounds
const pointSound = document.querySelector('#point');
const freezeSound = document.querySelector('#freeze');
const loseSound = document.getElementById('lose');
const bigCubeSound = document.getElementById('BigCubeSound');

//basic variables
let time = 60, time2, score = 0, color, x, y, menu, opacity = 0;
let num, num1, num2, num3 = 0, num4;

//scores
let text;
if(localStorage.getItem('text') == null){
    text = '';
}
else{
    text = localStorage.getItem('text');
}

//array
let scores = new Array;
if(localStorage.getItem('scores') == null){
    scores.push(0);
    console.log(scores);
}
else {
    scores = JSON.parse(localStorage.getItem('scores'));
    console.log(scores);
}

//max
let max;
if(localStorage.getItem('max') == null){
    max = 0;
}
else {
    max = Math.max(...scores);
}
bestScoreP.innerText = max;

//booleans
let isClicked = false, cubeIsClicked = false;

//intervals
let mainInterval, timeInterval;

//setup
cube.style.display = '';
cube2.style.visibility = 'hidden';
cube2.style.backgroundColor = 'red';
scoresDv.style.display = 'none';

timeP.innerText = time; 
scoreP.innerText = score;
scoresDv2.innerHTML = localStorage.getItem('text');

const buttons = () => {
    menuBt.addEventListener('click', () => {
        window.open('../index.html', '_parent');
    })
    scoreBt.addEventListener('click', () => {
        if(isClicked == true){

        } else scoresDv.style.display = '';
    })
}

buttons();

startBt.addEventListener('click', () => {
    if(isClicked != true){ 
        isClicked = true;
        start();
        cubeAction();
        BigCube();
    }
});

const start = () => {
    mainfunc();
    mainInterval = setInterval(mainfunc, 900);
    timeInterval = setInterval(changeTime, 1000);
}

const cubeAction = () => {
    cube.addEventListener('click', () => {
        cube.style.display = 'none';
        check();
    });

    cube.addEventListener('mouseover', () =>{
        check2();
    });
}

const mainfunc = () => {
    cube.style.display = '';
    colorcheck();
    position();
}

const colorcheck = () => {
    num = Math.floor(Math.random()*10);
    if(num <= 5){
        color = 'green';
    }
    else if(num <= 8 && num > 5){
        color = 'red';
    }
    else {
        if (cubeIsClicked != true){
            color = 'blue';
        }
        else color = 'green';
    }

    cube.style.background = color;
}

const position = () => {
    x = Math.floor(Math.random()*(window.innerWidth-60));
    y = Math.floor(Math.random()*350);
    cube.style.marginLeft = `${x}px`;
    cube.style.marginTop = `${y}px`;
}

const check = () => {
    if(color == 'green'){
        pointSound.play();
        score ++;
        scoreP.innerText = score;

        if(score > max){
            bestScoreP.innerText = score;
        }
    }
    else if(color == 'red'){
        
    }
    else{
        if(cubeIsClicked != true){
            freezeSound.play();

            cubeIsClicked = true;

            timeDv.style.backgroundColor = 'rgb(117, 255, 255)';

            clearInterval(timeInterval);

            setTimeout(()=>{
                timeInterval = setInterval(changeTime, 1000);
                timeDv.style.backgroundColor = 'white';
                cubeIsClicked = false;
            }, 5000);
        }
    }
}

const check2 = () => {
    if(color == 'red'){
        loseSound.play();
        cube.style.display = 'none';
        gameOver('reason: red cube','You Lose!');
        return;
    }
    else{
        
    }
}

const changeTime = () => {
    time --;
    timeP.innerText = time;
    if(time == 0){
        finish();

        clearInterval(timeInterval);
        gameOver(`Your score was ${score}`,'Game Over');
    }
}

const gameOver = (text, par) => {

    clearInterval(mainInterval);
    clearInterval(timeInterval);

        menu = prompt(`${par}
${text}
restart or back to main menu? (type R for restart and M for menu)`);
        if(menu == 'M'||menu == 'm'){
            window.open('../index.html', '_parent');
        }
        else window.open('../html/game.html', '_parent');
}

const BigCube = () => {
    cube2.style.visibility = 'hidden';

    setInterval(()=>{
        num3 ++;
        cube2.style.transform = `rotate(${num3}deg)` 
    }, 20);

    num1 = Math.ceil(Math.random()*50);
    num2 = Math.ceil(Math.random()*3);
    if(num2 == 1){
        cube2.style.marginLeft = '500px'
        cube2.style.marginTop = '80px';
    } else if(num2 == 2){
        cube2.style.marginTop = '60px'
        cube2.style.marginLeft = '100px';
    } else{
        cube2.style.marginLeft = '800px';
        cube2.style.marginTop = '120px'
    }

    setTimeout(()=>{
        num4 = 40;

        cube2.style.backgroundColor = 'black';
        cube2.style.opacity = 0.1;

        cube2.style.visibility = 'visible';

        setInterval(()=>{
            opacity += 0.08;
            cube2.style.opacity = opacity.toString();
        }, num4);

        setTimeout(bigCubeSound.play(), num4*2)

        setTimeout(()=>{
            cube2.style.opacity = '0';
            cube2.style.backgroundColor = 'red';
    
                setTimeout(()=>{
                cube2.style.visibility = 'hidden'
            }, 15000);
        }, num4*4)
        
    }, num1*1000);

    cube2.addEventListener('mouseover', ()=>{
        if(cube2.style.backgroundColor == 'red'){
            loseSound.play();
            gameOver('reason: BIG red cube','You Lost!');
            return;
        }
    })
}

const finish = () => {
    if(scores[0] == 0){
        scores[0] = score;
    } 
    else {
        scores.push(score);
    }

    localStorage.setItem('scores', JSON.stringify(scores));
    if(score > max){
        bestScoreP.innerText = score;
        localStorage.setItem('max', score);
    }

    text += `<p>${score}</p>`;

    localStorage.setItem('text', text);
    scoresDv2.innerHTML = text;
}

/*
    ^ 1) big cube
    TODO 2) ALL TIME SCORES 
    TODO 3) score history
    TODO 4) BEST score
    TODO 100000) upgrades
    TODO    yellow box
    TODO    purple box
    TODO    (black box)
    TODO 100001) CREDITS
*/