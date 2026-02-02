export type SortField = 'balance' | 'email';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: SortField;
    direction: SortDirection;
}

export type ActiveFilter = 'all' | 'active' | 'inactive';
