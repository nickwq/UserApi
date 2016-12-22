var app = require("./app.js");
var request = require('supertest').agent(app.listen());

describe('Simple user CRUD api', function () {
    it('add new users', function (done) {
        request
            .post('/user')
            .send('aUser')
            .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
            .expect(200, done);
    });
});