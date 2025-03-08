"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/user', userController_1.createUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map