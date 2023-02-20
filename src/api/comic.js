import axios from "@/api/http"
/**
 * 漫画章节内容图片&索引
 * epId
 */ 
export function getGetImageIndex(params){
    return axios({
        url:"/GetImageIndex",
        method:'get',
        params
    })
}
/**
 * 漫画章节内容图片Token
 * 
*/
export function getImageToken(params){
    return axios({
        url:"/ImageToken",
        method:'get',
        params
    })
}