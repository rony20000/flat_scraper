"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Apartment extends sequelize_1.Model {
}
exports.Apartment = Apartment;
Apartment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: sequelize_1.DataTypes.TEXT,
        unique: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
    },
    images: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
    },
}, {
    sequelize: db_1.default,
    underscored: true,
    timestamps: true,
    modelName: "apartment",
});
