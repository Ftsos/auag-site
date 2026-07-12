import type { Core } from '@strapi/strapi';

const PUBLIC_POST_ACTIONS = ['api::post.post.find', 'api::post.post.findOne'] as const;

async function setPublicPostPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found; skipping post permission setup.');
    return;
  }

  const existingPermissions = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });

  const existingActions = new Set(existingPermissions.map((permission) => permission.action));

  for (const action of PUBLIC_POST_ACTIONS) {
    if (existingActions.has(action)) {
      continue;
    }

    await strapi.query('plugin::users-permissions.permission').create({
      data: {
        action,
        role: publicRole.id,
      },
    });
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPostPermissions(strapi);
  },
};
