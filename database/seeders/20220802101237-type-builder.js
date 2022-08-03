module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TypeBuilders', [
      {
        id: 'e6089026-0359-11ed-b939-0242ac120022',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120012',
        data_name: 'name 1',
        data_type: 'Text',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120023',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120013',
        data_name: 'name 2',
        data_type: 'Text',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120024',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120014',
        data_name: 'name 3',
        data_type: 'Text',
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120025',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120012',
        data_name: 'addr  4',
        data_type: 'Text',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TypeBuilders', null, {});
  },
};
