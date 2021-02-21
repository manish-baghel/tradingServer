import {redisClient} from "../app";
import {promisify} from "util";

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);
export const incrAsync = promisify(redisClient.incr).bind(redisClient);

export const setReqRes = async (reqAlias, res) => {
  let resp;
  try {
    resp = await setAsync(reqAlias, res);
    return resp;
  } catch (error) {
    console.log("Error in setting response for req alias :", reqAlias, "\n Error:", error);
    return;
  }
};
export const getReqRes = async (reqAlias) => {
  let resp;
  try {
    resp = await getAsync(reqAlias);
    return resp;
  } catch (error) {
    console.log("Error in getReqRes redis service layer: ", error);
    return;
  }
};

export const increaseReqCounter = async (reqAlias) => {
  let resp;
  try {
    resp = await incrAsync(`${reqAlias}Counter`);
    return resp;
  } catch (err) {
    console.log("Error in increaseReqCounter redis service layer: ", err);
  }
};

export const getReqCounter = async (reqAlias) => {
  let resp;
  try {
    resp = await getAsync(`${reqAlias}Counter`);
    return resp;
  } catch (err) {
    console.log("Error in getReqCounter: ", err);
    return;
  }
};

export const setReqTime = async (reqAlias) => {
  let resp;
  try{
    resp = await setAsync(`${reqAlias}Timestamp`, Date.now().toString());
    return resp;
  }catch(err){
    console.log("Error in setReqTime: ", err);
    return 
  }
};


export const getReqTime = async (reqAlias) => {
  let resp;
  try{
    resp = await getAsync(`${reqAlias}Timestamp`);
    return resp;
  }catch(err){
    console.log("Error in getReqTime: ", err);
    return 
  }
};
