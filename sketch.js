var gameState = 1;
var PLAY = 1;
var END = 2;

var score;

var food;

var fuel;

var scene, sceneI, fan, fanny;
var player, play1, play2, play3, play4, play5, play6, block, blocky, rock, rockI, land, landI, gas, gasI, foodV, foodI;
var blockG, fuelG, foodG;
var boomA, boomA2, boom, boom2;

function preload(){

sceneI= loadImage("grassy.png");
//fanny = loadAnimation("fan1.png", "fan2.png", "fan3.png");
play1 = loadAnimation("cr61.png", "cr62.png");
//play5 = loadImage("c5.png");
blocky = loadImage("block.jpg");
rockI = loadImage("rock.png");
gasI = loadImage("gas.png");
foodI = loadImage("rice.png");
boomA = loadAnimation("b1.png", "b2.png", "b3.png");
boomA2 = loadAnimation("b3.png", "b2.png", "b1.png");

}

function setup() {
  createCanvas(1600,1200);

scene = createSprite(1200, 500, 2050, 2050);
scene.addImage(sceneI);
//scene.velocityX = -10;
scene.scale = 8.4;

//creating the land sprites.
land = createSprite(800, 1200, 2050, 100);
land.shapeColor = "green";

player = createSprite(100, 1000, 50, 50);
player.addAnimation("player", play1);
player.scale = 0.3;

score = 0;

food = 10;

fuel = 100;

blockG = new Group();
fuelG = new Group();
foodG = new Group();
boomG = new Group();

}

function draw(){
  background(0);
  console.log(scene.x);

if(gameState === PLAY){

if(keyDown(UP_ARROW)){
player.y = player.y - 25;
}

if(keyDown(DOWN_ARROW)){
  player.y = player.y + 25;
}

if(keyDown(RIGHT_ARROW)){
  player.x = player.x + 25;
}

if(keyDown(LEFT_ARROW)){
  player.x = player.x - 25;
}

if(player.isTouching(blockG) && food > 0){
  food = food - 2;
  blockG.destroyEach();
}

//player.velocityY = player.velocityY + 1.0;

if(gameState === END){
  textSize(100);
  fill(255, 0, 0);
  stroke(0, 0, 255);
  text("GAME OVER!!!", 400, 500);
  textSize(70);
  fill(255, 0, 0);
  stroke(0, 0, 255);
  text("Press 'r' to restart", 450, 600)
}

if(keyDown("r")){
  blockG.destroyEach();
  gameState === PLAY;
}

if(frameCount % 200 === 0){
  fuel = fuel-1;
}

player.collide(land);
blockG.collide(land)


if(fuelG.isTouching(player)){
  fuel = fuel + 1;
  fuelG.destroyEach();
}

if(foodG.isTouching(player)){
  foodG.destroyEach();
  score = score + 1;
  food = food + 3;
}


}

spawnBlocks();
spawnGas();
spawnFood();
spawnBoomR();
//spawnBoomL();
drawSprites();

textSize(50);
fill("blue");
stroke(0);
text("🍖 = " + food, 10, 100);

textSize(50);
fill("red");
stroke(0);
text("Score = " + score, 1200, 100);

textSize(50);
fill("magenta");
stroke(0);
text("⛽ = " + fuel, 600, 100);

}

function spawnBlocks(){
 
if(frameCount % 150 === 0){
  block = createSprite(1800, Math.round(random(10, 1000)), 50, 50);
  block.velocityX = -25;
  block.addImage(rockI);
  block.scale = 0.2;
  block.lifetime = 150;

blockG.add(block);

}

if(score === 5){
scene.velocityX = -25;
}

if(scene.x < 350){
  scene.x =  1200;
}

if(fuel < 0 || food < 0){
  player.destroy();
}

if(player.isTouching(boomG)){
  player.destroy;
}

}

function spawnGas(){

  if(frameCount % 100 === 0){
    gas = createSprite(1800, Math.round(random(10, 1000)), 100, 100);
    gas.velocityX = -25;
    gas.shapeColor = "red";
    gas.addImage(gasI);
    gas.scale = 0.1;
    gas.velocityX = -25;
    gas.lifetime = 150;
    fuelG.add(gas);
    }
}

function spawnFood(){
if(frameCount % 100 === 0){
foodV = createSprite(1800, Math.round(random(10, 1000)), 50, 50);
foodV.addImage(foodI);
foodV.velocityX = -25;
foodV.scale = 0.2;
foodG.add(foodV);
}
}

function spawnBoomR(){

if(frameCount % 50 === 0){
boom = createSprite(-50, Math.round(random(10, 1000)), 50, 50);
boom.addAnimation("boom", boomA);
boom.scale = 0.1;
boom.velocityX = 51;
boomG.add(boom);
}

}