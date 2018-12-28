const { forwardTo } = require('prisma-binding');

const Query = {
  // async users(parent, args, ctx, info) {
  //   const users = await ctx.db.query.users();
  //   return users;
  // },

  // async adventures(parent, args, ctx, info) {
  //   const adventures = await ctx.db.query.adventures();
  //   return adventures;
  // },
  users: forwardTo('db'),
  adventures: forwardTo('db'),
  adventure: forwardTo('db'),
  adventuresConnection: forwardTo('db')
};

module.exports = Query;
