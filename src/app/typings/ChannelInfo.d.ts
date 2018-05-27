import { Message } from "./Message";

export type ChannelData = {
    url: string;
    name: string;
    coverUrl: string;
    data: string;
    customType: string;
    isFrozen: boolean;
    isEphemeral: boolean;
    createdAt: string;
}

export type ChannelInfo = {
    informations: ChannelData;
    messages: Message[];
};
