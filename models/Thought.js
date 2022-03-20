const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: {String, minlength: 1, maxlength: 280},
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

// virtual goes here.

// getter for timestamp

const Thought = model('thought', thoughtSchema);

module.exports = Thought;