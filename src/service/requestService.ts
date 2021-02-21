import {getReqRes, setReqRes} from "./cacheService";



setReqRes("dummyRequest",'{"json":"valid"}').then((resp) => {
  console.log(resp);
  getReqRes("dummyRequest").then((resp) => {
    console.log(resp);
  })
})
