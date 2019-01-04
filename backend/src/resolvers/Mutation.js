const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createAdventure(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    const adventure = await ctx.db.mutation.createAdventure(
      {
        data: {
          // This is how to create a relationship between the Item and the User
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
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
    const adventure = await ctx.db.query.adventure(
      { where },
      `{ id title user { id } }`
    );
    // Check if user has permission to delete the adventure
    if (adventure.user.id !== ctx.request.userId) {
      throw new Error('You do not have the permission to delete this item!');
    }
    // Delete the adventure
    return ctx.db.mutation.deleteAdventure({ where }, info);
  },

  async signUp(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Return the user to the browser
    return user;
  },

  async signIn(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. Return the user
    return user;
  },

  async signOut(parent, { id }, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  }
};

module.exports = Mutations;
