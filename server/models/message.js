module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Messeage', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        messeage: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        message_type:{
            type: DataTypes.STRING(40),
            allowNull: false
        }

    });

};
