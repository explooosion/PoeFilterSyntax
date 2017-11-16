'use strict';

// koa
import Koa from 'koa';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

// unit
import middleware from './middleware';
import routes from './routes';
import env from './config/env';
import open from 'open';

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(mount("/", convert(serve(__dirname + '/public/'))));

app.use(views(__dirname + '/view/', {
    // extension: 'ejs'
    // extension: 'pug'
    extension: 'html' // use Angular4
}));

app.use(middleware())
app.use(routes());

app.listen(env.port,
    () => {
        console.log(`✅  The server is running at http://localhost:${env.port}/`);
        // open(`http://localhost:${env.port}/`);
    }
)

export default app