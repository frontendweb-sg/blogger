import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
import { Password } from "../password";

export class User extends Model {
  public declare user_id: number;
  public declare first_name: string;
  public declare last_name: string;
  public declare email: string;
  public declare password: string;
  public declare avatar: object | null;
  public declare mobile: string;
  public declare active: boolean;
  public declare createdAt: Date;
  public declare updatedAt: Date;
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING(50), allowNull: false },
    last_name: { type: DataTypes.STRING(50), allowNull: false },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter a valid email address" },
        notEmpty: { msg: "Email cannot be empty" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 20],
        notEmpty: true,
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: "Password must be at least 8 characters long and include a letter, number, and special character.",
        },
      },
    },
    avatar: { type: DataTypes.JSONB, allowNull: true, defaultValue: null },
    mobile: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: {
        is: {
          args: /^(\+91|0)?[7-9]\d{9}$/,
          msg: "Mobile number is invalid, must be a 10-digit number starting with 7, 8, or 9",
        },
      },
    },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    hooks: {
      async beforeCreate(user: User, op) {
        console.log(user, op, "before create");
        const password = await Password.hash(user.password);
        user.password = password;
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await Password.hash(user.password);
        }
      },
    },
    // paranoid: true,
  }
);
