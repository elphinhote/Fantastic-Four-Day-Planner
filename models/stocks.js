module.exports = (sequelize, DataTypes) => {
    const Stocks = sequelize.define('Stocks', {
        // Giving the Stocks model a stock of type STRING, require a value, and 
        // validate as letters, and length is between 1 and 5 characters
        stock: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                len: [1, 5],
            }
        }
    });

    // return the stocks
    return Stocks;
};
