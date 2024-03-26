import sequelize from "../../models/connection.js";
import initModels from '../../models/init-models.js';
import {getUserIdByHeaderToken} from "../../config/jwt.js";
import {baseResponse} from "../../config/response.js";
import {checkUserResRelation} from "../../utils/checkUserResRelation.js"
const model = initModels(sequelize)

const postLikeRestaurant = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        if (!userId)
            return baseResponse(res, "Không có quyền", 401);

        const { hasLiked } =
            await checkUserResRelation(userId, req.params['resId'], true);

        if (hasLiked)
            return baseResponse(res, "Đã ấn like", 400);

        const data = await model.like_res.create({
            user_id: userId,
            res_id: req.params['resId'],
            date_like: new Date()
        });

        baseResponse(res, "Thành công", 200, data);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

const postUnlikeRestaurant = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        if (!userId) {
            return baseResponse(res, "Không có quyền", 401);
        }

        const resId = req.params['resId'];
        const restaurant =
            await model.restaurants.findByPk(resId, null);

        if (!restaurant)
            return baseResponse(res, "Không tìm thấy dữ liệu", 404);

        const { hasLiked } =
            await checkUserResRelation(userId, resId, true);

        if (!hasLiked)
            return baseResponse(res, "Chưa ấn like", 400);

        await model.like_res.destroy({
            where: {
                user_id: userId,
                res_id: req.params['resId']
            }
        });

        baseResponse(res, "Thành công", 201);
    } catch (e) {
        baseResponse(res, "Server Error", 500);
    }
}

const getLikedResList = async (req, res) => {
    try {
        const userId = getUserIdByHeaderToken(req);
        if (!userId) {
            return baseResponse(res, "Không có quyền", 401);
        }

        const DEFAULT_LIMIT = 10;
        const DEFAULT_OFFSET = 1;
        const limit = (req.query.limit ?? DEFAULT_LIMIT ) * 1;
        const {count, rows: restaurants} =
            await model.like_res.findAndCountAll({
            where: {
              user_id: userId
            },
            include: ['re'],
            limit,
            offset: limit * ((req.query.page ?? DEFAULT_OFFSET) - 1),
        })

        baseResponse(res, "Thành công", 200, {
            restaurants: restaurants.map((e) => e['re']),
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
    postLikeRestaurant,
    postUnlikeRestaurant,
    getLikedResList
}