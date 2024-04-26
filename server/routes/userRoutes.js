
const { register } = require("module");
const { login } = require("../controllers/usersController");






router.post("/register",register);
router.post("/login",login);



module.exports = router;