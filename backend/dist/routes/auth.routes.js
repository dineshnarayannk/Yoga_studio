"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public route to exchange Google ID Token for our JWT
router.post('/google', auth_controller_1.verifyGoogleAuth);
// Protected routes (require valid JWT cookie)
router.get('/me', auth_middleware_1.requireAuth, auth_controller_1.getMe);
router.post('/complete-profile', auth_middleware_1.requireAuth, auth_controller_1.completeProfile);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
