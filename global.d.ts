declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      MONGODB_URI: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}
export {};
