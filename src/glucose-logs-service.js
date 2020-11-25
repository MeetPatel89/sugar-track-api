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
    },
    getGlucoseLogsByDateTime(knex, date, time) {
        return knex 
                .select('*')
                .from('glucose_logs')
                .where({
                    date,
                    time
                })
    },
    deleteGlucoseLogById(knex, id) {
        return knex
                .from('glucose_logs')
                .where({id})
                .delete()
                .returning('*')
    },
    getGlucoseLogsByUserId(knex, user_id) {
        return knex
                .select('*')
                .from('glucose_logs')
                .where({
                    user_id
                })
    },
    sortGlucoseLogs(knex, sort) {
        return knex
                .from('glucose_logs')
                .orderBy(sort)
    },
    sortGlucoseLogsByDateTime(knex, user_id, sort) {
        return knex
                .from('glucose_logs')
                .where({
                    user_id
                })
                .orderBy(sort)
    }
}

module.exports = GlucoseLogsService;

