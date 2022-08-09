/* eslint-disable global-require */
const { Model, compose } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(visibilityPlugin);

class Interest extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'interests';
  }

  static get relationMappings() {
    const UserInterest = require('./userInterest.model');

    return {
      userInterest: {
        relation: Model.HasManyRelation,
        modelClass: UserInterest,
        join: {
          from: 'interests.id',
          to: 'user_interests.interest_id',
        },
      },
    };
  }
}

module.exports = Interest;
