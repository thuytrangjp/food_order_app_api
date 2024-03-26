import {Sequelize} from "sequelize";
import config from "../config/config.js";

const db = config.database

const sequelize = new Sequelize(
    db.dbname,
    db.username,
    db.password,
    {
        host: db.host,
        port: db.port,
        dialect: db.dialect
    }
)

export default sequelize;

//Use for test connection
//Run this file with node command to check!
// try {
//     await sequelize.authenticate();
//     console.log("Connected!")
// } catch (e) {
//     console.error("Failed to connect")
// }