const candidateRepository = require("../repositories/candidateRepository");

export const upsertCandidate = async (req, res) => {
  try {
    const { candidate, created } = await candidateRepository.upsertCandidate(
      req.body
    );
    res.status(created ? 201 : 200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCandidateByEmail = async (req, res) => {
  try {
    const candidate = await candidateRepository.getCandidateByEmail(
      req.params.email
    );
    if (!candidate) {
      res.status(404).json({ error: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
