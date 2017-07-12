import bcrypt from 'bcrypt';

class PasswordEncoder {
  async encode(password) {
    return await bcrypt.hash(password, 10);
  }

  async isValid(plainText, hash) {
    return await bcrypt.compare(plainText, hash);
  }
}

export default PasswordEncoder;
