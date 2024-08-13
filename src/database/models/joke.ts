import mongoose, { Document, Schema } from "mongoose";

export enum JokeStatus {
  Pending = "Pending",
  Approved = "Approved",
  Disapproved = "Disapproved",
}

export interface IJoke extends Document {
  setup: string;
  punchline: string;
  type: {
    _id: mongoose.Types.ObjectId;
    name: string;
  };
  author: string;
  status: JokeStatus;
}

const JokeSchema: Schema = new Schema({
  setup: { type: String, required: true },
  punchline: { type: String, required: true },
  type: {
    _id: { type: Schema.Types.ObjectId, ref: "JokeType", required: true },
    name: { type: String, required: true },
  },
  author: { type: String, default: "Anonymous" },
  status: {
    type: String,
    enum: Object.values(JokeStatus), // Use the enum values
    default: JokeStatus.Pending, // Set the default status
  },
});

export const Joke = mongoose.model<IJoke>("Joke", JokeSchema);
