
export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
}

export type TUser = {
    id: string;
    name: string;
    email: string;
    shopName: string;
    password: string;
    role: UserRole;

    createdAt: Date;
    updateAt: Date;
}