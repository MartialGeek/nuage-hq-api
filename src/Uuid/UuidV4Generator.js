import AbstractUuidGenerator from './AbstractUuidGenerator';

class UuidV4Generator extends AbstractUuidGenerator {
  constructor(uuidv4) {
    super();
    this.uuidv4 = uuidv4;
  }

  generate() {
    return this.uuidv4();
  }
}

export default UuidV4Generator;
