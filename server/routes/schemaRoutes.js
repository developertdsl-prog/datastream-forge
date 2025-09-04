const express = require('express');
const router = express.Router();
const authApiKey = require('../middleware/authApiKey');
const { listSchemas, registerSchema } = require('../controllers/schemaController');

router.use(authApiKey);
router.get('/', listSchemas);
router.post('/', registerSchema);

module.exports = router;
