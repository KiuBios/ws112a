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
    
        input[type=text],input[type=password],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text],input[type=password] {
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
  
  export function loginUi() {
    return layout('Login', `
    <h1>Login</h1>
    <form action="/login" method="post">
      <p><input type="text" placeholder="username" name="username"></p>
      <p><input type="password" placeholder="password" name="password"></p>
      <p><input type="submit" value="Login"></p>
      <p>New user? <a href="/signup">Create an account</p>
    </form>
    `)
  }
  
  export function signupUi() {
    return layout('Signup', `
    <h1>Signup</h1>
    <form action="/signup" method="post">
      <p><input type="text" placeholder="username" name="username"></p>
      <p><input type="password" placeholder="password" name="password"></p>
      <p><input type="text" placeholder="email" name="email"></p>
      <p><input type="submit" value="Signup"></p>
    </form>
    `)
  }
  
  export function success() {
    return layout('Success', `
    <h1>Success!</h1>
    You may <a href="/">view all Contacts</a> / <a href="/login">login</a> again !
    `)
  }
  
  export function fail() {
    return layout('Fail', `
    <h1>Fail!</h1>
    You may <a href="/">view all Contacts</a> or <a href="JavaScript:window.history.back()">go back</a> !
    `)
  }

  export function userNotFound() {
    return layout('User Not Found', `
      <h1>User Not Found</h1>
      The provided username does not exist. Please check your username and try again.
      You may <a href="/">view all Contacts</a> or <a href="JavaScript:window.history.back()">go back</a> !
    `);
  }  
  
  export function list(posts, user) {
    console.log('list: user=', user)
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title } -- by ${post.username}</h2>
        <p><a href="/contact/${post.id}">View contact</a></p>
      </li>
      `)
    }
    let content = `
    <h1>Contacts</h1>
    <p>${(user==null)?'<a href="/login">Login</a> to Add a Contact!':'Welcome '+user.username+', You may <a href="/contact/new">Add a Contact</a> or <a href="/logout">Logout</a> !'}</p>
    <p>There are <strong>${posts.length}</strong> Contacts!</p>
    <p><a href="/contact/search">Query Contact person</p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Directory', content)
  }
  
  export function newPost() {
    return layout('New Contact', `
    <h1>New Contact</h1>
    <p>Add a new contact.</p>
    <form action="/contact" method="post">
      <p><input type="text" placeholder="Name" name="title"></p>
      <p><textarea placeholder="Tel" name="body"></textarea></p>
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
      <h1>${post.title} -- by ${post.username}</h1>
      <p>${post.body}</p>
    `)
  }
  