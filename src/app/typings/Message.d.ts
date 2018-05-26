import { User } from "./User";

export type Message = {
    id: string;
    user: User;
    isoDate: string;
    content: string;
};
