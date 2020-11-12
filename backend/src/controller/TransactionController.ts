import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Transaction } from "../entity/Transaction";
import { stripe, stripePublicKey } from "../payments";
import fetch from "node-fetch";
export class TransactionController {
  private transactionRepository = getRepository(Transaction);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.findOne(request.params.id);
  }

  /*
         @params request.body {
           user_id,
           transaction_address,
           amount, 
           currency
        } 

    */
  async buy(request: Request, response: Response, next: NextFunction) {
    const { amount, currency, transaction_address, user_id } = request.body;
    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, //amount is in cents
        currency: currency,
      });
      const transaction = {
        user_id: user_id,
        type: 0,
        status: 0,
        stripe_id: paymentIntent.id,
        transaction_address: "", //probably to be updated in a different function
        createdAt: new Date(),
      };
      response.send({
        paymentIntentId: paymentIntent.id,
        publishableKey: stripePublicKey,
        clientSecret: paymentIntent.client_secret,
      });

      return this.transactionRepository.save(transaction);
    } catch (e) {
      console.log(e);
    }
  }

  /*
         @params request.body {
           paymentIntentId,
           status (1 for success, 2 for fail),
           transaction_address (optional)
        } 

    */
  async paymentStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { paymentIntentId, status } = request.body;
    const transactionAddress =
      status == 1 ? request.body.transaction_address : "";
    let transactionToUpdate = await this.transactionRepository.findOne({
      stripe_id: paymentIntentId,
    });
    transactionToUpdate.status = status;
    transactionToUpdate.transaction_address = transactionAddress;
    return this.transactionRepository.save(transactionToUpdate);
  }

  /* 
    @params request.body { 
      admin_address, 
      user_address,
      owner_address
      timestamp 
    }
  */
  async sell(request: Request, response: Response, next: NextFunction) {
    const { admin_address, user_address, owner_address, timestamp } = request.body;
    const transactionsRes = await fetch(
      `https://apilist.tronscan.org/api/trc10trc20-transfer?sort=-timestamp&count=true&start=0&total=0&direction=&address=${owner_address}`
    );
    const data = transactionsRes.json();
    const transfers = data["transfers"];
    const toAdminTransfers = transfers.filter(
      (transfer) =>
        transfer["to_address"] == admin_address &&
        transfer["timestamp"] == timestamp &&
        transfer["confirmed"] == true && 
        transfer["from_address"] == user_address 
    );
    if(toAdminTransfers.length > 0){ 
      //start process to send money to user's stripe account 
       
    } else { 
      response.send({ 
        message: 'Sell Transaction not found'
      })
    }
  }

  /*
    request.body{ 
      type: 0 or 1, 
      user_id
    } 
  */
  async transactionsHistory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { type, user_id } = request.body;
    const transactions = this.transactionRepository
      .createQueryBuilder("transaction")
      .where("transaction.user_id = :id AND type = :type", {
        id: user_id,
        type: type,
      })
      .getMany();
    response.send({transactions})
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let transactionToRemove = await this.transactionRepository.findOne(
      request.params.id
    );
    await this.transactionRepository.remove(transactionToRemove);
  }
}
