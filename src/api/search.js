import axios from "@/api/http";
/**
 * 搜索Banner
 * 无参数
*/
export function getSearchRecommend(params){
    return axios({
        url:'/SearchRecommend',
        method:'get',
        params
    })
}
/**
 * 搜索建议
 * SearchSug
*/
export function getAdvice(params){
    return axios({
        url:'/SearchSug',
        method:'get',
        params
    })
}

/**
 * 漫画搜索
 * Search
 */

export function getSearchContent(params){
    return axios({
        url:'/Search',
        method:'get',
        params
    })
}