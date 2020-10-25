import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

export enum TransactionType { 
    buy = "buy",
    sell = "sell"
}

export enum TransactionStatus {
    processing = "processing",
    success = "success",
    fail = "fail"
}

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column() 
    user_id: number; 

    @Column()
    type: number; 

    @Column()
    status: number; 

    @Column()
    stripe_id: string; 

    @Column()
    transaction_address: string;

    @Column({ type: 'datetime' })
    createdAt: Date;
}