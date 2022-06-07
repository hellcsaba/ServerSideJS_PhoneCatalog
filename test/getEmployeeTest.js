const expect = require('chai').expect;
const getEmployeeMW = require('../middleware/employee/getEmployeeMW');

describe('getEmployee middleware', function() {

    it('should put employee into res.locals.employee when an employee is found in the db', function(done) {
        const objRep = {
            EmployeeModel: {
                findOne: function({}, cb) {
                    cb(undefined, 'EmployeeFromDB');
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {
            locals: {}
        };
        function nextMock(err, employee) {
            expect(resMock.locals.employee).to.be.eql('EmployeeFromDB');
            done();
        };

        getEmployeeMW(objRep)(reqMock, resMock, nextMock);
    });


    it('should call next with an error if findOne returned an error', function(done) {
        const objRep = {
            EmployeeModel: {
                findOne: function({}, cb) {
                    cb('error', {});
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {};
        function nextMock(err, employee) {
            expect(err).to.be.eql('error');
            done();
        };

        getEmployeeMW(objRep)(reqMock, resMock, nextMock);
    });

    it('should call next with an error if findOne returned undefined instead of employee', function(done) {
        const objRep = {
            EmployeeModel: {
                findOne: function({}, cb) {
                    cb(undefined, undefined);
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {};
        function nextMock(err, employee) {
            expect(employee).to.be.eql(undefined);
            done();
        };

        getEmployeeMW(objRep)(reqMock, resMock, nextMock);
    });

    
});