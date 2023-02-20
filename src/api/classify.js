import axios from "@/api/http"
/**
 * 分类筛选条件
 *  接口AllLabel
 * 无参数
*/
export function getClassifyConditions(){
    return axios({
        url:'/AllLabel',
        method:'get'
    })
}
/**
 * ClassPage
 * 分类筛选结果列表
*/
export function getClassifyResults(params){
    return axios({
        url:'/ClassPage',
        method:'get',
        params
    })
}