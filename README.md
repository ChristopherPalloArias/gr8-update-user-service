# Update User Service

This is the microservice for update User in the +Kotas App.

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
   - [Evidence](#evidence)
3. [Usage](#usage)
   - [Verify Server Functionality](#verify-server-functionality)


## Microservice Description

The `update-user-service` microservice is responsible for update the users in the +kotas App. Allows you to update users using an HTTP PUT request to the corresponding route.

## Installation

### Requirements

- Node.js
- npm (Node Package Manager)

### Clone the Repository

```sh
https://github.com/ChristopherPalloArias/gr8-update-user-service.git
cd update-user-service
```

### Install Dependencies
```sh
npm install
```

### Starting the Server
Before starting the application you must change the database credentials in the index.js file if you want to use the application locally and independently, this is because initially the application is configured to be used in conjunction with the rest of Microservices.
Repository: [https://github.com/ChristopherPalloArias/kotas-frontend](https://github.com/ChristopherPalloArias/kotas-frontend.git)

### Evidence
![image](https://github.com/user-attachments/assets/e746ffc3-f13a-4172-ba96-7b188e72350a)

## Usage
### Verify Server Functionality
![image](https://github.com/user-attachments/assets/19544ba5-9c9a-46b4-a3b2-baceaae67738)

URL: `[http://localhost:8084/](http://gr8-load-balancer-users-1719093065.us-east-2.elb.amazonaws.com:8084/)`  
Description: This route displays a message to verify that the server is running.
![image](https://github.com/user-attachments/assets/72b846a2-b8bc-40e0-a8ad-e5b0b84118a6)
