import UserAlreadyExists from './UserAlreadyExists';
import InvalidUserEntity from './InvalidUserEntity';
import UserNotFound from './UserNotFound';
import InvalidPassword from '../Security/InvalidPassword';

class UserService {
  constructor(repository, validator, passwordEncoder) {
    this.repository = repository;
    this.validator = validator;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Creates a new user
   * @param  {Object} userData
   * @return {Promise}
   * @throws {UserAlreadyExists}
   * @throws {InvalidUserEntity}
   * @throws {UserNotFound}
   */
  async create(userData) {
    this.validator.validate(userData);
    userData.password = await this.passwordEncoder.encode(userData.password);

    return await this.repository.insert(userData);
  }

  /**
   * Authenticates a user
   * @param  {string} email
   * @param  {string} password
   * @return {Promise}
   * @throws {InvalidPassword}
   */
  async authenticate(email, password) {
    const user = await this.repository.findByEmail(email);
    const isValid = await this.passwordEncoder.isValid(password, user.password);

    if (!isValid) {
      throw new InvalidPassword();
    }

    return user;
  }
}

export default UserService;
