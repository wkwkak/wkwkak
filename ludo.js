var currPos = 0;
var step = 72.5;
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
var allcolor = ["red", "blue", "green", "yellow"];
var pawnOut = { red: 0, blue: 0, green: 0, yellow: 0 }

function HaveHover() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < allcolor.length; i++) {
        for (var n = 1; n <= 4; n++) {
            var firstPawn = document.getElementById(allcolor[i] + "pawn" + n);
            var secondPawn = document.getElementById(currpawn);
            if (firstPawn.style.top == secondPawn.style.top && firstPawn.style.left == secondPawn.style.left && currcolor != allcolor[i] && currPos + num < 47) {
                count++;
                toKill = allcolor[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}

function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0 || currPos + num > 47) {
        if (DontHaveOtherFree() || currPos + num > 47) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "Unfortunatlly you stuck";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(img/dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}

function changePlayer() {
    if (num != 6) {
        var text = document.getElementById('player');
        switch (text.innerText) {
            case "red":
                text.innerText = text.style.color = "green";
                break;
            case "green":
                text.innerText = text.style.color = "yellow";
                break;
            case "yellow":
                text.innerText = text.style.color = "blue";
                break;
            case "blue":
                text.innerText = text.style.color = "red";
                break;
        }
    }
    var dice = document.getElementById('dice');
    if(text.innerText == "red"){
        dice.style.position="absolute";
        dice.style.left = "240px"; 
        dice.style.top = "5px";
    }
    if(text.innerText == "blue"){
        dice.style.position="absolute";
        dice.style.left = "670px"; 
        dice.style.top = "190px";
    }
    if(text.innerText == "yellow"){
        dice.style.position="relative";
        dice.style.left = "480px"; 
        dice.style.top = "610px";
    }
    if(text.innerText == "green"){
        dice.style.position="relative";
        dice.style.left = "50px"; 
        dice.style.top = "430px";
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
   
    dice.style.backgroundImage = "url(img/dice.gif)";
}
var positions = {
    redpawn1: 0,
    redpawn2: 0,
    redpawn3: 0,
    redpawn4: 0,
    bluepawn1: 0,
    bluepawn2: 0,
    bluepawn3: 0,
    bluepawn4: 0,
    greenpawn1: 0,
    greenpawn2: 0,
    greenpawn3: 0,
    greenpawn4: 0,
    yellowpawn1: 0,
    yellowpawn2: 0,
    yellowpawn3: 0,
    yellowpawn4: 0
};
var onboard = {
    redpawn1: 0,
    redpawn2: 0,
    redpawn3: 0,
    redpawn4: 0,
    bluepawn1: 0,
    bluepawn2: 0,
    bluepawn3: 0,
    bluepawn4: 0,
    greenpawn1: 0,
    greenpawn2: 0,
    greenpawn3: 0,
    greenpawn4: 0,
    yellowpawn1: 0,
    yellowpawn2: 0,
    yellowpawn3: 0,
    yellowpawn4: 0
};

function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i <= 4; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i] + num >= 47) return false;
    }
    return true;
}

function CheckForWinner() {
    if (pawnOut[currcolor] == 4) {
        var dice = document.getElementById("dice");
        var player = document.getElementById("player");
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the " + currcolor + " player";
    }
}

function stepDown() {
    var doc = document.getElementById(currcolor + "pawn" + NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr + step) + 'px';
    currPos++;
}

function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}

function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}

function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    //var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    //doc.style.top = (curr-stepy) + 'px';
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
var stepsRed = [];
var stepsYellow = [];
var stepsBlue = [];
var stepsGreen = [];

function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepLeft, stepsRed, 3);
pushSteps(stepDown, stepsRed, 6);
pushSteps(stepRight, stepsRed, 6);
pushSteps(stepUp, stepsRed, 6);
pushSteps(stepLeft, stepsRed, 1);
pushSteps(stepDown, stepsRed, 5);
pushSteps(stepLeft, stepsRed, 4);
pushSteps(stepUp, stepsRed, 4);
pushSteps(stepRight, stepsRed, 3);
pushSteps(stepDown, stepsRed, 3);
pushSteps(stepLeft, stepsRed, 2);
pushSteps(stepUp, stepsRed, 2);
pushSteps(stepRight, stepsRed, 1);
pushSteps(stepDown, stepsRed, 1);

//Yellow pawns path
pushSteps(stepRight, stepsYellow, 3);
pushSteps(stepUp, stepsYellow, 6);
pushSteps(stepLeft, stepsYellow, 6);
pushSteps(stepDown, stepsYellow, 6);
pushSteps(stepRight, stepsYellow, 1);
pushSteps(stepUp, stepsYellow, 5);
pushSteps(stepRight, stepsYellow, 4);
pushSteps(stepDown, stepsYellow, 4);
pushSteps(stepLeft, stepsYellow, 3);
pushSteps(stepUp, stepsYellow, 3);
pushSteps(stepRight, stepsYellow, 2);
pushSteps(stepDown, stepsYellow, 2);
pushSteps(stepLeft, stepsYellow, 1);
pushSteps(stepUp, stepsYellow, 1);

