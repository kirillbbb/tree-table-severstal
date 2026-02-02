import type { SortConfig, SortField } from '../../utils/types';

interface SortControlsProps {
    value: SortConfig | null;
    onChange: (config: SortConfig) => void;
}

export function SortControls({ value, onChange }: SortControlsProps) {
    const toggleSort = (field: SortField) => {
        if (!value || value.field !== field) {
            onChange({ field, direction: 'asc' });
            return;
        }

        onChange({
            field,
            direction: value.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    return (
        <div style={{ marginBottom: 16 }}>
            <button onClick={() => toggleSort('balance')}>
                Sort by Balance
            </button>{' '}
            <button onClick={() => toggleSort('email')}>
                Sort by Email
            </button>
        </div>
    );
}
