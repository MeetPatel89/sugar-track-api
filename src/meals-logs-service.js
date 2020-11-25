const MealsLogsService = {
    getMealsLogs(knex) {
        return knex
                .select('*')
                .from('meals_logs')
    }
}

module.exports = MealsLogsService;
