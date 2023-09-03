const { meetingPayloadEnum } = require("./utils/meeting.utill.eum")
const meetingHelper = require("./helper/meeting.helpr")


function parseMessage(message) {
    try {
        const payload = JSON.parse(message)
        return payload;

    } catch (error) {
        return { type: meetingPayloadEnum.UNKNOWN }
    }
}

function listenMesssage(MeetingId, socket, meeetingserver) {
    socket.on('message', (message) => HandleMesssage(MeetingId, socket, message, meeetingserver));

}
function HandleMesssage(MeetingId, socket, message, meeetingserver) {
    var payload = "";

    if (typeof message === 'string') {
        payload = parse(message)
    }

    else {
        payload = message;
    }


    switch (payload.type) {

        case meetingPayloadEnum.JOINED_MEETING:
            meetingHelper.joinMeeting(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.CONNECTION_REQUEST:
            meetingHelper.CONNECTION_REQUEST(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.OFFER_SDP:
            meetingHelper.ForwardOfferSDP(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.ICECANDIDATE:
            meetingHelper.ForwardICEcandidate(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.ANSWER_SDP:
            meetingHelper.ForwardAnswerSDP(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.LEAVE_MEETING:
            meetingHelper.LetfUser(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.END_MEETING:
            meetingHelper.endMeeting(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.AUDIO_TOGGLE:
        case meetingPayloadEnum.VIDEO_TOGGLE:
            meetingHelper.forwordEvent(MeetingId, socket, meeetingserver, payload)
            break;
        case meetingPayloadEnum.UNKNOWN:

            break;
    }
}

function initMeetingServer(server) {
    const meeetingserver = require('socket.io')(server);
    meeetingserver.on('connection', socket => {
        const meetingId = socket.handshake.query.id;
        listenMesssage(meetingId, socket, meeetingserver)

    })
}

module.exports = { initMeetingServer }