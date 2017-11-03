/*var message = 
problem with the current version:
    1. The user may not know when to tap. user can only tap when a series of animation is done playing, however, user may not know if it's finished ir not
    2. After brainstorm, going back to main stream and then start a vote diesn't really make sense, shoule start a vote directly from the brainstorm    
*/
///////////// Global Constants /////////////

var unit;
var indentation;
var itemLeftX;
var itemXList;
var itemYList;
var textboxWidthList;
var master; // the object that contains all the stream items
var state; // global state
var t;  // global time
var nameList; 
var boldList; 
var messageList; 
var timeItemMoveLeft;
var timeItemSlideIn;
var imageDict = {};
var masterScreen; // screen object
var button; //tap button object
var button2;
var button3;
var target;
// overall setup

function preload() {
    var replyButton = loadImage("img/reply.png");
    var arrow = loadImage("img/arrow.png")
    var doubleArrow = loadImage("img/doubleArrow.png")
    var viewResultsButton = loadImage("img/viewResultsButton.png")
    var costBar = loadImage("img/costBar.png")
    var benefitBar = loadImage("img/benefitBar.png")
    var bubble1 = loadImage("img/1.png")
    var bubble2 = loadImage("img/2.png")
    var bubble3 = loadImage("img/3.png")
    var bubble4 = loadImage("img/4.png")
    var bubble5 = loadImage("img/5.png")
    var bubbleList = [bubble1, bubble2, bubble3, bubble4, bubble5]
    imageDict.replyButton = replyButton
    imageDict.arrow = arrow
    imageDict.doubleArrow = doubleArrow
    imageDict.viewResultsButton = viewResultsButton
    imageDict.costBar = costBar
    imageDict.benefitBar = benefitBar
    imageDict.bubbleList = bubbleList

    print("Load image complete")
}

function setup() {
    unit = 970 / 640
    setupGlobal()
    canvas = createCanvas(970, 1725)
    background(48)
}

// initialize global constants
function setupGlobal(){
    indentation = 30 * unit
    itemLeftX = 54 * unit
    itemYList = [111 * unit, 268 * unit, 394 * unit, 513 * unit, 636 * unit, 730 * unit, 853 * unit]
    itemXList = [itemLeftX, itemLeftX, itemLeftX+indentation, itemLeftX+indentation, itemLeftX+indentation, itemLeftX+indentation*2, itemLeftX+indentation]
    textboxWidthList = [514*unit, 535*unit, 509*unit, 480*unit, 533*unit, 422*unit, 481*unit]
    state = "Welcome" // global state
    timeItemMoveLeft = 40;
    timeItemSlideIn = 50;
    t = 0 // global time
    nameList = ["Chris S", "Hannah C", "Me", "Jack M", "Me", "John L", "Eric M"]
    boldList = ["I think", "I think", "Me too because", "Let's Brainstorm", "Let's vote", "Let's rank", "I will"]
    messageList = ["            we need to try something different on the recruiting front, we are not getting enough qualified candidates.",
                   "            we should aim to double the number of qualified candidates we talk to next week.",
                   "                            we really need to get that 6th team member on board ASAP!",
                   "                              new recruiting avenues.",
                   "                  on the most promising ideas.",
                   "                  the top 5 on Cost and Benefit",
                   "         draft some new Facebook Ads for review this afternoon!"]
    masterScreen = new Screen()
    masterScreen.thirdInit()
    /////////To be deleted!!!!!!!!!!!!
    //masterScreen.sixthInit()
    /////////////////////////////////
    master = new MasterObject()
    master.init()
    button = new TapButton()
    button2 = new TapButton()
    button3 = new TapButton()
    target = new Target()
}


/////////////////////////////////////
///////////// Objects ///////////////
/////////////////////////////////////

/////////// Master Object ///////////

function MasterObject() {
    this.itemList = []
    this.screenTitle;
    this.backgroundRect1;
    this.backgroundRect2;
    this.typingMessage1 = new TypingText("", indentation+itemLeftX, 533*unit, 501*unit, 60*unit);
    this.typingMessage2 = new TypingText("", indentation+itemLeftX, 810*unit, 533*unit, 40*unit);
    this.typingMessage3 = new TypingText("", 140*unit, 913*unit, 450*unit, 40*unit);
}

MasterObject.prototype.init = function() {
    for (i = 0; i < nameList.length; i++) {
        var item = new Item(i)
        this.itemList.push(item)
    }
    this.backgroundRect1 = new Rect(0, 393*unit, 641*unit, 113*unit, 0)
    this.backgroundRect2 = new Rect(0, 628*unit, 641*unit, 95*unit, 0)
    this.backgroundRect1.fill = 48
    this.backgroundRect2.fill = 48
    this.backgroundRect1.strokeWeight = "NO"
    this.backgroundRect2.strokeWeight = "NO"
    this.screenTitle = new Text(222*unit, 80*unit, 40*unit, "Recruiting", "BOLD")
}

MasterObject.prototype.draw = function(end) {
    if (this.backgroundRect1.fill != 48) {
        this.backgroundRect1.draw()
    }
    if (this.backgroundRect2.fill != 48) {
        this.backgroundRect2.draw()
    }
    for (i = 0; i < end; i++) {
        this.itemList[i].draw(i);
    }
    this.screenTitle.draw()
}

