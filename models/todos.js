module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define('Todos', {
        // Giving the Todos model a stock of type STRING, require a value, and 
        // validate as letters, and length is between 1 and 5 characters
        todo: DataTypes.STRING,
    });
    // return the Todos
    return Todos;
};
