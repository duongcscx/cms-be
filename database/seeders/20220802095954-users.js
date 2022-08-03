const { hashPassword } = require('../../src/utils/security');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 'e6089026-0359-11ed-b939-0242ac120002',
        email: 'admin@gmail.com',
        password: hashPassword('test123'),
        role: 'admin',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120003',
        email: 'thuc_le@gmail.com',
        password: hashPassword('test123'),
        role: 'creator',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120004',
        email: 'duong_nguyen_xuan@gmail.com',
        password: hashPassword('test123'),
        role: 'editor',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
