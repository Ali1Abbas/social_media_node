const meeetingServices = require("../services/meeting.service");


exports.startMeeting = (req, res, next) => {

    const { hostId, hostName } = req.body;


    var model = {

        hostId: hostId,
        hostName: hostName,
        startTime: Date.now()


    };


    meeetingServices.startmeeting(model, (error, result) => {
        if (error) { return next(error); }
        return res.status(200).send({ message: "success", data: result.id });

    })
}
exports.checkmeetingexist = (req, res, next) => {

    const { meetingId } = req.query;

    meeetingServices.checkMeetingExist(meetingId, (error, result) => {
        if (error) { return next(error); }
        return res.status(200).send({ message: "success", data: result });

    })
}
exports.getAllMeetinguser = (req, res, next) => {

    const { meetingId } = req.query;

    meeetingServices.getAllmeetingUSER(meetingId, (error, result) => {
        if (error) { return next(error); }
        return res.status(200).send({ message: "success", data: result });

    })
}


