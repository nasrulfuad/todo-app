# MERN Todo App

> Todo App built with Mongodb, Express, React, NodeJS

## Quick Start

Add your MONGO_URI to the default.json file. Make sure you set an env var for that and the jwtSecret on deployment

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
# API Documentation

HOST: http://localhost:3000/api/

# Allowed HTTPs requests:
<pre>
POST    : Register / Login, Add new todo
GET     : Get user data
PUT     : Update todo
</pre>

# Description Of Usual Server Responses:
- 201 Created - the request was successful and a resource was created.
- 202 Accepted - response status code indicates that the request has been received but not yet acted upon
- 400 Bad Request - the request could not be understood or was missing required parameters.
- 401 Unauthorized - authentication failed or user doesn't have permissions for requested operation.
- 403 Forbidden - access denied.

---
User collections:

- name (String)        : mandatory
- email (String)       : unique, mandatory
- password (String)    : mandatory, min(6)
- todos (Array)        : default(null)
- registerDate (Date)  : default(Date.now)

Todos document :
- name (String)
- createdAt (Date)

---
## User Route [/api/users]

### Register new User [POST]
<pre>
@route   POST /api/users
@desc    Register new user
@access  Public
</pre>
+ Request (application/json) | Contoh API request di postman

            {
                "name": "johndoe",
                "email": "johndoe@email.com",
                "password": "Johndoe123!"
            }

+ Response 201 (application/json) | Registrasi berhasil

            {
                "msg": "Registrasi berhasil",
                "token" : "blablabla",
                "user": {
                    "id": "blabla",
                    "name": "blabla",
                    "email": "blabla"
                }
            }

+ Response 400 (application/json) |  Email sudah terdaftar

            {
                "msg": "Email sudah terdaftar"
            }

+ Response 400 (application/json) | Semua kolom harus di isi

            {
                "msg": "Mohon isi semua kolom"
            }

### Authenticate user / Login

<pre>
@route    POST /api/auth/
@desc     Authenticate user
@access   public
</pre>

+ Response 202 | Get data and token

+ Response 400 (application/json) | Semua kolom harus di isi

            {
                "msg": "Mohon isi semua kolom"
            }

+ Response 400 (application/json) | Email belum terdaftar

            {
                "msg": "Email belum terdaftar"
            }

+ Response 400 (application/json) | Password salah

            {
                "msg": "Password salah"
            }

### Get user data after login

<pre>
@route    GET /api/auth/user
@desc     Get user data
@access   private
</pre>

+ Response 202 | Get data and token

+ Response 401 (application/json) | No token available

            {
                "msg": "No token, authorization denied"
            }

+ Response 400 (application/json) | Token does not match

            {
                "msg": "Invalid token"
            }

### Get user todos

<pre>
@route    GET /api/todos
@desc     Get user todos
@access   private
</pre>

+ Response 200 | Get todos

+ Response 401 (application/json) | No token available

            {
                "msg": "No token, authorization denied"
            }

+ Response 400 (application/json) | Token does not match

            {
                "msg": "Invalid token"
            }
