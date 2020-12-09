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
  sortMedsLogsByDateTime(knex, user_id, sort) {
    return knex
      .from('meds_logs')
      .where({
        user_id,
      })
      .orderBy(sort);
  },
  getMedsLogsByUserId(knex, user_id) {
    return knex.select('*').from('meds_logs').where({
      user_id,
    });
  },
  deleteMedsLogsById(knex, id) {
    return knex.from('meds_logs').where({ id }).delete().returning('*');
  },

  updateMedsLog(knex, id, newMedsLog) {
    return knex('meds_logs').where({ id }).update(newMedsLog).returning('*');
  },
  getMedsLogById(knex, user_id, id) {
    return knex.select('*').from('meds_logs').where({
      user_id,
      id,
    });
  },
};

module.exports = MedsLogsService;
