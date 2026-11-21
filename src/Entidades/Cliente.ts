export class Cliente{
    id:number;
    dni:string;
    nombre:string;
    telefono:string;
    correo:string;

    constructor(id: number, dni: string, nom: string, tel: string, correo: string){
        this.id = id;
        this.dni = dni;
        this.nombre = nom;
        this.telefono = tel;
        this.correo = correo;
    }
}