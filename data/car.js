class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(brand, model){
    this.#brand = brand;
    this.#model = model;
    
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}`);
  }

  go(){
    if (this.speed <= 195 && this.isTrunkOpen === false){ 
    this.speed += 5;
    }
  }

  break(){
    if(this.speed >= 5){
    this.speed -= 5;
    }
  }

  openTrunk(){
    if (this.speed === 0){ 
    this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }


}

class RaceCar extends Car{

  acceleration;

  constructor(brand, model){
    super(brand, model);
    

  }

  go(acceleration){
    this.acceleration = acceleration;
    if((this.speed + this.acceleration) <= 300){
    this.speed += this.acceleration
    }
  }

  openTrunk(){
    return
  }
  closeTrunk(){
    return 
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');



// car1.go();
// car1.openTrunk();
// car1.go();


// car1.displayInfo();
// car2.displayInfo();

// const car3 = new RaceCar('Mc Laren', 'F1');

// car3.go(100);





// console.log(car3);



