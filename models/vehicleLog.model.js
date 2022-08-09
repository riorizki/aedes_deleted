/* eslint-disable global-require */
const { Model, compose } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(visibilityPlugin);

class VehicleLog extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'vehicle_logs';
  }

  static get relationMappings() {
    const Vehicle = require('./vehicle.model');

    return {
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'vehicle_logs.vehicle_id',
          to: 'vehicles.id',
        },
      },
    };
  }
}

module.exports = VehicleLog;
