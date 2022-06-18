import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import { DevConfig } from "./configs";
import * as fs from "fs";
import * as morgan from "morgan";
import IApplicationResources from "./common/IAplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import ItemService from './components/item/ItemService.service';
import CategoryService from './components/category/CategoryService.service';
import BandTypeService from './components/band-type/BandTypeService.service';
import AdministratorService from "./components/administrator/AdministratorService.service";
import { builtinModules } from "module";
import UserService from "./components/user/UserService.service";

async function main() {
  const config: IConfig = DevConfig;

  fs.mkdirSync(config.logging.path, {
    mode: 0o755,
    recursive: true,
  });

  const db = await mysql2.createConnection({
    host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      charset: config.database.charset,
      timezone: config.database.timezone,
  });

  const applicationResources: IApplicationResources = {
    databaseConnection: db,
    services: {
      category: null,
      bandType: null,
      item: null,
      administrator: null,
      user: null
    }
  };

  applicationResources.services.category = new CategoryService(applicationResources);
  applicationResources.services.item = new ItemService(applicationResources);
  applicationResources.services.bandType = new BandTypeService(applicationResources);
  applicationResources.services.administrator = new AdministratorService(applicationResources);
  applicationResources.services.user = new UserService(applicationResources);


  const application: express.Application = express();

  application.use(
    morgan(config.logging.format, {
      stream: fs.createWriteStream(
        config.logging.path + "/" + config.logging.fileName,
        { flags: "a" }
      ),
    })
  );

  application.use(cors());
  application.use(express.json());

  application.use(
    config.server.static.route,
    express.static(config.server.static.path, {
      index: config.server.static.index,
      dotfiles: config.server.static.dotfiles,
      cacheControl: config.server.static.cacheControl,
      etag: config.server.static.etag,
      maxAge: config.server.static.maxAge,
    })
  );

  for (const router of config.routers) {
    router.setupRoutes(application, applicationResources);
  }

  application.get("/about", (req, res) => {
    res.send("<h1>Ovo je tekst o nama</h1>");
  });

  application.use((req, res) => {
    res.sendStatus(404);
  });

  application.listen(config.server.port);
}

process.on("uncaughtException", (error) => {
  console.error("ERROR:", error);
});


main();
