import { useState } from 'react';
import type { UserNode } from '../../models/user';

interface TableRowProps {
    node: UserNode;
    level: number;
    expandedRows: Set<number>;
    onToggle: (id: number) => void;
    isLast?: boolean;
}

export function TableRow({node, level, expandedRows, onToggle, isLast = false,}: TableRowProps) {

    const isExpanded = expandedRows.has(node.id);

    const hasChildren = node.children.length > 0;

    const [copied, setCopied] = useState({x: 0, y: 0, visible: false,});

    const copyToClipboard = (
        text: string,
        e: React.MouseEvent
    ) => {
        navigator.clipboard.writeText(text);

        setCopied({x: e.clientX, y: e.clientY, visible: true,
        });

        setTimeout(() => {
            setCopied((prev) => ({
                ...prev,
                visible: false,
            }));
        }, 1000);
    };

    const treePrefix =
        level === 0
            ? ''
            : isLast
                ? '└──'
                : '├──';

    return (
        <>
            <tr>
                <td>
                    <div
                        className="table__name"
                        style={{ paddingLeft: level * 20 }}
                    >
                        <span className="table__tree">
                            {treePrefix}
                        </span>

                        {hasChildren && (
                            <button
                                className="table__toggle"
                                onClick={() => onToggle(node.id)}
                                aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
                            >
                                {isExpanded ? '▼' : '▶'}
                            </button>
                        )}

                        <span
                            className="table__copy"
                            onClick={(e) =>
                                copyToClipboard(node.name, e)
                            }
                            title="Нажмите, чтобы скопировать"
                        >
                            {node.name}
                        </span>
                    </div>
                </td>

                <td>
                    <span
                        className="table__copy table__email"
                        onClick={(e) =>
                            copyToClipboard(node.email, e)
                        }
                        title="Нажмите, чтобы скопировать"
                    >
                        {node.email}
                    </span>
                </td>

                <td>${node.balance.toLocaleString()}</td>

                <td>
                    {node.isActive ? 'Active' : 'Inactive'}
                </td>
            </tr>

            {isExpanded &&
                node.children.map((child, index) => (
                    <TableRow
                        key={child.id}
                        node={child}
                        level={level + 1}
                        expandedRows={expandedRows}
                        onToggle={onToggle}
                        isLast={
                            index ===
                            node.children.length - 1
                        }
                    />
                ))}

            {copied.visible && (
                <div
                    className="copy-tooltip"
                    style={{left: copied.x, top: copied.y,}}
                >
                    Скопировано
                </div>
            )}
        </>
    );
}
