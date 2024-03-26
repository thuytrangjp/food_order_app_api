import sequelize from "../../models/connection.js";
import initModels from '../../models/init-models.js';
import {getUserIdByHeaderToken} from "../../config/jwt.js";
import {baseResponse} from "../../config/response.js";
import {checkUserResRelation} from "../../utils/checkUserResRelation.js"
const model = initModels(sequelize)

const postRateRestaurant = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        const rating = req.body['amount'];
        if (!userId)
            return baseResponse(res, "Không có quyền", 401);

        if (!rating || Number.isNaN(rating))
            return baseResponse(res, "Yêu cầu không hợp lệ", 400);

        const { hasRated } =
            await checkUserResRelation(userId, req.params['resId'], false, true);

        if (hasRated)
            return baseResponse(res, "Đã đánh giá", 400);

        const data = await model.rate_res.create({
            user_id: userId,
            res_id: req.params['resId'],
            amount: rating,
            date_like: new Date()
        });

        baseResponse(res, "Thành công", 200, data);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

const getRatedResList = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        if (!userId) {
            return baseResponse(res, "Không có quyền", 401);
        }

        const DEFAULT_LIMIT = 10;
        const DEFAULT_OFFSET = 1;
        const limit = (req.query.limit ?? DEFAULT_LIMIT ) * 1;
        const {count, rows: restaurants} =
            await model.rate_res.findAndCountAll({
                where: {
                    user_id: userId
                },
                include: ['re'],
                limit,
                offset: limit * ((req.query.page ?? DEFAULT_OFFSET) - 1),
            })

        baseResponse(res, "Thành công", 200, {
            restaurants: restaurants.map((e) => ({...e['re']['dataValues'], amount: e['amount']})),
            pagination: {
                count,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

export {
    postRateRestaurant,
    getRatedResList
}