
const meetingServices = require('../services/meeting.service');
const { meetingPayloadEnum } = require('../utils/meeting.utill.eum');

async function joinMeeting(MeetingId, socket, meeetingserver, payload) {
    const { userId, name } = payload.data;
    meetingServices.isMeetingPresent(MeetingId, async (error, result) => {

        if (error && !result) {
            sendMessage(socket, { type: meetingPayloadEnum.NOT_FOUND })
        }

        if (result) {
            addUser(socket, { MeetingId, userId, name }).then((result) => {
                if (result) {
                    sendMessage(socket, { type: meetingPayloadEnum.joinMeeting, data: userId })
                }
            });

            boardCastUsers(MeetingId, socket, { type: meetingPayloadEnum.USER_JOINED, data: { userId, name, ...payload.data } });

        }
        (error) => {
            console.log(error)
        }
    });

}

function ForwardConnectionREQUEST(meetingId, socket, meeetingserver, payload) {
    const { userId, otheruserId, name } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otheruserId,

    };

    meetingServices.getMeetingUser(model, (error, result) => {
        if (result) {
            var sendpayload = JSON.stringify({ type: meetingPayloadEnum.CONNECTION_REQUEST, data: { userId, name, ...payload.data } });

        } meeetingserver.to(result.socketId).emit("message", sendpayload)
    });

}
function ForwardICEcandidate(meetingId, socket, meeetingserver, payload) {
    const { userId, otheruserId, candidate } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otheruserId,

    };

    meetingServices.getMeetingUser(model, (error, result) => {
        if (result) {
            var sendpayload = JSON.stringify({ type: meetingPayloadEnum.ICECANDIDATE, data: { userId, candidate } });

        } meeetingserver.to(result.socketId).emit("message", sendpayload)
    });

}
function ForwardOfferSDP(meetingId, socket, meeetingserver, payload) {
    const { userId, otheruserId, OfferSDP } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otheruserId,

    };

    meetingServices.getMeetingUser(model, (error, result) => {
        if (result) {
            var sendpayload = JSON.stringify({ type: meetingPayloadEnum.OFFER_SDP, data: { userId, OfferSDP } });

        } meeetingserver.to(result.socketId).emit("message", sendpayload)
    });

}
function ForwardAnswerSDP(meetingId, socket, meeetingserver, payload) {
    const { userId, otheruserId, AnswerSDP } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otheruserId,

    };

    meetingServices.getMeetingUser(model, (error, result) => {
        if (result) {
            var sendpayload = JSON.stringify({ type: meetingPayloadEnum.ANSWER_SDP, data: { userId, AnswerSDP } });

        } meeetingserver.to(result.socketId).emit("message", sendpayload)
    });

}
function LetfUser(meetingId, socket, meeetingserver, payload) {
    const { userId } = payload.data;
    boardCastUsers(meetingId, socket, meeetingserver, {
        type: meetingPayloadEnum.USER_LEFT, data: {
            userId: userId
        }
    });



}
function endMeeting(meetingId, socket, meeetingserver, payload) {
    const { userId } = payload.data;
    boardCastUsers(meetingId, socket, meeetingserver, {
        type: meetingPayloadEnum.END_MEETING, data: {
            userId: userId
        }
    });


    meetingServices.getAllmeetingUSER(meetingId, (error, result) => {
        for (let i = 0; i < result.length; i++) {
            const meetinguser = result[i];
            meeetingserver.sockets.connected[meetinguser.socketId].disconnect();

        }
    })



}
function forwordEvent(meetingId, socket, meeetingserver, payload) {
    const { userId } = payload.data;
    boardCastUsers(meetingId, socket, meeetingserver, {
        type: payload.type, data: {
            userId: userId, ...payload.data
        }
    });


    meetingServices.getAllmeetingUSER(meetingId, (error, result) => {
        for (let i = 0; i < result.length; i++) {
            const meetinguser = result[i];
            meeetingserver.sockets.connected[meetinguser.socketId].disconnect();

        }
    })



}
function ForwardAnswerSDP(meetingId, socket, meeetingserver, payload) {
    const { userId, otheruserId, AnswerSDP } = payload.data;
    var model = {
        meetingId: meetingId,
        userId: otheruserId,

    };

    meetingServices.getMeetingUser(model, (error, result) => {
        if (result) {
            var sendpayload = JSON.stringify({ type: meetingPayloadEnum.ANSWER_SDP, data: { userId, AnswerSDP } });

        } meeetingserver.to(result.socketId).emit("message", sendpayload)
    });

}
async function addUser(MeetingId, userId, name) {

    let promise = new Promise(function (resolve, reject) {
        meetingServices.getMeetingUser({ MeetingId: userId }, (error, result) => {
            if (!result) {
                var modle = {
                    socketId: socket.id,
                    meetingId: MeetingId,
                    userId: userId,
                    joined: true,
                    name: name,

                };

                meetingServices.joinMeeting(modle, (error, result) => {
                    if (result) {
                        resolve(true);
                    }
                    if (error) {
                        reject(error);
                    }

                });

            } else {
                meetingServices.UpdateMeetingUSER({ userId: userId, socketId: socket.id }, (error, result) => {
                    if (result) {
                        resolve(true)
                    }
                    if (error) {
                        reject(error)
                    }
                })
            }
        })
    })



    return promise;
}

function sendMessage(socket, payload) {

    socket.send(JSON.stringify(payload));
}

function boardCastUsers(meetingId, socket, meeetingserver, payload) {

    socket.broadcast.emit('message', JSON.stringify(payload));
}


module.exports = { joinMeeting, ForwardAnswerSDP, forwordEvent, ForwardConnectionREQUEST, ForwardICEcandidate, ForwardOfferSDP, endMeeting, LetfUser }