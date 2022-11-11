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
| POST   | /content-models | Create New Content Model | [JSON](#newContentModel) |
| PUT    | /content-models | Update Content Model| [JSON](#updateContentModel) |
| DELETE | /content-models/{id} | Delete Content Model By Id| |

### Field

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /fields | Get All Fields | |
| GET    | /fields?contentModelId=:contentModelId | Get All Fields By ContentModelId| |
| POST   | /fields | Create New Field | [JSON](#newField) |
| PUT    | /fields | Update Field| [JSON](#updateField) |
| DELETE | /fields/{id} | Delete Field By Id| |

### Content

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /contents | Get All Contents | |
| GET    | /contents?contentModelId=:contentModelId | Get All Contents By ContentModelId| |
| POST   | /contents | Create New Content | [JSON](#newContent) |
| PUT    | /contents | Update Content| [JSON](#updateContent) |
| DELETE | /contents/{id} | Delete Content By Id| |

### File

| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET    | /files | Get All Uploaded Files | |
| GET    | /files/{fileName} | Load File by FileName| |
| POST   | /files | Save File | [Form Data] |

## Sample Valid JSON Request Bodys

##### <a id="register">Register -> /auth/register</a>
```json
{
    "username": "ZayarLinnNaung",
    "password": "12345",
    "email": "zayarlinnnaung-coder@gmail.com",
    "firstName": "Zayar",
    "lastName": "Linn Naung",
    "authorities": [
        "READ", "WRITE", "UPDATE", "DELETE"
    ],
    "enabled": true
}
```

##### <a id="login">Log In -> /auth/login</a>
```json
{
    "username": "ZayarLinnNaung",
    "password": "12345"
}
```

##### <a id="newContentModel">Create New Content Model -> /content-models</a>
```json
{
    "name": "Note",
    "apiIdentifier": "note",
    "description": "Test for my note",
    "user": {
        "id": "634ac9a883cdf962a91ecef4"
    }
}
```

##### <a id="updateContentModel">Update Content Model -> /content-models</a>
```json
{
    "id": "634ac9a883cdf962a91ecef4",
    "name": "Note-2",
    "apiIdentifier": "note",
    "description": "Test for my note",
    "user": {
        "id": "634ac9a883cdf962a91ecef4"
    }
}
```

##### <a id="newField">Create New Field -> /fields</a>
```json
{
    "name": "date",
    "type": "DATE",
    "data": "",
    "description": "For created date",
    "contentModel": {
        "id": "634b747e3652980bc70d1a3e"
    }
}
```

##### <a id="updateField">Update Field -> /fields</a>
```json
{
    "id": "634b747e3652980bc70d1a3e",
    "name": "date",
    "type": "DATE",
    "data": "",
    "description": "For created date",
    "contentModel": {
        "id": "634b747e3652980bc70d1a3e"
    }
}
```

##### <a id="newContent">New Content -> /contents</a>
```json
{
    "id": "634b747e3652980bc70d1a3e",
    "name": "date",
    "type": "DATE",
    "data": "",
    "description": "For created date",
    "contentModel": {
        "id": "634b747e3652980bc70d1a3e"
    }
}
```

##### <a id="newContent">New Content -> /contents</a>
```json
{
      "id": "636dda98ecc4794877047863",
      "title": "TitleA",
      "fields": [
          {
              "id": "636dda68ecc4794877047860",
              "name": "title",
              "type": "TEXT",
              "data": "MyTitle",
              "description": ""
          },
          {
              "id": "636dda6decc4794877047861",
              "name": "blog",
              "type": "RICH_TEXT",
              "data": "adfadsf",
              "description": ""
          },
          {
              "id": "636dda71ecc4794877047862",
              "name": "img",
              "type": "MEDIA",
              "data": "http://localhost:9090/files/ninja.jpg",
              "description": ""
          }
      ],
      "createdDate": "2022-11-11T05:16:08.092+00:00",
      "updatedDate": null,
      "publishStatus": "PUBLISH",
      "contentModel": {
          "id": "6367d79d2ac444756bf26df8"
      },
      "createdUser": {
          "id": "634ac9a883cdf962a91ecef4"
      }
  }
```

##### <a id="updateContent">Update Content -> /contents</a>
```json
{
      "id": "636dda98ecc4794877047863",
      "title": "TitleA",
      "fields": [
          {
              "id": "636dda68ecc4794877047860",
              "name": "title",
              "type": "TEXT",
              "data": "MyTitle",
              "description": ""
          },
          {
              "id": "636dda6decc4794877047861",
              "name": "blog",
              "type": "RICH_TEXT",
              "data": "adfadsf",
              "description": ""
          },
          {
              "id": "636dda71ecc4794877047862",
              "name": "img",
              "type": "MEDIA",
              "data": "http://localhost:9090/files/ninja.jpg",
              "description": ""
          }
      ],
      "createdDate": "2022-11-11T05:16:08.092+00:00",
      "updatedDate": null,
      "publishStatus": "PUBLISH",
      "contentModel": {
          "id": "6367d79d2ac444756bf26df8"
      },
      "createdUser": {
          "id": "634ac9a883cdf962a91ecef4"
      }
  }
```  
