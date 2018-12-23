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
  }
};

module.exports = Mutations;
