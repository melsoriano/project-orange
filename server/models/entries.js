module.exports = function(sequelize, DataTypes) {
  let Entries = sequelize.define('entries', {
    text: DataTypes.TEXT,
    sentimentScore: DataTypes.FLOAT(1),
    sentimentLabel: DataTypes.TEXT,
    sadnessScore: DataTypes.FLOAT(1),
    fearScore: DataTypes.FLOAT(1),
    angerScore: DataTypes.FLOAT(1),
    joyScore: DataTypes.FLOAT(1),
    disgustScore: DataTypes.FLOAT(1),
    type: DataTypes.TEXT,
    source_id: DataTypes.TEXT
  });
  Entries.associate = function(models) {
    Entries.belongsTo(models.users, {
      foreignKey: {
        name: 'user_id'
      }
    });
    Entries.hasMany(models.keywords, {
      foreignKey: {
        name: 'entry_id',
        allowNull: true
      }
    });
  };
  return Entries;
};