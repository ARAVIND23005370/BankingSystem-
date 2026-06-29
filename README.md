# Banking System

A full-stack Banking Management System developed using Spring Boot, React.js, and MySQL. The application provides secure authentication, account management, money transfers, transaction history, and a responsive banking dashboard.

---

## Live Demo

Application URL

https://banking-system-web.vercel.app/login

Repository

https://github.com/ARAVIND23005370/BankingSystem-

---

# Table of Contents

* Overview
* Features
* Technology Stack
* System Architecture
* Project Structure
* Installation
* API Modules
* Future Enhancements
* Contributing
* Author
* License

---

# Overview

The Banking System is a full-stack web application that simulates real-world banking operations. It enables users to securely create and manage bank accounts, perform financial transactions, and monitor account activity through an intuitive web interface.

The application follows a client-server architecture where the React frontend communicates with a Spring Boot REST API, while MySQL stores all application data securely.

---

# Features

## Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* Logout

## Account Management

* Create Account
* View Account Details
* Update Profile
* Check Account Balance

## Banking Operations

* Deposit Money
* Withdraw Money
* Transfer Money
* View Transaction History

## Dashboard

* Banking Dashboard
* Recent Transactions
* Account Summary
* User Information

## Security

* Password Encryption
* JWT Token Validation
* Spring Security
* Secure REST APIs

---

# Technology Stack

| Category        | Technologies                              |
| --------------- | ----------------------------------------- |
| Frontend        | React.js, JavaScript, HTML5, CSS3, Axios  |
| Backend         | Java, Spring Boot, Spring Security, Maven |
| Database        | MySQL                                     |
| API             | REST API                                  |
| Version Control | Git, GitHub                               |
| Deployment      | Vercel                                    |

---

# System Architecture

```text
React Frontend
        │
        ▼
Spring Boot REST API
        │
        ▼
MySQL Database
```

---

# Project Structure

```text
BankingSystem
│
├── Backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── Frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
│
├── README.md
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
├── SECURITY.md
└── CHANGELOG.md
```

---

# Prerequisites

Before running the project, ensure the following software is installed:

* Java 17 or later
* Maven
* Node.js
* npm
* MySQL
* Git

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ARAVIND23005370/BankingSystem-.git
```

Move into the project directory.

```bash
cd BankingSystem
```

---

## Backend Setup

```bash
cd Backend
mvn clean install
mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd Frontend
npm install
npm start
```

The frontend will typically run on:

```
http://localhost:3000
```

---

# API Modules

The backend provides REST APIs for:

* User Registration
* User Authentication
* Account Management
* Balance Inquiry
* Deposit
* Withdrawal
* Money Transfer
* Transaction History

---

# Screenshots

Screenshots can be added in the following structure.

```text
screenshots/

login.png

dashboard.png

transactions.png

transfer.png
```

---

# Future Enhancements

* Email Notifications
* OTP Verification
* Loan Management
* Admin Dashboard
* UPI Integration
* PDF Bank Statements
* Mobile Responsive Improvements
* Analytics Dashboard
* Multi-language Support

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# Author

Aravind R

GitHub

https://github.com/ARAVIND23005370

---

# License

This project is licensed under the MIT License.

---

# Acknowledgements

This project was developed for learning full-stack web application development using Spring Boot, React.js, and MySQL.
