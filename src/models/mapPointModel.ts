import { Schema, model, Document, Types } from "mongoose";

export interface IMapPoint extends Document {
  url: string;
  type: string;
  location: string;
  name: string;
  coords?: number[];
  user: Types.ObjectId;
}

const MapPointSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    coords: { type: [Number], default: [] },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const MapPoint = model<IMapPoint>("MapPoint", MapPointSchema, "map");

export default MapPoint;