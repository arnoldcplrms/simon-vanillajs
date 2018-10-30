let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


strictButton.addEventListener('click', event => {
    strictButton.checked == true ?
        strict = true :
        strict = false
});

onButton.addEventListener('click', event => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', event => {
    if (on || win) play();
});


const play = () => {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;

    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1)
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800)
}

const gameTurn = () => {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) flashColorOrder("clip1", "lightgreen", topLeft)
            if (order[flash] == 2) flashColorOrder("clip2", "tomato", topRight)
            if (order[flash] == 3) flashColorOrder("clip3", "yellow", bottomLeft)
            if (order[flash] == 4) flashColorOrder("clip4", "lightskyblue", bottomRight)
            flash++;
        }, 200);
    }
}

const flashColorOrder = (audioClipId, buttonBgColor, buttonElement) => {
    if (noise) {
        document.getElementById(audioClipId).play()
    }
    noise = true;
    buttonElement.style.backgroundColor = buttonBgColor;
}

const clearColor = () => {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

const flashColor = () => {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', event => {
    if (on) {
        playerOrder.push(1);
        check();
        flashColorOrder("clip1", "lightgreen", topLeft)
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});


topRight.addEventListener('click', event => {
    if (on) {
        playerOrder.push(2);
        check();
        flashColorOrder("clip2", "tomato", topRight)
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', event => {
    if (on) {
        playerOrder.push(3);
        check();
        flashColorOrder("clip3", "yellow", bottomLeft)
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', event => {
    if (on) {
        playerOrder.push(4);
        check();
        flashColorOrder("clip4", "lightskyblue", bottomRight)
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

const check = () => {

    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good)
        winGame();

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!"
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false
    }

    if (turn == playerOrder.length && good & !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

const winGame = () => {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}