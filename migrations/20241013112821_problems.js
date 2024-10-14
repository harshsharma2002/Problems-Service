const { addAuditTrails } = require("../helpers/migrationAudit");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("problems", async (table) => {
    table.uuid("questionId").primary().index();
    table.string("questionName").notNullable().index();
    table.string("questionSlug").notNullable().unique().index();
    table.text("question").notNullable().index();
    table.enu("difficulty", ["easy", "medium", "hard"]).notNullable().index();
    table.jsonb("tags").index();
    table.text("hint").index();
    table.jsonb("authorsSolution").notNullable().index();
    table.jsonb("testCases").notNullable().index();
    table.boolean("isArchived").notNullable().defaultTo(false).index();
    addAuditTrails(table);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Problems");
};
