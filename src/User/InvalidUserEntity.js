class InvalidUserEntity {
  constructor(data, validationException = null) {
    this.data = data;
    this.validationException = validationException;
  }

  toString() {
    let msg = `Invalid user data. Given: ${JSON.stringify(this.data)}`;

    if (this.validationException !== null) {
      msg += `. Error message: ${this.validationException}`
    }

    return msg;
  }
}

export default InvalidUserEntity;
