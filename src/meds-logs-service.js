const MedsLogsService = {
    insertMedLog(knex, newMed) {
        return knex
            .inert(newMed)
            .into('meds_logs')
            .returning('*')
    },
    getMedsLogs(knex) {
        return knex
            .select('*')
            .from('meds_logs')
    }
}

module.exports = MedsLogsService;
