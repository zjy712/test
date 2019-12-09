let hello : string = 'hello TypeScript'

document.querySelectorAll('.app')[0].innerHTML = hello;
console.log(document.querySelectorAll('.app')[0]);

interface StringArray {
    [index: number]: string
}

class Dog {
  constructor(name: string) {
    this.name = name
  }
  public name: string = 'dog'
  run() {console.log('Dog run')}
  private pri() {console.log('Dog  pri')}
  protected pro() {console.log('Dog pro')}
  readonly legs: number = 4
}


let dog = new Dog('wangwang');

console.log(dog.legs);

class Husky extends Dog {
  constructor (name: string ,color:string) {
    super(name)
    this.color = color;
    this.pro()
  }
  color:string
}
let husky = new Husky('Husky','black')

console.log(husky.legs);