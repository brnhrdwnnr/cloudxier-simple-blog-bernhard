'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Blog, { foreignKey: "BlogId" });
    }
  };
  Comment.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Comment is required" },
        notNull: { msg: "Comment is required" },
      }
    },
    BlogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Blog ID is required" },
        notNull: { msg: "Blog ID is required" },
      },
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};