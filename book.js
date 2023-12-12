function bookNow() {
  // Get user input
  var roomType = document.getElementById("roomType").value;
  var adults = document.getElementById("adults").value;
  var childrenBelow5 = document.getElementById("children1").value;
  var childrenAbove5 = document.getElementById("children2").value;
  var checkInDate = document.getElementById("checkInDate").value;

  // Validate counts
  adults = validateCount(adults, "Adults");
  childrenBelow5 = validateCount(childrenBelow5, "Children (Below 5 years)");
  childrenAbove5 = validateCount(childrenAbove5, "Children (Above 5 years)");

  // Validation successful flag
  var validationSuccessful =
    adults !== null && childrenBelow5 !== null && childrenAbove5 !== null;

  // Check if there is at least one adult or one child
  if (validationSuccessful && adults + childrenBelow5 + childrenAbove5 === 0) {
    alert("There should be at least 1 adult or 1 child in a room.");
    validationSuccessful = false;
  }

  // Get selected extras
  var extras = document.querySelectorAll('input[name="extra"]:checked');
  var selectedExtras = [];

  extras.forEach(function (extra) {
    selectedExtras.push(extra.value);
  });

  // Proceed only if validation was successful
  if (validationSuccessful) {
    // Get total price
    var totalPrice = getTotalPrice(
      roomType,
      adults,
      childrenBelow5,
      childrenAbove5,
      selectedExtras
    );

    // Create a new row for each input
    var tableBody = document
      .getElementById("bookingTable")
      .getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow(tableBody.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    // Populate the cells with room type, adult count, children count, and their prices
    cell1.innerHTML = checkInDate;
    cell2.innerHTML =
      "Room Type: " +
      roomType +
      "<br>Adults: " +
      adults +
      "<br>Children (Below 5 years): " +
      childrenBelow5 +
      "<br>Children (Above 5 years): " +
      childrenAbove5 +
      "<br>Extras: " +
      (selectedExtras.length > 0 ? selectedExtras.join(", ") : "none");
    cell3.innerHTML = totalPrice;

    // Update total in the table footer
    updateTotal();
  }
}
function updateTotal() {
    var tableBody = document.getElementById("bookingTable").getElementsByTagName("tbody")[0];
    var totalCell = document.getElementById("totalPrice");
  
    var totalPrice = 0;
    for (var i = 0; i < tableBody.rows.length; i++) {
      var rowPrice = parseInt(tableBody.rows[i].cells[2].innerText);
      totalPrice += isNaN(rowPrice) ? 0 : rowPrice;
    }
  
    totalCell.innerText = totalPrice;
  }
function validateCount(count, label) {
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

function getTotalPrice(
  roomType,
  adults,
  childrenBelow5,
  childrenAbove5,
  extras
) {
  // Add logic to calculate the total price based on the selected options
  var prices = {
    "Single - LKR 25,000": 25000,
    "Double- LKR 35,000": 35000,
    "Triple- LKR 40,000": 40000,
    "Wifi Access": 3000,
    Pool: 5000,
    Garden: 5000,
    "Extra Bed": 8000,
    ChildBelow5: 0, // No additional cost for children below 5
    ChildAbove5: 5000, // Additional cost for children above 5
  };

  var totalPrice = prices[roomType] || 0;

  // Add price for children below 5
  totalPrice += prices["ChildBelow5"] * childrenBelow5;

  // Add price for children above 5
  totalPrice += prices["ChildAbove5"] * childrenAbove5;

  for (var i = 0; i < extras.length; i++) {
    totalPrice += prices[extras[i]];
  }

  return totalPrice;
}
