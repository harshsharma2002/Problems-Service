const {
  getAll,
  create,
  getOne,
  getUserQuestions,
  archive,
  upsert,
} = require("../services/problems.service");
const { APIResponse } = require("../helpers/response");
const {
  isValidToGetAll,
  isValidProblem,
  isValidSlugParam,
  isValidToGetUserQuestions,
} = require("../validators/problems.validator");

const listAll = async (req, res) => {
  try {
    const validData = await isValidToGetAll(req.body);
    const allProblems = await getAll(validData);
    APIResponse(res, 200, allProblems);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

const createProblem = async (req, res) => {
  try {
    const validData = await isValidProblem(req.body);
    const newProblem = await create(validData);
    APIResponse(res, 201, newProblem);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

const listOne = async (req, res) => {
  try {
    const validData = await isValidSlugParam(req.params);
    const oneProblem = await getOne(validData);
    APIResponse(res, 200, oneProblem);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

const listUserQuestions = async (req, res) => {
  try {
    const validData = await isValidToGetUserQuestions(req.body);
    const userQuestions = await getUserQuestions(validData);
    APIResponse(res, 200, userQuestions);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

const archiveProblem = async (req, res) => {
  try {
    const validData = await isValidSlugParam({
      slug: req.params.slug,
      userId: req.body.userId,
    });
    const archivedProblem = await archive(validData);
    APIResponse(res, 200, archivedProblem);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const validData = await isValidProblem(req.body);
    const updatedProblem = await upsert(validData);
    APIResponse(res, 200, updatedProblem);
  } catch (err) {
    APIResponse(res, 500, { message: err.message });
  }
};

module.exports = {
  listAll,
  createProblem,
  listOne,
  listUserQuestions,
  archiveProblem,
  updateProblem,
};
