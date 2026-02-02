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
        .map((node) => {
            const filteredChildren = filterTree(node.children, filter);

            if (matchesFilter(node, filter) || filteredChildren.length > 0) {
                return {
                    ...node,
                    children: filteredChildren,
                };
            }

            return null;
        })
        .filter((node): node is UserNode => node !== null);
}
