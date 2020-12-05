var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey , monkey_running , m ;

var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;

var Ground;

var bananaScore;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  m = loadAnimation ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
     
  createCanvas(570,450);
  

  
  monkey = createSprite(100,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
    monkey.addAnimation("m",m);

  monkey.scale= 0.2;
  
  ground= createSprite(230,448,1000);

    
  bananaScore = 0;
 
  fruitGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  background("white")
  
 if (gameState===PLAY){ 
       bananas();
       obstacles();
   st = Math.ceil(frameCount/frameRate())
   
      switch(bananaScore){
        
        case 2: monkey.scale=0.13;
                break;
        case 5: monkey.scale=0.145;
                break;
        case 10: monkey.scale=0.16;
                break;
        case 20: monkey.scale=0.175;
                break;
        case 40: monkey.scale=0.19;
                break;
        default: break;
    }
   

  
   
   if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach(); 
     bananaScore++;
   }
  
   monkey.velocityY = monkey.velocityY + 1;
   monkey.collide(ground);
   
  if(keyDown("space")){    
      monkey.velocityY=-10;
  }
  
   
   if(obstacleGroup.isTouching(monkey)){
       gameState = END;     
   }
 }
  
  if (gameState === END){
  
  fruitGroup.destroyEach();
    
    monkey.changeAnimation ("m", m);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  
    
}
  
  monkey.collide(ground);
  

drawSprites(); 
  
  fill("black");
  stroke ("black")
  textSize(15)
  
  text("BANANAS COLLECTED = " + bananaScore, 10,20);
}



function bananas(){
  
  if (frameCount%140===0){
             
    banana = createSprite(570,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(70,230));
    banana.scale = 0.1;
    
    banana.velocityX = -7;
    banana.lifetime = 200; 
    
    fruitGroup.add(banana)
  }
}
   
function obstacles(){
  
  if (frameCount%100===0){
    
    obstacle = createSprite(570,360,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale = 0.18 ;
    obstacle.lifetime = 200
//  obstacle.debug = true;
    obstacle.rotation = 5;
   
    obstacle.setCollider("rectangle",0,0,380,380);
    
    obstacleGroup.add(obstacle);    
  }
}



