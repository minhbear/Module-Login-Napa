//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Auth", () => {
  it("Can login", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .send({ email: "hvmnhatminh@gmail.com", password: "Minh0914121791" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('username').eql("minhbear");
        res.body.should.have.property('email').eql("hvmnhatminh@gmail.com");
        res.body.should.have.property('token');
        done();
      })
  });

  // it("Can signup", (done) => {
  //   chai.request(app)
  //       .post("/auth/signup")
  //       .send({
  //           username: "nhatminh",
  //           email: "minhnqnde160634@fpt.edu.vn",
  //           password: "Minh0914121791"
  //       })
  //       .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('username').eql("nhatminh");
  //           res.body.should.have.property('email').eql("minhnqnde160634@fpt.edu.vn");
  //           res.body.should.have.property('token');

  //           done();
  //       })
  // })
});
