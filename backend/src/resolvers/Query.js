const Query = {
  async users(parent, args, ctx, info) {
    const users = await ctx.db.query.users();
    return users;
  },

  async adventures(parent, args, ctx, info) {
    const adventures = await ctx.db.query.adventures();
    return adventures;
  }
};

module.exports = Query;
