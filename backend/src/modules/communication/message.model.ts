import { Schema, model } from "mongoose";
import { MessageSenderType } from "common/constants/enums";

interface IMessage {
  id: string;
  senderType: MessageSenderType;
  messageText: string;
  createdAt: Date;
  conversationId: string;
}

const messageSchema = new Schema<IMessage>({
  id: { type: String, required: true, unique: true },
  senderType: { type: String, enum: MessageSenderType, required: true },
  messageText: { type: String, required: true },
  createdAt: { type: Date, required: true },
  conversationId: { type: String, required: true, ref: "Conversation" },
});

export const Message = model<IMessage>("Message", messageSchema);