MasterObject.prototype.moveLeft = function(index, startTime) {
    if (t > startTime){
        var newX;
        for (i = 0; i < index; i++){
            newX = parabola("staticToMoving", startTime+i*5, timeItemMoveLeft, t, itemXList[i],-640*unit)
            this.itemList[i].xPosition = newX
        }
        this.screenTitle.xPosition = parabola("staticToMoving", startTime, timeItemMoveLeft, t, 222*unit, -640*unit)
    }
    if (index >= 3) {
        this.backgroundRect1.backgroundLightoff(startTime)
    }
    if (index >= 5) {
        this.backgroundRect2.backgroundLightoff(startTime)
    }
}

MasterObject.prototype.moveRight = function(index, startTime) {
    if (t > startTime){
        var newX;
        for (i = 0; i < index; i++){
            newX = parabola("movingToStatic", startTime+i*5, timeItemMoveLeft, t, -640*unit, itemXList[i])
            this.itemList[i].xPosition = newX
        }
        this.screenTitle.xPosition = parabola("movingToStatic", startTime, timeItemMoveLeft, t, -640*unit, 222*unit)
    }
    if (index >= 3) {
        this.backgroundRect1.backgroundLightup(startTime+20)
    }
    if (index >= 5) {
        this.backgroundRect2.backgroundLightup(startTime+20)
    }
}

MasterObject.prototype.itemSlideIn = function(index, startTime) {
    var newX = parabola("movingToStatic", startTime, timeItemSlideIn, t, 650*unit, itemXList[index])
    this.itemList[index].xPosition = newX;
}

//////////////// Item Object ////////////////
// stream view items

function Item(index){
    this.index = index;
    this.nameText = nameList[index]
    this.boldText = boldList[index]
    this.message = messageList[index]
    this.yPosition = itemYList[index]
    this.xPosition = itemXList[index]
}

Item.prototype.draw = function(index) {
    push()
    // draw name
    fill(183)
    textSize(25*unit)
    //textStyle(REGULAR)
    noStroke()
    
    /////////////// just for typing message on Second Screen. for the name to light up
    if (state == "Second" && t <= 440 && index == 2) {
        fill(183, 0)
    }
    if (state == "Second" && t > 440 && index == 2) {
        fill(183, (t-440)*4)
    }
    ///////////////////////

    ////////////// just for typing message on Fifth Screen
    if (state == "Fifth" && t <= 295 && index == 4) {
        fill(183, 0)
    }
    if (state == "Fifth" && t > 295 && index == 4) {
        fill(183, (t-295)*4)
    }
    ///////////////////////

    text(this.nameText, this.xPosition, this.yPosition+31*unit)
    // draw bold text
    if (index == 3 || index == 4 || index == 5) {
        fill (124, 221, 212) // the color different from other stream item
    } else {
        fill(255)
    }
    textStyle(BOLD)
    textSize(27*unit)
    text(this.boldText, this.xPosition, this.yPosition+37*unit, textboxWidthList[index], this.yPosition+100*unit)
    // draw regular text
    textStyle(NORMAL)
    textLeading(30*unit)
    text(this.message, this.xPosition, this.yPosition+37*unit, textboxWidthList[index], this.yPosition+100*unit)
    pop()
}


//////////////// Text Object ///////////////

function Text(xPosition, yPosition, textSize, message, textStyle) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.textSize = textSize;
    this.textStyle = textStyle; 
    this.font = "Arial";
    this.fill = 255;
    this.alpha = 255;
    this.message = message;
}

Text.prototype.draw = function(){
    push();
    if (this.textStyle == "BOLD") {
        textStyle(BOLD)
    } else {
        textStyle(NORMAL)
    }
    fill(this.fill, this.alpha);
    noStroke();
    textSize(this.textSize);
    textFont(this.font);
    text(this.message, this.xPosition, this.yPosition);
    pop();
}

//////////////// TypingText Object ///////////////

function TypingText(message, xPosition, yPosition, rectWidth, rectHeight) {
    this.message = message
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.rectWidth = rectWidth
    this.rectHeight = rectHeight
}

TypingText.prototype.draw = function() {
    push();
    fill(255),
    noStroke;
    textSize(27*unit)
    textFont("Arial")
    text(this.message, this.xPosition, this.yPosition, this.rectWidth, this.rectHeight)
}

//////////////// Screen Object ///////////////
// This is where I store global stuff for each screen

function Screen() {
    this.screenTitle
}

Screen.prototype.secondInit = function() {
    // message list
    this.promptMessageList = ["Me too", "I think", "Alternatively",
                              "because", "and",
                              "Let's", "I will", "In summary",
                              "vote", "brainstorm", "rank", "chat"]
    // x posiiton list
    this.promptXList = [73, 184, 287,
                        176, 306,
                        75, 160, 244,
                        147, 225, 376, 454]
    // prompt box width
    this.promptWidth = [103, 93, 168, 
                        121, 64, 
                        78, 75, 168,
                        72, 145, 72, 72]
    // list containing objects
    this.promptList = []
    // add stuff to the list
    var newY = 529*unit
    for (i = 0; i < this.promptMessageList.length; i ++) {
        if (i >= 5) newY = 806*unit 
        this.promptXList[i] *= unit
        this.promptWidth[i] *= unit
        var newPrompt = new Prompt(this.promptMessageList[i], this.promptXList[i], newY, this.promptWidth[i])
        newPrompt.alpha = 0
        this.promptList.push( newPrompt)
    }
}

