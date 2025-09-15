import mongoose, { Document, Schema } from "mongoose";

export interface IResource extends Document {
    name: string;
    type: string;
    createdAt: Date;
}

const ResourceSchema: Schema = new Schema<IResource>(
    {
        name: { type: String, required: true, index: true },
        type: { type: String, required: true, index: true },
    },
    { timestamps: true }
);

ResourceSchema.index({ name: 1, type: 1 });
ResourceSchema.index({ createdAt: -1 });

export default mongoose.model<IResource>("Resource", ResourceSchema);