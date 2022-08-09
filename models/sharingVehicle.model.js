/* eslint-disable global-require */
const { Model, compose } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(visibilityPlugin);

class SharingVehicle extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'sharing_vehicles';
  }

  static get relationMappings() {
    const Vehicle = require('./vehicle.model');
    const User = require('./user.model');

    return {
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'sharing_vehicles.vehicle_uid',
          to: 'vehicles.uid',
        },
      },
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'sharing_vehicles.owner_id',
          to: 'users.id',
        },
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,

        join: {
          from: 'sharing_vehicles.receiver_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = SharingVehicle;
