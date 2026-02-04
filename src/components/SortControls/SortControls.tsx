import { useState } from 'react';
import type { SortConfig } from '../../utils/types';
import './SortControls.css';

interface SortControlsProps {
    value: SortConfig | null;
    onChange: (config: SortConfig | null) => void;
}

type SortOption =
    | 'balance-asc'
    | 'balance-desc'
    | 'email-asc'
    | 'email-desc';

export function SortControls({ value, onChange }: SortControlsProps) {
    const [open, setOpen] = useState(false);

    const selected: SortOption | null = value
        ? (`${value.field}-${value.direction}` as SortOption)
        : null;

    const selectSort = (option: SortOption) => {
        const [field, direction] = option.split('-');

        onChange({
            field: field as SortConfig['field'],
            direction: direction as SortConfig['direction'],
        });

        setOpen(false);
    };

    const resetSort = () => {
        onChange(null);
        setOpen(false);
    };

    return (
        <div className="sort">
            <button
                className="sort__button"
                onClick={() => setOpen((v) => !v)}
            >
                Сортировать по
            </button>

            {open && (
                <div className="sort__popup">
                    <div className="sort__option">
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={selected === 'balance-asc'}
                                onChange={() => selectSort('balance-asc')}
                            />
                            По балансу ↑
                        </label>
                    </div>

                    <div className="sort__option">
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={selected === 'balance-desc'}
                                onChange={() => selectSort('balance-desc')}
                            />
                            По балансу ↓
                        </label>
                    </div>

                    <div className="sort__option">
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={selected === 'email-asc'}
                                onChange={() => selectSort('email-asc')}
                            />
                            По почте A–Z
                        </label>
                    </div>

                    <div className="sort__option">
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={selected === 'email-desc'}
                                onChange={() => selectSort('email-desc')}
                            />
                            По почте Z–A
                        </label>
                    </div>

                    <div className="sort__actions">
                        <button onClick={resetSort}>Сбросить</button>
                        <button onClick={() => setOpen(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}
