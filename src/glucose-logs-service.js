const GlucoseLogsService = {
  insertGlucoseLog(knex, newGlucoseLog) {
    return knex.insert(newGlucoseLog).into('glucose_logs').returning('*');
  },
  getGlucoseLogs(knex) {
    return knex.select('*').from('glucose_logs');
  },
  deleteGlucoseLogById(knex, id) {
    return knex.from('glucose_logs').where({ id }).delete().returning('*');
  },
  getGlucoseLogsByUserId(knex, userId) {
    return knex.select('*').from('glucose_logs').where({ user_id: userId });
  },
  sortGlucoseLogs(knex, sort) {
    return knex.from('glucose_logs').orderBy(sort);
  },
  sortGlucoseLogsByDateTime(knex, userId, sort) {
    return knex
      .from('glucose_logs')
      .where({
        user_id: userId,
      })
      .orderBy(sort);
  },
  sortAllLogsByDateTime(knex, userId, sort) {
    return knex
      .from('glucose_logs', 'meals_logs', 'meds_logs')
      .where({
        user_id: userId,
      })
      .orderBy(sort);
  },
  updateGlucoseLog(knex, id, newGlucoseLog) {
    return knex('glucose_logs')
      .where({ id })
      .update(newGlucoseLog)
      .returning('*');
  },
  getGlucoseLogsById(knex, id) {
    return knex.select('*').from('glucose_logs').where({
      id,
    });
  },
};

module.exports = GlucoseLogsService;
