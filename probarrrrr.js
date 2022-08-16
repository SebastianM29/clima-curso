class Persona{
    constructor(edad,altura){
        this.anios=edad,
        this.alto=altura
    }
 get getAlto (){
    return this.alto
 }
 set setAlto(alto){
this.alto=alto;

 }


    enojado(){
        return`enojado porque tiene ${this.anios}`
    }

    static perri(nombrePerro){

        return`${nombrePerro} , esta durmiendo`;
    }
}




/*let nombre=new Persona(20,1.68);
console.log(nombre)
console.log(nombre.anios);
console.log(nombre.enojado());

nombre.anios=40;
console.log(nombre.enojado());
console.log(nombre.getAlto);
nombre.setAlto=2.4
console.log(nombre);
console.log(Persona.perri('Neronete'))
console.log(nombre);
class NuevaPersona extends Persona{};
let nuevoNombre=new NuevaPersona(60,2.3);
console.log(nuevoNombre);
class NuevaPersona2 extends Persona{}
let nuevoNombre2=new NuevaPersona2(50,1.10);
console.log(nuevoNombre2);*/



class Hijos {

    constructor(edad,altura){
    this.edad=edad,
    this.altura=altura
}
get getEdad (){
return this.edad
}
set setAltura (altura){
this.altura=altura
}
 f(params) {
    return ` mi nombre es ${params}`;
    
}
static padrede(pa){
    return `el padre es ${pa}`;
}

}


let padre = new Hijos(41,1.25);
console.log(padre);
console.log(padre.f('juan'));
console.log(Hijos.padrede('Damian'));

class Hijos2 extends Hijos {};
let hijo2=new Hijos2(34,1.65);
console.log(hijo2);

console.log(padre.getEdad);
console.log(padre);
padre.setAltura=1.99;
console.log(padre);


 

let sumando = (a,b,c,d) => {
final=a+b+c+d
return final
};

let verResultado = sumando(1,2,3,4);
console.log(verResultado);