module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    location: DataTypes.STRING,
    occupation: DataTypes.STRING,
    gender: DataTypes.STRING,
    twitter_id: DataTypes.STRING,
    twitterToken: DataTypes.STRING,
    twitterTokenSecret: DataTypes.STRING
  });
  Users.associate = function(models) {
    Users.hasMany(models.entries, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
    Users.hasMany(models.keywords, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
  };
  return Users;
};
