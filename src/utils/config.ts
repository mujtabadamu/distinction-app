interface Config {
  API_BASE_URL: string;
  UMS_BASE_URL: string;
  FLEXISAF_AI_URL?: string;
}

const config: { [key: string]: Config } = {
  development: {
    API_BASE_URL: 'https://api.saflearn.flexisafapps-dev.com',
    UMS_BASE_URL: 'http://ums-api.common.flexisaf-dev.com',
    FLEXISAF_AI_URL: 'https://api.flexisafai.flexisafapps-dev.com',
  },
  staging: {
    API_BASE_URL: 'https://saflearn-api.product.flexisaf-stage.com',
    UMS_BASE_URL: 'https://ums-api.component.flexisaf-stage.com',
    FLEXISAF_AI_URL: 'https://api.flexisafai.flexisafapps-dev.com',
  },
  production: {
    API_BASE_URL: 'https://api.saflearn.com',
    UMS_BASE_URL: 'https://ums-api.component.flexisaf.com',
    FLEXISAF_AI_URL: 'https://api.flexisafai.flexisafapps-dev.com',
  },
};

const urls =
  config[process.env.REACT_APP_ENV ?? process.env.NODE_ENV ?? 'development'];

export default urls;
