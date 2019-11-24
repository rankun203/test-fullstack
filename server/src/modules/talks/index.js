const Router = require('@koa/router');
const services = require('./services');
const { auth } = require('../../middlewares/authentication');

const talks = new Router();

talks.get('/', async ctx => {
  const { orderBy, asc } = ctx.query;

  ctx.body = await services.listTalks({
    orderBy,
    asc: asc === 'true' ? true : false
  });
});

talks.post('/', auth, async ctx => {
  const talk = ctx.body;
  const username = ctx.state.user.login;
  talk.author = username;

  ctx.body = await services.createTalk(talk);
});

talks.put('/:id/vote', auth, async ctx => {
  const postId = ctx.params.id;
  const userId = 0; // TODO: Fix me
  ctx.body = await services.voteTalk(postId, userId);
});

talks.put('/:id/unvote', auth, async ctx => {
  const postId = ctx.params.id;
  const userId = 0; // TODO: Fix me
  ctx.body = await services.unVoteTalk(postId, userId);
});

module.exports.talks = talks;
