import UserAlreadyExists from '../User/UserAlreadyExists';
import InvalidUserEntity from '../User/InvalidUserEntity';

class UserCreate {
  /**
   * @param  {function} command
   * @param  {validator} validator
   * @param  {UserService} userService
   */
  constructor(validator, userService) {
    this.validator = validator;
    this.userService = userService;
  }

  register(app) {
    const questions = [
      {
        type: 'input',
        name: 'userName',
        message: 'What is the user name? ',
        validate: (value) => {
          const pass = value.match(/^[^\s]{2,}$/);

          if (pass) {
            return true;
          }

          return 'Please enter a name with no whitespace';
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is his email? ',
        validate: (value) => {
          if (this.validator.isEmail(value)) {
            return true;
          }

          return 'Please enter a valid email address';
        }
      },
      {
        type: 'password',
        name: 'password',
        message: 'Type a password for this user ',
        validate: (value) => {
          const pass = value.match(/.{8,}/);

          if (pass) {
            return true;
          }

          return 'Your password must have at least 8 characters';
        }
      },
      {
        type: 'confirm',
        name: 'continue',
        default: false,
        message: `Create the user? `
      }
    ];

    const userService = this.userService;

    app
      .command('user:create', 'Create a new user')
      .action(function(args, callback) {
        this.prompt(questions, (result) => {
          if (result.continue) {
            delete result.continue;

            userService
              .create(result)
              .then(data => {
                this.log('The user has been created');
              })
              .catch(err => {
                this.log('The user could not be created');

                if (err instanceof UserAlreadyExists) {
                  this.log(`The email ${result.email} is already used`);
                } else if (err instanceof InvalidUserEntity) {
                  this.log(`${err}`);
                } else {
                  this.log('An error occured');
                  this.log(err);
                }
              });
          } else {
            callback();
          }
        });
      });
  }
}

export default UserCreate;
