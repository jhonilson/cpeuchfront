export class Tarea {
    identificador: string;
    descripcion!: string;
    fechaCreacion!: string;
    vigente!: boolean;

    constructor(identificador: string, descripcion: string, fechaCreacion: string, vigente: boolean) {
        this.identificador = identificador;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.vigente = vigente;
    }
}
