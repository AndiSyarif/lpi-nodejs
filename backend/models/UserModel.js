import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import bcrypt from "bcrypt";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    islogin: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.beforeCreate(async (user, options) => {
  if (user.password) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

export default User;

(async () => {
  await db.sync();
})();
