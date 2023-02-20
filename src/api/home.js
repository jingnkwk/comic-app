import axios from "@/api/http";
import { Axios } from "axios";


/***
 * 推荐轮播图
 * 无参数
 */
export function getRecommendedBanner(){
    return axios({
        url:'/Banner',
        method:'get',
    })
}

/***
 * 推荐漫画列表
 * pageNum 
 * pageSize
 */
export function getRecommendedLists(params){
    return axios({
        url:'/HomeFeed',
        method:'get',
        params,
    })
}


/**
 * 首页Tab配置
 * 无参数
 * 
*/
export function getTabModule(){
    return axios({
        url:'/GetClassPageAllTabs',
        method:'get'
    })
}


/**
 * 首页Tab模块化页面布局列表
 * tabId
 * 
*/
export function getTabModulelist(params){
    return axios({
        url:'/GetClassPageLayout',
        method:'get',
        params
    })
}

/**
 * 男生女生数据
 * pageSize pageNum moduleId
*/
export function getSexComics(params){
    return axios({
        url:"/GetHomeSecondaryComics",
        method:'get',
        params
    })
}
/**
 *  模块化页面Banner
 *  接口GetClassPageHomeBanner
 * 参数 id
 */
export function getBanner(){
    return axios({
        url:'/GetClassPageHomeBanner',
        method:'get'
    })
}

/**
 * 模块化页面漫画列表 type=3 常规布局
 *参数有 isAll pageSize pageNum id 
 * */ 
export function getHomeConventional(params){
    return axios({
        url:'/GetClassPageSixComics',
        method:'get',
        params
    })
}

/**
 * 模块化页面潜力新作
 * id
 * 
*/
export function getHomeInnovation(params){
    return axios({
        url:'/GetClassPageComicsRank',
        method:'get',
        params
    })
}