var myGamePiece;

function startGame() {
    myGamePiece = new component(15, 15, "black", 190, 190);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        document.getElementById("xSpeed").innerHTML = this.speedX;
        document.getElementById("ySpeed").innerHTML = this.speedY;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    if (checkValidMove(myGamePiece.speedY, -1)) { //checks if you can go faster
        myGamePiece.speedY -= 1;
    }
}

function movedown() {
    if (checkValidMove(myGamePiece.speedY, 1)) {
        myGamePiece.speedY += 1;
    }
}

function moveleft() {
    if (checkValidMove(myGamePiece.speedX, -1)) {
        myGamePiece.speedX -= 1;
    }
}

function moveright() {
    if (checkValidMove(myGamePiece.speedX, 1)) {
        myGamePiece.speedX += 1;
    }
}
function uniKeyCode(event) {
    var key = event.keyCode;
    switch (key) {
        case 38:
            moveup();
            break;
        case 40:
            movedown();
            break;
        case 37:
            moveleft();
            break;
        case 39:
            moveright();
            break;
        default:
            console.log("invalid")
    }
}

function checkValidMove(currSpeed, n) { //this runs a check to see if we are allowed to go that fast

    var x = currSpeed + n;
    var maxSpeed = 1;       //sets the maxspeed for the game

    return (x >= -maxSpeed && x <= maxSpeed);
}