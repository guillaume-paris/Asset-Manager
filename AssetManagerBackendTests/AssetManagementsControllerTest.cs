using AssetManagerBackend.Controllers;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using AssetManagerBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AssetManagerBackendTests
{
    public class AssetManagementsControllerTest
    {
        private readonly Mock<IRepository<AssetManagement>> _userMock;

        public AssetManagementsControllerTest()
        {
            _userMock = new Mock<IRepository<AssetManagement>>();
        }

        [Fact]
        public void AssetManagements_GetAll_ShouldReturnResult()
        {
            //Arrange
            List<AssetManagement> listAssetManagement = new();
            _userMock.Setup(x => x.GetAll()).Returns(listAssetManagement.AsQueryable());

            // Act
            var controller = new AssetManagementsController(_userMock.Object);

            var response = controller.GetAssetManagements();

            // Assert
            Assert.NotNull(response);
            Assert.Equal(listAssetManagement, response);
        }

        [Fact]
        public async Task AssetManagements_Create_ReturnsValidUserCreated()
        {
            // Arrange
            int expectedReturn = 1;
            var assetManagement = new AssetManagement { Id = 1, User = "Jackie Chan", Asset = "Iphone 15" };
            _userMock.Setup(x => x.Create(assetManagement)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Create(assetManagement);

            // Assert
            Assert.NotEqual((-1), result);
        }

        [Fact]
        public async Task AssetManagements_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var assetManagement = new AssetManagement { Id = 1, User = "Jackie Chan", Asset = "Iphone 15" };
            _userMock.Setup(x => x.Update(assetManagement.Id, assetManagement)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Update(assetManagement.Id, assetManagement);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task AssetManagements_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var assetManagement = new AssetManagement { Id = 80, User = "Jackie Chan", Asset = "Iphone 15" };
            _userMock.Setup(x => x.Update(assetManagement.Id, assetManagement)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Update(assetManagement.Id, assetManagement);

            // Assert
            Assert.Equal((-1), result);
        }*/

        [Fact]
        public async Task AssetManagements_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int assetManagementId = 1;
            _userMock.Setup(x => x.Delete(assetManagementId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Delete(assetManagementId);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task UserAccounts_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int assetManagementId = -1;
            _userMock.Setup(x => x.Delete(assetManagementId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Delete(assetManagementId);

            // Assert
            Assert.Equal((-1), result);
        }*/
    }
}