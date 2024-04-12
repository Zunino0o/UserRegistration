module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Lucas',
          last_name: 'Zunino',
          email: 'zu@hotmail.com',
          password: '123456',
          phone: '48996198060',
          address: 'Rua Brasilpinho, 510, apto 102',
          image_url: 'zu.png',
        },
        {
          first_name: 'Juliana',
          last_name: 'Schneider',
          email: 'ju@hotmail.com',
          password: '123456',
          phone: '48996214896',
          address: 'Rua Brasilpinho, 510, apto 102',
          image_url: 'ju.png',
        },
        {
          first_name: 'Bellatrix',
          last_name: 'Schneider Zunino',
          email: 'trix@hotmail.com',
          password: '123456',
          phone: '48942069123',
          address: 'Rua Brasilpinho, 510, apto 102',
          image_url: 'trix.png',
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
