
export enum UserRole { 
    admin = "admin",
    user = "user"
  }

  export interface User{
    id: string;
    uuid: string;
    publicKey: string;
    userRole: UserRole;
    createdAt: Date;
  }