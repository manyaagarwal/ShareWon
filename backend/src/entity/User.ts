import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


export enum UserRole { 
    admin = "admin",
    user = "user"
  }

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    publicKey: string; 

    @Column()
    userRole: string;

    @Column({ type: 'datetime' })
    createdAt: Date;
}
