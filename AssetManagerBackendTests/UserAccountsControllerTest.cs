using AssetManagerBackend.Controllers;
using AssetManagerBackend.DTO;
using AssetManagerBackend.Interfaces;
using AssetManagerBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AssetManagerBackendTests
{
    public class UserAccountsControllerTest
    {
        private readonly Mock<IUserAccountRepository> _userAccountMock;

        public UserAccountsControllerTest()
        {
            _userAccountMock = new Mock<IUserAccountRepository>();
        }

        [Fact]
        public void UserAccounts_GetAll_ShouldReturnResult()
        {
            //Arrange
            List<UserAccount> listUserAccount = new();
            _userAccountMock.Setup(x => x.GetAll()).Returns(listUserAccount.AsQueryable());

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var response = controller.GetUserAccounts();

            // Assert
            Assert.NotNull(response);
            Assert.Equal(listUserAccount, response);
        }

        [Fact]
        public async Task UserAccounts_IsUserAccountExist_ReturnsValidCredentials()
        {
            // Arrange
            UserAccount expectedValidReturn = new() { Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            UserAccount? expectedInvalidReturn = null;
            var userAccountLogin = new Login { Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            _userAccountMock.Setup(x => x.IsUserAccountExist(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.IsUserAccountExist(
                It.Is<string>(y => y.Equals(userAccountLogin.Username)),
                It.Is<string>(y => y.Equals(userAccountLogin.Email)),
                It.Is<string>(y => y.Equals(userAccountLogin.Password))
                )).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.IsUserAccountExist(userAccountLogin);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.LoginResult>(okObjectResult.Value);
            Assert.True(createResult.Success);
            Assert.Equal("Login successful", createResult.Title);
            Assert.Equal("You have log into your account successfully.", createResult.Message);
            Assert.Equal(userAccountLogin.Username, createResult.Username);
            Assert.NotNull(createResult.Token);
            Assert.NotEqual((-1), createResult.ExpiresIn);
        }

        [Fact]
        public async Task UserAccounts_IsUserAccountExist_ReturnsInvalidCredentials()
        {
            // Arrange
            UserAccount expectedValidReturn = new() { Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            UserAccount? expectedInvalidReturn = null;
            var userAccountLogin = new Login { Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            var userAccountLogin2 = new Login { Username = "toto", Email = "toto@gmail.com", Password = "t23030123" };
            _userAccountMock.Setup(x => x.IsUserAccountExist(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.IsUserAccountExist(
                It.Is<string>(y => y.Equals(userAccountLogin.Username)),
                It.Is<string>(y => y.Equals(userAccountLogin.Email)),
                It.Is<string>(y => y.Equals(userAccountLogin.Password))))
                .ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.IsUserAccountExist(userAccountLogin2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var createResult = Assert.IsType<AssetManagerBackend.DTO.LoginResult>(notFoundObjectResult.Value);
            Assert.False(createResult.Success);
            Assert.Equal("Wrong credentials", createResult.Title);
            Assert.Equal("Incorrect password or the user account does not exist.", createResult.Message);
            Assert.Equal("", createResult.Username);
            Assert.NotNull(createResult.Token);
            Assert.NotEqual((-1), createResult.ExpiresIn);
        }

        [Fact]
        public async Task UserAccounts_Create_ReturnsValidCreated()
        {
            // Arrange
            int expectedValidReturn = 1;
            var userAccount = new UserAccount { Id = 1, Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            _userAccountMock.Setup(x => x.Create(It.IsAny<UserAccount>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.AddUserAccount(userAccount);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.LoginResult>(okObjectResult.Value);
            Assert.True(updateResult.Success);
            Assert.Equal("Creation successful", updateResult.Title);
            Assert.Equal("You have created a new user account.", updateResult.Message);
            Assert.Equal(userAccount.Username, updateResult.Username);
            Assert.NotNull(updateResult.Token);
            Assert.NotEqual((-1), updateResult.ExpiresIn);
        }

        [Fact]
        public async Task UserAccounts_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            var userAccount = new UserAccount { Id = 1, Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            var userAccount2 = new UserAccount { Id = 1, Username = "titi22", Email = "titi@gmail.com", Password = "titi123" };
            _userAccountMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<UserAccount>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(userAccount.Id)), It.IsAny<UserAccount>())).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.UpdateUserAccount(userAccount2);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(updateResult.Success);
            Assert.Equal("Update successful", updateResult.Title);
            Assert.Equal("You have updated a user account.", updateResult.Message);
        }

        [Fact]
        public async Task UserAccounts_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            var userAccount = new UserAccount { Id = 1, Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            var userAccount2 = new UserAccount { Id = 2, Username = "toto", Email = "toooti@gmail.com", Password = "ttotoi123" };
            _userAccountMock.Setup(x => x.Update(It.IsAny<int>(), It.IsAny<UserAccount>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.Update(It.Is<int>(y => y.Equals(userAccount.Id)), It.Is<UserAccount>(y => y.Equals(userAccount)))).ReturnsAsync(expectedValidReturn);
            
            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.UpdateUserAccount(userAccount2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var updateResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(updateResult.Success);
            Assert.Equal("Something went wrong", updateResult.Title);
            Assert.Equal("Oops, something went wrong server side. Please try again later.", updateResult.Message);
        }

        [Fact]
        public async Task UserAccounts_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int userAccountId = 1;
            _userAccountMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(userAccountId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.DeleteUserAccount(userAccountId);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(okObjectResult.Value);
            Assert.True(deleteResult.Success);
            Assert.Equal("Deletion successful", deleteResult.Title);
            Assert.Equal("You have deleted a user account.", deleteResult.Message);
        }

        [Fact]
        public async Task UserAccounts_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedValidReturn = 1;
            int expectedInvalidReturn = -1;
            int userAccountId = 1;
            int userAccountId2 = 2;
            _userAccountMock.Setup(x => x.Delete(It.IsAny<int>())).ReturnsAsync(expectedInvalidReturn);
            _userAccountMock.Setup(x => x.Delete(It.Is<int>(y => y.Equals(userAccountId)))).ReturnsAsync(expectedValidReturn);

            // Act
            var controller = new UserAccountsController(_userAccountMock.Object);

            var result = await controller.DeleteUserAccount(userAccountId2);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var deleteResult = Assert.IsType<AssetManagerBackend.DTO.ActionResponse>(notFoundObjectResult.Value);
            Assert.False(deleteResult.Success);
            Assert.Equal("Something went wrong", deleteResult.Title);
            Assert.Equal("Oops, something went wrong server side. Please try again later.", deleteResult.Message);
        }
    }
}