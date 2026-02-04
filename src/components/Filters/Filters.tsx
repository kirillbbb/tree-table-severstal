import type { ActiveFilter } from '../../utils/types';
import './Filters.css';

interface FiltersProps {
    value: ActiveFilter;
    onChange: (value: ActiveFilter) => void;
}

export function Filters({ value, onChange }: FiltersProps) {
    return (
        <div className="filters">
            <span className="filters__label">Статус</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as ActiveFilter)}
            >
                <option value="all">Все</option>
                <option value="active">Активные</option>
                <option value="inactive">Неактивные</option>
            </select>
        </div>
    );
}
