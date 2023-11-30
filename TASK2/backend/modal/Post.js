const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Add other post attributes as needed
});
module.exports = Post;
