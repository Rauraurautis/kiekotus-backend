export type DatabaseUser = {
    id: number;
    username: string;
    email: string;
    password: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export type TokenPayload = {
    user: {
        email: string
        username: string
        id: string
    }
    session: string
}
