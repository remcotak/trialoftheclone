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
  },

  async updateAdventure(parent, args, ctx, info) {
    // Take a copy of the updates
    const updates = { ...args };
    // Then delete the id, since we dont want to update that
    delete updates.id;
    // Run the update mutation
    const adventure = await ctx.db.mutation.updateAdventure(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );

    return adventure;
  },

  async deleteAdventure(parent, args, ctx, info) {
    const where = { id: args.id };
    // Find the adventure
    const adventure = await ctx.db.query.adventure({ where }, `{ id title}`);
    // Check if user has permission to delete the adventure
    // TODO:
    // Delete the adventure
    return ctx.db.mutation.deleteAdventure({ where }, info);
  }
};

module.exports = Mutations;
