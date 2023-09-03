
const meetingPayloadEnum = {
    JOIN_MEETING: 'join-meeting',
    JOINED_MEETING: 'joined-meeting',
    CONNECTION_REQUEST: 'connection-request',
    INCOMING_CONNETCTION_REQUEST: 'incoming-connnection-request',
    OFFER_SDP: 'offer_sdp',
    ANSWER_SDP: 'answer_sdp',
    LEAVE_MEETING: 'leave-meeting',
    END_MEETING: 'leave-meeting',
    USER_JOINED: 'user-joined',
    USER_LEFT: 'user-left',
    MEETING_END: 'meeting-end',
    ICECANDIDATE: 'icecandidate',
    VIDEO_TOGGLE: 'video_toggle',
    AUDIO_TOGGLE: 'video_toggle',
    NOT_FOUND: 'not-found',
    UNKNOWN: 'unknown'



}

module.exports = { meetingPayloadEnum };