Screen.prototype.secondDraw = function() {
    for (i = 0; i < this.promptList.length; i++) {
        this.promptList[i].draw()
    }
}

Screen.prototype.thirdInit = function() {
    this.screenTitle = new Text(115*unit, 90*unit, 35*unit, "New Recruiting Avenues", "BOLD")
    this.ideaList = ["Business School Career Services", "Meetups", "Concert Sponsorship","Facebook Ads" , "Smart.ly", "Snapchat", "College career fair"]
    this.ideaLeftX = 140*unit
    this.ideaStartY = 180*unit
    this.ideaDistance = 90*unit
    this.ideaObjectList = []
    this.ovalList = []
    this.spanList = [0, 50, 70]
    for (i=0; i < this.ideaList.length; i++) {
        var text = new Text(this.ideaLeftX, this.ideaStartY+i*this.ideaDistance, 27*unit, this.ideaList[i], "NORMAL")
        text.alpha = 0
        this.ideaObjectList.push(text)
        // add oval
        var oval = new Oval(104*unit,this.ideaStartY-9*unit+i*this.ideaDistance, 0, 0, 6.5*unit)
        oval.fill=255
        oval.strokeWeight = "NO"
        oval.alpha = 0
        this.ovalList.push(oval)
    }
}

Screen.prototype.thirdDraw = function() {
    this.screenTitle.draw()
    for (i = 0; i < this.ideaList.length; i++) {
        this.ideaObjectList[i].draw()
        this.ovalList[i].draw()
    }
}

Screen.prototype.sixthInit = function() {
    masterScreen.screenTitle.message = "Recruiting Avenues"
    for (i = 0; i < this.ideaList.length; i++) {
        this.ovalList[i].fill = "NO"
        this.ovalList[i].strokeWeight = 1*unit
        this.ovalList[i].radius = 12*unit
        this.ovalList[i].alpha = 255
        this.ideaObjectList[i].alpha = 255
    }
}

Screen.prototype.sixthDraw = function() {
    this.screenTitle.draw()
    for (i = 0; i < this.ideaList.length; i++) {
        this.ideaObjectList[i].draw()
        this.ovalList[i].draw()
    }
}

Screen.prototype.seventhInit = function() {
    this.screenTitle.message = "Voting Results"
    this.screenTitle.xPosition = 650*unit
    this.rectWidthList = [341*unit, 282*unit, 282*unit, 166*unit, 166*unit, 113*unit, 57*unit]
    this.rectHeight = 60*unit
    this.rectDistance = 115*unit
    this.rectLeftX = 100*unit
    this.rectStartY = 156*unit
    this.rectList = []
    for (i = 0; i < this.rectWidthList.length; i++) {
        var rect = new Rect(this.rectLeftX, this.rectStartY + i*this.rectDistance, 0, this.rectHeight, 0)
        rect.strokeWeight = "NO"
        rect.fill = 255
        this.rectList.push(rect)
    }
    this.voteNumberList = ["6 votes", "5 votes", "5 votes", "3 votes", "3 votes", "2 votes", "1 vote"]
    this.voteNameList = ["Meetups", "College career fair", "Facebook Ads", "Smart.ly", "Concert Sponsorship", "Snapchat", "Business School Career Services"]
}

Screen.prototype.seventhDraw = function() {
    this.screenTitle.draw()
    for (i = 0; i < this.rectList.length; i++) {
        this.rectList[i].draw()
    }
}

Screen.prototype.ninthInit = function() {
    this.bubbleXList1 = [415, 364, 139, 213, 126]
    this.bubbleYList1 = [333, 682, 641, 478, 376]
    this.bubbleXList2 = [278, 319, 257, 123, 181]
    this.bubbleYList2 = [555, 386, 659, 427, 323]
    this.bubbleWidthList = [144, 233, 124, 121, 124]
    this.bubbleHeight = 41*unit
    this.bubbleList = []
    this.screenTitle.message = "Rank Recruiting Avenues"
    this.screenTitle.textSize = 33*unit
    for (i = 0; i < imageDict.bubbleList.length; i++) {
        this.bubbleXList1[i] *= unit
        this.bubbleYList1[i] *= unit
        this.bubbleXList2[i] *= unit
        this.bubbleYList2[i] *= unit
        this.bubbleWidthList[i] *= unit
        var bubble = new Bubble(imageDict.bubbleList[i], this.bubbleXList1[i],this.bubbleYList1[i],this.bubbleWidthList[i],this.bubbleHeight,255)
        this.bubbleList.push(bubble)
    }
    this.switchTitle = new Text(260*unit, 975*unit, 32*unit, "My Rank", "NORMAL")
}

Screen.prototype.ninthDraw = function() {
    this.screenTitle.draw()
    for (i =0; i < this.bubbleList.length; i++) {
        this.bubbleList[i].draw()
    }
}



//////////////// The Oval Object ///////////////

function Oval(xPosition, yPosition, xSpeed, ySpeed, radius) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.strokeWeight = 1;
    this.fill = "NO";
    this.alpha = 255;
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
        stroke(255, this.alpha);
    }
    ellipse(this.xPosition, this.yPosition, this.radius*2,this.radius*2);
    pop();
}

////////////////// Rect Object //////////////////

function Rect(xPosition, yPosition, w, h, corner) {
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.w = w;
    this.h = h;
    this.corner = corner;
    this.strokeWeight = 1
    this.fill = "NO";
    this.alpha = 255
}

