// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const meeting = mongoose.model('Meeting', mongoose.Schema({
//     hostId: {
//         type: String, required: true
//     }, hostName: { type: String, required: false },
//     startTime: { type: Date, required: true }, MeetingUser: [{ type: mongoose.Schema.Types.ObjectID, ref: "MeetingUser" }

//     ]

// }, {
//     toJSON: {
//         transform: function (doc, ret) {
//             ret.id = ret._id.toString(),
//                 delete ret._id
//             delete ret._id
//         }
//     },
// }, { timestamp: true },)); module.exports = { meeting }



module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("Meeting", {
        hostId: {
            type: Sequelize.STRING, required: true
        },
        hostName: {
            type: Sequelize.STRING, required: false

        },
        startTime: {
            type: Sequelize.DATE, required: true
        },
        MeetingUser: {
            type: Sequelize.STRING, ref: "MeetingUser"
        },
         timestamp: true
    });

    return Tutorial;
};