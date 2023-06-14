# Asset Manager

## Introduction

Welcome to the repository of Asset Manager, a web application where users can create their accounts, manage assets, and assign these assets to users. This platform provides a statistics page for an overview of existing users and assets. The application is currently hosted on Azure Web Services and developed as part of an internship at Dennemeyer.

This project was guided by my mentor Thiago, to whom I extend my deepest gratitude for his constant support and guidance.

## Features

- Account Registration and Authentication: New users can create accounts, and existing users can login with their credentials.
- Asset Management: User account can create, update, and delete assets.
- User Management: User account can create, update, and delete users.
- Asset Assignment: Assets can be assigned to different users.
- Statistics Overview: Provides an overview of the existing users and assets.

## Live Application

You can access the live application by clicking [here](https://asset-manager-frontend.azurewebsites.net/).

The Swagger documentation for the backend APIs can be found [here](https://asset-manager-backend.azurewebsites.net/swagger).

## Technologies Used

### Front-end

- Angular 15
- Bootstrap 5

### Back-end

- ASP.NET Core 6
- Entity Framework Core 6

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js - Download and install Node.js from [here](https://nodejs.org/en/download/).
- .NET - Download and install .NET from [here](https://dotnet.microsoft.com/download).

## Cloning

The first step is to clone the repository: 

```
# Using https
git clone https://github.com/yourusername/asset-manager.git

# Using SSH
git clone git@github.com:yourusername/asset-manager.git
```

## Installation

1. Install the Angular CLI globally by running the following command:

```
npm install -g @angular/cli
```

2. Install the .NET CLI by running the following command:

```
dotnet tool install -g dotnet-ef
```

3. From the root of the project, restore the dependencies:

```
cd asset-manager
dotnet restore
```

4. Navigate to the AssetManagerFrontend folder, install the dependencies, and run the Angular development server:

```
cd AssetManagerFrontend
npm install
ng serve
```

5. Navigate to the AssetManagerBackend folder, install the dependencies, and run the .NET development server:

```
cd AssetManagerBackend
dotnet restore
dotnet run
```

## Contributing

Feel free to submit issues and enhancement requests.

## Acknowledgments

- Thanks to Thiago for his support and guidance during the development of this project.
- Thanks to Dennemeyer for providing the opportunity to work on this exciting project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.