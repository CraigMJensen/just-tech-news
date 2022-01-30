const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create user model
class User extends Model {}

// Define table columns and configuration
User.init(
  {
    // define id column
    id: {
      // use special Sequelize DataTypes object to provide what type of data it is
      type: DataTypes.INTEGER,
      // equivalent of SQL's `NOT NULL` option
      alowNull: false,
      // instruct that this is primary key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating data
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least 4 characters long
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIGUATION OPTIONS GO HERE (HTTPS://sequelize.org/v5/manual/models-definition.html#configuration)

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/UpdatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user',
  }
);

module.exports = User;
