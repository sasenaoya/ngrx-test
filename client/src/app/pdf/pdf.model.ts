export const enum Status {
    unprocessed = 'unprocessed',
    processing = 'processing',
    success = 'success',
    failure = 'failure',
}

export interface IComment {
    _id?: string;
    text?: string;
    page?: number;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    createdDate?: Date;
    modifiedDate?: Date,
}

export interface IImage {
    _id?: string;
    width?: number;
    height?: number;
}

export interface IPdf {
    _id?: string;
    name?: string;
    fullPath?: string;
    fileImage?: ArrayBuffer,
    images?: IImage[],
    status?: Status,
    createdDate?: Date,
    modifiedDate?: Date,
    comments?: IComment[],
}
