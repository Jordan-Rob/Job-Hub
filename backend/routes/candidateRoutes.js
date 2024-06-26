const express = require("express");
const {
  upsertCandidate,
  getCandidateByEmail,
} = require("../controllers/candidateController");
const router = express.Router();

router.post("/api/candidates", upsertCandidate);
router.get("/api/candidates/:email", getCandidateByEmail);

module.exports = router;
