"use strict";

const Koa = require('koa');
const app = module.exports = new Koa();

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
var monk = require('monk');
var db = monk('localhost/apiUsers');
var users = db.get("users");
module.exports.users = users;

// app.use(routes.post('/user', addUser));
// app.use(routes.get('/user/:id', getUser));

app.use(async(ctx, next) => {
    await next();
    // ctx.response.type = 'application/json';
    // ctx.response.body = '<h1>Hello KOA2</h1>';
});
app.use(bodyParser());
router.post('/user', async(ctx, next) => {
    let userFromRequest = ctx.request.body;
    if(!userFromRequest.name) {
        ctx.throw(400, "Name is required!");
    }
    var insertedUser = await users.insert(userFromRequest);

    ctx.response.set('location', '/user/'+insertedUser._id);
    ctx.response.status = 200;
});

router.get('/user/:id', async(ctx, next) => {
    const id = ctx.params.id;
    const user = await users.findById(id);
    ctx.response.status = 200;
    ctx.response.body = user;
});

app.use(router.routes());

app.listen(7000);
console.log('server started');

// function *addUser(){
//     var userFromRequest = yield parse(this);
//     if(!userFromRequest.name) {
//         this.throw(400, "Name is required!");
//     }
//     var insertedUser = yield users.insert(userFromRequest);
//
//     this.set('location', '/user/'+insertedUser._id);
//     this.status = 200;
// }
//
// function *getUser(id) {
//     var user = yield users.findById(id);
//     this.body = user;
//     this.status = 200;
// }
