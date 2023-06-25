var comments = [];

// Function to display a comment
function displayComment(comment) {
  var commentsContainer = document.getElementById("commentsContainer");

  var commentDiv = document.createElement("div");
  var nameElement = document.createElement("strong");
  var timestampElement = document.createElement("span");
  var textElement = document.createElement("p");

  nameElement.textContent = comment.name;
  timestampElement.textContent = "(" + comment.timestamp + ")";
  textElement.textContent = comment.text;

  commentDiv.appendChild(nameElement);
  commentDiv.appendChild(timestampElement);
  commentDiv.appendChild(document.createElement("br"));
  commentDiv.appendChild(textElement);
  commentDiv.appendChild(document.createElement("br"));

  commentsContainer.appendChild(commentDiv);
}

// Function to clear all comments
function clearComments() {
  var commentsContainer = document.getElementById("commentsContainer");
  while (commentsContainer.firstChild) {
    commentsContainer.firstChild.remove();
  }
}

// Function to render all comments
function renderComments() {
  clearComments();
  comments.forEach(function (comment) {
    displayComment(comment);
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
      timestamp: new Date().toISOString().slice(0, 10),
      text: commentInput.value,
    };

    comments.push(newComment);

    clearComments();
    renderComments();

    nameInput.value = "";
    commentInput.value = "";
  });
