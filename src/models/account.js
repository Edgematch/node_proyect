const pgdb = require('../util/postgres-database');

const Accounts = {};

Accounts.create = (data)=>{
    const bindings = [...data];
    const SQL_CREATE_ACCOUNT = `INSERT INTO account 
                                (id, description, account_type_id, currency_id, amount, username_id)
                                VAlUES ($1, $2, $3, $4, $5, $6)`;
    return pgdb.query(SQL_CREATE_ACCOUNT, bindings);
}

Accounts.findById = (data)=>{
    const bindings = [...data];
    const SQL_SELECT_ACCOUNT = `SELECT 
                                    a.id,
                                    a.description,
                                    a.account_type_id,
                                    b.description as "account_type",
                                    a.currency_id,
                                    c.description as "currency",
                                    a.amount,
                                    TO_CHAR(a.created_at, 'DD-MM-YYYY') AS "add_date"
                                    FROM account a
                                INNER JOIN account_type b ON (a.account_type_id = b.id)
                                INNER JOIN currency c ON(a.currency_id = c.id)
                                WHERE a.id = $1 AND a.username_id = $2`;
    return pgdb.query(SQL_SELECT_ACCOUNT, bindings);
}


Accounts.fetchAll = (data)=>{
    const bindings = [...data];
    const SQL_SELECT_ACCOUNT = `SELECT 
                                    a.id,
                                    a.description,
                                    a.account_type_id,
                                    b.description as "account_type",
                                    a.currency_id,
                                    c.description as "currency",
                                    a.amount,
                                    TO_CHAR(a.created_at, 'DD-MM-YYYY') AS "add_date"
                                FROM account a
                                INNER JOIN account_type b ON (a.account_type_id = b.id)
                                INNER JOIN currency c ON(a.currency_id = c.id)
                                WHERE a.username_id = $1`;
    return pgdb.query(SQL_SELECT_ACCOUNT, bindings);
}

Accounts.delete = (data)=>{
    const bindings = [...data];
    const SQL_DELETE_ACCOUNT = `DELETE FROM account WHERE id = $1 AND username_id = $2`;
    return pgdb.query(SQL_DELETE_ACCOUNT, bindings);

}


Accounts.update = (data)=>{
    const bindings = [...data];
    const SQL_UPDATE_ACCOUNT = `UPDATE account SET amount = $2 WHERE id = $1 AND username_id = $3`;
    return pgdb.query(SQL_UPDATE_ACCOUNT, bindings);
}


module.exports = Accounts;