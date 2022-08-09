/* eslint-disable global-require */
const { Model, compose } = require('objection');
const softDelete = require('objection-soft-delete');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(softDelete({ columnName: 'deleted' }), visibilityPlugin);

class Vehicle extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'vehicles';
  }

  static get relationMappings() {
    const VehicleLog = require('./vehicleLog.model');
    const User = require('./user.model');
    const SharingVehicle = require('./sharingVehicle.model');

    return {
      logs: {
        relation: Model.HasManyRelation,
        modelClass: VehicleLog,
        join: {
          from: 'vehicles.id',
          to: 'vehicle_logs.vehicle_id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'vehicles.user_id',
          to: 'users.id',
        },
      },
      sharing: {
        relation: Model.HasOneRelation,
        modelClass: SharingVehicle,
        join: {
          from: 'vehicles.uid',
          to: 'sharing_vehicles.vehicle_uid',
        },
      },
    };
  }
}

module.exports = Vehicle;
