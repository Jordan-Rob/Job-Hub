const express = require("express");
const {
  upsertCandidate,
  getCandidateByEmail,
} = require("../controllers/candidateController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - comment
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the candidate
 *         lastName:
 *           type: string
 *           description: The last name of the candidate
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the candidate
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the candidate
 *         callTimeInterval:
 *           type: string
 *           description: The preferred time interval to call the candidate
 *         linkedInProfile:
 *           type: string
 *           description: The LinkedIn profile URL of the candidate
 *         githubProfile:
 *           type: string
 *           description: The GitHub profile URL of the candidate
 *         comment:
 *           type: string
 *           description: Additional comments about the candidate
 */

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: The candidates managing API
 */

/**
 * @swagger
 * /api/candidates:
 *   post:
 *     summary: Create or update a candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: The candidate was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       200:
 *         description: The candidate was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       500:
 *         description: Some server error
 */
router.post("/api/candidates", upsertCandidate);

/**
 * @swagger
 * /api/candidates/{email}:
 *   get:
 *     summary: Get a candidate by email
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate email
 *     responses:
 *       200:
 *         description: The candidate description by email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */
router.get("/api/candidates/:email", getCandidateByEmail);

module.exports = router;
