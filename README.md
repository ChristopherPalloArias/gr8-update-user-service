# List Product Service

This is the microservice for listining products in the MiniMarket inventory.

## Group Members

- Christopher Pallo
- Brayan Dávila

## Table of Contents

1. [Microservice Description](#microservice-description)
2. [Installation](#installation)
   - [Requirements](#requirements)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Start the Server](#start-the-server)
   - [Evidence](#evidence-create)
3. [Usage](#usage)
   - [Verify Server Functionality](#verify-server-functionality)
   - [Add a New Product](#add-a-new-product)
4. [Program Execution](#program-execution)
   - [Create Docker Image](#create-docker-image)
5. [DockerHub](#dockerhub)
   - [DockerHub Repository](#dockerhub-repository)


## Microservice Description

The `list-product-service` microservice is responsible for managing the list of products in the MiniMarket inventory. Allows you to list products using an HTTP GET request to the corresponding route.

## Installation

### Requirements

- Node.js
- npm (Node Package Manager)

### Clone the Repository

```sh
git clone https://github.com/ChristopherPalloArias/Microservice-ListProductService.git
cd list-product-service
```

### Install Dependencies
```sh
npm install
```

### Start the Server
Before starting the application you must change the database credentials in the index.js file if you want to use the application locally and independently, this is because initially the application is configured to be used in conjunction with the rest of Microservices through Docker-Compose, if you do not want to run the application independently, you must leave the file as it is and subsequently execute the DockerCompose file found in the attached repository, where you will find how to run it, and thus the application It will work together through Docker.
Repository: [https://github.com/ChristopherPalloArias/Frontend-MinimarketMicroservices](https://github.com/ChristopherPalloArias/Frontend-MinimarketMicroservices)

Changes to run locally and independently
We are located on line of code 5

Current:
```sh
const port = process.env.PORT || 8083;
```
New:
```sh
const port = 8083;
```

We are located on line of code 11 to 16

Current:
```sh
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
```
New:
```sh
const db = mysql.createConnection({
    host: 'mysql-christopherobin.alwaysdata.net',
    user: '358042_admin',
    password: 'YqUZn6T6AxLYc5k',
    database: 'christopherobin_minimarket'
});
```

```sh
npm run start
```

### Evidence
![image](https://github.com/user-attachments/assets/6e1c8392-432d-41a1-80e8-4b01dcbd9c58)


## Usage

### Verify Server Functionality

Method: GET  
URL: `http://localhost:8084/`  
Description: This route displays a message to verify that the server is running.
![image](https://github.com/user-attachments/assets/2e698590-260a-465c-9ec9-fe8592b750ee)


### List the Products

Method: GET  
URL: `http://localhost:8084/users/1`  
Description: This route returns the list of products in inventory.
![image](https://github.com/user-attachments/assets/65065b92-a99b-4159-a99c-7afe3b270708)

{
    "firstName": "Christopher Ismael",
    "lastName": "Pallo Arias",
    "email": "cipallo@uce.edu.ec",
    "username": "cipallo",
    "password": "1234"
}
## Program Execution
### Create Docker Image with DockerFile

```sh
docker build -t list-product-service .
```
![image](https://github.com/ChristopherPalloArias/Microservice-ListProductService/assets/167264603/b2c53e71-7923-4ae3-b1fb-81c7c218507f)


## DockerHub
### DockerHub Repository

[christopherpallo2000/cp-list-product-services](https://hub.docker.com/r/christopherpallo2000/cp-list-product-services)

Docker Pull Command
```sh
docker pull christopherpallo2000/cp-list-product-services
```
