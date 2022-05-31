import "dotenv/config";
// import "module-alias/register";
// import "tsconfig-paths";
// import fs from "fs";
import path from "path";
// import cjson from "comment-json";
// import * as path_map from "tsconfig-paths";
import Fastify from "fastify";
import type { AddressInfo } from "net";
// import type TsConfig from "tsconfig.json";

// const tsconfig: typeof TsConfig = cjson.parse(
//   fs.readFileSync(path.join(__dirname, "tsconfig.json")).toString()
// ) as any;
// const pathsAlias = tsconfig.compilerOptions.paths;
// const paths = Object.entries(pathsAlias).reduce(
// 	(prev, curr) => ({
// 		...prev,
// 		[opts.prefix + curr[0]]: curr[1],
// 	}),
// 	{} as { [key: string]: string[] }
// );
// const unreg_path_map = path_map.register({
//   baseUrl: './',
//   paths: tsconfig.compilerOptions.paths,
// });

const app = Fastify({ logger: true });
async function start() {
  app.register(import("@fastify/swagger"), {
    routePrefix: "/api/docs",
    swagger: {
      info: {
        title: "API Documentations",
        version: "0.0.1",
      },
    },
    exposeRoute: true,
  });

  app.register(import("./plugin/v1/mail"), {
    url: process.env.URL_MAIL,
  } as any);

  app.register(import("@fastify/autoload"), {
    dir: path.join(__dirname, "api"),
    options: {
      prefix: "/api",
    },
  });

  try {
    await app.listen(5000);

    const address = app.server.address() as AddressInfo;

    console.log(`server running at ${address.address}:${address.port}`);
    console.log(app.printRoutes());
  } catch (error) {
    console.log(error);
    app.log.error(error);
    // unreg_path_map();
    process.exit(1);
  }
}

start();
