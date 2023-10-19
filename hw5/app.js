import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("blog.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

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

function query(sql) {
  let list = []
  for (const [id, title, body] of db.query(sql)) {
    list.push({id, title, body})
  }
  return list
}

async function list(ctx) {
  let posts = query("SELECT id, title, body FROM posts")
  console.log('list:posts=', posts)
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function search(ctx) {
    ctx.response.body = await render.search();
}

async function show(ctx) {
  const pid = ctx.params.id;
  let posts = query(`SELECT id, title, body FROM posts WHERE id=${pid}`)
  let post = posts[0]
  console.log('show:post=', post)
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
    console.log('create:post=', post)
    db.query("INSERT INTO posts (title, body) VALUES (?, ?)", [post.title, post.body]);
    ctx.response.redirect('/');
  }
}

async function find(ctx) {
    const body = ctx.request.body();
    if (body.type === "form") {
      const pairs = await body.value;
      const searchTerm = pairs.get('name');
      const results = [];
      let posts = query("SELECT id, title, body FROM posts")
  
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

let port = parseInt(Deno.args[0])
console.log(`Server run at http://127.0.0.1:${port}`)
await app.listen({ port });
