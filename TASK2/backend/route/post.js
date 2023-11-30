const express = require("express");
const { getPosts, savePosts, deletePosts } = require("../controller/post");
const router = express.Router();
router.get("/post", getPosts);
router.post("/post", savePosts);
router.delete("/post/:postId", deletePosts);
module.exports = router;
