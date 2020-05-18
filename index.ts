import Server from "./clases/server";
import { SERVER_PORT } from "./global/enviroment";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";


const server = Server.instance;

//BODY PARSER
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json() );


//CORS
server.app.use( cors( { origin: true, credentials: true }) );

//RUTAS DE SERVICIOS
server.app.use('/', router);

server.start( () => {
    console.log(`servidor corriendo en el puerto  ${ SERVER_PORT }`);
});