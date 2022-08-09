/* eslint-disable global-require */
const { Model, compose } = require('objection');
const softDelete = require('objection-soft-delete');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(softDelete({ columnName: 'deleted' }), visibilityPlugin);

class User extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const SmsToken = require('./smsToken.model');
    const Vehicle = require('./vehicle.model');
    const UserInterest = require('./userInterest.model');
    const SharingVehicle = require('./sharingVehicle.model');

    return {
      token: {
        relation: Model.HasOneRelation,
        modelClass: SmsToken,
        join: {
          from: 'users.id',
          to: 'sms_tokens.user_id',
        },
      },
      vehicles: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'users.id',
          to: 'vehicles.user_id',
        },
      },
      interests: {
        relation: Model.HasManyRelation,
        modelClass: UserInterest,
        join: {
          from: 'users.id',
          to: 'user_interests.user_id',
        },
      },
      sharingOwner: {
        relation: Model.HasManyRelation,
        modelClass: SharingVehicle,
        join: {
          from: 'users.id',
          to: 'sharing_vehicles.owner_id',
        },
      },
      sharingReceiver: {
        relation: Model.HasManyRelation,
        modelClass: SharingVehicle,
        join: {
          from: 'users.id',
          to: 'sharing_vehicles.receiver_id',
        },
      },
    };
  }
}

module.exports = User;
