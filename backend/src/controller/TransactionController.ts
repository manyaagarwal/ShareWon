import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Transaction } from "../entity/Transaction";
import { stripe, stripePublicKey } from "../payments";
import { raw } from "body-parser";

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
        transaction_address: transaction_address, //probably to be updated in a different function
        createdAt: new Date(),
      };
      response.send({
        publishableKey:stripePublicKey,
        clientSecret: paymentIntent.client_secret,
      });

      return this.transactionRepository.save(transaction);
    } catch (e) {
      console.log(e);
    }
  }

  async sell(request: Request, response: Response, next: NextFunction) {
    const { amount, currency, transaction_address, user_id } = request.body;
    // Create an intent to transfer money to user
    const transaction = {
      user_id: user_id,
      type: 1,
      status: 0,
      stripe_id: "",
      transaction_address: transaction_address,
      createdAt: new Date(),
    };

    // Send publishable key and PaymentIntent details to client
    return this.transactionRepository.save(transaction);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let transactionToRemove = await this.transactionRepository.findOne(
      request.params.id
    );
    await this.transactionRepository.remove(transactionToRemove);
  }
}