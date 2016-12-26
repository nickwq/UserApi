var app = require("./app.js");
var request = require('supertest').agent(app.listen());

describe('Simple user CRUD api', function () {
    var aUser = {};
    beforeEach(function (done) {
        aUser = {name: 'Marcus', age: 42, height: 1.96};
        removeAll();
        done();
    });

    afterEach(function (done) {
        removeAll();
        done();
    });

    var removeAll = async() => {
        await app.users.remove({});
    };
    it('add new users', function (done) {
        request
            .post('/user')
            .send(aUser)
            .expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
            .expect(200, done);
    });

    it('should fails validation for user without name', (done) => {
        delete aUser.name;
        request
            .post('/user')
            .send(aUser)
            .expect('Name is required!')
            .expect(400, done);
    });

    it('should get inserted user info', async () => {
        var insertedUser = await app.users.insert(aUser);
        var url = "/user/" + insertedUser._id;
        request
            .get(url)
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(/Marcus/)
            .expect(/42/)
            .expect(/1.96/)
            .expect(200);
    });
});