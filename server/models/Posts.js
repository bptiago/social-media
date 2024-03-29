module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    //Auto-increment ID is created automatically

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

  return Posts;
};
