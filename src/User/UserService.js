import UserAlreadyExists from './UserAlreadyExists';

class UserService {
  constructor(repository, validator, passwordEncoder) {
    this.repository = repository;
    this.validator = validator;
    this.passwordEncoder = passwordEncoder;
  }

  /**
   * Creates a new user
   * @param  {Object} userData
   * @throws {UserAlreadyExists}
   * @throws {InvalidUserEntity}
   */
  async create(userData) {
    this.validator.validate(userData);
    userData.password = await this.passwordEncoder.encode(userData.password);

    return await this.repository.insert(userData);
  }
}

export default UserService;
