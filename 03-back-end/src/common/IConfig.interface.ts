import IRouter from "./IRouter.interface";

export  interface IMailConfiguration{
      host: string,
      port: number,
      email: string,
      password: string,
      debug: boolean
}
export default interface IConfig {
  server: {
    port: number;
    static: {
      index: string | false;
      dotfiles: "allow" | "deny";
      cacheControl: boolean;
      etag: boolean;
      maxAge: number;
      route: string;
      path: string;
    };
  };
  logging: {
    path: string;
    fileName: string;
    format: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    charset: string;
    timezone: string;
  };
  routers: IRouter[],
  mail: IMailConfiguration
}
