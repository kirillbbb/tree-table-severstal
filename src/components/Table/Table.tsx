import type { UserNode } from '../../models/user';
import { TableRow } from './TableRow';
import './table.css';

interface TableProps {
    data: UserNode[];
    expandedRows: Set<number>;
    onToggle: (id: number) => void;
}

export function Table({ data, expandedRows, onToggle }: TableProps) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Status</th>
            </tr>
            </thead>

            <tbody>
            {data.map((node) => (
                <TableRow
                    key={node.id}
                    node={node}
                    level={0}
                    expandedRows={expandedRows}
                    onToggle={onToggle}
                />
            ))}
            </tbody>
        </table>
    );
}
