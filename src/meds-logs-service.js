const MedsLogsService = {
  insertMedLog(knex, newMed) {
    return knex.insert(newMed).into('meds_logs').returning('*');
  },
  getMedsLogs(knex) {
    return knex.select('*').from('meds_logs');
  },
  getMedsByDateTime(knex, dateTime) {
    return knex.select('*').from('meds_logs').where({
      dateTime,
    });
  },
  sortMedsLogsByDateTime(knex, userId, sort) {
    return knex
      .from('meds_logs')
      .where({
        user_id: userId,
      })
      .orderBy(sort);
  },
  getMedsLogsByUserId(knex, userId) {
    return knex.select('*').from('meds_logs').where({
      user_id: userId,
    });
  },
  deleteMedsLogsById(knex, id) {
    return knex.from('meds_logs').where({ id }).delete().returning('*');
  },

  updateMedsLog(knex, id, newMedsLog) {
    return knex('meds_logs').where({ id }).update(newMedsLog).returning('*');
  },
  getMedsLogById(knex, id) {
    return knex.select('*').from('meds_logs').where({
      id,
    });
  },
};

module.exports = MedsLogsService;
