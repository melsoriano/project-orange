module.exports = function(sequelize, DataTypes) {
  let Recordings = sequelize.define('recordings', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Recordings.associate = function(models) {
    Recordings.belongsTo(models.users, {
      foreignKey: {
        name: 'user_id',
        allowNull: true // need to change back to false
      }
    });
  };
  return Recordings;
};