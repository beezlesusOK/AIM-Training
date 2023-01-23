const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#timelist');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#FFB6C1', '#DB7093', '	#DA70D6', '#FF00FF', '#7B68EE',
 '#663399', '#F08080', '#B22222', '	#FF7F50', '#FFFACD', '#00FA9A', '#9ACD32',
  '#20B2AA', '#008080', '#48D1CC', '#0000FF', '#87CEFA', '#B8860B',
   '#2F4F4F', '#B0C4DE', '#20B2AA', '#98FB98', '#BDB76B', '#DC143C'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    } 
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`

}

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle')
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    const color = getRandomColor();
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    board.append(circle);
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setTime(value) {
    timeEl.innerHTML = `00:${time}`;
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}