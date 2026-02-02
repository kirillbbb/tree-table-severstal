import type {RawUser, UserNode} from '../models/user';
import { parseBalance } from './format';

export function buildUserTree(users: RawUser[]): UserNode[] {
    const map = new Map<number, UserNode>();
    const roots: UserNode[] = [];

    for (const user of users) {
        map.set(user.id, {
            id: user.id,
            parentId: user.parentId,
            isActive: user.isActive,
            balance: parseBalance(user.balance),
            name: user.name,
            email: user.email,
            children: [],
        });
    }

    for (const node of map.values()) {
        if (node.parentId === 0) {
            roots.push(node);
        } else {
            const parent = map.get(node.parentId);
            if (parent) {
                parent.children.push(node);
            }
        }
    }

    return roots;
}
