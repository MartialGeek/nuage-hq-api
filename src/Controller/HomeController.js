export class HomeController {
    constructor(logger, db) {
        this.logger = logger;
        this.db = db;
    }

    indexAction(req, res) {
        this.logger.debug('HomeController::indexAction');
        this.db.getInfo().then((data) => { res.json(data) });
    }
}
