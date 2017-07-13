import InvalidPassword from '../Security/InvalidPassword';
import UserNotFound from '../User/UserNotFound';

class SecurityController {
  constructor(userService) {
    this.userService = userService;
  }

  loginAction(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    if (!req.body.email || !req.body.password) {
      return res
        .status(412)
        .json('Missing email or password');
    }

    this
      .userService
      .authenticate(req.body.email, req.body.password)
      .then(token => {
        return res.json(token);
      })
      .catch(err => {
        if (err instanceof InvalidPassword) {
          return res
            .status(401)
            .json('Invalid password');
        }

        if (err instanceof UserNotFound) {
          return res
            .status(401)
            .json('User not found');
        }

        console.error(err);
        return res.status(400).end();
      });
  }
}

export default SecurityController;
