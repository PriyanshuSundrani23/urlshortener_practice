Project Requirements: URL shortener project 

This document lists all the tools, technologies, libraries used in the URL shortener project. Ensure you have everything set up before beginning development.


Tech Stack Overview

category        technology            purpose
Backend         Node.js+Express       Rest API development
Database        PostgresSQL           Relational data store
ORM             Drizzle ORM           Type-safe database queries 
                                      and schema
Containerzation docker + compose      Local PostgreSQL instance
Authentication  JWT                   Securing Private routes
Testing tools   Postman               Manual API testing

# 📎 Project Requirements – URL Shortener API

## 📦 NPM Dependencies

```bash
npm install express drizzle-orm pg jsonwebtoken bcrypt dotenv

🔐 Auth Routes
| Method | Endpoint  | Description             | Auth Required |
| ------ | --------- | ----------------------- | ------------- |
| POST   | `/signup` | Register a new user     | ❌             |
| POST   | `/login`  | Login and receive token | ❌             |


🔗 URL Routes
| Method | Endpoint      | Description                                    | Auth Required |
| ------ | ------------- | ---------------------------------------------- | ------------- |
| POST   | `/shorten`    | Create a short URL from a long one             | ✅             |
| GET    | `/:shortCode` | Redirect to the original URL                   | ❌             |
| GET    | `/urls`       | Get all URLs created by the logged-in user     | ✅             |
| DELETE | `/url/:id`    | Delete a short URL (if it belongs to the user) | ✅             |

