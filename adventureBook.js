//adventure
function bookAdventure() {
    // Get user input
    var checkInDate = document.getElementById("checkInDate").value;
    var adventureType = document.getElementById("adventureType").value;
    var localAdults = document.getElementById("localAdults").value;
    var localChildren = document.getElementById("localChildren").value;
    var foreignAdults = document.getElementById("foreignAdults").value;
    var foreignChildren = document.getElementById("foreignChildren").value;
  
    // Validate counts
    localAdults = validateAdventureCount(localAdults, "Local Adults");
    localChildren = validateAdventureCount(localChildren, "Local Children");
    foreignAdults = validateAdventureCount(foreignAdults, "Foreign Adults");
    foreignChildren = validateAdventureCount(foreignChildren, "Foreign Children");
  
    // Validation successful flag
    var validationSuccessful =
      localAdults !== null &&
      localChildren !== null &&
      foreignAdults !== null &&
      foreignChildren !== null;
  
    // Get selected extras
    var guideForAdults = document.getElementById("guideForAdults").checked;
    var guideForKids = document.getElementById("guideForKids").checked;
  
    // Proceed only if validation was successful
    if (validationSuccessful) {
      // Create a new row for each input
      var tableBody = document
        .getElementById("bookingAdventureTable")
        .getElementsByTagName("tbody")[0];
      var newRow = tableBody.insertRow(tableBody.rows.length);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
  
      // Populate the cells with adventure details and their prices
      cell1.innerHTML = checkInDate;
      cell2.innerHTML =
        "Adventure Type: " +
        adventureType +
        "<br>Local Adults: " +
        localAdults +
        "<br>Local Children: " +
        localChildren +
        "<br>Foreign Adults: " +
        foreignAdults +
        "<br>Foreign Children: " +
        foreignChildren +
        (guideForAdults ? "<br>Guide for Adults" : "") +
        (guideForKids ? "<br>Guide for Kids" : "");
      cell3.innerHTML = getTotalAdventurePrice(
        adventureType,
        localAdults,
        localChildren,
        foreignAdults,
        foreignChildren,
        guideForAdults,
        guideForKids
      );
  
      // Update the total after adding a new row
      updateAdventureTotal();
    }
  }

  function updateAdventureTotal() {
    // Get all prices in the table
    var prices = document.querySelectorAll('#bookingAdventureTable tbody tr td:nth-child(3)');
  
    // Calculate the total adventure price
    var total = 0;
    prices.forEach(function (price) {
      total += parseFloat(price.innerHTML);
    });
  
    // Update the total in the table footer
    document.getElementById('totalAdventurePrice').innerHTML = total;
  }
  

function getTotalAdventurePrice(
  adventureType,
  localAdults,
  localChildren,
  foreignAdults,
  foreignChildren,
  guideForAdults,
  guideForKids
) {
  // Add logic to calculate the total adventure price based on the selected options
  var prices = {
    Diving: {
      "Local Adult": 5000,
      "Local Child": 2000,
      "Foreign Adult": 10000,
      "Foreign Child": 5000,
    },
    Hiking: {
      /* Add prices for Hiking */
    },
    "Horse Riding": {
      /* Add prices for Horse Riding */
    },
    "Guide for Adults": 1000,
    "Guide for Kids": 500,
  };

  var totalPrice =
    prices[adventureType]["Local Adult"] * localAdults +
    prices[adventureType]["Local Child"] * localChildren +
    prices[adventureType]["Foreign Adult"] * foreignAdults +
    prices[adventureType]["Foreign Child"] * foreignChildren;

  // Add extra costs for guides
  if (guideForAdults) {
    totalPrice += prices["Guide for Adults"];
  }

  if (guideForKids) {
    totalPrice += prices["Guide for Kids"];
  }

  return totalPrice;
}

function validateAdventureCount(count, label) {
  // Ensure the count is within the range of 0-30
  count = parseInt(count, 10);

  if (isNaN(count) || count < 0) {
    alert(label + " count must be a non-negative number.");
    return null; // Return null on validation failure
  }

  if (count > 30) {
    alert(label + " count cannot exceed 30.");
    return null; // Return null on validation failure
  }

  return count;
}