//Blue pawns path
pushSteps(stepUp, stepsBlue, 3);
pushSteps(stepLeft, stepsBlue, 6);
pushSteps(stepDown, stepsBlue, 6);
pushSteps(stepRight, stepsBlue, 6);
pushSteps(stepUp, stepsBlue, 1);
pushSteps(stepLeft, stepsBlue, 5);
pushSteps(stepUp, stepsBlue, 4);
pushSteps(stepRight, stepsBlue, 4);
pushSteps(stepDown, stepsBlue, 3);
pushSteps(stepLeft, stepsBlue, 3);
pushSteps(stepUp, stepsBlue, 2);
pushSteps(stepRight, stepsBlue, 2);
pushSteps(stepDown, stepsBlue, 1);
pushSteps(stepRight, stepsBlue, 1);

//Green pawns path
pushSteps(stepDown, stepsGreen, 3);
pushSteps(stepRight, stepsGreen, 6);
pushSteps(stepUp, stepsGreen, 6);
pushSteps(stepLeft, stepsGreen, 6);
pushSteps(stepDown, stepsGreen, 1);
pushSteps(stepRight, stepsGreen, 5);
pushSteps(stepDown, stepsGreen, 4);
pushSteps(stepLeft, stepsGreen, 4);
pushSteps(stepUp, stepsGreen, 3);
pushSteps(stepRight, stepsGreen, 3);
pushSteps(stepDown, stepsGreen, 2);
pushSteps(stepLeft, stepsGreen, 2);
pushSteps(stepUp, stepsGreen, 1);
pushSteps(stepRight, stepsGreen, 1);

function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var pawnToMove = document.getElementById(victim);
    switch (victim) {
        case "redpawn1":
            pawnToMove.style.top = 149 + "px";
            pawnToMove.style.left = 442 + "px";
            break;
        case "redpawn2":
            pawnToMove.style.top = 102 + "px";
            pawnToMove.style.left = 395 + "px";
            break;
        case "redpawn3":
            pawnToMove.style.top = 55 + "px";
            pawnToMove.style.left = 442 + "px";
            break;
        case "redpawn4":
            pawnToMove.style.top = 102 + "px";
            pawnToMove.style.left = 490 + "px";
            break;
        case "bluepawn1":
            pawnToMove.style.top = 451 + "px";
            pawnToMove.style.left = 490 + "px";
            break;
        case "bluepawn2":
            pawnToMove.style.top = 451 + "px";
            pawnToMove.style.left = 395 + "px";
            break;
        case "bluepawn3":
            pawnToMove.style.top = 404 + "px";
            pawnToMove.style.left = 442 + "px";
            break;
        case "bluepawn4":
            pawnToMove.style.top = 498 + "px";
            pawnToMove.style.left = 442 + "px";
            break;
        case "greenpawn1":
            pawnToMove.style.top = 149 + "px";
            pawnToMove.style.left = 93 + "px";
            break;
        case "greenpawn2":
            pawnToMove.style.top = 102 + "px";
            pawnToMove.style.left = 140 + "px";
            break;
        case "greenpawn3":
            pawnToMove.style.top = 55 + "px";
            pawnToMove.style.left = 93 + "px";
            break;
        case "greenpawn4":
            pawnToMove.style.top = 102 + "px";
            pawnToMove.style.left = 47 + "px";
            break;
        case "yellowpawn1":
            pawnToMove.style.top = 451 + "px";
            pawnToMove.style.left = 47 + "px";
            break;
        case "yellowpawn2":
            pawnToMove.style.top = 451 + "px";
            pawnToMove.style.left = 140 + "px";
            break;
        case "yellowpawn3":
            pawnToMove.style.top = 404 + "px";
            pawnToMove.style.left = 93 + "px";
            break;
        case "yellowpawn4":
            pawnToMove.style.top = 498 + "px";
            pawnToMove.style.left = 93 + "px";
            break;

    }
}

function randomNum() {
    if (!clicked) {
        num = Math.floor((Math.random() * 6) + 1);;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(img/" + num + ".jpg)";
        clicked = true;
    }
    if (num != 6 && DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunatlly you stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}

function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    if (num + currPos > 47) {
        Stuck();
    } else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || num === 6) {
                    if (onboard[currpawn] === 0) {
                        var doc = document.getElementById(currpawn);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                        switch (Color) {
                            case "red":
                                doc.style.left = 395 + 'px';
                                doc.style.top = 132 + "px";
                                break;
                            case "yellow":
                                doc.style.left = 395 + 'px';
                                doc.style.top = 555 + "px";
                                break;

                            case "blue":
                                doc.style.left = 608 + 'px';
                                doc.style.top = 347 + "px";
                                break;

                            case "green":
                                doc.style.left = 184 + 'px';
                                doc.style.top = 347 + "px";
                                break;


                        }
                        onboard[currpawn] = 1;
                    } else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + num; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "yellow":
                                for (i = currPos; i < position + num; i++) {
                                    stepsYellow[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;

                            case "green":
                                for (i = currPos; i < position + num; i++) {
                                    stepsGreen[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        var victim = HaveHover();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 47) {
                            pawnOut[currcolor]++;
                            onboard[currpawn] = 0;
                            positions[currpawn] = 0;
                            document.getElementById(currpawn).style.visibility = "hidden";
                        };
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(img/dice.gif)";
                } else Stuck();
            }
        }
    }
    //call function to cut the previously present "OldPawn findOldPawn(currPawn)"coin if any call "resetOldPawn(color,pawnNo)"
    //
    //"OldPawn findOldPawn(currPawn)"
    //"resetOldPawn(color,pawnNo)"
}