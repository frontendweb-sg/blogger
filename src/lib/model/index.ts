import sequelize from "../db";
import { User } from "./user";
import { Post } from "./post";

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { sequelize, User, Post };
