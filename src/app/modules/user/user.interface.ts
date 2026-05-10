
export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type TUser = {
    id: string;
    Name: string;
    Email: string;
    ShopName: string;
    Password: string;
    Role: UserRole;

    createdAt: Date;
    updateAt: Date;
}