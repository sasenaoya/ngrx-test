import mongoose, { Schema, Types } from "mongoose"

/** PDFの処理状況 */
export const enum Status {
    unprocessed = 'unprocessed',
    processing = 'processing',
    success = 'success',
    failure = 'failure',
}

/** Comment documentのインターフェース */
export interface IComment extends mongoose.Document {
    pdf: Types.ObjectId,
    text: string,
    page: number,
    x: number,
    y: number,
    w: number,
    h: number,
    createdDate: Date,
    modifiedDate: Date,
}

/** Image documentのインターフェース */
export interface IImage extends mongoose.Document  {
    pdf: Types.ObjectId;
    fullPath: string;
    width?: number;
    height?: number;
    thumbnailFullPath: string;
}

/** Pdf documentのインターフェース */
export interface IPdf extends mongoose.Document  {
    name: string;
    fullPath: string;
    fileImage?: Buffer;
    images?: Types.ObjectId[];
    comments?: Types.ObjectId[];
    status: string;
    createdDate: Date;
    modifiedDate: Date;
}

/** Comment documentのスキーマ */
const commentSchema = new Schema<IComment>({
    pdf: { type: Schema.Types.ObjectId, ref: 'Pdf', require: true },
    text: { type: String, required: true },
    page: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    w: { type: Number, required: true },
    h: { type: Number, required: true },
    createdDate: { type: Date, required: true },
    modifiedDate: { type: Date, required: true },
});

async function postDelete(pdfId: string, commentId: string) {
    await Pdf.findByIdAndUpdate(pdfId, {$pull: {comments: commentId}});
}

commentSchema.post('save', async function (comment) {
    await Pdf.findByIdAndUpdate(comment.pdf, {$push: {comments: comment._id}}).select('comments');
});

commentSchema.post('deleteOne', { document: true }, async function (comment) {
    await postDelete(comment.pdf, comment._id);
});

commentSchema.post('findOneAndDelete', async function (comment) {
    await postDelete(comment.pdf, comment._id);
});

/** Image documentのスキーマ */
const imageSchema = new Schema<IImage>({
    pdf: { type: Schema.Types.ObjectId, ref: 'Pdf', required: true },
    fullPath: { type: String, required: true, select: false },
    width: Number,
    height: Number,
    thumbnailFullPath: { type: String, required: true, select: false },
});

/** Pdf documentのスキーマ */
const pdfSchema = new Schema<IPdf>({
    name: { type: String, required: true },
    fullPath: { type: String, required: true, select: false },
    fileImage: { type: Buffer, select: false },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', select: false }],
    status: { type: String, required: true },
    createdDate: { type: Date, required: true },
    modifiedDate: { type: Date, required: true },
});

// モデル
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
export const Image = mongoose.model<IImage>('Image', imageSchema);
export const Pdf = mongoose.model<IPdf>('Pdf', pdfSchema);
