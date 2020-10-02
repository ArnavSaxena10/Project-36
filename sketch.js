//Create variables here
var dog1, dog, happyDog, database, foods, foodStock;
var addFood, feed, fedTime, lastFed, food1, FoodObj, t=1, flag=0;
var bedroomImg, gardenImg, washroomImg, readState, gameState, sadDog, currentTime;


function preload(){
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  bedroomImg = loadImage("virtual pet images/Bed Room.png");
  gardenImg = loadImage("virtual pet images/Garden.png");
  washroomImg = loadImage("virtual pet images/Wash Room.png");
  sadDog = loadImage("virtual pet images/Lazy.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  dog1 = createSprite(250,300,10,10);
  dog1.addImage(dog);
  dog1.scale=0.20;

 foodStock=database.ref("FoodObj").on("value",readStock);

 fedTime=database.ref("FeedTime/hour").on("value",(data)=>{
   lastFed=data.val();
  });

   readState=database.ref("gameState").on("value",(data)=>{
     gameState=data.val();
   });
 
 food1 = new Food();

}


function draw() {  
background(46,139,87);

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+lastFed+" PM",300,30);
}
else if(lastFed==0){
  text("Last Feed: 12 AM",300,30);
}
else{
  text("Last Feed: "+ lastFed+" AM",300,30);
}

food1.display();

lastFed=hour();

if(flag===1 && t>0){
  timer();
}

if(t===0){
  dog1.addImage(dog);
  dog1.scale=0.20;
  flag=0;
}

// if(gameState!="Hungry"){
//   feed.visible=false;
//   addFood.visible=false;
//   dog1.visible=false;
//   dog1.addImage(happyDog);
// }

// else if(gameState==="Hungry"){
//   feed.visibile=true;
//   addFood.visible=true;
//   dog1.visible=true;
//}

if(currentTime==(lastFed+4)){
  update("Hungry");
  dog1.addImage(sadDog);
}

else if(currentTime==(lastFed)){
  update("Not Hungry");
  dog1.addImage(dog);
}

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  food1.garden();
  dog1.visible=false;
  feed.hide();
  addFood.hide();

}

if(currentTime==(lastFed+3)){
  update("Bathing");
  food1.washroom();
  dog1.visible=false;
  feed.hide();
  addFood.hide();

}

else if(currentTime==(lastFed+2)){
  update("Sleeping");
  food1.bedroom();
  dog1.visible=false;
  feed.hide();
  addFood.hide();
}

// else{
//   update("Hungry")
//}

  drawSprites();
}

function readStock(data){
  foods=data.val();
  //console.log(foods)
}

function writeStock(x){

  if(x<=0){
    x=0;
  }

  else{
    x=x-1;
  }
  database.ref('/').update({
    FoodObj:x
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    FoodObj:foods
  })

}

function feedDog(){
  dog1.addImage(happyDog);
  flag=1;

  foods=foods-1;
  database.ref('/').update({
    FoodObj:foods,
    FeedTime:hour()
  })
}

function timer(){

  if (frameCount % 60 == 0 && t > 0){
    t--;
  }
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

async function hour(){
  var response =await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON =await response.json();
  console.log(responseJSON);

  var dateTime = responseJSON.datetime;
  console.log(dateTime);

  var hour = dateTime.slice(11,13);
  console.log(hour);
  return hour
}




