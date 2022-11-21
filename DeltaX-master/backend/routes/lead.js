const express = require("express");
const { requireSign } = require("../controller/auth");
const { createStatus, readStatus, getStatus, createLead, lead, leads, updateLead } = require("../controller/lead");
const router = express.Router();

router.post("/post-status", requireSign, createStatus);
router.get("/get-all-status", requireSign, readStatus);
router.get("/get-status/:id", requireSign, getStatus);

router.post("/post-lead", requireSign, createLead);
router.get("/lead/:id", requireSign, lead);
router.get("/leads", requireSign, leads);
router.put("/update-lead/:id", requireSign, updateLead)

module.exports = router;