import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from 'cors'
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    const corsOption = {
        origin: "http://localhost:3000",
        credentials: true,
      }
    
    // start express server
    app.listen(3001);
    app.use(cors(corsOption));

    // add dummy data for testing
    await connection.manager.save(connection.manager.create(User, {
        publicKey: "fhs",
        createdAt: new Date(),
        userRole: "admin"
    }));
    await connection.manager.save(connection.manager.create(User, {
        publicKey: "fdhs",
        createdAt: new Date(),
        userRole: "user"
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));