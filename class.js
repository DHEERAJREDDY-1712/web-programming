class Car {
    constructor(carType){
    this.carType = carType;
    }
}

class Economy extends Car{
    constructor(brand, model, year, carType){
        super(carType);
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}

class SUV extends Car{
    constructor(brand, model, year, carType){
        super(carType);
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}

class Luxury extends Car{
    constructor(brand, model, year, carType){
        super(carType);
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}
