module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    //Auto-increment ID is created automatically

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
