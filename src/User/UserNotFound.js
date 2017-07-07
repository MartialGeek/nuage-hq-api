class UserNotFound {
  constructor(selector) {
    this.selector = selector;
  }

  toString() {
    return `No user found with the selector ${JSON.stringify(this.selector)}`;
  }
}

export default UserNotFound;
