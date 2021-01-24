// Module.exports using Sequlize for the Todo Table
module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define('Todos', {
        // Giving the Todos model a stock of type STRING
        todo: DataTypes.STRING,
    });
    // return the Todos
    return Todos;
};
