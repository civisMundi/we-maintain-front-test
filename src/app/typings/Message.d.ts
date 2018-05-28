import { User } from "./User";

export type Message = {
    channelUrl: string;
    channelType: string;
    messageId: number;
    message: string;
    messageType: string;
    data: string;
    customType: string;
    mentionedUsers: Array<User>;
    createdAt: number;
    updatedAt: number;
};
