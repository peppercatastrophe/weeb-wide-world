# Weeb-Wide-World API Documentation

&nbsp;

## Models :

_User_

```
- fullName: string, required
- email: string, required, unique
- password: string, required
```

_Like_

```
- AnimeId: integer, required
- UserId: integer, required
```

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /user`
- `GET /user/:id`
- `PATCH /user/:id`
- `GET /user/:id/likes`
- `GET /user/:id/dislikes`
- `POST /like/:AnimeId`
- `DELETE /like/:AnimeId`
- `POST /dislike/:AnimeId`
- `DELETE /dislike/:AnimeId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "fullName": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Full Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /googleLogin

Request:

- body:

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

&nbsp;

## 4. GET /user/:id

Request:

- body: none

_Response (200 - OK)_

```json
{
  "id": "integer",
  "fullName": "string",
  "email": "string"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 5. PATCH /user/:id

Request:

- headers

```json
{
  "authorization": "Bearer access_token"
}
```

- body

```json
{
  "id": "integer",
  "fullName": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": [1]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 6. GET /user/:id/likes

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
[
  {
    "AnimeId": "integer",
    "UserId": "integer",
    "animeTitle": "string"
  },
  {...},{...},{...}
]
```

&nbsp;

## 7. GET /user/:id/dislikes

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

_Response (200 - OK)_

```json
[
  {
    "AnimeId": "integer",
    "UserId": "integer",
    "animeTitle": "string"
  },
  {...},{...},{...}
]
```

&nbsp;

## 8. POST /like/:AnimeId

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

- body

```json
{
  "AnimeId": "integer",
  "UserId": "integer",
  "animeTitle": "string"
}
```

_Response (200 - OK)_

```json
{
  "AnimeId": "integer",
  "UserId": "integer",
  "animeTitle": "string"
}
```

&nbsp;

## 9. DELETE /like/:AnimeId

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

- body

```json
{
  "AnimeId": "integer"
}
```

_Response (200 - OK)_

```json
[1]
```

_Response (404 - Not Found)_

```json
{
  "code": 404
}
```

&nbsp;

## 10. POST /dislike/:AnimeId

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

- body

```json
{
  "AnimeId": "integer",
  "UserId": "integer",
  "animeTitle": "string"
}
```

_Response (200 - OK)_

```json
{
  "AnimeId": "integer",
  "UserId": "integer",
  "animeTitle": "string"
}
```

&nbsp;

## 11. DELETE /dislike/:AnimeId

Request:

- header

```json
{
  "authorization": "Bearer access_token"
}
```

- body

```json
{
  "AnimeId": "integer"
}
```

_Response (200 - OK)_

```json
[1]
```

_Response (404 - Not Found)_

```json
{
  "code": 404
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
