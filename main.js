leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;

music="";
leftWristScore=0;
rightWristScore = 0;

function preload()
{
   music=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotResults);
}

function draw()
{
    image(video,0,0,600,500);

    fill("#fa0202");
    stroke("#fa0202");
    if(leftWristScore>0.2){
        circle(leftWristX, leftWristY, 20);
        NumberLeftWristY = Number(leftWristY);
        NewLeftWristY = floor(NumberLeftWristY);
        Volume = NewLeftWristY/500;
        document.getElementById("volume").innerHTML="Volume : " +Volume; 
        music.setVolume(Volume);
    }
    if(rightWristScore>0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY<=100){
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            music.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "Speed : 1x";
            music.rate(1);
        }
        else if(rightWristY > 200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
            music.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "Speed : 2x";
            music.rate(2);
        }
        else if(rightWristY > 400 && rightWristY<=500){
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
            music.rate(2.5);
        }
    }
    
      
}

function Play()
{
    music.play();
    music.rate(1);
    music.setVolume(1);
}

function ModelLoaded()
{
    console.log("PoseNet is initialised");
}

function gotResults(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;

        console.log("Left Wrist X is "+ leftWristX +" and Y is "+ leftWristY);
        console.log("Right Wrist X is "+ rightWristX +" and Y is "+ rightWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;

        console.log("Left Wrist score is "+ leftWristScore +" and Right Wrist score is "+ rightWristScore);
        
    }

}

