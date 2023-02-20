import axios from "@/api/http"
/**
 * 启动首屏广告
 * 
*/
export function getListFlash() {
    return axios({
        url: "/ListFlash",
        method: "get",
    })
}
/**
 * 
 * 
 */
export function getUCenterConf() {
    return axios({
        url: "/UCenterConf",
        method: "get"
    })
}