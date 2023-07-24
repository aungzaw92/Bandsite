// API
const apiKey = "f12a58fe-fa3a-4584-a362-5e867b8fb24b";

// Array to store concert data
let concerts = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tues Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 16 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// Function to create a concert row
function createConcertRow(concert) {
  // Create elements for concert row
  var row = document.createElement("div");
  row.className = "section__show";
  var dateCell = document.createElement("div");
  dateCell.className = "section__show-info";
  var venueCell = document.createElement("div");
  venueCell.className = "section__show-info";
  var locationCell = document.createElement("div");
  locationCell.className = "section__show-info";

  // Set text content for concert row
  dateCell.textContent = concert.date;
  venueCell.textContent = concert.venue;
  locationCell.textContent = concert.location;

  // Get the audio element and the play button
  var musicPlayer = document.getElementById("musicPlayer");
  var playButton = document.getElementById("playButton");

  // Add event listener for row click
  row.addEventListener("click", function () {
    // Remove selected class from all rows
    var rows = document.querySelectorAll(".section__show-info");
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
  var concertsContainer = document.querySelector(".section__show");

  // Clear existing content
  concertsContainer.innerHTML = "";

  // Loop through concerts array and create rows
  concerts.forEach(function (concert) {
    var concertRow = createConcertRow(concert);
    concertsContainer.appendChild(concertRow);
  });
}

// Create a section element with class "section"
const section = document.createElement("section");
section.className = "section";

// Create a div element with class "section__show"
const showContainer = document.createElement("div");
showContainer.className = "section__show";

// Append the showContainer to the section element
section.appendChild(showContainer);

// Append the section element to the body or any desired parent element
document.body.appendChild(section);

function createConcertInfoElement(label, value) {
  var element = document.createElement("div");
  element.className = "section__show-info";
  element.innerHTML = `<strong>${label}:</strong> ${value}`;
  return element;
}

// Loop through the shows data and create elements for each show
concerts.forEach((concert) => {
  // Create a div for each show
  const showDiv = document.createElement("div");

  // Create the show info elements
  const dateDiv = createConcertInfoElement("Date", concert.date);
  const venueDiv = createConcertInfoElement("Venue", concert.venue);
  const locationDiv = createConcertInfoElement("Location", concert.location);

  // Create the "Buy Ticket" button
  const ticketButton = document.createElement("button");
  ticketButton.className = "section__show-ticket-button";
  ticketButton.textContent = "Buy Ticket";

  // Append the elements to the showDiv
  showDiv.appendChild(dateDiv);
  showDiv.appendChild(venueDiv);
  showDiv.appendChild(locationDiv);
  showDiv.appendChild(ticketButton);

  // Append the showDiv to the showContainer
  showContainer.appendChild(showDiv);
});

// Initial rendering of concerts
renderConcerts();

// Get the audio element and the play button
var musicPlayer = document.getElementById("musicPlayer");
var playButton = document.getElementById("playButton");

document.addEventListener("DOMContentLoaded", function () {
  var musicPlayer = document.getElementById("musicPlayer");
  var playButton = document.getElementById("playButton");

  function toggleMusic() {
    if (musicPlayer.paused) {
      musicPlayer.play();
      playButton.textContent = "Pause Music";
    } else {
      musicPlayer.pause();
      playButton.textContent = "Play Music";
    }
  }

  playButton.addEventListener("click", toggleMusic);
});
