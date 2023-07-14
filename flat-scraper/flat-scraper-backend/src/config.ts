import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  dbUrl: process.env.POSTGRESQL_DB_URI || "",
};
