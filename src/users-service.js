const UsersService = {
    getAllUsers(knex) {
        return knex
                .select('*')
                .from('users')
    },
    addNewUser(knex, newUsers) {
        return knex
                .insert(newUsers)
                .into('users')
                .returning('*')
    },
    getUserById(knex, id) {
        return knex
                .from('users')
                .select('*')
                .where({id})
                .first()
    },
    deleteUser(knex, id) {
        return knex
                .from('users')
                .where({id})
                .delete()
                .returning('*')
    },
     updateUser(knex, id, newUserFields) {
         return knex
                .from('users')
                .where({id})
                .update(newUserFields)
                .returning('*')
     }
};

module.exports = UsersService;
