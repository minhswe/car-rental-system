import { Schema, model } from "mongoose";

interface IConversation {
  id: string;
  create_at: Date;
  lastMessage?: Date;
  customerId: string;
  providerId: string;
}

const conversationSchema = new Schema<IConversation>({
  id: { type: String, required: true, unique: true },
  create_at: { type: Date, required: true },
  lastMessage: { type: Date, required: false },
  customerId: { type: String, required: true, ref: "User" },
  providerId: { type: String, required: true, ref: "User" },
});

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);
