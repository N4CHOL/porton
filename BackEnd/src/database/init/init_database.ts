import { Sequelize } from "sequelize-typescript";

export const testDbConnection = async (sequelize: Sequelize) => {
    try {
      await sequelize.authenticate();

    } catch (error) {

      process.exit(1);
    }
  }