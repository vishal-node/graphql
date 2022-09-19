const express = require('express')
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const port = process.env.port||5000;
const schema = require('./schema/schema')

const app = express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(port,console.log(`server is running on port ${port}`));