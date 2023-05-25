export interface IAsset {
    name: string;
    description: string;
    brand: string;
    price: string;
    category: string;
    createdAt: string;
    createdBy: string;
    id: number;
}

export interface IAssetResult {
    totalAssets: number,
    assetsPaged: [
        IAsset
    ]
}