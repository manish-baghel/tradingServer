import express from "express";
import compression from "compression";
import * as http from "http";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";

import redis from "redis";

import env from "./env";

const app = express();
const environment = env.ENV;

app.use(compression());
app.use(cors()); // Please add a whitelist object in cors args

const PORT = process.env.PORT || env.PORT || 8080;
let server;
switch (environment) {
  case "dev":
    server = http.createServer(app);
    break;
  // PROD and stuff....
  case "default":
    server = http.createServer(app);
}

// Redis client
export const redisClient = redis.createClient();
redisClient.on("error", (err) => {
  console.log("Error in redis connection: \n", err);
});

import "./service/requestService";
import {getReqCounter, getReqRes, getReqTime, increaseReqCounter, setReqTime} from "./service/cacheService";
// Logging Middleware ( Please shift it somewhere else)

app.use((err, req, res, next) => {
  if (err) {
    console.log("Error: ", err);
    res.status(err.output.statusCode).json({status: false, msg: err});
    res.end();
  }
});

// for testing increment
app.get("/", async (req, res) => {
  let lastTimeStamp = await getReqTime("dummyReq");
  let prevCounter =  await getReqCounter("dummyReq");
  let msg=""
  if(!prevCounter){
    await increaseReqCounter("dummyReq");
    await setReqTime("dummyReq");
  }else if(Date.now() - parseInt(lastTimeStamp) < 2000){
    msg = `Not Increasing request Counter for dummyReq as time diff is ${Date.now() - parseInt(lastTimeStamp)}`
  }else {
    await increaseReqCounter("dummyReq");
    await setReqTime("dummyReq");
    msg = `Increasing request Counter for dummyReq as time diff is ${Date.now() - parseInt(lastTimeStamp)}`
  }
  let resp = await getReqCounter("dummyReq");
  res.send(
    "<html><head><title>Page" +
      "</title><head><body><h1>Testing Request Counter Increment and timestamp</h1>" +
      "<h2>Redis count: " +
      resp +
      "</h2> Message: " + msg +
      "</body></html>"
  );
  res.end();
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("========= app.js(error in starting server) ===========");
    console.log(err);
    return;
  }
  console.log(`Starting server on ${env.SERVER_URL}:${env.PORT} for ${environment}`);
});
