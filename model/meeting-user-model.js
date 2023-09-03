// const mongoose = require('mongoose');

// const { Schema } = mongoose;

// const meetinguser = mongoose.model('MeetingUser', mongoose.Schema({
//     socketId: {
//         type: String
//     }, meetingId: { type: mongoose.Schema.Types.ObjectID, ref: "Meeting" },
//     userId: { type: String, required: true }, joined: { type: Boolean, required: true },
//     name: { type: String, required: true }, isAlive: { type: Boolean, required: true }


// }, { timestamp: true }, {

// }))

// module.exports = { meetinguser }



module.exports = (sequelize, Sequelize) => {
    const TutorialUser = sequelize.define("MeetingUser", {
        socketId: {
            type: Sequelize.STRING
        },
        meetingId: {
            type: Sequelize.STRING, ref: "Meeting"

        },
        userId: {
            type: Sequelize.STRING, required
        },
        joined: {
            type: Sequelize.BOOLEAN, required: true
        },
        name: {
            TYPE: Sequelize.STRING, required: true
        },
        isAlive:
            { type: sequelize.BOOLEAN, required: true },

        timestamp: true

    });

    return TutorialUser;


}