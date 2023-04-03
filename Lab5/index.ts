import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";

const app: Koa = new Koa();
const router: Router = new Router();

const customErrorMessage: CustomErrorMessageFunction = (
 _ctx: RouterContext,
 value: string
) => {
 return (
 `The name must be between 3 and 20 ` +
   `characters long but received length ${value.length}`
 );
};

const result = validationResults(ctx);
 if (result.hasErrors()) {
 ctx.status = 422;
 ctx.body = { err: result.mapped() }
 } else {
 ctx.body = { msg: `Hello world! ${ctx.query.name}` };
 }
 await next();

const validatorName = [
 body("name").isLength({ min: 3
}).withMessage(customErrorMessage).build(),
 body("id").isInt({ min: 10000, max: 20000 }).build()
]

let films = Array()
films = [{FilmTitle: "Harry Potter 1",Year:"1990"},
               {FilmTitle: "Harry Potter 2",Year:"1992"},
               {FilmTitle: "Harry Potter 3",Year:"1994"}]

router.get('/', query("name")
 .isLength({ min: 3 }).optional()
 .withMessage(customErrorMessage)
 .build(),
           async (ctx: RouterContext, next: any) => {
             ctx.body = { films };
             await next();
});

router.post('/', ...validatorName, async (ctx: RouterContext, next: any) => {
  const data = ctx.request.body;
  ctx.body = data;
  films.push(data);
  console.log(data);
 await next();
});

router.put('/', async (ctx: RouterContext, next: any) => {
  ctx.body = { films };
  await next();
  });

app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: RouterContext, next: any) => {
 try {
 await next()
 if (ctx.status === 404) {
 ctx.status = 404;
 ctx.body = { err: "No such endpoint existed" }
 }
 } catch (err: any) {
 ctx.body = { err: err }
 }
})
app.listen(10001, () => {
 console.log("Koa Started");
})