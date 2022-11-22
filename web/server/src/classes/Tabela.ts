import { Coluna } from "./Coluna";

export class Tabela {
    
    public nome: string;
    public coluna: Coluna[] = [];

    public addColumn(Column: Coluna){
        this.coluna.push(Column);
    }
}