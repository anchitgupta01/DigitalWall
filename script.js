      // Define the Board class
class Board {
  constructor(name) {
    this.name = name;
    this.posts = [];
  }

  createPost(title, content) {
    this.posts.push({ title, content, likes: 0 });
  }

  updatePost(postIndex, newTitle, newContent) {
    if (postIndex >= 0 && postIndex < this.posts.length) {
      this.posts[postIndex].title = newTitle;
      this.posts[postIndex].content = newContent;
    } else {
      console.log("Invalid post index!");
    }
  }

  deletePost(postIndex) {
    if (postIndex >= 0 && postIndex < this.posts.length) {
      this.posts.splice(postIndex, 1);
    } else {
      console.log("Invalid post index!");
    }
  }

  likePost(postIndex) {
    if (postIndex >= 0 && postIndex < this.posts.length) {
      this.posts[postIndex].likes++;
    } else {
      console.log("Invalid post index!");
    }
  }
}

class BoardManager {
  constructor() {
    this.boards = [];
  }

  createBoard(boardName) {
    const board = new Board(boardName);
    this.boards.push(board);
    return board;
  }

  updateBoard(boardIndex, newName) {
    if (boardIndex >= 0 && boardIndex < this.boards.length) {
      this.boards[boardIndex].name = newName;
    } else {
      console.log("Invalid board index!");
    }
  }

  deleteBoard(boardIndex) {
    if (boardIndex >= 0 && boardIndex < this.boards.length) {
      this.boards.splice(boardIndex, 1);
    } else {
      console.log("Invalid board index!");
    }
  }

  searchBoards(query) {
    query = query.toLowerCase();
    return this.boards.filter((board) =>
      board.name.toLowerCase().includes(query)
    );
  }
}

const boardManager = new BoardManager();

function createBoard() {
  const boardNameInput = document.getElementById("boardName");
  const boardName = boardNameInput.value;

  if (boardName.trim() === "") {
    alert("Please enter a board name.");
    return;
  }

  const board = boardManager.createBoard(boardName);
  displayBoard(board);
  boardNameInput.value = "";
}

function updateBoard(boardIndex, newName) {
  const newBoardName = prompt("Enter the new name for the board:");
  if (newBoardName.trim() === "") {
    alert("Please enter a valid board name.");
    return;
  }

  boardManager.updateBoard(boardIndex, newBoardName);
  displayBoards();
}

function deleteBoard(boardIndex) {
  const confirmDelete = confirm("Are you sure you want to delete this board?");
  if (confirmDelete) {
    boardManager.deleteBoard(boardIndex);
    displayBoards();
  }
}

function createPost(boardIndex) {
  const postTitle = prompt("Enter the post title:");
  if (postTitle.trim() === "") {
    alert("Please enter a valid post title.");
    return;
  }

  const postContent = prompt("Enter the post content:");
  if (postContent.trim() === "") {
    alert("Please enter a valid post content.");
    return;
  }

  const board = boardManager.boards[boardIndex];
  const imageInput =""; // Initialize the post image URL
  
  board.createPost(postTitle, postContent, imageInput); // Pass the postImage to createPost method
  
  displayPosts(boardIndex);
}

function updatePost(boardIndex, postIndex) {
  const newPostTitle = prompt("Enter the new post title:");
  if (newPostTitle.trim() === "") {
    alert("Please enter a valid post title.");
    return;
  }

  const newPostContent = prompt("Enter the new post content:");
  if (newPostContent.trim() === "") {
    alert("Please enter a valid post content.");
    return;
  }

  const board = boardManager.boards[boardIndex];
  board.updatePost(postIndex, newPostTitle, newPostContent);
  displayPosts(boardIndex);
}

function deletePost(boardIndex, postIndex) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
    const board = boardManager.boards[boardIndex];
    board.deletePost(postIndex);
    displayPosts(boardIndex);
  }
}

function likePost(boardIndex, postIndex) {
  const board = boardManager.boards[boardIndex];
  board.likePost(postIndex);
  displayPosts(boardIndex);
}

function searchBoards() {
  const searchInput = document.getElementById("boardSearch");
  const query = searchInput.value;
  const matchingBoards = boardManager.searchBoards(query);
  displaySearchResults(matchingBoards);
}

