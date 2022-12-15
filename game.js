const distractions = document.querySelectorAll(".distraction");
const main = document.querySelectorAll(".main");
const trs = document.querySelectorAll("tr");
const tds = document.querySelectorAll("td");
const table = document.querySelector("table");
const scoreDiv = document.querySelector(".scoreDiv");
const score = document.querySelector(".score");
const gameOverSign = document.querySelector(".gameOverSign");
const gameOverDisplay = document.querySelector(".gameOverDisplay");

let tableTds = [[], [], [], [], []];
let inc = 0;
let points = 0;

let birdsHTML = [
    `<img src="up.png" alt="Up Direction Bird"/>`,
    `<img src="right.png" alt="Right Direction Bird"/>`,
    `<img src="down.png" alt="Down Direction Bird"/>`,
    `<img src="left.png" alt="Left Direction Bird"/>`
]
let mainBirdDirection;
let gameOver = false;

function getRandomPosition() {
	var randomX = Math.floor(Math.random()*(window.innerHeight - 400));
	var randomY = Math.floor(Math.random()*(window.innerWidth - 300));
    // console.log(randomX, randomY)
	return [randomX+"px",randomY+"px"];
}

for (let i = 0; i < trs.length; i++) {
    for (let j = 0; j < trs.length; j++) {
        tableTds[i][j] = tds[inc++];
    }
}

const spawnCoordinates = [
    [[0, 0], [1, 1], [3, 1], [4, 0]],
    [[0, 0], [1, 1], [1, 3], [0, 4]],
    [[0, 0], [1, 1], [3, 3], [4, 4]],
    [[0, 4], [1, 3], [3, 1], [4, 0]],
    [[0, 4], [1, 3], [3, 3], [4, 4]],
    [[2, 0], [2, 1], [2, 3], [2, 4]],
    [[0, 2], [1, 2], [3, 2], [4, 2]],
    [[4, 0], [3, 1], [3, 3], [4, 4]],
    [[4, 1], [3, 1], [3, 3], [4, 3]],
    [[0, 1], [1, 1], [1, 3], [0, 3]],
    [[1, 0], [1, 1], [3, 1], [3, 0]],
    [[1, 4], [1, 3], [3, 3], [3, 4]],
    [[1, 0], [1, 1], [2, 3], [2, 4]],
    [[2, 0], [2, 1], [1, 3], [1, 4]],
    [[0, 3], [1, 3], [3, 1], [4, 1]],
    [[0, 1], [1, 1], [3, 3], [4, 3]],
    [[2, 1], [1, 2], [2, 3], [3, 2]]
]


function spawnBirds() {
    [table.style.top, table.style.left] = getRandomPosition();

    for (let i = 0; i < trs.length; i++) {
        for (let j = 0; j < trs.length; j++) {
            tableTds[i][j].innerHTML = "";
        }
    }
    const randomNumber = Math.round(Math.random() * (spawnCoordinates.length - 1));
    const randomDistractionNumber = Math.round(Math.random() * (birdsHTML.length - 1));
    const randomMainNumber = Math.round(Math.random() * (birdsHTML.length - 1));
    const coordinates = spawnCoordinates[16]
    for (let i = 0; i < coordinates.length; i++) {
        tableTds[coordinates[i][0]][coordinates[i][1]].innerHTML = birdsHTML[randomDistractionNumber];
    }
    tableTds[2][2].innerHTML = birdsHTML[randomMainNumber];
    mainBirdDirection = randomMainNumber;
}

spawnBirds();


function handleSwipe(swipe){
    if(gameOver){
        return;
    }
    const mainBirdSwipe = ["up", "right", "down", "left"][mainBirdDirection];
    if(mainBirdSwipe == swipe){
        points += 100;
        score.innerHTML = points;
        spawnBirds();
    } else {
        gameOver = true;
        for (let i = 0; i < trs.length; i++) {
            for (let j = 0; j < trs.length; j++) {
                tableTds[i][j].innerHTML = "";
            }
        }

        gameOverDisplay.style.display = "flex";
        gameOverDisplay.style.flexDirection = "column";
        gameOverDisplay.style.justifyContent = "center";
        gameOverDisplay.style.alignItems = "center";
        gameOverDisplay.style.height = "97vh";
        gameOverDisplay.style.fontWeight = "bolder";
        gameOverSign.hidden = false;
    }
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

document.addEventListener('mousedown', handleTouchStart, false);
document.addEventListener('mouseup', handleTouchMove, false);

var xDown = null;
var yDown = null;
var xUp, yUp;
function handleTouchStart(evt) {
    if (evt.type == "mousedown") {
        xDown = evt.clientX;
        yDown = evt.clientY;
    } else {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }
};


function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    if (evt.type == "mouseup") {
        xUp = evt.clientX;
        yUp = evt.clientY;
    } else {
        xUp = evt.touches[0].clientX;
        yUp = evt.touches[0].clientY;
    }

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if(xDiff==0 && yDiff==0){
        // Just a click
        return;
    }

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            // console.log("swiped left")
            handleSwipe("left")
        } else {
            /* right swipe */
            // console.log("swiped right")
            handleSwipe("right")
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            // console.log("swiped up")
            handleSwipe("up")
        } else {
            /* down swipe */
            // console.log("swiped down")
            handleSwipe("down")
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
