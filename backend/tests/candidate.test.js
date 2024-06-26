const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const candidateRepository = require("../repositories/candidateRepository");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Recreate the database schema
});

describe("Job Candidate API", () => {
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
    const response1 = await request(app)
      .post("/api/candidates")
      .send(candidateData);
    expect(response1.status).toBe(201);
    expect(response1.body.email).toBe("john.doe@example.com");

    // Update the candidate
    candidateData.firstName = "Jane";
    const response2 = await request(app)
      .post("/api/candidates")
      .send(candidateData);
    expect(response2.status).toBe(200);
    expect(response2.body.firstName).toBe("Jane");
  });

  test("should get an existing candidate by email", async () => {
    const response = await request(app).get(
      "/api/candidates/john.doe@example.com"
    );
    expect(response.status).toBe(200);
    expect(response.body.email).toBe("john.doe@example.com");
    expect(response.body.firstName).toBe("Jane");
  });

  test("should return 404 for non-existing candidate", async () => {
    const response = await request(app).get(
      "/api/candidates/non.existing@example.com"
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Candidate not found");
  });

  test("should return 400 for missing required fields", async () => {
    const candidateData = {
      lastName: "Doe",
      email: "john.doe@example.com",
      comment: "Great candidate",
    };

    const response = await request(app)
      .post("/api/candidates")
      .send(candidateData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Missing required fields");
  });

  test("should return 400 for invalid email format", async () => {
    const candidateData = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe",
      callTimeInterval: "9am-5pm",
      linkedInProfile: "https://linkedin.com/in/johndoe",
      githubProfile: "https://github.com/johndoe",
      comment: "Great candidate",
    };

    const response = await request(app)
      .post("/api/candidates")
      .send(candidateData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid email format");
  });
});
