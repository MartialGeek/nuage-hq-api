class UserAlreadyExists {
  constructor(user) {
    this.user = user;
  }

  toString() {
    return `The email ${this.user.email} is already used by a registered user`;
  }
}

export default UserAlreadyExists;
