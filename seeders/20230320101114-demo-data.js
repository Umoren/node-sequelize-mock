const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {


    try {

      await queryInterface.bulkInsert('movies', [
        {
          title: 'The Matrix',
          releaseDate: '1999-03-31',
          duration: 3,
        },
        {
          title: 'Bridesmaids',
          releaseDate: '2011-04-28',
          duration: 5,
        },
        {
          title: 'The Social Network',
          releaseDate: '2010-09-24',
          duration: 4,
        },
        {
          title: 'The New Movie',
          releaseDate: '2015-09-24',
          duration: 4,
        }
      ]);

    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('movies', null, {});
  }
};
