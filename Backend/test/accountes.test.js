//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Authoraization', () => {
    it('can not use if not authoraization', (done) => [
        chai.request(app)
            .get('/accounts')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error');
                done();
            })
    ]);
});

describe('Accounts', () => {
    describe('Admin Permission', () => {
        let token = '';
        const id = "637353a338b5a4d220a39564";

        before(function (done) {
            //login by admin
            chai.request(app)
                .post('/auth/login')
                .send({email: "hvmnhatminh@gmail.com", password: "Minh0914121791"})
                .end(async (err, res) => {
                    const result = await JSON.parse(res.text);
                    token = result.token;
                    done();
                })
        })
    
        it('Admin can view all accounts', (done) => {
            chai.request(app)
                .get('/accounts')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('accounts');
                    res.body.should.have.property('githubAccounts');
                    done();
                })           
        })

        it('Admin can update field (or active) account', (done) => {
            chai.request(app)
                .post(`/accounts/active/${id}`)
                .set('Authorization', 'Bearer ' + token)
                .send({status: "1"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message");
                    done();
                })
        })

        // it('Admin can delete account(github account)', (done) => {
        //     chai.request(app)
        //         .delete(`/accounts/delete/${id}`)
        //         .set('Authorization', 'Bearer ' + token)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.have.property("message");
        //             done();
        //         })
        // })
    })
})

