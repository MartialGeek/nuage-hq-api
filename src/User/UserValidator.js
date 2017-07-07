import Joi from 'joi';
import InvalidUserEntity from './InvalidUserEntity';

class UserValidator {
  constructor() {
    this.schema = Joi.object().keys({
      userName: Joi.string().alphanum().required(),
      password: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      firstName: Joi.string().alphanum(),
      lastName: Joi.string().alphanum()
    });
  }

  validate(user) {
    const {error} = Joi.validate(user, this.schema);

    if (error !== null) {
      throw new InvalidUserEntity(user, error);
    }

    return true;
  }
}

export default UserValidator;
