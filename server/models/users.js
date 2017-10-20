module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    location: DataTypes.STRING,
    occupation: DataTypes.STRING,
    gender: DataTypes.STRING,
    token: DataTypes.STRING
  });
  Users.associate = function(models) {
    Users.hasMany(models.entries, {
      foreignKey: {
        name: 'user_id',
        allowNull: true
      }
    });
    Users.hasMany(models.keywords, {
      foreignKey: {
        name: 'user_id',
        allowNull: true
      }
    });
  };
  return Users;
};