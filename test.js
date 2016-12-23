var app = require("./app.js");
var request = require('supertest').agent(app.listen());

describe('Simple user CRUD api', function () {
    var aUser = { name: 'Marcus', age: 42, height: 1.96};
    it('add new users', function (done) {
        request
            .post('/user')
            .send(aUser)
            .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
            .expect(200, done);
    });

    it('should fails validation for user without name', function () {
        delete aUser.name;
        request
            .post('/user')
            .send(aUser)
            .expect(400, 'Name is required!');
    });
});