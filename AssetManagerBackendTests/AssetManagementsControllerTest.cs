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
        private readonly Mock<IRepository<AssetManagement>> _assetManagementMock;

        public AssetManagementsControllerTest()
        {
            _assetManagementMock = new Mock<IRepository<AssetManagement>>();
        }

        [Fact]
        public void AssetManagements_GetAll_ShouldReturnResult()
        {
            //Arrange
            List<AssetManagement> listAssetManagement = new();
            _assetManagementMock.Setup(x => x.GetAll()).Returns(listAssetManagement.AsQueryable());

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var response = controller.GetAssetManagements();

            // Assert
            Assert.NotNull(response);
            Assert.Equal(listAssetManagement, response);
        }

        [Fact]
        public async Task AssetManagements_Create_ReturnsValidCreated()
        {
            // Arrange
            int expectedValidReturn = 1;
            AssetManagement assetManagement = new () { Id = 1, User = "Jackie Chan", Asset = "Iphone 15" };
            _assetManagementMock.Setup(x => x.Create(It.IsAny<AssetManagement>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var result = await controller.AddAssetManagement(assetManagement);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(createResult.Success);
            Assert.Equal("Creation successful", createResult.Title);
            Assert.Equal("You have created a new link.", createResult.Message);
        }

        [Fact]
        public async Task AssetManagements_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            AssetManagement assetManagement = new() { Id = 1, User = "Jackie Chan", Asset = "Iphone 15" };
            AssetManagement assetManagement2 = new() { Id = 1, User = "Jackie Chan222", Asset = "Iphone 11" };
            _assetManagementMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<AssetManagement>())).ReturnsAsync(expectedInvalidReturn);
            _assetManagementMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(assetManagement.Id)), It.IsAny<AssetManagement>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var result = await controller.UpdateAssetManagement(assetManagement);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(updateResult.Success);
            Assert.Equal("Update successful", updateResult.Title);
            Assert.Equal("You have updated a link.", updateResult.Message);
        }

        [Fact]
        public async Task AssetManagements_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            AssetManagement assetManagement = new() { Id = 1, User = "Jackie Chan", Asset = "Iphone 15" };
            AssetManagement assetManagement2 = new() { Id = 2, User = "Jackie Chan222", Asset = "Iphone 11" };
            _assetManagementMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<AssetManagement>())).ReturnsAsync(expectedInvalidReturn);
            _assetManagementMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(assetManagement.Id)), It.IsAny<AssetManagement>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var result = await controller.UpdateAssetManagement(assetManagement2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(updateResult.Success);
            Assert.Equal("Link not found", updateResult.Title);
            Assert.Equal("There is no link for this id.", updateResult.Message);
        }

        [Fact]
        public async Task AssetManagements_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int assetManagementId = 1;
            _assetManagementMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _assetManagementMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(assetManagementId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var result = await controller.DeleteAssetManagement(assetManagementId);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(deleteResult.Success);
            Assert.Equal("Deletion successful", deleteResult.Title);
            Assert.Equal("You have deleted a link.", deleteResult.Message);
        }

        [Fact]
        public async Task AssetManagements_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int assetManagementId = 1;
            int assetManagementId2 = 2;
            _assetManagementMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _assetManagementMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(assetManagementId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new AssetManagementsController(_assetManagementMock.Object);

            var result = await controller.DeleteAssetManagement(assetManagementId2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(deleteResult.Success);
            Assert.Equal("Link not found", deleteResult.Title);
            Assert.Equal("There is no link for this id.", deleteResult.Message);
        }
    }
}