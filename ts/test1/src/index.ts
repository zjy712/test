let hello : string = 'hello TypeScript'

document.querySelectorAll('.app')[0].innerHTML = hello;
console.log(document.querySelectorAll('.app')[0]);

interface StringArray {
    [index: number]: string
}