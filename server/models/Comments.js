module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    //Auto-increment ID is created automatically
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // FK postId

  return Comments;
};
