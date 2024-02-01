module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes");

  // Column: id (auto), postId(fk), userId(fk)

  return Likes;
};
