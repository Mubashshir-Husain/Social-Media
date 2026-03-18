# Vibely API Test Results

This document contains the `curl` commands and the successful JSON responses for all tested endpoints in the Vibely API.

---

### 1. User Registration (`POST /api/users/register`)
**Command:**
```bash
curl -X POST http://localhost:5500/api/users/register -H "Content-Type: application/json" -d '{"userName":"tester_acc","email":"tester_acc@example.com","password":"password123"}'
```
**Response (200 OK):**
```json
{
  "message": "user registered successfully",
  "tokens": {
    "accessToken": "eyJhbG...",
    "refressToken": "eyJhbG..."
  }
}
```

---

### 2. User Login (`POST /api/users/login`)
**Command:**
```bash
curl -X POST http://localhost:5500/api/users/login -H "Content-Type: application/json" -d '{"email": "tester_acc@example.com", "password": "password123"}'
```
**Response (200 OK):**
```json
{
  "message": "user logged in successfully",
  "token": "eyJhbG...",
  "tokens": {
    "accessToken": "eyJhbG...",
    "refressToken": "eyJhbG..."
  }
}
```

---

### 3. Get User Profile (`GET /api/users/userProfile`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/users/userProfile -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "_id": "69b5e4ea811f823054a491c2",
  "userName": "tester_acc",
  "email": "tester_acc@example.com",
  "createdAt": "2026-03-14T22:44:58.540Z",
  "updatedAt": "2026-03-14T22:44:58.540Z"
}
```

---

### 4. Create Post (`POST /api/posts/createPost`)
**Command:**
```bash
curl -X POST http://localhost:5500/api/posts/createPost -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"postTitle":"Test Post","postDescription":"This is a test post.","postImage":"http://example.com/image.png","postBy":"69b5e4ea811f823054a491c2"}'
```
**Response (200 OK):**
```json
{
  "message": "post created successfully"
}
```

---

### 5. Get All Posts (`GET /api/posts/allPost`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/posts/allPost -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
[
  {
    "_id": "69b5de40215c81b41ef24d80",
    "postTitle": "Test Post",
    "postDescription": "This is a test post.",
    "postImage": "http://example.com/image.png",
    "likes": [],
    "comments": []
  }
  // ... (other posts)
]
```

---

### 6. Get Specific Post (`GET /api/posts/getPost/:id`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/posts/getPost/69b467bd128b0ffdd6bebeef -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "_id": "69b467bd128b0ffdd6bebeef",
  "postTitle": "JavaScript",
  "postDescription": "https://galaxypfp.com/wp-content/uploads/...",
  "postImage": "https://wallpapers-clan.com/wp-content/...",
  "postBy": {
    "userName": "babu123"
  },
  "likes": [],
  "comments": []
}
```

---

### 7. Like Post (`PUT /api/likes/likePost/:id`)
**Command:**
```bash
curl -X PUT http://localhost:5500/api/likes/likePost/69b467bd128b0ffdd6bebeef -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "message": "post liked successfully"
}
```

---

### 8. Get Liked Posts (`GET /api/likes/likedPost`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/likes/likedPost -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "message": "liked posts fetched successfully",
  "posts": [
    {
      "_id": "69b467bd128b0ffdd6bebeef",
      "postTitle": "JavaScript",
      "likes": ["69b5e4ea811f823054a491c2"]
    }
  ]
}
```

---

### 9. Add Comment (`POST /api/comments/addComment/:id`)
**Command:**
```bash
curl -X POST http://localhost:5500/api/comments/addComment/69b467bd128b0ffdd6bebeef -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"text": "Test comment"}'
```
**Response (200 OK):**
```json
{
  "message": "comment added successfully",
  "comment": {
    "commentText": "Test comment",
    "post": "69b467bd128b0ffdd6bebeef",
    "user": "69b5e4ea811f823054a491c2",
    "_id": "69b5e4ea811f823054a491d2"
  }
}
```

---

### 10. Get Comments for a Post (`GET /api/comments/getAllComment/:id/comments`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/comments/getAllComment/69b467bd128b0ffdd6bebeef/comments -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "message": "comments fetched successfully",
  "comments": [
    "69b5e4ea811f823054a491d2"
  ]
}
```

---

### 11. Get Posts You Commented On (`GET /api/comments/commentedPost`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/comments/commentedPost -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "message": "commented posts fetched successfully",
  "posts": [
    {
      "_id": "69b467bd128b0ffdd6bebeef",
      "postTitle": "JavaScript",
      "comments": [
        "69b5e4ea811f823054a491d2"
      ]
    }
  ]
}
```

---

### 12. Delete Comment (`DELETE /api/comments/deleteComment/:postId/:commentId`)
**Command:**
```bash
curl -X DELETE http://localhost:5500/api/comments/deleteComment/69b467bd128b0ffdd6bebeef/69b5e4ea811f823054a491d2 -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "message": "comment deleted successfully"
}
```

---

### 13. Delete Post (`DELETE /api/posts/deletePost/:id`)
*(Attempting to delete a post not owned by the user)*
**Command:**
```bash
curl -X DELETE http://localhost:5500/api/posts/deletePost/69b467bd128b0ffdd6bebeef -H "Authorization: Bearer <token>"
```
**Response (403 Forbidden):**
```json
{
  "message": "You are not authorized to delete this post"
}
```

---

### 14. Get Posts by User (`GET /api/posts/getPostByUser/:userId`)
**Command:**
```bash
curl -X GET http://localhost:5500/api/posts/getPostByUser/69b5e4ea811f823054a491c2 -H "Authorization: Bearer <token>"
```
**Response (200 OK):**
```json
{
  "success": true,
  "totalPosts": 1,
  "posts": [
    {
      "_id": "69b5e4ea811f823054a491c6",
      "postTitle": "Test Post",
      "postDescription": "This is a test post."
    }
  ]
}
```
