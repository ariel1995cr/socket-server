import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket'


export default class Server {
    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );       
        this.io = socketIO( this.httpServer ) 
        
        this.escucharSocket();
    }

    public static get instance(){
        
        return this._intance  || ( this._intance = new this() );

    }

    private escucharSocket(){

        console.log('Escuchando conexiones - sockets');
        
        this.io.on('connection',cliente => {
            console.log('Nuevo cliente conectado');
            
            //MENSAJES
            socket.mensaje( cliente, this.io );

            //DESCONECTAR
            socket.desconectar( cliente );


        });


    }

    start( callback: Function ) {

        this.httpServer.listen( this.port );

    }

}