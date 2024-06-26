const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const JobCandidate = sequelize.define(
  "Job Candidate",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    callTimeInterval: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedInProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

module.exports = JobCandidate;
