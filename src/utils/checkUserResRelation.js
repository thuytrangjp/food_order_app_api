import initModels from "../models/init-models.js";
import sequelize from "../models/connection.js";

const model = initModels(sequelize);

export const checkUserResRelation = async (userId, resId, checkLike, checkRating) => {
    const relation = {
        user_id: userId,
        res_id: resId
    }
    let hasLiked, hasRated;
    if (checkLike){
        hasLiked = await model.like_res.count({where: relation});
    }
    if (checkRating){
        hasRated = await model.rate_res.count({where: relation});
    }
    return {
        userId,
        resId,
        hasLiked: hasLiked,
        hasRated: hasRated,
    };
}