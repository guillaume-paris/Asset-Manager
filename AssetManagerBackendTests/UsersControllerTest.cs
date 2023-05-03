using AssetManagerBackend.Controllers;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using AssetManagerBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AssetManagerBackendTests
{
    public class UsersControllerTest
    {
        private readonly Mock<IRepository<User>> _userMock;

        public UsersControllerTest()
        {
            _userMock = new Mock<IRepository<User>>();
        }

        [Fact]
        public void Users_GetAll_ShouldReturnResult()
        {
            //Arrange
            List<User> listUser = new();
            _userMock.Setup(x => x.GetAll()).Returns(listUser.AsQueryable());

            // Act
            var controller = new UsersController(_userMock.Object);

            var response = controller.GetUsers();

            // Assert
            Assert.NotNull(response);
            Assert.Equal(listUser, response);
        }

        [Fact]
        public async Task Users_Create_ReturnsValidCreated()
        {
            // Arrange
            int expectedValidReturn = 1;
            var user = new User { FirstName = "test", LastName = "test", Email = "test", Id = 1, Role = "Employee" };
            _userMock.Setup(x => x.Create(It.IsAny<User>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UsersController(_userMock.Object);

            var result = await controller.AddUser(user);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(createResult.Success);
            Assert.Equal("Creation successful", createResult.Title);
            Assert.Equal("You have created a new user.", createResult.Message);
        }

        [Fact]
        public async Task Users_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            User user = new () { FirstName = "test", LastName = "test", Email = "test", Id = 1, Role = "Employee" };
            User user2 = new () { FirstName = "test2", LastName = "test2", Email = "test2", Id = 1, Role = "Employee" };
            _userMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<User>())).ReturnsAsync(expectedInvalidReturn);
            _userMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(user.Id)), It.IsAny<User>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UsersController(_userMock.Object);

            var result = await controller.UpdateUser(user2);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(createResult.Success);
            Assert.Equal("Update successful", createResult.Title);
            Assert.Equal("You have updated a user.", createResult.Message);
        }

        [Fact]
        public async Task Users_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            User user = new() { FirstName = "test", LastName = "test", Email = "test", Id = 1, Role = "Employee" };
            User user2 = new() { FirstName = "test2", LastName = "test2", Email = "test2", Id = 2, Role = "Director" };
            _userMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<User>())).ReturnsAsync(expectedInvalidReturn);
            _userMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(user.Id)), It.IsAny<User>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UsersController(_userMock.Object);

            var result = await controller.UpdateUser(user2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(updateResult.Success);
            Assert.Equal("User not found", updateResult.Title);
            Assert.Equal("There is no user for this id.", updateResult.Message);
        }

        [Fact]
        public async Task Users_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int userId = 1;
            _userMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _userMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(userId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UsersController(_userMock.Object);

            var result = await controller.DeleteUser(userId);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(deleteResult.Success);
            Assert.Equal("Deletion successful", deleteResult.Title);
            Assert.Equal("You have deleted a user.", deleteResult.Message);
        }

        [Fact]
        public async Task Users_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int userId = 1;
            int userId2 = 2;
            _userMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _userMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(userId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UsersController(_userMock.Object);

            var result = await controller.DeleteUser(userId2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(deleteResult.Success);
            Assert.Equal("User not found", deleteResult.Title);
            Assert.Equal("There is no user for this id.", deleteResult.Message);
        }
    }
}