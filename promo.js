// Add this function to calculate the full total and update the label
function updateFullTotal() {
    // Get the book total and adventure total elements
    var bookTotal = parseFloat(document.getElementById('totalPrice').innerHTML) || 0;
    var adventureTotal = parseFloat(document.getElementById('totalAdventurePrice').innerHTML) || 0;
  
    // Calculate the full total by adding both totals
    var fullTotal = bookTotal + adventureTotal;
  
    // Apply promo code if valid
    var promoCode = document.getElementById('promoCodeInput').value;
    if (promoCode === 'Promo123') {
      // Apply a 5% discount for valid promo code
      fullTotal *= 0.95;
    }
  
    // Update the Full Total label with the formatted currency
    document.getElementById('fullTotal').innerHTML = fullTotal;
  }
  

  