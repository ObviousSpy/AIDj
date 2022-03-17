song = "";
scorerightwrist = 0;
scoreleftwrist = 0;
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
function preload(){
song = loadSound("music.mp3");
}

function setup(){
canvas = createCanvas(600, 500);
canvas.position(660, 300);
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
} 

function draw(){
image(video, 0, 0, 600, 500);
fill("#FF0000");
stroke("#FF0000");

fill("#FF0000");
stroke("#FF0000");

circle(rightwristX, rightwristY, 20);
if(rightwristY > 0 && rightwristY <= 100){
document.getElementById("speed").innerHTML = "speed = 0.5x";
song.rate(0.5);
}
else if(rightwristX > 100 && rightwristY <= 200){
document.getElementById("speed").innerHTML = "speed = 1x"
song.rate(1);
}
else if(rightwristX > 200 && rightWristY <= 300){
document.getElementById("speed").innerHTML = "speed = 1.5x"
song.rate(1.5);
}
else if(rightwristX > 300 && rightWristY <= 400){
document.getElementById("speed").innerHTML = "speed = 2x"
song.rate(2);
}
else if(rightwristX > 400 && rightWristY <= 500){
document.getElementById("speed").innerHTML = "speed = 2.5x"
song.rate(2.5);
}

if(scoreleftwrist > 0.2){
circle(leftwristX, leftwristY, 20);
innumberleftwristY = Number(leftwristY);
remove_decimals = floor(innumberleftwristY);
leftwristY_1000 = remove_decimals/1000;
volume = leftwristY_1000 * 2;
document.getElementById("song_volume").innerHTMTL = "volume = " + volume;
song.setVolume(volume);
}
}
function Play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function modelLoaded(){
console.log("poseNet is initalized");
}

function gotPoses(results){
if(results.length > 0){
console.log(results);
scorerightwrist = results[0].pose.keypoints[10].score;
console.log("scorerightwrist = " + scorerightwrist)
scoreleftwrist = results[0].pose.keypoints[9].score;
leftwristX = results[0].pose.leftWrist.x;
leftwristY = results[0].pose.leftWrist.y;
console.log("leftwristx = " + leftwristX + "leftwristy = " + leftwristY);
rightwristX = results[0].pose.rightWrist.x;
rightwirstY = results[0].pose.rightWrist.y;
console.log("rightwristx = " + rightwristX + "leftwristy = " + leftwristY);
console.log("scoreleftwrist = " + scoreleftwrist);
}
}