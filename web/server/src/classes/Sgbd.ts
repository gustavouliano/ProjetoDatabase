import { Database } from './Database';

export class Sgbd {
    
    public tipoSgbd: number;
    public porta: number;
    public user: string;
    public password: string;
    public database: Database[] = [];

    public addDatabase(database: Database){
        this.database.push(database);
    }
}