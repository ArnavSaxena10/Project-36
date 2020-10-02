class Food{
    constructor(){
        this.image=loadImage("Milk.png");

    }

    display(){

        feed=createButton("Feed the dog");
        feed.position(670,95);
        feed.mousePressed(feedDog);


        addFood=createButton("Add Food");
        addFood.position(770,95);
        addFood.mousePressed(addFoods);

        var x=80, y=100;

        imageMode(CENTER);
        image(this.image,650,60,70,70);

        if(foods!=0){
            for(var i=0;i<foods;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    bedroom(){
        image(bedroomImg,250,250,width, height);
    }

    garden(){
        image(gardenImg,250,250,width, height);
    }

    washroom(){
        image(washroomImg,250,250,width, height);
    }
}