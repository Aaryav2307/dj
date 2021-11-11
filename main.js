song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("dream.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function draw(){
    image = (video, 0, 0, 600, 500); 
    
    fill("#ff0000");
    stroke("#ff0000");
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        numLeftWristY = Number(leftWristY);

        noDecLeftWristY = floor(leftWristY);

        volume = noDecLeftWristY / 500;

        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function surprise(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("model loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        consol.log("scoreLeftLeftWrist = " + scoreLeftLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX, rightWristY, leftWristY, leftWristX, rightWristX);
    }
}