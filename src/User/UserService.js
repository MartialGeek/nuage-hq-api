import UserAlreadyExists from './UserAlreadyExists';

class UserService {
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;
  }

  /**
   * Creates a new user
   * @param  {Object} userData
   * @throws {UserAlreadyExists}
   * @throws {InvalidUserEntity}
   */
  async create(userData) {
    this.validator.validate(userData);

    return await this.repository.insert(userData);
  }
}

export default UserService;
