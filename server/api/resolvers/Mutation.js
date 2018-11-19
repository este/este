// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import validateAuth from '../../../validate/validateAuth';
import validateCreateWeb from '../../../validate/validateCreateWeb';
import validateSetPageTitle from '../../../validate/validateSetPageTitle';
import validateSetWebName from '../../../validate/validateSetWebName';
import type { Mutation as MutationType } from '../__generated__/api.graphql';

const Mutation: MutationType = {
  auth: async ({ input }, info, { db }) => {
    const errors = validateAuth(input);
    if (errors) return { errors };
    const createAuthPayload = user => ({
      token: jsonwebtoken.sign(
        { userId: user.id },
        process.env.API_SECRET || '',
      ),
    });
    if (input.isSignUp) {
      const exists = await db.exists.User({ email: input.email });
      if (exists)
        return {
          errors: {
            email: 'ALREADY_EXISTS',
          },
        };
      const password = await bcrypt.hash(input.password, 10);
      const user = await db.mutation.createUser({
        data: { email: input.email, password },
      });
      return createAuthPayload(user);
    }
    const user = await db.query.user({
      where: { email: input.email },
    });
    if (!user)
      return {
        errors: { email: 'NOT_EXISTS' },
      };
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid)
      return {
        errors: { password: 'WRONG_PASSWORD' },
      };
    return createAuthPayload(user);
  },

  // Note the resolver is as minimal as possible. No userId? Return null. Easy.
  // Permissions are defined in server/api/permissions by graphql-shield.
  createWeb: async ({ input }, info, { userId, db }) => {
    if (userId == null) return null;
    const errors = validateCreateWeb(input);
    if (errors) return { errors };

    // Fetch seed data first.

    const view = await db.query.component({
      where: { name: 'View' },
    });

    const text = await db.query.component({
      where: { name: 'Text' },
    });

    if (view == null || text == null) throw Error('Missing seed data.');

    // Note we have to create Web to get its ID for further mutations.
    // TODO: All mutations in one transaction.
    // https://github.com/prisma/prisma/issues/74

    const web = await db.mutation.createWeb({
      data: {
        name: input.name,
        creator: { connect: { id: userId } },
      },
    });

    const colorBackground = await db.mutation.createColorValue({
      data: {
        web: { connect: { id: web.id } },
        name: 'background',
        r: 250,
        g: 250,
        b: 250,
      },
    });

    const colorForeground = await db.mutation.createColorValue({
      data: {
        web: { connect: { id: web.id } },
        name: 'foreground',
        r: 51,
        g: 51,
        b: 51,
      },
    });

    // const colorLink = await db.mutation.createColorValue({
    //   data: {
    //     web: { connect: { id: web.id } },
    //     name: 'link',
    //     r: 34,
    //     g: 139,
    //     b: 230,
    //   },
    // });

    const colorGray = await db.mutation.createColorValue({
      data: {
        web: { connect: { id: web.id } },
        name: 'gray',
        r: 170,
        g: 170,
        b: 170,
      },
    });

    const spaceSmall = await db.mutation.createDimensionValue({
      data: {
        web: { connect: { id: web.id } },
        name: 'space-small',
        unit: 'POINT',
        value: 12,
      },
    });

    const spaceMedium = await db.mutation.createDimensionValue({
      data: {
        web: { connect: { id: web.id } },
        name: 'space-medium',
        unit: 'POINT',
        // The same as lineHeight for rhythm.
        value: 24,
      },
    });

    const pageStyle = await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        name: 'page',
        flex: 1,
        backgroundColor: { connect: { id: colorBackground.id } },
      },
    });

    const containerStyle = await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        name: 'container',
        maxWidth: {
          create: {
            web: { connect: { id: web.id } },
            unit: 'POINT',
            value: 768,
          },
        },
        width: {
          create: {
            web: { connect: { id: web.id } },
            unit: 'PERCENTAGE',
            value: 100,
          },
        },
        marginHorizontal: {
          create: {
            web: { connect: { id: web.id } },
            unit: 'KEYWORD',
            value: 1,
          },
        },
        paddingHorizontal: {
          connect: { id: spaceSmall.id },
        },
      },
    });

    const textStyle = await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        name: 'text',
        isText: true,
        // $font-family-sans-serif
        // https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
        fontSize: 16,
        lineHeight: 24,
        color: { connect: { id: colorForeground.id } },
        marginBottom: { connect: { id: spaceMedium.id } },
      },
    });

    const h1Style = await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        spreadStyles: {
          create: { index: 0, style: { connect: { id: textStyle.id } } },
        },
        name: 'h1',
        fontSize: 32,
        lineHeight: 48,
      },
    });

    // const h2Style =
    await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        spreadStyles: {
          create: { index: 0, style: { connect: { id: textStyle.id } } },
        },
        name: 'h2',
        fontSize: 24,
        lineHeight: 36,
      },
    });

    await db.mutation.createStyle({
      data: {
        web: { connect: { id: web.id } },
        spreadStyles: {
          create: { index: 0, style: { connect: { id: textStyle.id } } },
        },
        name: 'quote',
        color: { connect: { id: colorGray.id } },
        fontStyle: 'ITALIC',
      },
    });

    const page = await db.mutation.createPage({
      data: {
        web: { connect: { id: web.id } },
        creator: { connect: { id: userId } },
        title: input.pageTitle,
        element: {
          create: {
            web: { connect: { id: web.id } },
            component: { connect: { id: view.id } },
            props: {
              create: [
                {
                  name: 'style',
                  type: 'VIEW_STYLE',
                  valueStyle: { connect: { id: pageStyle.id } },
                },
              ],
            },
            index: 0,
            type: 'BLOCK',
            children: {
              create: [
                {
                  web: { connect: { id: web.id } },
                  component: { connect: { id: view.id } },
                  props: {
                    create: [
                      {
                        name: 'style',
                        type: 'VIEW_STYLE',
                        valueStyle: { connect: { id: containerStyle.id } },
                      },
                    ],
                  },
                  index: 0,
                  type: 'BLOCK',
                  children: {
                    create: [
                      {
                        web: { connect: { id: web.id } },
                        component: { connect: { id: text.id } },
                        props: {
                          create: [
                            {
                              name: 'style',
                              type: 'TEXT_STYLE',
                              valueStyle: { connect: { id: h1Style.id } },
                            },
                          ],
                        },
                        index: 0,
                        type: 'BLOCK',
                        children: {
                          create: [
                            {
                              web: { connect: { id: web.id } },
                              component: { connect: { id: text.id } },
                              index: 0,
                              type: 'TEXT',
                              // $FlowFixMe JSON expects string for some reason.
                              textLeaves: [{ text: 'Title' }],
                            },
                          ],
                        },
                      },
                      {
                        web: { connect: { id: web.id } },
                        component: { connect: { id: text.id } },
                        props: {
                          create: [
                            {
                              name: 'style',
                              type: 'TEXT_STYLE',
                              valueStyle: { connect: { id: textStyle.id } },
                            },
                          ],
                        },
                        index: 1,
                        type: 'BLOCK',
                        children: {
                          create: [
                            {
                              web: { connect: { id: web.id } },
                              component: { connect: { id: text.id } },
                              index: 0,
                              type: 'TEXT',
                              // $FlowFixMe JSON expects string for some reason.
                              textLeaves: [{ text: 'Paragraph.' }],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    });

    return {
      pageId: page.id,
    };
  },

  deleteWeb: async ({ input }, info, { db }) => {
    const web = await db.mutation.deleteWeb({
      where: { id: input.id },
    });
    if (web == null) return null;
    return { web };
  },

  setTheme: async ({ input }, info, { userId, db }) => {
    if (userId == null) return null;
    const user = await db.mutation.updateUser({
      data: { themeName: input.themeName },
      where: { id: userId },
    });
    if (user == null) return null;
    return { user };
  },

  setPageTitle: async ({ input }, info, { db }) => {
    const errors = validateSetPageTitle(input);
    if (errors) return { errors };
    const page = await db.mutation.updatePage({
      where: { id: input.id },
      data: { title: input.title },
    });
    if (page == null) return null;
    return { page };
  },

  setWebName: async ({ input }, info, { db }) => {
    const errors = validateSetWebName(input);
    if (errors) return { errors };
    const web = await db.mutation.updateWeb({
      where: { id: input.id },
      data: { name: input.name },
    });
    if (web == null) return null;
    return { web };
  },

  setPageElement: async (/* args, info, { db } */) => {
    throw Error('TODO');
    // const page = await db.mutation.updatePage({
    //   where: { id: args.input.id },
    //   data: { content: args.input.content },
    // });
    // if (page == null) return null;
    // return { page };
  },

  deletePage: async ({ input }, info, { db }) => {
    const page = await db.mutation.deletePage({
      where: { id: input.id },
    });
    if (page == null) return null;
    return { page };
  },
};

export default Mutation;
