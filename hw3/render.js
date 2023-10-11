export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
        }
    
        h1 {
          font-size: 2em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(posts) {
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title }</h2>
        <p><a href="/contact/${post.id}">Detailed</a></p>
      </li>
      `)
    }
    let content = `
    <h1>Contacts</h1>
    <p>You have <strong>${posts.length}</strong> contacts!</p>
    <p><a href="/contact/search">Query Contact person</p>
    <p><a href="/contact/new">Create a Contact</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Directory', content)
  }
  
  export function newPost() {
    return layout('New Contact', `
    <h1>New Contact</h1>
    <p>Create a new contact.</p>
    <form action="/contact" method="post">
      <p><input type="text" placeholder="Name" name="title"></p>
      <p><textarea placeholder="Detailed" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
  }

  export function search() {
    return layout('Query Contact person', `
    <h1>Query Contact person</h1>
    <form action="/search" method="post">
      <p><input type="text" placeholder="Name" name="name" required></p>
      <p><input type="submit" value="Search"></p>
    </form>
    `)
  }

  export function found(resultHtml) {
    return layout('Search results', `
      <h1>Query Contact person</h1>
      <form action="/search" method="post">
        <p><input type="text" placeholder="Name" name="name"></p>
        <p><input type="submit" value="Search"></p>
      </form>
      ${resultHtml}
    `);
  }
  
  
  export function not_found() {
    return layout('Search results',
      `
    <h1>Query Contact person</h1>
    <form action="/search" method="post">
      <p><input type="text" placeholder="Name" name="name"></p>
      <p><input type="submit" value="Search"></p>
    </form>
    <h1>Not Found</h1>
    `,
    );
  }
  
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <pre>${post.body}</pre>
    `)
  }