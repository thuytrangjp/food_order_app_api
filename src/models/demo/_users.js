import {Model, DataTypes} from "sequelize";
import sequelize from "./connection.js";
class User extends Model {}

//First params: Column Name
//Second params: Connect to the table
User.init({
    userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullName: {
        field: "full_name",
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "User", //Auto mapping to 'users'
    // tableName: "user" //If table name is not 'users' then define this
    timestamps: false //Not required created_by, updated_at
});

export default User;