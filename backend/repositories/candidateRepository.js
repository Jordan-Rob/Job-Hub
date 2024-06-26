const JobCandidate = require("../models/Candidate");

class CandidateRepository {
  async upsertCandidate(data) {
    // Check candidate existance
    let existingCandidate = await JobCandidate.findOne({
      where: { email: data.email },
    });

    if (existingCandidate) {
      // If candidate exists, update the record
      await JobCandidate.update(data, { where: { email: data.email } });
      return {
        candidate: await JobCandidate.findOne({ where: { email: data.email } }),
        created: false,
      };
    } else {
      // If candidate does not exist, create a new record
      const candidate = await JobCandidate.create(data);
      return { candidate, created: true };
    }
  }

  async getCandidateByEmail(email) {
    return await JobCandidate.findOne({ where: { email: email } });
  }
}

module.exports = new CandidateRepository();
