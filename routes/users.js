
const router = require("express").Router();
const {
  gettest,
    login,
    loginCallback,
    admin,
    logOut
} = require("../controllers/github");




router.get("/", gettest)

router.get("/login/github",login)


router.get("/login/github/callback", loginCallback)

router.get("/admin",admin)


router.get("/logout",logOut)


module.exports = router;