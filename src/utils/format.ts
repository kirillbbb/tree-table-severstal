export function parseBalance(value: string): number {
    return Number(value.replace(/[$,]/g, ''));
}