Rect.prototype.draw = function() {
    push();
    if (this.fill == "NO") {
        noFill();
    } else {
        fill(this.fill, this.alpha);
    }
    if (this.strokeWeight == "NO") {
        noStroke();
    } else  {
        strokeWeight(this.strokeWeight);
        stroke(255, this.alpha);
    }
    rect(this.xPosition, this.yPosition, this.w, this.h, this.corner);
}

Rect.prototype.backgroundLightup = function(startTime) {
    var fill = parabola("movingToStatic", startTime, 30, t, 48, 57)
    this.fill = fill
}

Rect.prototype.backgroundLightoff = function(startTime) {
    var fill = parabola("staticToMoving", startTime, 30, t, 57, 48)
    this.fill = fill
}


/*/////////////// image object //////////////////

function ImageObject(image, xPosition, yPosition, w) {
    this.image = image
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.w = w
}

ImageObject.prototype.draw = function() {
    this.image.resize(this.w, 0)
    image(this.image, this.xPosition, this.yPosition)
}
*/

///////////////// Bubble object //////////////////

function Bubble(image, xPosition, yPosition, w, h, alpha) {
    this.image = image
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.w = w
    this.h = h
    this.alpha = alpha
}

Bubble.prototype.draw = function() {
    this.image.resize(this.w, 0)
    image(this.image, this.xPosition, this.yPosition)
    push()
    fill(48, 255-this.alpha)
    noStroke()
    rect(this.xPosition -1, this.yPosition-1, this.w+2, this.h+2)
    pop()
}

Bubble.prototype.bubbleMove = function(x1, y1, x2, y2, startTime) {
    var newX = parabola("movingToStatic", startTime, 50, t, x1, x2);
    var newY = parabola("movingToStatic", startTime, 50, t, y1, y2);
    this.xPosition = newX
    this.yPosition = newY

}

/////////////// prompt object ///////////////////

function Prompt(message, xPosition, yPosition, w) {
    this.message = message
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.w = w
    this.alpha = 130
}

