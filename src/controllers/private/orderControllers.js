import sequelize from "../../models/connection.js";
import initModels from '../../models/init-models.js';
import {getUserIdByHeaderToken} from "../../config/jwt.js";
import {baseResponse} from "../../config/response.js";
const model = initModels(sequelize)

const postOrder = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        const foodId = req.body['foodId'];
        const amount = req.body['amount'];

        if (!userId)
            return baseResponse(res, "Không có quyền", 401);

        if (!foodId || !amount)
            return baseResponse(res, "Yêu cầu không hợp lệ", 400);

        const foods =
            await model.foods.findByPk(foodId, null);

        if (!foods)
            return baseResponse(res, "Không tìm thấy dữ liệu", 404);

        const data = await model.orders.create({
            user_id: userId,
            food_id: foodId,
            amount: amount,
            date_like: new Date()
        }).then(r => model.orders.findByPk(r.id, {
            include: ['food']
        }));

        baseResponse(res, "Thành công", 200, data);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

const getOrderList = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        if (!userId) {
            return baseResponse(res, "Không có quyền", 401);
        }

        const DEFAULT_LIMIT = 10;
        const DEFAULT_OFFSET = 1;
        const limit = (req.query.limit ?? DEFAULT_LIMIT ) * 1;
        const {count, rows: orders} =
            await model.orders.findAndCountAll({
                where: {
                    user_id: userId
                },
                include: ['food'],
                limit,
                offset: limit * ((req.query.page ?? DEFAULT_OFFSET) - 1),
            })

        baseResponse(res, "Thành công", 200, {
            orders: orders.map((e) => e),
            pagination: {
                count,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}


const getOrderDetail = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        const orderId = req.params['orderId'];
        if (!userId) {
            return baseResponse(res, "Không có quyền", 401);
        }
        if (!orderId) {
            return baseResponse(res, "Yêu cầu không hợp lệ", 400);
        }

        const data =
            await model.orders.findOne({
                where: {
                    user_id: userId,
                    id: orderId
                },
                include: ['food']
            })

        if (!data) {
            return baseResponse(res, "Không tìm thấy dữ liệu", 404);
        }

        baseResponse(res, "Thành công", 200, data);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

export {
    postOrder,
    getOrderList,
    getOrderDetail
}