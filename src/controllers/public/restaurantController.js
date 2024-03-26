import sequelize from "../../models/connection.js";
import initModels from '../../models/init-models.js';
import {baseResponse} from "../../config/response.js";

const model = initModels(sequelize);

const getRestaurantList = async (req, res) => {
    try {
        const DEFAULT_LIMIT = 10;
        const DEFAULT_OFFSET = 1;
        const limit = (req.query.limit ?? DEFAULT_LIMIT ) * 1;
        const {count, rows: restaurants} = await model.restaurants.findAndCountAll({
            limit,
            offset: limit * ((req.query.page ?? DEFAULT_OFFSET) - 1) ,
        })

        baseResponse(res, "Thành công", 200, {
            restaurants,
            pagination: {
                count,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

const getRestaurantDetail = async (req, res) => {
    try {
        const restaurant =
            await model.restaurants.findByPk(req.params['resId'], null);

        if(!restaurant)
            return baseResponse(res, "Không tìm thấy dữ liệu", 404);

        baseResponse(res, "Thành công", 200, restaurant);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

export {
    getRestaurantList,
    getRestaurantDetail
}