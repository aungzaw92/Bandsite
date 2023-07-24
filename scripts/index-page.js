// API
const apiKey = "f12a58fe-fa3a-4584-a362-5e867b8fb24b";
let comments = [];

function fetchComments() {
  axios
    .get("https://project-1-api.herokuapp.com/comments?api_key=" + apiKey)
    .then((result) => {
      console.log(result.data);
      comments = result.data;
      renderComments(); // Call the function to display the fetched comments
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchComments();

//Function to like comments
function likeComment(commentId) {
  axios
    .put(
      `https://project-1-api.herokuapp.com/comments/${commentId}/like?api_key=${apiKey}`
    )
    .then((response) => {
      console.log("Liked comment:", response.data);
      // Update the likes count for the comment in the comments array
      const likedCommentIndex = comments.findIndex(
        (comment) => comment.id === String(commentId)
      );
      if (likedCommentIndex !== -1) {
        comments[likedCommentIndex].likes = response.data.likes;
        renderComments(); // Update the UI with the new likes count
      }
    })
    .catch((error) => {
      console.error("Error liking comment:", error);
    });
}

//Function to delete comment
function deleteComment(commentId) {
  axios
    .delete(
      `https://project-1-api.herokuapp.com/comments/${commentId}?api_key=${apiKey}`
    )
    .then((response) => {
      console.log("Deleted comment:", response.data);
      // Remove the deleted comment from the comments array
      comments = comments.filter((comment) => comment.id !== String(commentId));
      renderComments(); // Update the UI to remove the deleted comment
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
}

function displayComment(obj) {
  var maincommentsContainer = document.getElementById("commentsContainer");
  let commentsContainer = document.createElement("div");
  commentsContainer.classList.add("status-update");
  let img = document.createElement("div");
  img.classList.add("comment_section__profile-picture");
  let strong = document.createElement("strong");
  strong.classList.add("status-update__name");
  strong.innerHTML = obj.name;
  let span = document.createElement("span");
  span.classList.add("status-update__timestamp");

  // Format the date using toLocaleDateString()
  const date = new Date(obj.timestamp);
  // Check if the date is valid before formatting
  if (!isNaN(date)) {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    span.innerHTML = formattedDate; // Use the formatted date
  } else {
    span.innerHTML = "Invalid Date"; // Display an error message for invalid dates
  }

  let pa = document.createElement("div");
  pa.classList.add("status-update__text");
  pa.innerHTML = obj.comment;
  commentsContainer.appendChild(img);
  commentsContainer.appendChild(strong);
  commentsContainer.appendChild(span);
  commentsContainer.appendChild(pa);
  maincommentsContainer.appendChild(commentsContainer);

  // Create a "Like" button for each comment
  let likeButton = document.createElement("button");
  likeButton.classList.add("status-update__like-button");
  likeButton.innerHTML = "Like";
  likeButton.addEventListener("click", function () {
    likeComment(obj.id); // Call the function to like the comment when the button is clicked
  });

  // Append the "Like" button to the comments container
  commentsContainer.appendChild(likeButton);

  // Create a "Delete" button for each comment
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("status-update__delete-button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", function () {
    deleteComment(obj.id); // Call the function to delete the comment when the button is clicked
  });

  // Append the "Delete" button to the comments container
  commentsContainer.appendChild(deleteButton);
}

// Function to clear all comments
function clearComments() {
  var commentsContainer = document.getElementById("commentsContainer");
  while (commentsContainer.firstChild) {
    commentsContainer.firstChild.remove();
  }
}

// Function to render all comments in reverse chronological order (newest first)
function renderComments() {
  clearComments();
  comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  comments.forEach(function (comment) {
    displayComment(comment);
  });
}

// Function to handle the API call for adding a new comment
function addNewComment(name, comment) {
  const requestBody = {
    name: name,
    comment: comment,
  };

  axios
    .post(
      "https://project-1-api.herokuapp.com/comments?api_key=" + apiKey,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("New comment added:", response.data);
      comments.unshift(response.data); // Add the new comment to the comments array
      renderComments(); // Render comments with the new one at the top
    })
    .catch((error) => {
      console.error("Error adding new comment:", error);
    });
}

// Event listener for the form submission
document
  .getElementById("commentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var nameInput = document.getElementById("name");
    var commentInput = document.getElementById("comment");

    var newComment = {
      name: nameInput.value,
      timestamp: new Date().toISOString(),
      comment: commentInput.value,
    };

    comments.unshift(newComment);
    renderComments(); // Call the function to display comments with newest first

    nameInput.value = "";
    commentInput.value = "";
  });
