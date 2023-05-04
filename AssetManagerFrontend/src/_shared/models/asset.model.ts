export interface IAsset {
    name: string;
    description: string;
    brand: string;
    price: string;
    quantity: string;
    category: string;
    id: number;
}

export interface IAssetResult {
    totalAssets: number,
    assetsPaged: [
        IAsset
    ]
}