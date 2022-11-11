# Spring Boot, Spring Web Flux, Spring Security, JWT, MongoDB, Lombok
Build restful api for CMS using pure reactive programming with Spring Web Flux

## Steps to setup
**1. Clone the repository**
```bash
git clone https://github.com/ZayarLinnNaung-Coder/ZCMS.git
```
**2. Create MongoDB database**
```bash
create collection named 'zcms'
```
**3. Change uri and port number in application.yaml**
```bash
uri -> spring.data.mongodb.uri
port -> server.port
```
**4. Run the app**
+ application should start running <http://localhost:8080> by default

## Exploring REST APIs
The app defines following CRUD APIs.

### User

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET   | /users?username=:username | Find User by Username | |

### Auth

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| POST   | /auth/register | Register User | [JSON](#register) |
| POST   | /auth/login | Log in | [JSON](#login) |

### Content Model

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /content-models | Get All Content Models | |
| GET    | /content-models?userId=:userId | Get All Content Models By UserId| |
| POST   | /content-models | Create New Content Model | [JSON](#register) |
| PUT    | /content-models | Update Content Model| [JSON](#register) |
| DELETE | /content-models/{id} | Delete Content Model By Id| |

### Field

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /fields | Get All Fields | |
| GET    | /fields?contentModelId=:contentModelId | Get All Fields By ContentModelId| |
| POST   | /fields | Create New Field | [JSON](#register) |
| PUT    | /fields | Update Field| [JSON](#register) |
| DELETE | /fields/{id} | Delete Field By Id| |

### Content

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /contents | Get All Contents | |
| GET    | /contents?contentModelId=:contentModelId | Get All Contents By ContentModelId| |
| POST   | /contents | Create New Content | [JSON](#register) |
| PUT    | /contents | Update Content| [JSON](#register) |
| DELETE | /contents/{id} | Delete Content By Id| |

### File

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /files | Get All Uploaded Files | |
| GET    | /files/{fileName} | Load File by FileName| |
| POST   | /files | Save File | [FormData](#register) |
