# CRUD Server

A simple CRUD backend built with **ExpressJS + TypeScript + MongoDB**.

## Features
- Create a resource
- List resources with basic filters (name, type)
- Get details of a resource
- Update resource
- Delete resource

## Tech Stack
- ExpressJS
- TypeScript
- MongoDB (Mongoose)
- Nodemon / ts-node for development

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chientran1996/99techteam-code-challenge.git solution5
   cd solution5

2. **Install dependencies**
   ```bash
   npm install
   
3. **Setup environment variables**
   Create .env file:
   ```bash
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017/solution5

4. **Run in development**
   ```bash
   npm run dev
   
5. **Build and run**
   ```bash
   npm run build
   npm start

## API Endpoints

- POST /api/resources -> Create
- GET /api/resources -> List
- GET /api/resources/:id -> Get details
- PUT /api/resources/:id -> Update
- DELETE /api/resources/:id -> Delete

## Quick test with Postman

- **Create**: `POST /api/resources { "name": "Book", "type": "document" }`
- **List**: `GET /api/resources`
- **Filter**: `GET /api/resources?type=document&nam=Book`
- **Detail**: `GET /api/resources/:id`
- **Update**: `PUT /api/resources/:id`
- **Delete**: `DELETE /api/resources/:id`