import { Tabela } from "./Tabela";

export class Database {
    
    public nome: string;
    public tabela: Tabela[] = [];

    public addTabela(tabela: Tabela){
        this.tabela.push(tabela);
    }
}