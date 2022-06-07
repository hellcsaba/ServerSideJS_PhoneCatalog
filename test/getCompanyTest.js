const expect = require('chai').expect
const getCompanyMW = require('../middleware/company/getCompanyMW')

describe('getCompany middleware', function () {

    it('should put company into res.locals.company when a company is found in the db', function(done) {
        const objRep = {
            CompanyModel: {
                findOne: function({}, cb) {
                    cb(undefined, 'CompanyFromDB');
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {
            locals: {}
        };
        function nextMock(err, company) {
            expect(resMock.locals.company).to.be.eql('CompanyFromDB');
            done();
        };

        getCompanyMW(objRep)(reqMock, resMock, nextMock);
    });

    it('should call next with an error if findOne returned an error', function (done) {
        const objRep = {
            CompanyModel: {
                findOne: function({}, cb) {
                    cb('error', {});
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {};
        function nextMock(err, company) {
            expect(err).to.be.eql('error');
            done();
        };

        getCompanyMW(objRep)(reqMock, resMock, nextMock);
    });

    it('should call next with an error if findOne returned undefined instead of company', function(done) {
        const objRep = {
            CompanyModel: {
                findOne: function({}, cb) {
                    cb(undefined, undefined);
                }
            }
        };
        const reqMock = {
            params: {}
        };
        const resMock = {};
        function nextMock(err, company) {
            expect(company).to.be.eql(undefined);
            done();
        };

        getCompanyMW(objRep)(reqMock, resMock, nextMock);
    });

    
});