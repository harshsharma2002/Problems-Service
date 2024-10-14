const joi = require("joi");

const isValidProblem = async (data) => {
  const schema = joi.object({
    questionId: joi.string().optional(),
    questionName: joi.string().required(),
    questionSlug: joi.string().required(),
    question: joi.string().required(),
    difficulty: joi.string().valid("easy", "medium", "hard").required(),
    tags: joi.array(),
    hint: joi.string(),
    authorsSolution: joi.object().required(),
    testCases: joi.object().required(),
    userId: joi.string().required(),
  });
  return schema.validateAsync(data);
};

const isValidToGetAll = async (data) => {
  const schema = joi.object({
    pageNumber: joi.number().required(),
    pageSize: joi.number().required(),
  });
  return schema.validateAsync(data);
};

const isValidSlugParam = async (data) => {
  const schema = joi.object({
    slug: joi.string().required(),
    userId: joi.string().optional(),
  });
  return schema.validateAsync(data);
};

const isValidToGetUserQuestions = async (data) => {
  const schema = joi.object({
    userId: joi.string().required(),
    pageNumber: joi.number().required(),
    pageSize: joi.number().required(),
  });
  return schema.validateAsync(data);
};

module.exports = {
  isValidProblem,
  isValidToGetAll,
  isValidSlugParam,
  isValidToGetUserQuestions,
};
