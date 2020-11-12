import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { tronWeb } from "../tronweb";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    /*
         @params request.body {
           publicKey,
           userRole
        } 

    */ 
    async save(request: Request, response: Response, next: NextFunction) {
        const user = {
            publicKey : request.body.publicKey,
            userRole : request.body.userRole, 
            createdAt : new Date()
        }
        return this.userRepository.save(user);
    }

    /*
        @params request.body {
            hexMessage,
            signature,
            publicKey
        } 
        @returns {
            isAdmin : bool
        }
    */
    async isAdmin(request: Request, response: Response, next: NextFunction) {
        const data = request.body
        try {
            const verify = tronWeb.trx.verifyMessage(data.hexMessage, data.signature, data.publicKey)
            if(verify){ 
                const user = await this.userRepository.findOne({where: {publicKey: data.publicKey}}); 
                if(!!user && user.userRole == "admin"){
                    return {
                        isAdmin: true 
                    }
                }
            } 
            return {
                isAdmin: false
            }
        } catch(e){
            console.error(e)
            return {
                isAdmin: false
            }
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}