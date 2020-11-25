const MedsLogsService = {
    insertMedLog(knex, newMed) {
        return knex
            .insert(newMed)
            .into('meds_logs')
            .returning('*')
    },
    getMedsLogs(knex) {
        return knex
            .select('*')
            .from('meds_logs')
    },
    getMedsByDateTime(knex, dateTime) {
        return knex
                .select('*')
                .from('meds_logs')
                .where({
                    dateTime
                })
    },
    sortMedsLogsByDateTime(knex, user_id, sort) {
        return knex
                .from('meds_logs')
                .where({
                    user_id
                })
                .orderBy(sort)
    }
}

module.exports = MedsLogsService;
