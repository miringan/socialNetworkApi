const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes, friendRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;