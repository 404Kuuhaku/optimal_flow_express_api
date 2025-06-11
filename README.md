# Optimal Flow Express API

A RESTful API built with Express.js, TypeScript, and MongoDB for user management and balance transfers.

## Features

- User management (create, read)
- JWT-based authentication
- Secure balance transfers between users
- Atomic transactions for balance updates
- Docker containerization
- TypeScript support
- Comprehensive test suite

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB (handled by Docker)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/404Kuuhaku/optimal_flow_express_api.git
cd optimal_flow_express
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Copy the following variables and set their values:
   ```env
   # Server Configuration
   PORT=3000

   # MongoDB Configuration
   MONGODB_URI=mongodb://admin:password@mongodb:27017/optimal_flow_express

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   ```
   - Replace `your_jwt_secret_key_here` with a secure random string

4. Start the application using Docker Compose:
```bash
docker compose up --build
```

The API will be available at `http://localhost:3000`

## Postman Collection

A Postman collection is provided to help you test the API endpoints. Follow these steps to use it:

1. **Install Postman**
   - Download and install [Postman](https://www.postman.com/downloads/) if you haven't already

2. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select the `optimal_flow_api.postman_collection.json` file from the project root

3. **Set up Environment Variables**
   - In Postman, click on "Environments" in the sidebar
   - Click "Create Environment"
   - Name it "Optimal Flow API"
   - Add these variables:
     - `baseUrl`: `http://localhost:3000`
     - `token`: Leave empty for now
   - Click "Save"
   - Select the environment from the dropdown in the top right

4. **Using the Collection**
   - First, create a user using the "Create User" request
   - Then, use the "Login" request to get a JWT token


5. **Available Requests**
   - **Authentication**
     - Login
   - **Users**
     - Create User
     - Get All Users
     - Get User by ID
   - **Transfers**
     - Transfer Balance

6. **Testing Flow**
   1. Create two users using "Create User"
   2. Login with one user to get the token
   3. Try getting all users
   4. Try getting a specific user by ID
   5. Try transferring balance between users

Note: Make sure your API server is running before testing with Postman.


## Testing

The project includes a comprehensive test suite covering authentication and transfer functionality.
### Running Tests

```bash
npm test
```

### Test Coverage

The test suite includes:

1. Authentication Tests:
   - Successful login
   - Failed login with invalid password
   - Failed login with non-existent user
   - Failed login with missing credentials

2. Transfer Tests:
   - Successful balance transfer
   - Failed transfer with insufficient balance
   - Failed transfer to non-existent user
   - Failed transfer to the same user

### Test Environment

- Uses MongoDB Memory Server for isolated testing
- Automatically sets up and tears down test database
- Includes proper error handling and validation testing

## Development

1. Start development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

## Design Decisions

1. **TypeScript**: Chosen for type safety and better developer experience
2. **MongoDB**: Selected for its flexibility and transaction support
3. **JWT**: Used for stateless authentication
4. **Express**: Chosen for its simplicity and middleware ecosystem
5. **Docker**: Used for consistent development and deployment environments

## Scaling Considerations

To handle 10x the current traffic, consider:

1. **Load Balancing**:
   - Implement a load balancer (e.g., Nginx)
   - Deploy multiple API instances

2. **Database Scaling**:
   - Implement MongoDB sharding
   - Use read replicas for read-heavy operations

3. **Caching**:
   - Implement Redis for caching frequently accessed data
   - Cache user data and authentication tokens

4. **Performance Optimizations**:
   - Implement database indexing
   - Use connection pooling
   - Implement rate limiting

5. **Monitoring**:
   - Add application monitoring (e.g., New Relic, Datadog)
   - Implement logging and tracing

6. **Infrastructure**:
   - Use container orchestration (e.g., Kubernetes)
   - Implement auto-scaling
   - Use CDN for static content

