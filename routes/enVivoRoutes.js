const { Router } = require('express');
const {getAll, addEvent} = require("../controllers/enVivoController");

//a este se le van a configurar las rutas
const router = Router();

router.get('/', getAll);

router.post('/add', addEvent);

module.exports = router;
