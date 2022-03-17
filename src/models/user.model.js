module.exports = (sequelize, Sequelize) => {
  const bcrypt = require('bcrypt');
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      },
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      default: 'user'
    }
  });
  return User;
};