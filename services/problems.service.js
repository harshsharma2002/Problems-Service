const { Problems } = require("../models/problems.model");

const getAll = async ({ pageNumber, pageSize }) => {
  try {
    const { results, total } = await Problems.query()
      .select("questionName", "questionSlug", "difficulty")
      .where("isArchived", false)
      .page(pageNumber - 1, pageSize);
    return {
      data: results,
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const create = async (data) => {
  try {
    return await Problems.query().insert({
      questionName: data.questionName,
      questionSlug: data.questionSlug,
      question: data.question,
      difficulty: data.difficulty,
      tags: data.tags,
      hint: data.hint,
      authorsSolution: data.authorsSolution,
      testCases: data.testCases,
      createdBy: data.userId,
      createdAt: new Date(),
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getOne = async ({ slug }) => {
  try {
    return await Problems.query().findOne({ questionSlug: slug });
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserQuestions = async ({ userId, pageNumber, pageSize }) => {
  try {
    const { results, total } = await Problems.query()
      .select()
      .where("createdBy", userId)
      .andWhere("isArchived", false)
      .page(pageNumber - 1, pageSize);

    return {
      data: results,
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

const archive = async ({ userId, slug }) => {
  try {
    const result = await Problems.query()
      .patch({ isArchived: true, updatedAt: new Date(), updatedBy: userId })
      .where({ questionSlug: slug, createdBy: userId });
    if (!result) {
      throw new Error("No such question found");
    } else {
      return {
        message: "Question deleted Successfully",
      };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const upsert = async (data) => {
  try {
    return await Problems.query().patchAndFetchById(data.questionId, {
      questionName: data.questionName,
      questionSlug: data.questionSlug,
      question: data.question,
      difficulty: data.difficulty,
      tags: data.tags,
      hint: data.hint,
      authorsSolution: data.authorsSolution,
      testCases: data.testCases,
      updatedBy: data.userId,
      updatedAt: new Date(),
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { getAll, create, getOne, getUserQuestions, archive, upsert };