Prompt.prototype.draw = function() {
    // draw the rounded rect border
    push()
    strokeWeight(1*unit)
    stroke(255, this.alpha)
    noFill(255, this.alpha)
    rect(this.xPosition, this.yPosition, this.w, 39*unit, 10*unit)
    pop()
    // draw the text
    push()
    fill(255, this.alpha)
    noStroke()
    textSize(27*unit)
    text(this.message, this.xPosition + 10*unit, this.yPosition+28*unit)
    pop()
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

////////////// target object /////////////////
/// the new tap button used for invision

function Target() {
    this.xPosition = 530*unit
    this.yPosition = 1032*unit
}

Target.prototype.draw = function() {
    push()
    noFill()
    strokeWeight(11*unit)
    stroke(255, 65)
    ellipse(this.xPosition, this.yPosition, 60*unit, 60*unit)
    ellipse(this.xPosition, this.yPosition, 23*unit, 23*unit)
    pop()
}

////////////end of object section////////////////

/////////////////////////////////////////////////
/////////////// draw functions //////////////////
/////////////////////////////////////////////////

function parabola(type, startTime, span, currentT, startX, endX) { // return an Int
    if (type == "movingToStatic") {
        if (currentT <= startTime) {
            return startX;
        }
        if (currentT >= (startTime + span)) {
            return endX
        }
        var t = currentT - startTime;
        var distance = endX - startX;
        var startSpeed = 2 * distance / span;
        var acceleration = -startSpeed / span;
        var position = startX + startSpeed * t + acceleration * t * t / 2
        return position
    }
    if (type == "staticToMoving") {
        if (currentT <= startTime) {
            return startX;
        }
        if (currentT >= (startTime + span)) {
            return endX
        }
        var t = currentT - startTime;
        var distance = endX - startX;
        var endSpeed = 2 * distance / span;
        var acceleration =  endSpeed / span;
        var position = startX + acceleration * t * t / 2;
        return position;
    }
}


function draw() {
    if (state != "Twelfth"){
        background(48)
    }
    
    //print(t)
    print(state)
    switch (state) {
        case "Welcome":
            drawWelcome();
            break;
        case "First":
            drawFirst();
            break;
        case "Second":
            drawSecond();
            break;
        case "Third":
            drawThird();
            break;
        case "Forth":
            drawForth();
            break;
        case "Fifth":
            drawFifth();
            break;
        case "Sixth":
            drawSixth();
            break;
        case "Seventh":
            drawSeventh();
            break;
        case "Eighth":
            drawEighth();
            break;
        case "Ninth":
            drawNinth();
            break;
        case "Tenth":
            drawTenth();
            break;
        case "Eleventh":
            drawEleventh();
            break;
        case "Twelfth":
            drawTwelfth();
            break;
    }
    t+=1
    
}

function drawWelcome() {
    push();
    fill(255);
    noStroke;
    textSize(85*unit)
    textFont("Arial")
    text("Welcome", 141*unit, 285*unit)
    textSize(40*unit)
    textAlign(CENTER)
    text("Tap anywhere to start a tour of how Chris’s team reach a recruiting decision using Bizy’s key features!",85*unit, 518*unit, 470*unit,240*unit)
    pop();
    if (t>80){
        target.draw()
        push()
        fill(255)
        noStroke();
        textFont("Arial")
        textSize(30*unit)
        text("Tap to continue", 260*unit, 1043*unit)
    }
}

function drawFirst() {
    /*if (t>250){
        button.draw()
    }
    */
    // stream view
    master.screenTitle.alpha = (t-35)*3
    if (t<10) {
        master.draw(0)
    } else {
        master.draw(2)
    }
    master.itemSlideIn(0, 60)
    master.itemSlideIn(1, 200)
    var welcomeY = parabola("staticToMoving", 0, 30, t, 285*unit, -10*unit)
    var messageY = parabola("staticToMoving", 0, 30, t, 518*unit, 1145*unit)
    push();
    fill(255, 255-t*10);
    noStroke;
    textSize(85*unit)
    textFont("Arial")
    text("Welcome", 141*unit, welcomeY)
    textSize(40*unit)
    textAlign(CENTER)
    text("Tap anywhere to start a tour of how Chris’s team reach a recruiting decision using Bizy’s key features!",85*unit, messageY, 470*unit,240*unit)
    pop();
    if (t>=300) {
        state = "Second"
        t = -1
    }
}

function drawSecond() {
    if (t>640){
        target.draw()
    }

    var time1 = 130 // time Me to show up
    var time2 = 210 // time because show up

    if (t == 0) {
        masterScreen.secondInit()
    }
    masterScreen.secondDraw();
    
    /// deal with prompts animation
    // me too
    for ( i = 0; i < 3; i++) {
        var newY = parabola("movingToStatic", 60, 30, t, 590*unit, 529*unit)
        var alpha = parabola("movingToStatic", 60, 30, t, 0, 130)
        masterScreen.promptList[i].yPosition = newY
        masterScreen.promptList[i].alpha = alpha
        if (t >= time1) {
            masterScreen.promptList[i].alpha = 130 - (t-time1)*10
        }
    }
    // type the bold message
    push();
    fill(255)
    noStroke();
    textStyle(BOLD)
    textFont("Arial")
    textSize(27*unit)
    if (t > time1 && t <= time2) {
        text("Me too ", itemLeftX+indentation, 533*unit, 501*unit, 60*unit)
    }

    // second prompt
    for ( i = 3; i < 5; i++) {
        var newY = parabola("movingToStatic", 140, 30, t, 590*unit, 529*unit)
        var alpha = parabola("movingToStatic", 140, 30, t, 0, 130)
        masterScreen.promptList[i].yPosition = newY
        masterScreen.promptList[i].alpha = alpha
        if (t >= time2) {
            masterScreen.promptList[i].alpha = 210 - (t-time2)*10
        }
    }
    // type the bold message
    if (t >= time2 && t <= 440) {
        text("Me too because", itemLeftX+indentation, 533*unit, 501*unit, 60*unit)
    }
    pop()
    
    master.draw(2)
    // the blinking reply button
    imageDict.replyButton.resize(33*unit,0)
    image(imageDict.replyButton, 66*unit, 371*unit)
    push();
    //var alpha = parabola("movingToStatic", 0, 50, t, 0, 255)
    noStroke();
    fill(48, t*8);
    rect(65*unit, 371*unit, 34*unit, 34*unit)
    pop()
    // automatic typing message
    if (t >= 160 && (t-160)%3 == 0 && ((t-160) <= messageList[2].length*3 -1)) {
        master.typingMessage1.message += messageList[2][(t-160)/3]
    }
    if (t <= 440) {
        master.typingMessage1.draw()
    }
    // typing is done, draw the animation of it moving upwards
    if (t >= 440 && t<540) {
        var newY = parabola("movingToStatic", 440, 40, t, 500*unit, itemYList[2])
        master.itemList[2].yPosition = newY
        master.draw(3)
    }
    // background light up
    master.backgroundRect1.backgroundLightup(460)
    // moving is done, chris S slide in
    master.itemSlideIn(3, 540)
    if (t>=540) {
        master.draw(4)
    }
    // arrow show up
    //var alpha = parabola("movingToStatic", 560, 20, t, 0, 255)
    if (t > 600){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 574*unit, 549*unit)
    }
}

function drawThird() {
    if (t>520){
        target.draw()
    }

    master.draw(4)
    // arrow
    if (t<20){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 574*unit, 549*unit)
    }
    // draw the blinking rectangle
    push()
    noStroke();
    var alpha = parabola("movingToStatic", 0, 40, t, 255, 0);
    fill(255, alpha);
    rect(0, 506*unit, 640*unit, 123*unit);
    pop()
    // move left
    master.moveLeft(4,30)
    // next screen move left into screen
    var titleX = parabola("movingToStatic", 80, 40, t, 650*unit, 115*unit)
    masterScreen.screenTitle.xPosition = titleX
    masterScreen.thirdDraw()

    // typing the first message
    if (t >= 130 && (t-130)%5 == 0 && ((t-130) <= masterScreen.ideaList[0].length*5 -1)) {
        master.typingMessage3.message += masterScreen.ideaList[0][(t-130)/5]
    }
    var ideaY = parabola("movingToStatic", 300, 40, t, 913*unit, masterScreen.ideaStartY-24*unit)
    var ovalAlpha = parabola("movingToStatic", 300, 40, t, 0, 255)
    masterScreen.ovalList[0].alpha = ovalAlpha
    master.typingMessage3.yPosition = ideaY
    if (t == 400) {
        masterScreen.ideaObjectList[0].alpha=255
    }
    //draw other ideas
    for (i = 1; i < 4; i++){
        var alpha = parabola("movingToStatic", 370, 25, t, 0, 255)
        masterScreen.ideaObjectList[i].alpha = alpha
        masterScreen.ovalList[i].alpha = alpha
    }
    for (i = 4; i < masterScreen.ideaList.length; i++){
        var newY = parabola("movingToStatic", 400 + masterScreen.spanList[i-4], 40, t, 1235*unit, masterScreen.ideaStartY+i*masterScreen.ideaDistance)
        var alpha = parabola("movingToStatic", 400 + masterScreen.spanList[i-4], 40, t, 0, 255)
        masterScreen.ovalList[i].alpha = alpha
        masterScreen.ideaObjectList[i].yPosition = newY
        masterScreen.ideaObjectList[i].alpha = 255
    }
    // draw function
    master.typingMessage3.draw()

    /* make ideas appear
    for (i = 0; i < 3; i++) {
        var alpha = parabola("movingToStatic", 130+i*40, 20, t, 0, 255)
        masterScreen.ideaObjectList[i].alpha = alpha
        masterScreen.ovalList[i].alpha = alpha
    }
    for (i = 4; i < masterScreen.ideaList.length; i++) {
        var alpha = parabola("movingToStatic", 330+i*40, 20, t, 0, 255)
        masterScreen.ideaObjectList[i].alpha = alpha
        masterScreen.ovalList[i].alpha = alpha
    }*/
}