function displaySearchResults(boards) {
  const boardList = document.getElementById("boardList");
  boardList.innerHTML = "";

  boards.forEach((board) => {
    displayBoard(board);
  });
}

function displayBoard(board) {
  const boardList = document.getElementById("boardList");
  const boardItem = document.createElement("li");
  const boardName = document.createElement("span");
  boardName.textContent = board.name;

  const createPostButton = document.createElement("button");
  createPostButton.innerHTML =
    '<i class="fa fa-plus-circle" style="font-size:24px"></i>';
  createPostButton.addEventListener("click", () =>
    createPost(boardManager.boards.indexOf(board))
  );

  const updateBoardButton = document.createElement("button");
  updateBoardButton.innerHTML =
    '<i class="fa fa-pencil" style="font-size:24px" aria-hidden="true"></i>';
  updateBoardButton.addEventListener("click", () =>
    updateBoard(boardManager.boards.indexOf(board), board.name)
  );

  const deleteBoardButton = document.createElement("button");
  deleteBoardButton.innerHTML =
    '<i class="fa fa-trash-o" style="font-size:24px"></i>';
  deleteBoardButton.addEventListener("click", () =>
    deleteBoard(boardManager.boards.indexOf(board))
  );

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  imageInput.style.display = "none";


  const imageButton = document.createElement("button");
  imageButton.innerHTML = '<i class="fa fa-image" style="font-size:24px"></i>';
  imageButton.addEventListener("click", () =>
    selectImage(boardManager.boards.indexOf(board),postIndex, imageInput)
  );

  const searchPostsInput = document.createElement("input");
  searchPostsInput.type = "text";
  searchPostsInput.placeholder = "Search Posts by Title";
  searchPostsInput.oninput = () =>
    searchPosts(boardManager.boards.indexOf(board), searchPostsInput.value);

  const postList = document.createElement("ul");
  postList.classList.add("post-list");



  const existingPostList = boardItem.querySelector(".post-list");
  if (existingPostList) {
    existingPostList.replaceWith(postList);
  } else {
    boardItem.appendChild(postList);
  }

  board.posts.forEach((post, postIndex) => {
    const postItem = document.createElement("li");
  postItem.classList.add("post-items");
    const postTitle = document.createElement("h4");
    postTitle.textContent = post.title;
    const postContent = document.createElement("p");
    postContent.textContent = post.content;

    const likeButton = document.createElement("button");
    likeButton.innerHTML = `<i class="fa fa-thumbs-o-up" style="font-size:24px"></i>
 ${post.likes}`;
    likeButton.addEventListener("click", () =>
      likePost(boardManager.boards.indexOf(board), postIndex)
    );

    const updatePostButton = document.createElement("button");
    updatePostButton.innerHTML =
      '<i class="fa fa-pencil" style="font-size:24px" aria-hidden="true"></i>';
    updatePostButton.addEventListener("click", () =>
      updatePost(boardManager.boards.indexOf(board), postIndex)
    );

    const deletePostButton = document.createElement("button");
    deletePostButton.innerHTML =
      '<i class="fa fa-trash-o" style="font-size:24px"></i>';
    deletePostButton.addEventListener("click", () =>
      deletePost(boardManager.boards.indexOf(board), postIndex)
    );
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.style.display = "none";
   

    const imageButton = document.createElement("button");
    imageButton.innerHTML =
      '<i class="fa fa-image" style="font-size:24px"></i>';
    imageButton.addEventListener("click", () =>
      selectImage(boardManager.boards.indexOf(board), postIndex,imageInput)
    );

    postItem.appendChild(postTitle);
    postItem.appendChild(postContent);
    postItem.appendChild(likeButton);
    postItem.appendChild(updatePostButton);
    postItem.appendChild(deletePostButton);
    postItem.appendChild(imageInput);
        postItem.appendChild(imageButton);

    postList.appendChild(postItem);
  });

  boardItem.appendChild(boardName);
  boardItem.appendChild(createPostButton);
  boardItem.appendChild(updateBoardButton);
  boardItem.appendChild(deleteBoardButton);
  boardItem.appendChild(imageInput);
  boardItem.appendChild(imageButton);
  boardItem.appendChild(searchPostsInput);
  boardItem.appendChild(postList);

  boardList.appendChild(boardItem);
}
function selectImage(boardIndex, postIndex, imageInput) {
  imageInput.click(); // Trigger the file input click event
  imageInput.onchange = () => {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      displayImage(boardIndex,postIndex, imageUrl);
    };
    reader.readAsDataURL(file);
  };
}

