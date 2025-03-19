# TOBEL

TOBEL is a robust server-side application designed to power the operations of an e-commerce platform specializing in secondHand products. Built with modern web technologies, it provides a secure, scalable, and efficient backend solution to manage data and handle client requests.

## 🚀 Fronted Live Demo

https://rebuy-hub-client-new2.vercel.app

## 🚀 Backend Live Demo

https://rebuy-hub-server-1.vercel.app

## ✨ Features

- 🌐 **RESTful API:** Provides endpoints for product add, get, update, delete, and more.

- 🛠️ **CRUD Operations:** Full support for creating, reading, updating, and deleting products.

- 🔒 **Secure Environment:** Securely manage environment variables with dotenv.
- 🔑 **Token:** Refresh and access token are provided in login time.

- 📦 **Error Handling:** Comprehensive error responses for better debugging and API usage.

- 🗂️ **Categorization:** Filter, searching products by categories, name, and price range.

- 🛡️ **Secure Database Operations:** Data stored and managed securely using MongoDB.

- ⚙️ **Scalable Design:** Built to handle growing demands and datasets.
- 💳 **Secure Payment Integration:** Secure payment integration has been implemented with **Shurjopay**. Users can order their chose products.

- 🔒 **Bcrypt Password Hashing:** Bcrypt password hashing has been implemented To secure users password.
- 👥 **Admin Role:** Admin role has been implemented.

## 🛠️ Technologies Used

### Backend Framework

- **Node.js:** High-performance runtime for building scalable applications.
- **Express.js:** Framework for creating RESTful APIs efficiently.

### Database

- **MongoDB:** NoSQL database for secure and flexible data storage.
- **Mongoose:** Elegant ODM for MongoDB, enabling schema validation and easy database interactions.

### Development Tools

- **TypeScript:** Ensures type safety, enhancing code maintainability.
- **ts-node-dev:** Hot-reloading during development for faster iterations.
- **ESLint & Prettier:** For consistent code style and quality checks.
- **dotenv:** Manages environment variables securely.

## ⚙️ Installation and Setup

Follow these steps to set up and run the backend server locally:

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (Ensure MongoDB is installed and running locally or use a remote database)
- **Shurjopay** merchant account and API credentials.

### Clone the Repository

```bash
git clone https://github.com/AthkiaAdiba/reBuy-hub-server
cd rebuy-hub-server
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory with the following structure:

```bash
MONGO_URI=your_database_url
PORT=5000
BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_ACCESS_EXPIRES_IN=your_jwt_access_expires_in
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRES_IN=your_jwt_refresh_expires_in
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=sp_sandbox
SP_PASSWORD=pyyk97hu&6u6
SP_PREFIX=SP
SP_RETURN_URL=your_return_url
```

### Run the Server

#### Development Mode

```bash
npm run start:dev
```

#### Production Mode

```bash
npm run build
npm run start:prod
```

## 🔗 Scripts

- `npm run start:dev`: Starts the development server with hot reloading.

- `npm run start:prod`: Starts the production server.

- `npm run build`: Compiles TypeScript into JavaScript.

- `npm run lint`: Checks code for linting issues.

- `npm run lint:fix`: Automatically fixes linting issues.

- `npm run prettier:fix`: Formats the codebase using Prettier.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`)
4. Push your changes (`git push origin feature-branch`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the **ISC License**.

## 📞 Contact

For any queries or feedback, feel free to reach out:
Email: athkiaadiba@gmail.com
