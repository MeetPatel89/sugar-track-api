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
    },
    sortMealsLogsByDateTime(knex, user_id, sort) {
        return knex
                .from('meals_logs')
                .where({
                    user_id
                })
                .orderBy(sort)
    }
}

module.exports = MealsLogsService;
