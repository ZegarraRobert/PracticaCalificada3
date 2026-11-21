export class ProductoFarmaceutico{
    id:number;
    codigo:string;
    nombre:string;
    laboratorio:string;
    precio:number;
    stock:number;

    constructor(id: number, cod: string, nom: string, lab: string, precio: number, stock: number){
        this.id = id;
        this.codigo = cod;
        this.nombre = nom;
        this.laboratorio = lab;
        this.precio = precio;
        this.stock = stock;
    }
}