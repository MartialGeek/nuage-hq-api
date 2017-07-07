import vorpal from 'vorpal';
import config from '../app/parameters';
import registerServices from '../app/services';

const app = vorpal();

// Main environment
app.env = process.env.APP_ENV || 'prod';
app.config = config;

registerServices(app);

app.cli.userCreate().register(app);

app
  .delimiter('nuage$')
  .show();
