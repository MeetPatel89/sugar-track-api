const GlucoseLogsService = {
    insertGlucoseLog(knex, newGlucoseLog) {
        return knex
                .insert(newGlucoseLog)
                .into('glucose_logs')
                .returning('*')
    },
    getGlucoseLogs(knex) {
        return knex
                .select('*')
                .from('glucose_logs')
    }
}

module.exports = GlucoseLogsService;

