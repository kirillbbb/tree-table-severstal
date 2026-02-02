export interface RawUser {
    id: number;
    parentId: number;
    isActive: boolean;
    balance: string;
    name: string;
    email: string;
}

export interface UserNode {
    id: number;
    parentId: number;
    isActive: boolean;
    balance: number;
    name: string;
    email: string;
    children: UserNode[];
}
