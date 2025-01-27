import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}
export class Post extends Model {
  public declare post_id: number;
  public declare user_id: number;
  public declare title: string;
  public declare slug: string;
  public declare description: string;
  public declare media: object | null;
  public declare status: PostStatus;
  public declare tags: string[];
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

Post.init(
  {
    post_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value: string) {
        this.setDataValue("slug", this.title.toLowerCase().replace(/\s/g, "-"));
      },
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    media: { type: DataTypes.JSONB, allowNull: true, defaultValue: null },
    status: {
      type: DataTypes.ENUM,
      values: ["draft", "published", "archived"],
      defaultValue: "draft",
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "posts",
    modelName: "Post",
    timestamps: true,
  }
);
