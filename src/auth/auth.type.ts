export type UserAuthType = { sub: string, username: string };

export type AuthType = ({ admin: false } & UserAuthType) | { admin: true };