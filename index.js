/*
const CompanyModel = require('./models/company');
const EmployeeModel = require('./models/employee');


let company = new CompanyModel();
company.name = 'BestCompany';
company.site = 'Hungary, Budapest High Street 10'
company.save((err)=>{
    console.log(err);
    let employee = new EmployeeModel();
    employee.name = 'Marco Botton';
    employee.telephone = 'Nokia 3310';
    employee.telephoneNumber = '+3612378465';
    employee._company = company;

    employee.save((err)=>{
        console.log(err);
    });
})
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// Load routing
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Something has went wrong...');
    console.log(err);
});


const server = app.listen(3000, function () {
    console.log('Running on :3000');
});

app.use('/', express.static('static'));