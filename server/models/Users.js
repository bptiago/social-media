module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    //Auto-increment ID is created automatically

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bod: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
