//
const router = {
  /**
  * test2
  * @param
  *
  * @return
  */
  test2: async function (
    req: any, res: any, env: any, client: any
  ): Promise<Response>
  {
    console.log("#test.test2");
    try{
      const resulte = await client.execute("SELECT * FROM todos LIMIT 100");
//console.log(resulte.rows);
      return Response.json({
        ret: "OK", data: resulte.rows,
      });
    } catch (e) {
      console.error(e);
      return Response.json({
        ret: "NG", data: [],
      });
    } 
  },
  /**
  * create
  * @param
  *
  * @return
  */
  create: async function (
    req: any, res: any, env: any, client: any
  ): Promise<Response>
  {
//    console.log("#test.create");
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
console.log(req);
        const sql = `
        INSERT INTO todos (title, content, userId) VALUES(
        '${req.title}' , '${req.content}' , 0
        )
        `;
  console.log("sql=", sql);
        const resulte = await client.execute(sql);
      }      
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  update: async function (req: any, res: any, env: any): Promise<Response>
  {
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        `;
      }                
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },
  /**
  *
  * @param
  *
  * @return
  */ 
  delete: async function (req: any, res: any, env: any): Promise<Response>
  {
//    console.log("#test.delete");
//    console.log(req);
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        DELETE FROM Customers WHERE id = ${req.id}
        `;
        //console.log(sql);
      }            
      return Response.json({ret: "OK", data: req});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },    
  /**
  *
  * @param
  *
  * @return
  */
  get: async function (
    req: any, res: any, env: any, client: any
  ): Promise<Response>
  {
//    console.log(req);
    let item = {};
    let result: any = {}; 
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (req) {
        const sql = `
        SELECT * FROM todos ORDER BY id desc
        LIMIT 100
        `;
        const resulte = await client.execute(sql);
//console.log(result.results);
        if(resulte.rows < 1) {
          console.error("Error, results.length < 1");
          throw new Error('Error , get');
        }
//        item = result.results[0];
      }      
      return Response.json({ret: "OK", data: item});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  }, 
  /**
  *
  * @param
  *
  * @return
  */ 
  get_list: async function (
    req: any, res: any, env: any, client: any
  ): Promise<Response>
  {
//    console.log(req);
    let item = {};
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      let result: any = {};  
      const sql = `
      SELECT * FROM todos ORDER BY id desc
      LIMIT 100
      `;
      const resulte = await client.execute(sql);
      //console.log(resulte.rows);
      if(resulte.rows < 1) {
        console.error("Error, results.length < 1");
      }
      return Response.json({ret: "OK", data: resulte.rows});
    } catch (e) {
      console.error(e);
      return Response.json(retObj);
    } 
  },   
}
export default router;
