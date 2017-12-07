module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        fullname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ""
        },
        avatar:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    });

};
