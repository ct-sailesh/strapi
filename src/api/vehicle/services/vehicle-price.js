'use strict';

const axios = require('axios'); 

module.exports = {

  async fetchPrice(vehicleNumber) {
    try {
      // Example API call to an external service
      const response = await axios.get(`http://www.randomnumberapi.com/api/v1.0/randomnumber`);
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log("Price: "+response.data[0]);
        return response.data[0];  
      }
      if (response.data && response.data.price) {
        return response.data; 
      }
      throw new Error('Price not found for vehicle');
    } catch (error) {
      console.error('Error fetching price:', error.message);
      throw error;
    }
  },


  async getPriceForVehicle(vehicleNumber) {
    try {
      const price = await this.fetchPrice(vehicleNumber);
      return price;
    } catch (error) {
      console.error('Error getting price for vehicle:', error.message);
      return 0;  
    }
  },
};
