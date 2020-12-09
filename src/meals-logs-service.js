const MealsLogsService = {
  getMealsLogs(knex) {
    return knex.select('*').from('meals_logs');
  },
  insertMealsLog(knex, newMealsLog) {
    return knex.insert(newMealsLog).into('meals_logs').returning('*');
  },
  sortMealsLogsByDateTime(knex, user_id, sort) {
    return knex
      .from('meals_logs')
      .where({
        user_id,
      })
      .orderBy(sort);
  },
  getMealsLogsByUserId(knex, user_id) {
    return knex.from('meals_logs').select('*').where({
      user_id,
    });
  },
  deleteMealsLogsById(knex, id) {
    return knex.from('meals_logs').where({ id }).delete().returning('*');
  },
  updateMealsLog(knex, id, newMealLog) {
    return knex('meals_logs').where({ id }).update(newMealLog).returning('*');
  },
  getMealsLogById(knex, user_id, id) {
    return knex.select('*').from('meals_logs').where({
      user_id,
      id,
    });
  },
};

module.exports = MealsLogsService;
