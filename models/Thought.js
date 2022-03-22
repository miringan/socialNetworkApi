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
            // get: timestamp(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

// virtual goes here.

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// // getter for timestamp
// function timestamp(date) {

// }


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;