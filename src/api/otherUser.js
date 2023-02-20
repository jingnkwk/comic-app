import axios from "@/api/http";


/**
 * 用户详情
 * 
 * */
export function getGetBaseSpaceInfo(params) {
    return axios({
        url: '/GetBaseSpaceInfo',
        method: 'get',
        params
    })
}
/**
 * Ta的漫画助攻
 * 
 */
export function getGetBestFavComic(params) {
    return axios({
        url: "/GetBestFavComic",
        method: "get",
        params
    })
}
/**
 * Ta的点评列表
 * 
 */
export function getGetReviews(params) {
    return axios({
        url: "/GetReviews",
        method: 'get',
        params
    })
}

/**
 * GetFavComics
 * */
export function getGetFavComics(params) {
    return axios({
        url: "/GetFavComics",
        method: 'get',
        params
    })
}