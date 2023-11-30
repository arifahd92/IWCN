const Post = require("../modal/Post");

const getPosts = async (req, res) => {
  try {
    const data = await Post.findAll();
    res.send(data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const savePosts = async (req, res) => {
  try {
    const PostData = req.body;
    console.log({ PostData });
    const savedData = await Post.create(PostData);
    res.status(201).send(savedData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deletePosts = async (req, res) => {
  try {
    // Find the message by ID
    const { postId } = req.params;
    console.log({ postId });
    const post = await Post.findByPk(postId);

    if (!post) {
      // If the message is not found, send a 404 Not Found response
      return res.status(404).json({ error: "post not found" });
    }

    // Delete the message
    await post.destroy();
    // Send a success response
    return res.status(204).send(); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error("Error deleting message:", error.message);
    // Handle other errors (e.g., database error) and send a 500 Internal Server Error response
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getPosts, savePosts, deletePosts };
