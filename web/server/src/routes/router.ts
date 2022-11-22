import { Router, Request, Response } from 'express';
import { Coluna } from '../classes/Coluna';
import { Database } from '../classes/Database';
import { Tabela } from '../classes/Tabela';
import * as fs from 'fs';
import { Sgbd } from '../classes/Sgbd';

const router = Router();

var sgbd = new Sgbd();

router.post('/api/database', (req: Request, res: Response) => {
    var database = new Database();
    database.nome = req.body.nome;
    sgbd.porta = req.body.porta;
    sgbd.user = req.body.usuario;
    sgbd.password = req.body.senha;
    sgbd.tipoSgbd = req.body.tipoSgbd;
    sgbd.addDatabase(database);
    return res.status(201).json({ msg: 'Criado' });
});

router.get('/api/table', (req: Request, res: Response) => {
    var oDados = sgbd.database[0] ? sgbd.database[0].tabela : [];
    var databaseName = sgbd.database[0] ? sgbd.database[0].nome : '';
    return res.status(200).json({ database: databaseName, tabelas: oDados });
});

router.post('/api/table', (req: Request, res: Response) => {
    var oTable = new Tabela();
    oTable.nome = req.body.nome;
    sgbd.database[0].addTabela(oTable);
    return res.status(200).json({ tabela: oTable.nome });
});

router.post('/api/column/:tableName', (req: Request, res: Response) => {
    var oTable = sgbd.database[0].tabela.find((oEl) => {
        if (oEl.nome == req.params.tableName) {
            return true;
        }
    })
    if (!oTable) {
        return res.status(400).json({ msg: 'Tabela não existe.' });
    }
    var oColumn = new Coluna();
    oColumn.nome = req.body.nome;
    oColumn.tipo = req.body.tipo;
    oColumn.primaryKey = Boolean(req.body.primaryKey);
    oColumn.autoIncrement = Boolean(req.body.autoIncrement);
    oColumn.isNull = Boolean(req.body.isNull);
    oTable.addColumn(oColumn);

    return res.status(200).json(oColumn);
});

router.post('/api/salvarJson', (req: Request, res: Response) => {
    try {
        fs.writeFileSync('./dados.json', JSON.stringify(sgbd));
    } catch (error) {
        console.log(error);
        return res.status(400).send();
    }
    return res.status(200).json(JSON.stringify(sgbd));
})

export default router;