import InvalidUserEntity from './InvalidUserEntity';

class UserEntityFactory {
  constructor(validator) {
    this.validator = validator;
  }

  create(userData) {
    if (!this.validator.validate(userData)) {
      throw new InvalidUserEntity(userData);
    }

    return {
      type: 'user',
      ...userData
    };
  }
}

export default UserEntityFactory;