function displayImage(boardIndex, postIndex, imageUrl) {
  // const boardList = document.getElementById("boardList");
  // const boardItem = boardList.children[boardIndex];
  const boardList = document.getElementById("boardList");
  const boardItem = boardList.children[boardIndex];
  const postList = boardItem.querySelector(".post-list");
  const postItem = postList.children[postIndex];

  // const imageContainer = document.createElement("div");
  // imageContainer.classList.add("image-container");
  const image = document.createElement("img");
  image.src = imageUrl;
  image.style.width = "300px";
  // image.style.display="grid";
  // image.style.gridTemplateColumns ="auto auto auto";



  // imageContainer.appendChild(image);
  // boardItem.appendChild(imageContainer);

  postItem.appendChild(image);

}

function displayPosts(boardIndex, posts = null) {
  const boardList = document.getElementById("boardList");
  const boardItem = boardList.children[boardIndex];
  const board = boardManager.boards[boardIndex];

  if (boardItem) {
    const postList = boardItem.querySelector(".post-list");

    while (postList.firstChild) {
      postList.removeChild(postList.firstChild);
    }

    if (posts) {
      posts.forEach((post, postIndex) => {
        const postItem = createPostItem(boardIndex, postIndex, post);
        postList.appendChild(postItem);
      });
    } else {
      board.posts.forEach((post, postIndex) => {
        const postItem = createPostItem(boardIndex, postIndex, post);
        postList.appendChild(postItem);
      });
    }
  }
}

function createPostItem(boardIndex, postIndex, post) {
  const postItem = document.createElement("li");
  postItem.classList.add("post-items");
  const postTitle = document.createElement("h4");
  postTitle.textContent = post.title;
  const postContent = document.createElement("p");
  postContent.textContent = post.content;

  const likeButton = document.createElement("button");
  likeButton.innerHTML = `<i class="fa fa-thumbs-o-up" style="font-size:24px"></i> ${post.likes}`;
  likeButton.addEventListener("click", () =>
    likePost(boardIndex, postIndex)
  );

  const updatePostButton = document.createElement("button");
  updatePostButton.innerHTML =
    '<i class="fa fa-pencil" style="font-size:24px" aria-hidden="true"></i>';
  updatePostButton.addEventListener("click", () =>
    updatePost(boardIndex, postIndex)
  );

  const deletePostButton = document.createElement("button");
  deletePostButton.innerHTML =
    '<i class="fa fa-trash-o" style="font-size:24px"></i>';
  deletePostButton.addEventListener("click", () =>
    deletePost(boardIndex, postIndex)
  );

  const imageInput = document.createElement("input");
  imageInput.type = "file";
  imageInput.accept = "image/*";
  imageInput.style.display = "none";
  imageInput.style.width = "300px";

  const imageButton = document.createElement("button");
  imageButton.innerHTML =
    '<i class="fa fa-image" style="font-size:24px"></i>';
  imageButton.addEventListener("click", () =>
    selectImage(boardIndex, postIndex, imageInput)
  );

  const image = document.createElement("img");
  if (post.imageUrl) {
    image.src = post.imageUrl;
    image.style.width = "300px";
    postItem.appendChild(image);
  }

  postItem.appendChild(postTitle);
  postItem.appendChild(likeButton);
  postItem.appendChild(updatePostButton);
  postItem.appendChild(deletePostButton);
  postItem.appendChild(imageInput);
  postItem.appendChild(imageButton);
  postItem.appendChild(postContent);

  return postItem;
}


function searchPosts(boardIndex, query) {
  const board = boardManager.boards[boardIndex];
  const matchingPosts = board.posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
  displayPosts(boardIndex, matchingPosts);
}

function displayBoards() {
  const boardList = document.getElementById("boardList");
  boardList.innerHTML = "";

  boardManager.boards.forEach((board) => {
    displayBoard(board);
  });
}

displayBoards();


