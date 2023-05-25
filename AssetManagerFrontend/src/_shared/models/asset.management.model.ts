export interface IAssetManagement {
    user: string;
    asset: string;
    createdAt: string;
    createdBy: string;
    id: number;
}

export interface IAssetManagementResult {
    totalAssetsManagement: number,
    assetsManagementPaged: [
        IAssetManagement
    ]
}