// Get the audio element and the play button
var musicPlayer = document.getElementById("musicPlayer");
var playButton = document.getElementById("playButton");

// Function to play or pause the music
function toggleMusic() {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playButton.textContent = "Pause Music";
  } else {
    musicPlayer.pause();
    playButton.textContent = "Play Music";
  }
}

// Add event listener to the play button
playButton.addEventListener("click", toggleMusic);

// Array to store concert data
var concerts = [
  // Concert data objects
];

// Function to create a concert row
function createConcertRow(concert) {
  // Create elements for concert row
  var row = document.createElement("div");
  row.className = "concert-row";
  var dateCell = document.createElement("div");
  dateCell.className = "concert-cell";
  var venueCell = document.createElement("div");
  venueCell.className = "concert-cell";
  var locationCell = document.createElement("div");
  locationCell.className = "concert-cell";

  // Set text content for concert row
  dateCell.textContent = concert.date;
  venueCell.textContent = concert.venue;
  locationCell.textContent = concert.location;

  // Append cells to row
  row.appendChild(dateCell);
  row.appendChild(venueCell);
  row.appendChild(locationCell);

  // Add event listener for row click
  row.addEventListener("click", function () {
    // Remove selected class from all rows
    var rows = document.querySelectorAll(".concert-row");
    rows.forEach(function (row) {
      row.classList.remove("selected");
    });

    // Add selected class to clicked row
    row.classList.add("selected");
  });

  // Return the concert row
  return row;
}

// Function to render concerts
function renderConcerts() {
  var concertsContainer = document.querySelector(".concerts");

  // Clear existing content
  concertsContainer.innerHTML = "";

  // Loop through concerts array and create rows
  concerts.forEach(function (concert) {
    var concertRow = createConcertRow(concert);
    concertsContainer.appendChild(concertRow);
  });
}

// Initial rendering of concerts
renderConcerts();
