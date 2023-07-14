import { Sequelize } from "sequelize";
import { config } from "./config";

const sequelize = new Sequelize(config.dbUrl || "", {
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.info("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database");
    console.error((error as any).message);
    process.exit(1);
  }
};

export default sequelize;
