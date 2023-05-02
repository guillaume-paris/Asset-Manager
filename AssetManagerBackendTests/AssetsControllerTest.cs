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
        public async Task Assets_Create_ReturnsValidUserCreated()
        {
            // Arrange
            int expectedReturn = 1;
            var asset = new Asset { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20"  };
            _assetMock.Setup(x => x.Create(asset)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _assetMock.Object.Create(asset);

            // Assert
            Assert.NotEqual((-1), result);
        }

        [Fact]
        public async Task Assets_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var asset = new Asset { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20"  };
            _assetMock.Setup(x => x.Update(asset.Id, asset)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _assetMock.Object.Update(asset.Id, asset);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task Assets_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var asset = new Asset { Id = 1, Name = "Iphone 15", Description = "Used to call someone", Brand = "Apple", Category = "Electronics", Price = "1400", Quantity = "20"  };
            _assetMock.Setup(x => x.Update(asset.Id, asset)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _assetMock.Object.Update(asset.Id, asset);

            // Assert
            Assert.Equal((-1), result);
        }*/

        [Fact]
        public async Task Assets_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int assetId = 1;
            _assetMock.Setup(x => x.Delete(assetId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _assetMock.Object.Delete(assetId);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task UserAccounts_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int assetId = -1;
            _assetMock.Setup(x => x.Delete(assetId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _assetMock.Object.Delete(assetId);

            // Assert
            Assert.Equal((-1), result);
        }*/
    }
}