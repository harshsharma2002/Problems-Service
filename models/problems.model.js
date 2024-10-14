const { v4: uuidv4 } = require("uuid");
const BaseModel = require("./basemodel");

class Problems extends BaseModel {
  static get tableName() {
    return "Problems";
  }

  static get idColumn() {
    return "questionId";
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.questionId = this.questionId ? this.questionId : uuidv4();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "questionName",
        "questionSlug",
        "question",
        "difficulty",
        "authorsSolution",
        "testCases",
      ],
      properties: {
        questionId: { type: "string" },
        questionName: { type: "string" },
        questionSlug: { type: "string" },
        question: { type: "string" },
        difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
        tags: { type: "array" },
        hint: { type: "string" },
        authorsSolution: { type: "object" },
        testCases: { type: "object" },
        isarchived: { type: "boolean" },
      },
    };
  }

  static create (problem) {
    return Problems.query().insert(problem).returning("*");
  }
}

module.exports = { Problems };
