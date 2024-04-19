const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authenticate = require('../middlewares/authenticate.js');
/*
const adminMiddleware = require('../middlewares/adminMiddleware');
const customerMiddleware = require('../middlewares/customerMiddleware');
const vendorMiddleware = require('../middlewares/vendorMiddleware');*/

const authRouter = require("./auth");
const adminRouter = require("./admin")
const userRouter = require("./user")
router.use("/auth", authRouter);


//put this middleware after logging in to apply it to neeche wali routes
router.use(authenticate);

/*router.use(adminMiddleware);
router.use(customerMiddleware);
router.use(vendorMiddleware);*/
router.use("/admin", adminRouter);
router.use("/user", userRouter);

module.exports = router;