import { Injectable, Inject } from '@nestjs/common';
const GridStream = require('gridfs-stream');
const Grid = require('gridfs');
const mongo = require('mongodb');
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
    private fileModel: any;
    private fileModelStream: any;

    constructor(@Inject('DATABASE_CONNECTION') private readonly connection: any) {
        this.fileModelStream = GridStream(this.connection.connections[0].db, mongo);
        this.fileModel = Grid(this.connection.connections[0].db, mongo);
    }

    async readFile(filename:string){
        return new Promise( (resolve, reject) => {
            this.fileModel.readFile({ filename: filename }, function (err:any, data:any) {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    createWriteStream(type: string) {

        return this.fileModelStream.createWriteStream({
            filename: uuidv4() + type,
        });
    }


}