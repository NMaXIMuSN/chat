import { IMessageSchema } from "@typesApp/chat";

export interface MessageInputSchema {
  content: string;
  isEdit: boolean;
  editMessage?: IMessageSchema
}