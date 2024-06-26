const candidateRepository = require("../repositories/candidateRepository");

const upsertCandidate = async (req, res) => {
  try {
    const { firstName, lastName, email, comment } = req.body;

    //Ensure required fields are provided
    if (!firstName || !lastName || !email || !comment) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const { candidate, created } = await candidateRepository.upsertCandidate(
      req.body
    );
    res.status(created ? 201 : 200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCandidateByEmail = async (req, res) => {
  try {
    const candidate = await candidateRepository.getCandidateByEmail(
      req.params.email
    );
    if (!candidate) {
      res.status(404).json({ error: "Candidate not found" });
    } else {
      res.status(200).json(candidate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { upsertCandidate, getCandidateByEmail };
