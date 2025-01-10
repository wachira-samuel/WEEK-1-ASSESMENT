const userSelect = document.getElementById("userSelect");
const userName = document.getElementById("userName");
const userUsername = document.getElementById("userUsername");
const userEmail = document.getElementById("userEmail");
const userLocation = document.getElementById("userLocation");

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.username;
    userSelect.appendChild(option);
  });
  getUserData(1);
}

async function getUserData(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const user = await response.json();
  userName.textContent = user.name;
  userUsername.textContent = `@${user.username}`;
  userEmail.textContent = `${user.email}`;
  userLocation.textContent = `${user.address.city}, ${user.address.street}`;
}

userSelect.addEventListener("change", (event) => {
  getUserData(event.target.value);
  displayUserPosts(event.target.value)
});
getUsers();
async function displayUserPosts(userId) {
  try {
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = await postsResponse.json();
      console.log(posts)

      const commentsContainer = document.getElementById("commentsContainer");
      commentsContainer.innerHTML = "";
      for (const post of posts) {
          const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
          const comments = await commentsResponse.json();
          const postElement = document.createElement("div");
          postElement.classList.add("post");
          
          postElement.innerHTML = `
              <div class="post-content">
                  <h2>${post.title}</h2>
                  <p>${post.body}</p>
              </div>
              <div class="post-comments">
                  <h3>Comments:</h3>
                  ${comments.map(comment => `
                      <div class="comment">
                          <div class="comment-profile">
                              <img src="./screenshot-2022-05-24-at-15-22-28.png" alt="Profile Icon" />
                          </div>
                          <div class="comment-body">
                              <h4>${comment.name}</h4>
                              <p>${comment.body}</p>
                          </div>
                      </div>
                  `).join('')}
              </div>
          `;
          
          commentsContainer.appendChild(postElement);
      }
  } catch (error) {
      console.error("Error fetching posts and comments:", error);
  }
}
userSelect.addEventListener("change", (event) => {
  getUserData(event.target.value);
  displayUserPosts(event.target.value);
});