function drawForth() {

    if (t == 0) {
        masterScreen.ideaObjectList[3].alpha= 255
    }
    masterScreen.thirdDraw()
    // brainstorming stuff move out
    var titleX = parabola("staticToMoving", 0, 40, t, 115*unit,650*unit)
    masterScreen.screenTitle.xPosition = titleX
    for (i = 0; i < masterScreen.ideaList.length; i++) {
        var ovalX = parabola("staticToMoving", 15+i*2, 40, t, 104*unit, 650*unit)
        masterScreen.ovalList[i].xPosition = ovalX
        masterScreen.ideaObjectList[i].xPosition = ovalX + (masterScreen.ideaLeftX - 104*unit)
    }
    // stream move in
    if (t>=71) {
        master.draw(4)
        // use a rectangle to cover up the older messages
        push()
        fill(48)
        noStroke()
        rect(0,111*unit,650*unit,620*unit)
        pop()
    }
    master.moveRight (4,69)
    if (t>=110){
        //button.draw()
        state = "Fifth"
        t = -1
    }
}

function drawFifth() {
    if (t>380){
        target.draw()
    }
    if (t==0) {
        masterScreen.secondInit()
        for (i = 0; i < 4; i++) { // make the itemX position correct
            master.itemList[i].xPosition = itemXList[i]
        }
    }
    master.draw(4)
    var time1 = 70 // time "let's show up"
    var time2 = 150 // time "vote show up"
    // the typing message
    // animation of prompts showing up
    for ( i = 5; i < 8; i++) {
        var newY = parabola("movingToStatic", 0, 30, t, 866*unit, 806*unit)
        var alpha = parabola("movingToStatic", 0, 30, t, 0, 130)
        masterScreen.promptList[i].yPosition = newY
        masterScreen.promptList[i].alpha = alpha
        if (t >= time1) {
            masterScreen.promptList[i].alpha = 70 - (t-time1)*10
        }
    }
    // type "Let's"
    push();
    fill(255)
    noStroke();
    textStyle(BOLD)
    textFont("Arial")
    textSize(27*unit)
    if (t > time1 && t <= time2) {
        text("Let's ", itemLeftX+indentation, 810*unit, 533*unit, 40*unit)
    }

    // second prompt
    for ( i = 8; i < 12; i++) {
        var newY = parabola("movingToStatic", 80, 30, t, 866*unit, 806*unit)
        var alpha = parabola("movingToStatic", 80, 30, t, 0, 130)
        masterScreen.promptList[i].yPosition = newY
        masterScreen.promptList[i].alpha = alpha
        if (t >= time2) {
            masterScreen.promptList[i].alpha = 150 - (t-time2)*10
        }
    }

    if (t >= time2 && t <= 275) {
        text("Let's vote", itemLeftX+indentation, 810*unit, 522*unit, 40*unit)
    }
    pop()

    // rest of message typing
    if ((t>=130) && ((t-130)%3 == 0) && ((t-130) <= messageList[4].length*3 -1)) {
        master.typingMessage2.message += messageList[4][(t-130)/3]
    } // original 335
    if (t <= 275) {
        master.typingMessage2.draw()
    }
    // typing is done, draw the animation of it moving upwards
    if (t >= 275) {
        var newY = parabola("movingToStatic", 295, 40, t, 775*unit, itemYList[4])
        master.itemList[4].yPosition = newY
        master.draw(5)
    }
    master.backgroundRect2.backgroundLightup(315)
    // arrow show up
    if (t > 340){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 581*unit, 658*unit)
    }
    masterScreen.secondDraw()
    // use a rectangle to cover up the older messages
    if (t<=335){
        var alpha = parabola("movingToStatic", 275,60,t,255,0)
        fill(48, alpha)
        noStroke()
        rect(0,111*unit,650*unit,620*unit)
    }
}

