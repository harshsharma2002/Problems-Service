const express = require("express");
const router = express.Router();
const {
  listAll,
  createProblem,
  listOne,
  listUserQuestions,
  archiveProblem,
  updateProblem,
} = require("../controllers/author.controller");
const { authMiddleware } = require("@sharma2002/auth-sdk");

// The url for this router
// http://localhost:4000/api/problems/
router.get("/all", listAll);
router.get("/:slug", listOne);
router.use(authMiddleware);
router.post("/create", createProblem);
router.post("/questions", listUserQuestions);
router.delete("/:slug", archiveProblem);
router.put("/:slug", updateProblem);

module.exports = router;
