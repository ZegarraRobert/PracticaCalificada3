export class Venta{
    id:number;
    cliente:string;
    producto:string;
    cantidad:number;
    subtotal:number;
    igv:number;
    total:number;

    constructor(id: number, cli: string, prod: string, cant: number, sub: number, igv: number, total: number){
        this.id = id;
        this.cliente = cli;
        this.producto = prod;
        this.cantidad = cant;
        this.subtotal = sub;
        this.igv = igv;
        this.total = total;
    }
}