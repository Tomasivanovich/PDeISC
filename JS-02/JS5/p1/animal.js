export default class Animal {
  //Contructor para la clase
  constructor(name, jail, type, weigth) {
    this.id = Date.now();
    this.name = name;
    this.jail = jail;
    this.type = type;
    this.weigth = weigth;
  }

  //getters de los atributos
  getName() {
    return this.name;
  }
  getJail() {
    return this.jail;
  }
  getWeigth() {
    return this.weigth;
  }
  getType() {
    let type = "Felino";
    if (this.type === 2) {
      type = "Ave";
    } else if (this.type === 3) {
      type = "Reptil";
    }
    return type;
  }
}