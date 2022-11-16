//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("forgot password", () => {
    it("can send email to reset password", (done) => {
        chai.request(app)
            .post('/forgot-password')
            .send({email: "minhnqnde160634@fpt.edu.vn"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("password reset link sent to your email account");
            })

        done();
    });

});

describe("Rest password", () => {
    let link = "";
    before(function (done){
        chai.request(app)
            .post('/forgot-password')
            .send({email: "minhnqnde160634@fpt.edu.vn"})
            .end(async (err, res) => {
                const result = await JSON.parse(res.text);
                link = result.link;
                done();
            })
    })

    it("can reset password", (done) => {
        chai.request(app)
            .post(link)
            .send({oldPassword: "Minh1942002", newPassword: "Minh0914121791"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql("change password success");
            })
    
        done();
    })
    
})