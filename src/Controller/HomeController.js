export class HomeController {
    constructor(logger) {
        this.logger = logger;
    }

    indexAction(req, res) {
        this.logger.debug('HomeController::indexAction');
        res.json({status: 'That rooooolls!'});
    }
}
