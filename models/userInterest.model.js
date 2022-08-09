/* eslint-disable global-require */
const { Model, compose } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(visibilityPlugin);

class UserInterest extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'user_interests';
  }

  static get relationMappings() {
    const User = require('./user.model');
    const Interest = require('./interest.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_interests.user_id',
          to: 'users.id',
        },
      },
      interest: {
        relation: Model.BelongsToOneRelation,
        modelClass: Interest,
        join: {
          from: 'user_interests.interest_id',
          to: 'interests.id',
        },
      },
    };
  }
}

module.exports = UserInterest;
