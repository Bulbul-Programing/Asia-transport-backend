
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type TUser = {
    id: string;
    Name: string;
    Email: string;
    ShopName: string;
    Password: string;
    Role: Role;

    createdAt: Date;
    updateAt: Date;
}