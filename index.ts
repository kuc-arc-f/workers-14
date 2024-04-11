import { Client as LibsqlClient, createClient } from "@libsql/client/web";
import Router from './src/Router';
//
export interface Env {
    LIBSQL_DB_URL?: string;
    LIBSQL_DB_AUTH_TOKEN?: string;
}
export default {
  async fetch(
    request: Request, 
    env: Env, 
    ctx: ExecutionContext
  ): Promise<Response> {
    const client = buildLibsqlClient(env);

    try {
      const { pathname } = new URL(request.url);
      const errorObj = {ret: "NG", messase: "Error"};
      //
      if (request.method === "POST") {
        const json: any = JSON.stringify(await request.json());
        const reqObj: any = JSON.parse(json);
        const res = await Router.route(pathname, reqObj, Response, env, client);
        return res;	
      }
      if (request.method === "GET") {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error executing SQL query:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500
      });
    }
  },
};
//
function buildLibsqlClient(env: Env): LibsqlClient {
  const url = env.LIBSQL_DB_URL?.trim();
  if (url === undefined) {
    throw new Error("LIBSQL_DB_URL env var is not defined");
  }

  const authToken = env.LIBSQL_DB_AUTH_TOKEN?.trim();
  if (authToken == undefined) {
    throw new Error("LIBSQL_DB_AUTH_TOKEN env var is not defined");
  }

  return createClient({ url, authToken })
}
/*
      const data = [
        {id: 1, title: "t1"},
        {id: 2, title: "t2"},
      ];
*/