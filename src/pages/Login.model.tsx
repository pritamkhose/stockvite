export interface DataType {
    uid: string;
    token: string;
    email: string;
    name: string;
    imageUrl: string;
    date: string;
    accessWith: string;
}

export interface APIResponseType {
    status: number;
    accessToken: string;
    tokenId: string;
    profileObj: any;
    message: string;
    data: DataType;
    email?: string;
    name?: string;
    picture?: {
        data?: {
            url?: string;
        };
    };
    code?: string;
}

export interface APIError {
    errror: any;
}
