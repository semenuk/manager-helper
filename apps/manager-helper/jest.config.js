module.exports = {
  name: 'manager-helper',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/manager-helper',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
