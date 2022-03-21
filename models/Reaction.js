const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: mongoose.ObjectId,
        reactionBody: {
            type: {String, maxlength: 280},
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    }
)

module.exports = reactionSchema;