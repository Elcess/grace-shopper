const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

// GET api/users/
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'email']
//     });
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

// /api/users/:userId/orders <-- order history
// /api/users/:userId/cart
