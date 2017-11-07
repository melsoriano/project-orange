module.exports = function(sequelize, DataTypes) {
  let Keywords = sequelize.define("keywords", {
    keyword: DataTypes.TEXT,
    type: DataTypes.TEXT,
    sentimentScore: DataTypes.FLOAT(1),
    sentimentLabel: DataTypes.STRING,
    relevanceScore: DataTypes.FLOAT(1),
    sadnessScore: DataTypes.FLOAT(1),
    fearScore: DataTypes.FLOAT(1),
    angerScore: DataTypes.FLOAT(1),
    joyScore: DataTypes.FLOAT(1),
    disgustScore: DataTypes.FLOAT(1)
  });
  Keywords.associate = function(models) {
    Keywords.belongsTo(models.entries, {
      foreignKey: {
        name: "entry_id",
        allowNull: false
      }
    });
    Keywords.belongsTo(models.users, {
      foreignKey: {
        name: "user_id",
        allowNull: false
      }
    });
  };
  return Keywords;
};
