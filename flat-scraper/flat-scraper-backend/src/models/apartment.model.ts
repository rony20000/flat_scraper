import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Apartment extends Model {}

Apartment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "apartment",
  }
);

// Apartment.sync({ force: true });

export { Apartment };
