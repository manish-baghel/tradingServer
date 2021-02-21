import yenv from "yenv";

const environment = process.env.ENV || 'dev';
const getEnv = (environment)=>{
    const sessionVariables = yenv("settings.yaml", { env: environment});
    return sessionVariables;
}

const env = getEnv(environment);

export default env;
