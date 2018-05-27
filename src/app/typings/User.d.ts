export type User = {
    userId: string;
    nickname: string;
    profileUrl: string;
    metaData: Object;
    connectionStatus: string;
    lastSeenAt: string;
    isActive: boolean;
    friendDiscoveryKey: string | null;
    friendName: string | null;
};
