import type { UserNode } from '../../models/user';

interface TableRowProps {
    node: UserNode;
    level: number;
    expandedRows: Set<number>;
    onToggle: (id: number) => void;
}

export function TableRow({
                             node,
                             level,
                             expandedRows,
                             onToggle,
                         }: TableRowProps) {
    const isExpanded = expandedRows.has(node.id);
    const hasChildren = node.children.length > 0;

    return (
        <>
            <tr>
                <td style={{ paddingLeft: level * 16 }}>
                    {hasChildren && (
                        <button
                            onClick={() => onToggle(node.id)}
                            style={{ marginRight: 4 }}
                        >
                            {isExpanded ? '▼' : '▶'}
                        </button>
                    )}
                    {node.name}
                </td>

                <td>{node.email}</td>
                <td>${node.balance.toLocaleString()}</td>
                <td>{node.isActive ? 'Active' : 'Inactive'}</td>
            </tr>

            {isExpanded &&
                node.children.map((child) => (
                    <TableRow
                        key={child.id}
                        node={child}
                        level={level + 1}
                        expandedRows={expandedRows}
                        onToggle={onToggle}
                    />
                ))}
        </>
    );
}
