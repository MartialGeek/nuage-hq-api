import jwt from 'jsonwebtoken';

class Token {
  constructor(config) {
    this.config = config;
  }

  /**
   * Generates a token
   * @param  {Object} payload
   * @return {Object}
   */
  generate(payload) {
    return jwt.sign(payload, this.config.secret, {
      expiresIn: this.config.expiration
    });
  }
}

export default Token;
