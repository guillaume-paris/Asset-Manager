export interface IFilter {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    role: boolean;
}

export interface IGenericTableFilter {
    name: string;
    isActive: boolean;
}

export interface IGenericTableRow {
    row: string[];
}

export interface IGenericTable {
    rows: IGenericTableRow[];
    filter: IGenericTableFilter[];
}