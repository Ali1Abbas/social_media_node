
const { meetinguser } = require("../model/meeting-user-model")

const { meeting } = require("../model/metting.model")




async function getAllmeetingUSER(meetId, callback) {
    meetinguser.find({ meetId: meetId }).then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}
async function startmeeting(params, callback) {
    const meetingSchema = new meeting(params)

    meetingSchema.save().then((response) => {
        return callback(null, response)
    }).catch((error) => {
        return callback(error)
    })
}
async function joinMeeting(params, callback) {
    const meetingUserModel = new meetinguser(params)
    meetingUserModel.save()
        .then(async (response) => {
            await meeting.findOneAndUpdate({ id: params.meetingId }, { $addToSet: { 'meetingUser': meetingUserModel } })

            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
}

async function isMeetingPresent(meetingId, callback) {

    meeting.findById(meetingId).populate("MeetingUser", "MeetingUser").then((response) => {
        if (!response) callback("invalidMeetingId")

        else callback(null, response)
    }).catch((error) => {
        callback(error, false)
    })



}
async function checkMeetingExist(meetingId, callback) {

    meeting.findById(meetingId).populate("MeetingUser", "MeetingUser").then((response) => {
        if (!response) callback("invalidMeetingId")

        else callback(null, response)
    }).catch((error) => {
        callback(error, false)
    })

}


async function getMeetingUser(params, callback) {
    const { meetingId, userId } = params
    meetinguser.find(meetingId, userId).then((response) => {

        return callback(null, response[0])
    }).catch((error) => {
        return callback(error);
    })
}

async function UpdateMeetingUSER(params, callback) {

    meetinguser.updateOne({ userId: params.userId }, { $set: params }, { new: true }).then((response) => {

        return callback(null, response)
    }).catch((error) => {
        return callback(error)
    })
}

async function getuserBysocketID(params, callback) {

    const { meetingId, socketId } = params

    meetinguser.find({ meetingId, socketId }).limit(1).then((response) => {
        return callback(null, response)
    }).catch((error) => {
        return callback(error)
    })
}

module.exports = { startmeeting, joinMeeting, getAllmeetingUSER, isMeetingPresent, checkMeetingExist, getuserBysocketID, UpdateMeetingUSER, getMeetingUser }