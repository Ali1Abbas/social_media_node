const meetingController = require("../controller/meeting.controller")
const express = require("express");

const router = express.Router();


router.post("/metting/start", meetingController.startMeeting)
router.get("/metting/join", meetingController.checkmeetingexist)
router.get("/metting/get", meetingController.getAllMeetinguser)

module.exports = router;