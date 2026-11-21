export class Proveedor{
    id:number;
    ruc:string;
    razonSocial:string;
    telefono:string;
    correo:string;

    constructor(id: number, ruc: string, razon: string, tel: string, correo: string){
        this.id = id;
        this.ruc = ruc;
        this.razonSocial = razon;
        this.telefono = tel;
        this.correo = correo;
    }
}