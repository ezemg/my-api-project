module.exports = (sequelize, dataTypes) => {

    let alias = 'Products';

    let cols = {

        id_products: {
            type: dataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING
        },

        // Revisar longitud de descripcion en DB y luego pasar a modelos. 255 es muy poco

        description: {
            type: dataTypes.STRING('MAX')
        },

        image: {
            type: dataTypes.STRING
        },

        price: {
            type: dataTypes.FLOAT
        },

        category_id: {
            allowNull: false,
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: 'products',
        timestamps: false
    }


    const Product = sequelize.define(alias, cols, config)

    Product.associate = (models) => {

        Product.belongsTo(models.Categories, {
            as: "category",
            foreignKey: 'category_id'
        })

        Product.belongsToMany(models.Shoppings, {
            as: 'shoppings',
            through: 'products_shopping',
            foreignKey: 'id_products',
            otherKey: 'id_shopping',
            timestamps: false
        })
    }


    return Product

}