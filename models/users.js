module.exports = function(sequelize, DataTypes) {
  let Users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    location: DataTypes.STRING,
    occupation: DataTypes.STRING,
    gender: DataTypes.STRING
  });
  Users.associate = function(models) {
    Users.hasMany(models.recordings, {
      foreignKey: {
        name: 'recording_id',
        allowNull: true // need to change back to false
      }
    });
  };
  return Users;
};