module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CollectionTypes', [
      {
        id: 'e6089026-0359-11ed-b939-0242ac120012',
        user_id: 'e6089026-0359-11ed-b939-0242ac120002',
        name: 'Company profile 2',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120013',
        user_id: 'e6089026-0359-11ed-b939-0242ac120003',
        name: 'Company profile 3',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120014',
        user_id: 'e6089026-0359-11ed-b939-0242ac120004',
        name: 'Company profile 4',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120015',
        user_id: 'e6089026-0359-11ed-b939-0242ac120002',
        name: 'Company profile 5',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CollectionTypes', null, {});
  },
};
