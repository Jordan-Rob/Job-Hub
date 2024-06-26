const sequelize = require("../config/database");
const candidateRepository = require("../repositories/candidateRepository");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Recreate the database schema
});

test("should upsert candidate correctly", async () => {
  const candidateData = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
    callTimeInterval: "9am-5pm",
    linkedInProfile: "https://linkedin.com/in/johndoe",
    githubProfile: "https://github.com/johndoe",
    comment: "Great candidate",
  };

  // First upsert should create the candidate
  const { candidate, created } = await candidateRepository.upsertCandidate(
    candidateData
  );
  expect(created).toBe(true);
  expect(candidate.email).toBe("john.doe@example.com");

  // Update the candidate
  candidateData.firstName = "Jane";
  const { candidate: updatedCandidate, created: isCreated } =
    await candidateRepository.upsertCandidate(candidateData);
  expect(isCreated).toBe(false);
  expect(updatedCandidate.firstName).toBe("Jane");
});

test("should get an existing candidate by email", async () => {
  const candidateData = {
    firstName: "Jordan",
    lastName: "Rob",
    phoneNumber: "1234567890",
    email: "jordan@example.com",
    callTimeInterval: "11am-3pm",
    linkedInProfile: "https://linkedin.com/in/jordanrob",
    githubProfile: "https://github.com/jordanrob",
    comment: "Great candidate",
  };

  // First create the candidate
  const { candidate, created } = await candidateRepository.upsertCandidate(
    candidateData
  );

  const existingCandidate = await candidateRepository.getCandidateByEmail(
    "jordan@example.com"
  );

  console.log(existingCandidate);
  expect(existingCandidate.firstName).toBe("Jordan");
  expect(existingCandidate.lastName).toBe("Rob");
});
