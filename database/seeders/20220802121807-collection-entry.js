module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CollectionEntries', [
      {
        id: 'e6089026-0359-11ed-b939-0242ac120032',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120012',
        isPublished: false,
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120033',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120013',
        isPublished: false,
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120034',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120014',
        isPublished: false,
      },
      {
        id: 'e6089026-0359-11ed-b939-0242ac120035',
        collection_type_id: 'e6089026-0359-11ed-b939-0242ac120012',
        isPublished: true,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CollectionEntries', null, {});
  },
};
