export interface IAssetManagement {
    user: string;
    asset: string;
    id: number;
}

export interface IAssetManagementResult {
    totalAssetsManagement: number,
    assetsManagementPaged: [
        IAssetManagement
    ]
}