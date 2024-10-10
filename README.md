# Dream Voyage
[![MIT License Badge](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](/LICENSE)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Express Badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)

Dream Voyage is a web application designed to help users plan and book their dream vacations. The application provides a seamless experience for browsing, selecting, and purchasing vacation packages. Focusing on user experience and worldwide adventure.

![home-img](https://github.com/user-attachments/assets/4d62e192-0ea8-46d9-b7ba-cdf469201204)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployed Link](#deployed-link)
- [Contributing](#contributing)
- [License](#license)
- [Team](#team)

## Features

- **User Authentication**: Secure login and signup using JWT.
- **Vacation Packages**: Browse and search for various vacation packages.
- **Wishlist**: Add trips to a wishlist for future reference.
- **Purchase Trips**: Securely purchase vacation packages.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Material-UI, Apollo Client
- **Backend**: Node.js, Express, Apollo Server, GraphQL, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Material-UI
- **Build Tool**: Vite

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone <GitHub Repository>
    cd dream-voyage
    ```

2. **Install dependencies**:
    ```sh
    npm run render-build
    or
    npm install && npm run build
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `server` directory and add the following:
    ```env
    SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_connection_string
    ```

4. **Seed the database** (optional):
    ```sh
    npm run seed
    ```

5. **Start the development server**:
    ```sh
    npm run develop
    ```

## Usage

1. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.

2. **Sign up or log in**:
    Create a new account or log in with existing credentials.

3. **Browse vacation packages**:
    Explore various vacation packages and add your favorites to the wishlist.

4. **Purchase a trip**:
    Securely purchase your selected vacation package.

## API Endpoints

### Authentication

- **Login**: `POST /graphql`
    ```graphql
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          firstName
          email
        }
      }
    }
    ```

- **Signup**: `POST /graphql`
    ```graphql
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
        user {
          _id
          firstName
          email
        }
      }
    }
    ```

### Trips

- **Add to Wishlist**: `POST /graphql`
    ```graphql
    mutation AddToList($id: ID!) {
      addToList(_id: $id) {
        _id
        wishList {
          title
          id
          category {
            name
          }
        }
      }
    }
    ```

- **Purchase Trip**: `POST /graphql`
    ```graphql
    mutation BoughtTrip($id: ID!) {
      boughtTrip(_id: $id) {
        _id
        email
        purchased {
          category {
            name
          }
          id
          title
        }
      }
    }
    ```
## Deployed Link
[Dream Voyage Render Link](https://dream-voyage.onrender.com)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Team

