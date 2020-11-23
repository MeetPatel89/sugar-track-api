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

    getUserByUsername(knex, username) {
        return knex
                .select('*')
                .from('users')
                
    }
    
};

module.exports = UsersService;
