const pgdb = require('../util/postgres-database');

const AccountType = {};

AccountType.create = (data)=>{
    const bindings = [...data];
    const SQL_CREATE_ACCOUNT_TYPE = `INSERT INTO account_type
                                        (description) VALUES ($1)`;
    return pgdb.query(SQL_CREATE_ACCOUNT_TYPE, bindings);
} 

AccountType.findById = (data)=>{
    const bindings = [...data];
    const SQL_SELECT_ACCOUNT_TYPE = `SELECT id, description, to_char(created_at, 'DD-MM-YYYY') as "date"
                                        FROM account_type WHERE id = $1`;
    return pgdb.query(SQL_SELECT_ACCOUNT_TYPE, bindings)
}


AccountType.fetchAll = ()=>{
    const SQl_SELECT_ACCOUNT_TYPES = `SELECT id, description, to_char(created_at, 'DD-MM-YYYY') as "date"
                                        FROM account_type`;
    return pgdb.query(SQl_SELECT_ACCOUNT_TYPES)
}

module.exports = AccountType;