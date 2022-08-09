/* eslint-disable global-require */
const { Model, compose } = require('objection');
const visibilityPlugin = require('objection-visibility').default;

const mixins = compose(visibilityPlugin);

class SmsToken extends mixins(Model) {
  $beforeInsert() {
    this.createdAt = new Date(Date.now());
  }

  $beforeUpdate() {
    this.updatedAt = new Date(Date.now());
  }

  static get tableName() {
    return 'sms_tokens';
  }

  static get relationMappings() {
    const User = require('./user.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'sms_tokens.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = SmsToken;
