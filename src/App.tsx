import { useMemo, useState } from 'react';

import { users } from './data/users';
import { buildUserTree } from './utils/buildTree';
import { filterTree } from './utils/filterTree';
import { sortTree } from './utils/sortTree';
import type { SortConfig, ActiveFilter } from './utils/types';

import { Table } from './components/Table/Table';
import { Filters } from './components/Filters/Filters';
import { SortControls } from './components/SortControls/SortControls';
import './App.css';

function App() {
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [filter, setFilter] = useState<ActiveFilter>('all');
    const [sort, setSort] = useState<SortConfig | null>(null);

    const preparedData = useMemo(() => {
        const tree = buildUserTree(users);
        const filtered = filterTree(tree, filter);
        return sortTree(filtered, sort);
    }, [filter, sort]);

    const toggleRow = (id: number) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="app">
        <h1>Tree Table</h1>

            <div className="controls">
                <Filters value={filter} onChange={setFilter} />
                <SortControls value={sort} onChange={setSort} />
            </div>


            <Table
                data={preparedData}
                expandedRows={expandedRows}
                onToggle={toggleRow}
            />
        </div>
    );
}

export default App;
