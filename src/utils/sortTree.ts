import type { UserNode } from '../models/user';
import type { SortConfig } from './types';

export function sortTree(
    nodes: UserNode[],
    sort: SortConfig | null
): UserNode[] {
    if (!sort) return nodes;

    const { field, direction } = sort;
    const factor = direction === 'asc' ? 1 : -1;

    const sorted = [...nodes].sort((a, b) => {
        if (field === 'balance') {
            return (a.balance - b.balance) * factor;
        }

        return a.email.localeCompare(b.email) * factor;
    });

    return sorted.map((node) => ({
        ...node,
        children: sortTree(node.children, sort),
    }));
}
