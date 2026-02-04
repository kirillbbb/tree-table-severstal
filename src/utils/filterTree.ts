import type { UserNode } from '../models/user';
import type { ActiveFilter } from './types';

function matchesFilter(node: UserNode, filter: ActiveFilter): boolean {
    if (filter === 'all') return true;
    if (filter === 'active') return node.isActive;
    return !node.isActive;
}

export function filterTree(
    nodes: UserNode[],
    filter: ActiveFilter
): UserNode[] {
    return nodes
        .filter((node) => matchesFilter(node, filter))
        .map((node) => ({
            ...node,
            children: filterTree(node.children, filter),
        }));
}
