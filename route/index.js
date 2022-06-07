const renderMW = require('../middleware/renderMW');
const getCompaniesMW = require('../middleware/company/getCompaniesMW');
const getCompanyMW = require('../middleware/company/getCompanyMW');
const saveCompanyMW = require('../middleware/company/saveCompanyMW');
const deleteCompanyMW = require('../middleware/company/deleteCompanyMW');
const getEmployeesMW = require('../middleware/employee/getEmployeesMW');
const getEmployeeMW = require('../middleware/employee/getEmployeeMW');
const saveEmployeeMW = require('../middleware/employee/saveEmployeeMW');
const deleteEmployeeMW = require('../middleware/employee/deleteEmployeeMW');


const CompanyModel = require('../models/company');
const EmployeeModel = require('../models/employee');

module.exports = function(app) {
    const objRepo = {
        CompanyModel: CompanyModel,
        EmployeeModel: EmployeeModel
    };

    

    app.use('/company/new',
        saveCompanyMW(objRepo),
        renderMW(objRepo, 'companyEditNew')
    )

    app.use('/company/edit/:companyid',
        getCompanyMW(objRepo, 'companyid'),
        saveCompanyMW(objRepo),
        renderMW(objRepo, 'companyEditNew')
    )
    app.get(
        '/company/delete/:companyid',
        getCompanyMW(objRepo, 'companyid'),
        deleteCompanyMW(objRepo)
    )

    app.use(
        '/employee/:companyid/new',
        getCompanyMW(objRepo, 'companyid'),
        saveEmployeeMW(objRepo),
        renderMW(objRepo, "employeeEditNew")
    )
    
    app.get(
        '/employee/:companyid',
        getCompanyMW(objRepo, 'companyid'),
        getEmployeesMW(objRepo),
        renderMW(objRepo, 'employee')
    )


    app.use(
        '/employee/:companyid/edit/:employeeid',
        getCompanyMW(objRepo, 'companyid'),
        getEmployeeMW(objRepo, 'employeeid'),
        saveEmployeeMW(objRepo),
        renderMW(objRepo, 'employeeEditNew')
    )
    
    app.get(
        '/employee/:companyid/delete/:employeeid',
        getCompanyMW(objRepo, 'companyid'),
        getEmployeeMW(objRepo, 'employeeid'),
        deleteEmployeeMW(objRepo),
        renderMW(objRepo, 'employeeEditNew')
    )

    app.get('/',
        getCompaniesMW(objRepo),
        renderMW(objRepo, 'index')
    );
}