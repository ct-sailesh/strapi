'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vehicle.vehicle', ({ strapi }) => ({
  async create(ctx) {
    const { name, category } = ctx.request.body.data;
    let price = 0;
    try {
      console.log(ctx.request.body.data);

      price = await strapi.service('api::vehicle.vehicle-price').getPriceForVehicle(name);
    } catch (error) {
      console.error('Error fetching price:', error.message);
    }

    if (price) {
      ctx.request.body.data.Price = price;
    }

    const vehicle = await strapi.entityService.create('api::vehicle.vehicle', {
      data: ctx.request.body.data,
    });

    return vehicle;
  },
}));
