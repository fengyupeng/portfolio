var t = 0;
var button
var button2
var button3
var unit = 0.1
var PI = 3.1415926
// gravity part
var ovalList = [];


function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    button = new TapButton()
    button2 = new TapButton()
    button3 = new TapButton()
}

function draw() {
  drawTwelfth();
  for (i=0; i < ovalList.length; i++) {
    // bounce back
    var oval = ovalList[i];
    if (oval.xPosition <=0 || oval.xPosition >= windowWidth ){
        oval.vx *= -1;
    }
    if (oval.yPosition >= windowHeight || oval.yPosition <= 0 ){
        oval.vy *= -1;
    }
  }
  for (i=0; i<ovalList.length; i++) {
    ovalList[i].draw();
    ovalList[i].update();
  }
  t+=1;
  
}

////////////// tap button object ////////////////
// kind of just for fun, but it's actually fun

function TapButton() {
    this.angularSpeed = 0.1;
    this.ovalRadius = 25 * unit
    this.originX = 530*unit
    this.originY = 1032*unit
    this.smallRadius = 15*unit
    this.bigRadius = 25*unit
    this.angleList = [0, PI, PI/2, -PI/2, 0, PI]
    this.alpha = 255
}

TapButton.prototype.draw = function() {
    push()
    noStroke()
    translate(this.originX, this.originY);
    for (i = 2; i < 6; i++){
        var x = this.bigRadius * cos(this.angleList[i])
        var y = this.bigRadius * sin(this.angleList[i])
        var r = (sin(this.angleList[i]) + 1)*177
        var g = (sin(this.angleList[(i+1)%5]) + 1)*177
        var b = (sin(this.angleList[(i+2)%5]) + 1)*177
        fill(r, g, b, this.alpha)        
        ellipseMode(CENTER)
        ellipse(x, y, this.ovalRadius, this.ovalRadius)
        this.angleList[i] -= this.angularSpeed
    }
    for (i = 0; i < 2; i++){
        var x = this.smallRadius * cos(this.angleList[i])
        var y = this.smallRadius * sin(this.angleList[i])
        var alpha1 = (x/this.smallRadius +1)*177
        var alpha2 = (y/this.smallRadius +1)*177
        fill(alpha1, alpha2, alpha1, this.alpha)
        ellipseMode(CENTER)
        ellipse(x, y, this.ovalRadius, this.ovalRadius)
        this.angleList[i] += this.angularSpeed
    }
    pop()
}

function drawTwelfth() {
    background(0)
    unit = 0.2
    originX = windowWidth/1.5
    originY = windowHeight/1.5
    if (t == 0) {
        //background(224, 114, 0)
        button.angularSpeed = 0.05
        button.originX = originX
        button.originY = originY
        button2.originX = originX
        button2.originY = originY
        button2.angularSpeed = -0.05

        button3.originX = originX
        button3.originY = originY
        button3.angularSpeed = -0.05
    }
    if ((t%100)==0) {
        button2.angularSpeed = random(-50, 50)/500
    }
    if (t%10 == 0) {
        button3.alpha = random(255)
    }
    button.bigRadius = (sin(button.angleList[1])+2)*100*unit
    button.smallRadius = (cos(button.angleList[1])+2)*60*unit
    button.ovalRadius = (sin(button.angleList[0])+2) *30*unit
    button.draw()

    button2.bigRadius = (sin(button2.angleList[1])+2)*100*unit
    button2.smallRadius = (cos(button2.angleList[1])+2)*60*unit
    button2.ovalRadius = (sin(button2.angleList[0])+2) *30*unit
    button2.draw()

    button3.bigRadius = (sin(button3.angleList[1])+2)*100*unit
    button3.smallRadius = (cos(button3.angleList[1])+2)*60*unit
    button3.ovalRadius = (sin(button3.angleList[0])+2) *30*unit
    button3.draw()
}

// the oval object
function Oval(xPosition, yPosition) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.vx = 0;
    this.vy = 0;
    this.radius = 30*unit;
}

Oval.prototype.draw = function() {
    push();
    stroke(255,255);
    strokeWeight(0.5);
    noFill();
    ellipse(this.xPosition, this.yPosition, this.radius*2,this.radius*2);
    pop();
}

Oval.prototype.update = function() {
    // some constant
    var minGravityDist = 50 * unit;
    var forceMultiplier = 20000 * unit;
    var gravity = 0.2 * unit;
    var maxSpeed = 50 * unit;

    var originX = windowWidth/1.5
    var originY = windowHeight/1.5
    var ax = 0;
    var ay = gravity;
    var f = 0;
    var dist = ((this.xPosition - originX)**2 + (this.yPosition - originY)**2)**0.5;
    if (dist >= minGravityDist) var f =(1/dist) ** 2 * forceMultiplier;
    ax = (originX - this.xPosition)/dist * f;
    ay += (originY - this.yPosition)/dist * f;
    this.vx += ax;
    this.vy += ay;
    //speed control
    if (this.vx >= maxSpeed) {
        this.vx *= 0.99;
        //console.log("max_x");
    }
    if (this.vy >= maxSpeed) {
        this.vy *= 0.99;
        //console.log("max_y");
    }
    this.xPosition += this.vx;
    this.yPosition += this.vy;
}

function mouseClicked() {
    addNewOval();
}

function addNewOval() {
    var oval = new Oval(mouseX, mouseY);
    ovalList.push(oval);
}