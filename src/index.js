const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const {config} = require("./config");
const cors = require("cors");
const {connection} = require("./config/mongodb");
const routesServer = require("./routes");
const pino = require("./utils/pino/pino");
const isCluster = false;

class App {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.settings();
        this.middlewares();
    }
    async settings(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    async middlewares(){
        this.app.use(cors(config.cors));
    }
    async routes () {
        routesServer(this.app);
    }
    async listen(){
        if (isCluster) {
            if(cluster.isMaster){
                for (let i = 0; i < numCPUs; i++) {
                    cluster.fork();                
                }
                cluster.on("exit", (worker, corde, signal)=>{
                    pino.error(`Worker dead ${worker.process.pid}`);
                    cluster.fork();
                })
            }else{
                this.app.listen(this.port, err=>{
                    pino.info(`Con Cluster: Server on http://localhost:${this.port}`);
                })
            }
        } else {
            this.app.listen(this.port, err=>{
                pino.info(`SIN CLUSTER: Server on http://localhost:${this.port}`);  
            })
        }   
    }
}

module.exports = new App();