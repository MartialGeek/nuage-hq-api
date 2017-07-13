import UserAlreadyExists from './UserAlreadyExists';
import UserNotFound from './UserNotFound';

export const DBNAME = 'nuage';

class UserRepository {
  /**
   * @param  {couch} db The CouchDB instance
   * @param  {AbstractUuidGenerator} uuidGenerator
   * @param  {UserEntityFactory} entityFactory
   */
  constructor(db, uuidGenerator, entityFactory) {
    this.db = db;
    this.uuidGenerator = uuidGenerator;
    this.entityFactory = entityFactory;
  }

  /**
   * Finds a user by its email
   * @param  {string} email The email of the user
   * @return {Promise} A promise with the found user
   * @throws {UserNotFound}
   */
  async findByEmail(email) {
    const selector = {
      type: 'user',
      email: email
    };

    let stmt = await this
      .db
      .findDocuments(DBNAME, {
        selector: selector
      });

      if (stmt.data.docs.length === 0) {
        throw new UserNotFound(selector);
      }

      return stmt.data.docs[0];
  }

  /**
   * Inserts a user in the database
   * @param  {User}  user
   * @return {Promise}
   * @throws {UserAlreadyExists}
   */
  async insert(user) {
    try {
      let foundUser = await this.findByEmail(user.email);
      throw new UserAlreadyExists(user);
    } catch (err) {
      if (err instanceof UserNotFound) {
        return await this
          .db
          .createDocument(
            DBNAME,
            this.entityFactory.create(user),
            this.uuidGenerator.generate()
          );
      } else {
        throw err;
      }
    }
  }
}

export default UserRepository;
