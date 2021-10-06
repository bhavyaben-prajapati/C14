var trex, trex_running, edges;
var groundImage,ground;
var invisibleGround
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesGroup
var cloudImage, cloudsGroup
var score = 0
var PLAY = 1
var END = 0
var gamestate = 1


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage ("obstacle1.png")
  obstacle2 = loadImage ("obstacle2.png")
  obstacle3 = loadImage ("obstacle3.png")
  obstacle4 = loadImage ("obstacle4.png")
  obstacle5 = loadImage ("obstacle5.png")
  obstacle6 = loadImage ("obstacle6.png")
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground = createSprite(300, 180, 600, 10)
  ground.addImage("ground", groundImage)
  ground.x = ground.width/2
  

  invisibleGround = createSprite(300, 190, 600, 10)
  invisibleGround.visible = false
  var rand = random(0,100)
  console.log("hello"+"world")
  console.log("hello"+rand)

  obstaclesGroup = createGroup()
  cloudsGroup = createGroup()

}


function draw(){
  //set background color 
  background("white");

  textSize(20)
  text("Score : "+score, 450,50)

  if(gamestate === PLAY){
    //jump when space key is pressed
    if(keyDown("space") && trex.y > 120){
      trex.velocityY = -10;
    }
      //we are reseting the ground when it passes the left side canvas
    if(ground.x < 0) {
      ground.x = ground.width/2
    }
    ground.velocityX = -5
      
    //gravity for the t-rex
    trex.velocityY = trex.velocityY + 0.5;
   
    spawnClouds()
    spawnObstacles()
    if(trex.isTouching(obstaclesGroup)) {
      gamestate = END
    }
  }
  else if(gamestate === END){
    ground.velocityX = 0
    trex.velocityY = 0;
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
  }



  //logging the y position of the trex
  //console.log(trex.y)
  
  
  //stop trex from falling down
  trex.collide(invisibleGround)
  
  drawSprites();

}

function spawnClouds() {
  if(frameCount %60 === 0) {
    cloud = createSprite(600, 123, 10, 10)
    cloud.velocityX = -3
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    cloud.y = Math.round(random(30,130))
    cloud.lifetime = 600 
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    
    cloudsGroup.add(cloud)

  }
}
function spawnObstacles() {
  if(frameCount % 70 === 0) {
    obstacle = createSprite(600, 162, 30, 30)
    obstacle.velocityX = -6
    var rand = Math.round(random(1,6))
    //img = "obstacle"+rand
    //obstacle.addImage(img)
    //console.log("obstacle"+rand)
    switch(rand) {
      case 1: obstacle.addImage(obstacle1)
      break;
      case 2: obstacle.addImage(obstacle2)
      break;
      case 3: obstacle.addImage(obstacle3)
      break;
      case 4: obstacle.addImage(obstacle4)
      break;
      case 5: obstacle.addImage(obstacle5)
      break;
      case 6: obstacle.addImage(obstacle6)
      break;
      default: break
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 600

    obstaclesGroup.add(obstacle)
  }


}