import { Sequelize } from "sequelize";

const db = new Sequelize('lpi-nodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;