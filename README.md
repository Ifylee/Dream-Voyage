# Dream Voyage

Dream Voyage is a web application designed to help users plan and book their dream vacations. The application provides a seamless experience for users to browse, select, and purchase vacation packages, with a focus on user authentication and personalized trip recommendations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
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
    git clone https://github.com/So-Emily/Dream-Voyage
    cd dream-voyage
    ```

2. **Install dependencies**:
    ```sh
    npm install
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
    
5. **Build the client**:
     ```sh
     npm run build
     ```  

6. **Start the development server**:
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

