using AssetManagerBackend.Controllers;
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

        /*[Fact]
        public async Task UserAccounts_IsUserAccountExist_ReturnsNotFoundForInvalidCredentials()
        {
            // Arrange
            var login = new AssetManagerBackend.DTO.Login { Username = "testuser", Email = "testemail", Password = "testpassword" };
            _userAccountMock.Setup(x => x.IsUserAccountExist(login.Username, login.Email, login.Password)).ReturnsAsync((UserAccount?)null);

            var controller = new UserAccountsController(_userAccountMock.Object);

            // Act
            var result = await controller.IsUserAccountExist(login);

            // Assert
            var notFoundObjectResult = Assert.IsType<NotFoundObjectResult>(result);
            var actionResult = Assert.IsType<AssetManagerBackend.DTO.ActionResult>(notFoundObjectResult.Value);
            Assert.False(actionResult.Success);
            Assert.Equal("Wrong credentials", actionResult.Title);
            Assert.Equal("Incorrect password or the user account does not exist.", actionResult.Message);
        }

        [Fact]
        public async Task UserAccounts_IsUserAccountExist_ReturnsOkForValidCredentials()
        {
            // Arrange
            var userAccount = new UserAccount { Id = 1, Username = "testuser", Email = "testemail", Password = "testpassword" };
            var login = new AssetManagerBackend.DTO.Login { Username = userAccount.Username, Email = userAccount.Email, Password = userAccount.Password };
            _userAccountMock.Setup(x => x.IsUserAccountExist(login.Username, login.Email, login.Password)).ReturnsAsync(userAccount);

            var controller = new UserAccountsController(_userAccountMock.Object);

            // Act
            var result = await controller.IsUserAccountExist(login);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result);
            var loginResult = Assert.IsType<AssetManagerBackend.DTO.LoginResult>(okObjectResult.Value);
            Assert.True(loginResult.Success);
            Assert.Equal("Login successful", loginResult.Title);
            Assert.Equal("You have log into your account successfully.", loginResult.Message);
            Assert.Equal(userAccount.Username, loginResult.Username);
            Assert.Equal("test-token", loginResult.Token);
            Assert.Equal(0, loginResult.ExpiresIn);
        }*/

        [Fact]
        public async Task UserAccounts_IsUserAccountExist_ReturnsValidUserAccount()
        {
            // Arrange
            var expectedUserAccount = new UserAccount { Id = 1, Username = "testuser", Email = "testemail", Password = "testpassword" };
            var login = new AssetManagerBackend.DTO.Login { Username = "testuser", Email = "testemail", Password = "testpassword" };
            _userAccountMock.Setup(x => x.IsUserAccountExist(login.Username, login.Email, login.Password)).ReturnsAsync(expectedUserAccount);

            // Act
            var result = await _userAccountMock.Object.IsUserAccountExist(login.Username, login.Email, login.Password);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedUserAccount.Id, result.Id);
            Assert.Equal(expectedUserAccount.Username, result.Username);
            Assert.Equal(expectedUserAccount.Email, result.Email);
            Assert.Equal(expectedUserAccount.Password, result.Password);
        }

        [Fact]
        public async Task UserAccounts_Create_ReturnsValidUserAccountCreated()
        {
            // Arrange
            int expectedReturn = 1;
            var userAccount = new UserAccount { Id = 1, Username = "testuser", Email = "testemail", Password = "testpassword" };
            _userAccountMock.Setup(x => x.Create(userAccount)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userAccountMock.Object.Create(userAccount);

            // Assert
            Assert.NotEqual((-1), result);
        }

        [Fact]
        public async Task UserAccounts_Update_ReturnsValidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var userAccount = new UserAccount { Id = 1, Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            _userAccountMock.Setup(x => x.Update(userAccount.Id, userAccount)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userAccountMock.Object.Update(userAccount.Id, userAccount);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task UserAccounts_Update_ReturnsInvalidUpdated()
        {
            // Arrange
            int expectedReturn = 1;
            var userAccount = new UserAccount { Id = 98, Username = "titi", Email = "titi@gmail.com", Password = "titi123" };
            _userAccountMock.Setup(x => x.Update(userAccount.Id, userAccount)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userAccountMock.Object.Update(userAccount.Id, userAccount);

            // Assert
            Assert.Equal((-1), result);
        }*/

        [Fact]
        public async Task UserAccounts_Delete_ReturnsValidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int userId = 1;
            _userAccountMock.Setup(x => x.Delete(userId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userAccountMock.Object.Delete(userId);

            // Assert
            Assert.NotEqual((-1), result);
            Assert.Equal(expectedReturn, result);
        }

        /*[Fact]
        public async Task UserAccounts_Delete_ReturnsInvalidDeleted()
        {
            // Arrange
            int expectedReturn = 1;
            int userId = 98;
            _userAccountMock.Setup(x => x.Delete(userId)).ReturnsAsync(expectedReturn);

            // Act
            var result = await _userAccountMock.Object.Delete(userId);

            // Assert
            Assert.Equal((-1), result);
        }*/
    }
}