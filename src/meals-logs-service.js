const MealsLogsService = {
  getMealsLogs(knex) {
    return knex.select('*').from('meals_logs');
  },
  insertMealsLog(knex, newMealsLog) {
    return knex.insert(newMealsLog).into('meals_logs').returning('*');
  },
  sortMealsLogsByDateTime(knex, userId, sort) {
    return knex
      .from('meals_logs')
      .where({
        user_id: userId,
      })
      .orderBy(sort);
  },
  getMealsLogsByUserId(knex, userId) {
    return knex.from('meals_logs').select('*').where({
      user_id: userId,
    });
  },
  deleteMealsLogsById(knex, id) {
    return knex.from('meals_logs').where({ id }).delete().returning('*');
  },
  updateMealsLog(knex, id, newMealLog) {
    return knex('meals_logs').where({ id }).update(newMealLog).returning('*');
  },
  getMealsLogById(knex, userId, id) {
    return knex.select('*').from('meals_logs').where({
      user_id: userId,
      id,
    });
  },
};

module.exports = MealsLogsService;
