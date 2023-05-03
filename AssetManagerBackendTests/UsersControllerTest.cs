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
        public async Task Users_Create_ReturnsValidUserCreated()
        {
            // Arrange
            int expectedReturn = 1;
            var user = new User { FirstName = "test", LastName = "test", Email = "test", Id = 1, Role = "Employee" };
            _userMock.Setup(x => x.Create(user)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Create(user);

            // Assert
            Assert.NotEqual((-1), result);
        }

        [Fact]
        public async Task Users_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var user = new User { FirstName = "test", LastName = "test", Email = "test", Id = 1, Role = "Employee" };
            _userMock.Setup(x => x.Update(user.Id, user)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Update(user.Id, user);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task Users_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var user = new User { FirstName = "test", LastName = "test", Email = "test", Id = 98, Role = "Employee" };
            _userMock.Setup(x => x.Update(user.Id, user)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Update(user.Id, user);

            // Assert
            Assert.Equal((-1), result);
        }*/

        [Fact]
        public async Task Users_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int userId = 1;
            _userMock.Setup(x => x.Delete(userId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Delete(userId);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task UserAccounts_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int userId = -1;
            _userMock.Setup(x => x.Delete(userId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userMock.Object.Delete(userId);

            // Assert
            Assert.Equal((-1), result);
        }*/
    }
}