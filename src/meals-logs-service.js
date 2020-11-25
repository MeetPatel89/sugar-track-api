const MealsLogsService = {
    getMealsLogs(knex) {
        return knex
                .select('*')
                .from('meals_logs')
    },
    insertMealsLog(knex, newMealsLog) {
        return knex
                .insert(newMealsLog)
                .into('meals_logs')
                .returning('*')
    }
}

module.exports = MealsLogsService;
