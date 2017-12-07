'use strict';
module.exports = function (sequelize, DataTypes) {
    var Conversation = sequelize.define('Conversation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        creator_id: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        avatar:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

    });
    Conversation.associate = function (models) {
        Conversation.belongsToMany(models.Particpant, {
            onDelete: "CASCADE",
            through:"Conversation",
            foreignKey: 'id'

        });

    }


    return Conversation;
};
