import sequelize from "../database/sequelize-config";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true }); // Cria ou ajusta tabelas
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to connect or sync to the database:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
