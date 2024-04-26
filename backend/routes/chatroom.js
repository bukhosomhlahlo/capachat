const router = require ("express").Router();
const { catchErrors } = require ("../handlers/errorHandler");
const chatroomController = require('../controllers/chatroomController');



const auth = require("../middleware/auth");

router.post("/addRoom", auth ,catchErrors(chatroomController.createChatroom));
// router.get("/rooms", catchErrors(chatroomController.getAllChatrooms));

module.exports = router;