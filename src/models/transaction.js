const pgdb = require('../util/postgres-database');

const Transactions = {};

Transactions.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_TRANSACTION = `INSERT INTO transactions 
                                (id, amount, category_id, account_id, username_id, transaction_date)
                                VAlUES ($1, $2, $3, $4, $5, $6)`;
  return pgdb.query(SQL_CREATE_TRANSACTION, bindings);
};

Transactions.findById = (data) => {
  const bindings = [...data];
  const SQL_SELECT_TRANSACTION = `SELECT 
                                    a.id,
                                    a.amount,
                                    a.category_id,
                                    b.description as "category",
                                    b.category_type as "type",
                                    a.account_id,
                                    c.description as "account",
                                    d.description as "currency",
                                    TO_CHAR(a.transaction_date, 'DD-MM-YYYY') AS "date"
                                    FROM transactions a
                                INNER JOIN category b ON (a.category_id = b.id)
                                INNER JOIN account c ON(a.account_id = c.id)
                                INNER JOIN currency d ON (d.id = c.currency_id)
                                WHERE a.id = $1 AND a.username_id = $2`;
  return pgdb.query(SQL_SELECT_TRANSACTION, bindings);
};

Transactions.fetchAll = (data) => {
  const bindings = [...data];
  const SQL_SELECT_TRANSACTIONS = `SELECT 
                                a.id,
                                a.amount,
                                a.category_id,
                                b.description as "category",
                                b.category_type as "type",
                                a.account_id,
                                c.description as "account",
                                d.description as "currency",
                                TO_CHAR(a.transaction_date, 'DD-MM-YYYY') AS "date"
                                FROM transactions a
                            INNER JOIN category b ON (a.category_id = b.id)
                            INNER JOIN account c ON(a.account_id = c.id)
                            INNER JOIN currency d ON (d.id = c.currency_id)
                            WHERE a.username_id = $1`;
  return pgdb.query(SQL_SELECT_TRANSACTIONS, bindings);
};

Transactions.delete = (data) => {
  const bindings = [...data];
  const SQL_DELETE_TRANSACTION = `DELETE FROM transactions WHERE id = $1 AND username_id = $2`;
  return pgdb.query(SQL_DELETE_TRANSACTION, bindings);
};



module.exports = Transactions;
