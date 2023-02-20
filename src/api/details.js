import axios from "@/api/http";
/**
 * 漫画详情&章节列表
 * 
*/
export function getComicDetail(params){
    return axios({
        url:'/ComicDetail',
        method:'get',
        params
    })
}

/**
 *  更多漫画推荐 
 *  
 */
export function getMoreRecommend(params){
    return axios({
        url:'/MoreRecommend',
        method:'get',
        params
    })
}
/**
 * GetReviewDetailByComicID
 * 精选漫画点评
*/
export function getGetReviewDetailByComicID(params){
    return axios({
        url:"/GetReviewDetailByComicID",
        method:'get',
        params
    })
}
/**
 * 漫画点评列表 
 */
export function getReplyMain(params){
    return axios({
        url:'/ReplyMain',
        method:'get',
        params
    })
}

/**
 * 漫画点评列表
 * 
 */
export function getListReviews(params){
    return axios({
        url:'/ListReviews',
        method:'get',
        params
    })
}

/**
 * 漫画评论回复列表
 * 
*/
export function getReplyDetail(params){
    return axios({
        url:'/ReplyDetail',
        method:'get',
        params
    })
}