function drawSixth() {
    if ( t == 0) {
        masterScreen.sixthInit()
    }
    if (t>190){
        target.draw()
    }

    master.draw(5)
    // arrow
    if (t < 20){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 581*unit, 658*unit)
    }
    // draw the blinking rectangle
    push()
    noStroke();
    var alpha = parabola("movingToStatic", 0, 40, t, 255, 0);
    fill(255, alpha);
    rect(0, 628*unit, 640*unit, 95*unit);
    pop()
    // move left
    master.moveLeft(5,30)
    // vote title move left into screen
    var titleX = parabola("movingToStatic", 80, 40, t, 650*unit, 156*unit)
    masterScreen.screenTitle.xPosition = titleX
    masterScreen.sixthDraw()
    // options move in
    for (i = 0; i < masterScreen.ideaList.length; i++) {
        var ovalX = parabola("movingToStatic", 75+i*2, 40, t, 652*unit, 104*unit)
        masterScreen.ovalList[i].xPosition = ovalX
        masterScreen.ideaObjectList[i].xPosition = ovalX + (masterScreen.ideaLeftX - 104*unit)
    }
    // options light up
    var ovalFill = parabola("movingToStatic", 150, 5, t, 48, 255)
    var ovalFill2 = parabola("movingToStatic", 170, 5, t, 48, 255)
    masterScreen.ovalList[2].fill = ovalFill
    masterScreen.ovalList[5].fill = ovalFill2
    if (t > 180){
        imageDict.viewResultsButton.resize(181*unit,0)
        image(imageDict.viewResultsButton, 227*unit, 889*unit)
    }
}

function drawSeventh() {
    if (t>190){
        target.draw()
    }
    if (t < 90) { // when t >=90 it is seventhDraw() then
        masterScreen.sixthDraw()
    }
    // draw the blinking rectangle
    push()
    noStroke();
    var alpha = parabola("movingToStatic", 0, 30, t, 255, 0);
    fill(255, alpha);
    rect(227*unit, 889*unit, 181*unit, 50*unit, 6*unit);
    pop()
    // vote title move left out of screen
    var titleX = parabola("staticToMoving", 10, 40, t, 156*unit, -420*unit)
    masterScreen.screenTitle.xPosition = titleX
    // options move out
    for (i = 0; i < masterScreen.ideaList.length; i++) {
        var ovalX = parabola("staticToMoving", 15+i*2, 40, t, 104*unit, -500*unit)
        masterScreen.ovalList[i].xPosition = ovalX
        masterScreen.ideaObjectList[i].xPosition = ovalX + (masterScreen.ideaLeftX - 104*unit)
    }
    // button
    imageDict.viewResultsButton.resize(181*unit,0)
    image(imageDict.viewResultsButton, 123*unit+ovalX, 889*unit)

    ////////////////// vote results //////////////////
    // now t =  100
    // init, only once
    if (t == 50) { masterScreen.seventhInit() }
    // tittle move in
    if ( t>= 50 ) {
        var titleX = parabola("movingToStatic", 50, 40, t, 650*unit, 200*unit)
        masterScreen.screenTitle.xPosition = titleX
        masterScreen.seventhDraw()
        // voting results bar growing
        for (i= 0; i < masterScreen.rectList.length; i++) {
            var newWidth = parabola("movingToStatic", 90 + i*10, 40, t, 0, masterScreen.rectWidthList[i])
            masterScreen.rectList[i].w = newWidth
            // diaplay vote number and name of options
            push()
            var alpha = parabola("movingToStatic", 90+i*10, 50, t, 0, 255*0.45)
            noStroke()
            textStyle(NORMAL)
            textSize(24*unit)
            fill(255, alpha)
            text(masterScreen.voteNameList[i], masterScreen.rectLeftX + newWidth +12*unit, masterScreen.rectStartY+masterScreen.rectDistance*i+37*unit)
            textSize(20*unit)
            textStyle(ITALIC)
            text(masterScreen.voteNumberList[i], 17*unit, masterScreen.rectStartY+masterScreen.rectDistance*i+37*unit)
            pop()
        }
    }

}

function drawEighth() {
    if (t>240){
        target.draw()
    }
    masterScreen.seventhDraw()
    // title move out
    var titleX = parabola("staticToMoving", 0, 40, t, 200*unit, 650*unit)
    masterScreen.screenTitle.xPosition = titleX
    // bars moving out
    for ( i = 0; i < masterScreen.rectList.length; i++) {
        var newX = parabola("staticToMoving", 20+2*i, 40, t, masterScreen.rectLeftX, 650*unit)
        masterScreen.rectList[i].xPosition = newX
        // get rid of vote number and name of options
        push()
        var alpha = parabola("movingToStatic", 0, 30, t, 255*0.45, 0)
        noStroke()
        textStyle(NORMAL)
        textSize(24*unit)
        fill(255, alpha)
        text(masterScreen.voteNameList[i], masterScreen.rectLeftX + masterScreen.rectWidthList[i] +12*unit, masterScreen.rectStartY+masterScreen.rectDistance*i+37*unit)
        textSize(20*unit)
        textStyle(ITALIC)
        text(masterScreen.voteNumberList[i], 17*unit, masterScreen.rectStartY+masterScreen.rectDistance*i+37*unit)
        pop()
    }
    // master stream moves in
    master.moveRight(5, 60)
    if (t>60){
        master.draw(5)
    }
    // moving is done, john L slide in
    master.itemSlideIn(5, 160)
    if (t>=160) {
        master.draw(6)
    }
    // arrow show up
    //var alpha = parabola("movingToStatic", 560, 20, t, 0, 255)
    if (t > 220){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 554*unit, 760*unit)
    }
}

