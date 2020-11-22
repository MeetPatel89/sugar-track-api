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
    }
    
};

module.exports = UsersService;
