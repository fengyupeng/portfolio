var t = 0;
var button
var button2
var button3
var unit = 970 / 640
var PI = 3.1415926


function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    button = new TapButton()
    button2 = new TapButton()
    button3 = new TapButton()
}

function draw() {
  drawTwelfth();
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
    unit = 1135/1135
    if (t == 0) {
        //background(224, 114, 0)
        button.angularSpeed = 0.05
        button.originX = windowWidth/2
        button.originY = windowHeight/2
        button2.originX = windowWidth/2
        button2.originY = windowHeight/2
        button2.angularSpeed = -0.05

        button3.originX = windowWidth/2
        button3.originY = windowHeight/2
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