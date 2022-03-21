const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // POST a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a user by its _id
    deleteUser(req, res) {
        Student.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : Thought.findOneAndUpdate(
                  { users: req.params.userId },
                  { $pull: { users: req.params.userId } },
                  { new: true }
                )
          )
          .then((thought) =>
            !thought
              ? res.status(404).json({
                  message: 'User deleted, but no thoughts found',
                })
              : res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
}