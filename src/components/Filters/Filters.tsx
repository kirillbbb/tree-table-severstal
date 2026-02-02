import type { ActiveFilter } from '../../utils/types';

interface FiltersProps {
    value: ActiveFilter;
    onChange: (value: ActiveFilter) => void;
}

export function Filters({ value, onChange }: FiltersProps) {
    return (
        <div style={{ marginBottom: 16 }}>
            <label>
                Status:{' '}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as ActiveFilter)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </label>
        </div>
    );
}
