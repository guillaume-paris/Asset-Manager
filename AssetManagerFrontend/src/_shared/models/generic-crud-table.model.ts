export interface IGenericTableFilter {
    name: string;
    isActive: boolean;
}

export interface IGenericTableRow {
    values: string[];
    id: number;
}

export interface IGenericTable {
    rows: IGenericTableRow[];
    filter: IGenericTableFilter[];
}