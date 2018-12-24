const Mutations = {
  async createUser(parent, args, ctx, info) {
    // TODO: Check if user is logged in

    const user = await ctx.db.mutation.createUser(
      {
        data: { ...args }
      },
      info
    );

    return user;
  },

  async createAdventure(parent, args, ctx, info) {
    const adventure = await ctx.db.mutation.createAdventure(
      {
        data: { ...args }
      },
      info
    );

    return adventure;
  }
};

module.exports = Mutations;
