var ovalList = []
var t  = 0


function setup() {
    var canvasWidth = windowWidth;
    var canvasHeight = windowHeight;
    canvas = createCanvas(canvasWidth, canvasHeight);
    //autoCreate()
}

function draw() {
    print(ovalList.length)
    background(0);
    addOval();
    autoCreate()
    for (i=0; i<ovalList.length; i++){
        var oval = ovalList[i]
        if (ovalList[i].xPosition > 0 - oval.radius && ovalList[i].yPosition > 0 - oval.radius && ovalList[i].xPosition < windowWidth + oval.radius && ovalList[i].yPosition < windowHeight + oval.radius) {
            ovalList[i].draw();
            ovalList[i].update();
        }
    }
    t+=1
}

//////////////oval object/////////////////////

function Oval(xPosition, yPosition, xSpeed, ySpeed, radius) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.strokeWeight = 0.3;
    this.fill = "NO";
    this.alpha = 255;
}

Oval.prototype.update = function() {
    this.xPosition += this.xSpeed*0.1;
    this.yPosition += this.ySpeed*0.1;
}

Oval.prototype.wrapAround = function(){
    if (this.xPosition <= -this.radius ) {
        this.xPosition = 320
        this.yPosition = 550
    }
    if (this.xPosition >= this.radius + 650) {
        this.xPosition = 320
        this.yPosition = 550
    }
    if (this.yPosition <= -this.radius ) {
        this.yPosition = 550
        this.xPosition = 320
    }
    if (this.yPosition >= this.radius + 1135) {
        this.yPosition = 550
        this.xPosition = 320
    }
}

Oval.prototype.draw = function(){
    push();
    if (this.fill == "NO") {
        noFill();
    } else  {
        fill(this.fill, this.alpha);
    }
    if (this.strokeWeight == "NO") {
        noStroke();
    } else  {
        strokeWeight(this.strokeWeight);
        stroke(255, 255);
    }
    ellipse(this.xPosition, this.yPosition, this.radius*2,this.radius*2);
    pop();
}

function addOval() {
    if (mouseIsPressed || touchIsDown) {
        var oval = new Oval(mouseX, mouseY, random(20)-10, random(20)-10, 5)
        ovalList.push(oval);
    }
}


function autoCreate() {
    if (t <= 1000) {
        //for (i=0; i<100; i++){
            var oval = new Oval(windowWidth/2, windowHeight/2, random(20)-10, random(20)-10, 700)
            ovalList.push(oval);
       // }

}
}

function touchMoved() {
    return false;
}