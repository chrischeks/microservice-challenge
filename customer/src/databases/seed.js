// const mongoose = require('mongoose')

// console.log(process.env.DB_HOST, "process.env.DB_HOST")
// const Customer = require("./src/models/customer.model")

// mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
//   .then(() => {
//     console.log('DB Connected');
//   })
//   .catch(error => {
//     console.log(`Database connection failed: ${error}`);
//   });

module.exports = {
  _id: '627cc7f4de4d2c2872595c40',
  firstName: 'John',
  lastName: 'Doe',
};

// const seedDB = async () => {
//   await Customer.deleteMany({});
//   await Customer.create(seedCustomer);
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });
