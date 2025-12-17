// filepath: my-fitness-project/my-fitness-project/src/server/services/nutritionApi.js
const axios = require('axios');
require('dotenv').config();

const NUTRITION_API_URL = 'https://api.nutritionix.com/v1_1/search';
const APP_ID = process.env.NUTRITION_APP_ID;
const APP_KEY = process.env.NUTRITION_APP_KEY;

const getNutritionInfo = async (foodItem) => {
    try {
        const response = await axios.get(`${NUTRITION_API_URL}/${foodItem}`, {
            params: {
                appId: APP_ID,
                appKey: APP_KEY,
                fields: 'item_name,nutritional_info'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nutrition information:', error);
        throw error;
    }
};

module.exports = {
    getNutritionInfo
};