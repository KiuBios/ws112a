import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [
  {id:0, title:'陶大隻', body:'0123456789'},
  {id:1, title:'陶阿甘', body:'0234146879'}
];

const router = new Router();

router.get('/', list)
  .get('/contact/search', search)
  .get('/contact/new', add)
  .get('/contact/:id', show)
  .post('/contact', create)
  .post('/search', find);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function search(ctx) {
  ctx.response.body = await render.search();
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('post=', post)
    const id = posts.push(post) - 1;
    post.id = id;
    ctx.response.redirect('/');
  }
}

async function find(ctx) {
  const body = ctx.request.body();
  if (body.type === "form") {
    const pairs = await body.value;
    const searchTerm = pairs.get('name');
    const results = [];

    for (const post of posts) {
      if (post.title.includes(searchTerm)) {
        results.push(post);
      }
    }

    if (results.length > 0) {
      const resultHtml = results.map(post => `<h1>Name：${post.title}</h1><p>Tel：${post.body}</p>`).join('');
      ctx.response.body = await render.found(resultHtml);
    } else {
      ctx.response.body = await render.not_found();
    }
  }
}


console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
