export interface IAsset {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    category: string;
}

export interface IAssetFilter {
    name: boolean;
    description: boolean;
    image: boolean;
    price: boolean;
    quantity: boolean;
    category: boolean;
}