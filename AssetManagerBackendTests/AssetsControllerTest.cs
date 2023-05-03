using AssetManagerBackend.Controllers;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using AssetManagerBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AssetManagerBackendTests
{
    public class AssetsControllerTest
    {
        private readonly Mock<IRepository<Asset>> _assetMock;

        public AssetsControllerTest()
        {
            _assetMock = new Mock<IRepository<Asset>>();
        }

        [Fact]
        public void Assets_GetAll_ShouldReturnResult()
        {
            //Arrange
            List<Asset> listAsset = new();
            _assetMock.Setup(x => x.GetAll()).Returns(listAsset.AsQueryable());

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var response = controller.GetAssets();

            // Assert
            Assert.NotNull(response);
            Assert.Equal(listAsset, response);
        }

        [Fact]
        public async Task Assets_Create_ReturnsValidCreated()
        {
            // Arrange
            int expectedValidReturn = 1;
            var asset = new Asset { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20"  };
            _assetMock.Setup(x => x.Create(It.IsAny<Asset>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var result = await controller.AddAsset(asset);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(createResult.Success);
            Assert.Equal("Creation successful", createResult.Title);
            Assert.Equal("You have created an new asset.", createResult.Message);
        }

        [Fact]
        public async Task Assets_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            Asset asset = new() { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20" };
            Asset asset2 = new() { Id = 1, Name = "Iphone 11", Description = "Used someone", Brand = "test modify", Category = "Electronics", Price = "1400", Quantity = "20" };
            _assetMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<Asset>())).ReturnsAsync(expectedInvalidReturn);
            _assetMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(asset.Id)), It.IsAny<Asset>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var result = await controller.UpdateAsset(asset2);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(updateResult.Success);
            Assert.Equal("Update successful", updateResult.Title);
            Assert.Equal("You have updated an asset.", updateResult.Message);
        }

        [Fact]
        public async Task Assets_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            Asset asset = new() { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20" };
            Asset asset2 = new() { Id = 2, Name = "Iphone 11", Description = "Used someone", Brand = "test modify", Category = "Electronics", Price = "1400", Quantity = "20" };
            _assetMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<Asset>())).ReturnsAsync(expectedInvalidReturn);
            _assetMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(asset.Id)), It.IsAny<Asset>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var result = await controller.UpdateAsset(asset2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(updateResult.Success);
            Assert.Equal("User not found", updateResult.Title);
            Assert.Equal("There is no user for this id.", updateResult.Message);
        }

        [Fact]
        public async Task Assets_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int assetId = 1;
            _assetMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _assetMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(assetId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var result = await controller.DeleteAsset(assetId);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(deleteResult.Success);
            Assert.Equal("Deletion successful", deleteResult.Title);
            Assert.Equal("You have deleted an asset.", deleteResult.Message);
        }

        [Fact]
        public async Task Assets_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int assetId = 1;
            int assetId2 = 2;
            _assetMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _assetMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(assetId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetsController(_assetMock.Object);

            var result = await controller.DeleteAsset(assetId2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(deleteResult.Success);
            Assert.Equal("User not found", deleteResult.Title);
            Assert.Equal("There is no user for this id.", deleteResult.Message);
        }
    }
}