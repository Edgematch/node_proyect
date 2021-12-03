const express = require('express'); 
const cors = require('cors')({origin: true});
const app = express(); 

const { server } = require('./src/config/config');

const guard = require('./src/guard/guard')

const userRoutes = require('./src/routes/users');
const currencyRoutes = require('./src/routes/currency');
const accountTypeRoutes = require('./src/routes/account_type');
const categoryRoutes = require('./src/routes/category');
const accountRoutes = require('./src/routes/account');
const transactionRoutes = require('./src/routes/transaction');

app.use(cors);
app.use(guard);

app.use(express.json());
 
app.use(userRoutes);
app.use(currencyRoutes);
app.use(accountTypeRoutes);
app.use(categoryRoutes)
app.use(accountRoutes);
app.use(transactionRoutes);


app.listen(server.port, ()=>{
    console.log(`Server is running at port ${server.port}`);
})
