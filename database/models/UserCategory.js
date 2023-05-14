module.exports = (sequelize, dataTypes) => {

    let alias = 'UserCategories';

    let cols = {

        id_user_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,

        },

        name: {
            type: dataTypes.STRING
        },

        // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco
    }

    let config = {
        tableName: 'user_category',
        timestamps: false
    }


    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = (models) => {
        UserCategory.hasMany(models.Users, {
            as: 'user',
            foreignKey: 'id_user_category'
        })
    }

    return UserCategory

}