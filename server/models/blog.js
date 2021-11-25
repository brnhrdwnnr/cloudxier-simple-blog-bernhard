'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.hasMany(models.Comment, { foreignKey: "BlogId" });
    }
  };
  Blog.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
        notNull: { msg: "Title is required" },
      }
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Author name is required" },
        notNull: { msg: "Author name is required" },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Content is required" },
        notNull: { msg: "Content is required" },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Image URL is required" },
        notNull: { msg: "Image URL is required" },
      }
    },
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};