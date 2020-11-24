const MedsLogsService = {
    insertMedLog(knex, newMed) {
        knex
            .inert(newMed)
            .into('meds_logs')
            .returning('*')
    }
}