function drawNinth() {
    if (t>280){
        target.draw()
    }
    if (t == 0) {
        masterScreen.ninthInit()
    }
    // bubble lights up
    for (i = 0; i < masterScreen.bubbleList.length; i++) {
        var alpha = parabola("movingToStatic", 160+20*i, 30, t, 0, 255)
        masterScreen.bubbleList[i].alpha = alpha
    }
    // main draw function
    masterScreen.ninthDraw()
    master.draw(6)
    // arrow
    if (t<20){
    imageDict.arrow.resize(0,33*unit)
    image(imageDict.arrow, 554*unit, 760*unit)
    }
    // draw the blinking rectangle
    push()
    noStroke();
    var alpha = parabola("movingToStatic", 0, 40, t, 255, 0);
    fill(255, alpha);
    rect(0, 724*unit, 640*unit, 120*unit);
    pop()
    // move left
    master.moveLeft(6,30)
    // next screen move in
    var titleX = parabola("movingToStatic", 80, 40, t, 650*unit, 126*unit)
    masterScreen.screenTitle.xPosition = titleX
    // two bar flight in
    var benefitY = parabola("movingToStatic", 120, 40, t, -530*unit, 294*unit)
    var costX = parabola("movingToStatic", 120, 40, t, 650*unit, 44*unit)
    imageDict.costBar.resize(522*unit, 0)
    imageDict.benefitBar.resize(0, 522*unit)
    image(imageDict.costBar, costX, 783*unit)
    image(imageDict.benefitBar, 44*unit, benefitY)
    // draw switch (my rank and team average)
    if (t> 180) {
        imageDict.doubleArrow.resize(317*unit, 0)
        image(imageDict.doubleArrow, 160*unit, 947*unit)
        masterScreen.switchTitle.draw()
    }
}

function drawTenth() {
    if (t>70){
        target.draw()
    }
    if (t==0) {
        masterScreen.switchTitle.message = "Team Average"
        masterScreen.switchTitle.xPosition = 218*unit
    }
    masterScreen.ninthDraw()
    // draw switch (my rank and team average)
    imageDict.doubleArrow.resize(317*unit, 0)
    image(imageDict.doubleArrow, 160*unit, 947*unit)
    masterScreen.switchTitle.draw()
    // bars
    imageDict.costBar.resize(522*unit, 0)
    imageDict.benefitBar.resize(0, 522*unit)
    image(imageDict.costBar, 44*unit, 783*unit)
    image(imageDict.benefitBar, 44*unit, 294*unit)
    // animation of bubble moving
    for ( i = 0; i < masterScreen.bubbleList.length; i++) {
        masterScreen.bubbleList[i].bubbleMove(masterScreen.bubbleXList1[i], masterScreen.bubbleYList1[i], masterScreen.bubbleXList2[i], masterScreen.bubbleYList2[i], 0)
    }
}

function drawEleventh() {
    if (t>160){
        target.draw()
    }
    masterScreen.ninthDraw()
    // move the title out 
    var titleX = parabola("staticToMoving", 0, 30, t, 126*unit, 650*unit)
    masterScreen.screenTitle.xPosition = titleX
    // move the bubbles out
    for (i = 0; i < masterScreen.bubbleList.length; i++) {
        var newX = parabola("staticToMoving", 5+2*i, 30, t, masterScreen.bubbleXList2[i], 650*unit)
        masterScreen.bubbleList[i].xPosition = newX
    }
    // move the bars out 
    var barX = parabola("staticToMoving", 15, 30, t, 44*unit, 650*unit)
    imageDict.costBar.resize(522*unit, 0)
    imageDict.benefitBar.resize(0, 522*unit)
    image(imageDict.costBar, barX, 783*unit)
    image(imageDict.benefitBar, barX, 294*unit) 
    // mast move in
    master.moveRight(6, 45)
    if (t<= 120) {
        master.draw(6)
    }
    // The last one move in
    master.itemSlideIn(6,120)
    if (t>120) {
        master.draw(7)
    }
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

//#########################
//       p5 functions
//#########################

//function touchMoved() {
  //  return false;
//}

function touchStarted() {
    switch (state) {
        case "Welcome":
            state = "First"
            t = 0
            break
        case "First":
            if (t>300){
                state = "Second"
                t = 0
            }
            break;
        case "Second":
            if (t>620) {
                state = "Third"
                t = 0
            }
            break;
        case "Third":
            if (t>=520){
                state = "Forth"
                t = 0
            }
            break;
        /*case "Forth":
            if (t > 130) {
                state = "Fifth"
                t = 0
            }
            break;
        */ // transition from forth to fifth no longer controlled by click, happens automatically
        case "Fifth":
            if (t > 350) {
                state = "Sixth"
                t = 0
            }
            break;
        case "Sixth":
            if (t > 180) {
                state = "Seventh"
                t = 0
            }
            break;
        case "Seventh":
            if (t > 180) {
                state = "Eighth"
                t = 0
            }
            break;
        case "Eighth":
            if (t > 230) {
                state = "Ninth"
                t = 0
            }
            break;
        case "Ninth":
            if (t > 320) {
                state = "Tenth"
                t = 0
            }
            break;
        case "Tenth":
            if (t>40) {
                state = "Eleventh"
                t=0
            }
            break;
        case "Eleventh":
            if (t>190) {
                state = "Twelfth"
                t=0
            }
            break;
    }
}




