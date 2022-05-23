score_leftWrist = 0;
Status = "";
HarryPorter_theme_song = "";
PetPan_song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
HarryPotter_status = "";
peterPan_status = "";
score_rightWrist = 0;

function preload() {
    HarryPorter_theme_song = loadSound("HarryPortter_theme_song.mp3");
    PetPan_song = loadSound("PeterPan_song.mp3");
}

function setup() {
    canvas = createCanvas(600 , 500);
    canvas.position(550 , 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;

    }
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video , 0 , 0 , 600 , 500);

    HarryPotter_status = HarryPorter_theme_song.isPlaying();
    peterPan_status = PetPan_song.isPlaying();

    fill("#ff0000");
    stroke("#ff0000");

    if(score_rightWrist > 2.0) {
        circle(rightWristX , rightWristY , 20);

        PetPan_song.stop();

        if(HarryPotter_status == false) {
            HarryPorter_theme_song.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter Theme Song";
        }
    }

    if(score_leftWrist > 2.0) {
        circle(leftWristX , leftWristY , 20);

        HarryPorter_theme_song.stop();

        if(peterPan_status == false) {
            PetPan_song.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Song";
        }
    }
}