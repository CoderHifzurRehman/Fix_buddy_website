// Get modal elements after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cart-modal');
  const closeModalBtn = document.querySelector('.btn-close');
  const body = document.body;

  // Load cart from localStorage when the page loads
  loadCartFromLocalStorage();

  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none'; // Hide modal
    body.classList.remove('modal-active'); // Remove background blur
  }

  // Event listener for close button
  closeModalBtn.addEventListener('click', closeModal);

  // Close the modal if the user clicks outside of modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Update buttons on page load based on cart status
  updateButtonsOnLoad();
});

// Initialize an empty cart object to store items
let cartItems = {};

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to load the cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartCount();
    refreshCart();
  }
}

// Function to show the notification modal
function showNotification(message) {
  const notificationMessage = document.getElementById('notification-message');
  notificationMessage.textContent = message; // Set the message

  // Show the modal using Bootstrap's modal method
  const notificationModalElement = document.getElementById('notificationModal');
  const notificationModal = new bootstrap.Modal(notificationModalElement);

  // Remove the close button
  const closeModalBtn = notificationModalElement.querySelector('.btn-close');
  if (closeModalBtn) {
    closeModalBtn.style.display = 'none'; // Hide the close button
  }

  notificationModal.show(); // Show the modal

  // Automatically close the modal after 2 seconds
  setTimeout(() => {
    notificationModal.hide(); // Close the modal
  }, 2000); // 2000ms = 2 seconds
}

// Unified function to add an item to the cart
function addToCart(serviceName, price, buttonElement) {
  // Check if the item is already in the cart
  if (cartItems[serviceName]) {
    // Show the notification modal with a message
    showNotification(`${serviceName} is already in your cart!`);
    updateModalButtonStyles(serviceName); // Update modal button styles
    return;
  }

  // Add new item to the cart
  cartItems[serviceName] = { price: price, count: 1 };

  // Update button text to "Already Added" and change background color
  updateCartButtonStyles(serviceName, buttonElement);

  // Save the cart to localStorage
  saveCartToLocalStorage();

  // Update the cart count display
  updateCartCount();

  // Show modal with the added service information
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'block'; // Show modal
  document.body.classList.add('modal-active'); // Blur background

  // Update modal service name
  const serviceNameElement = document.getElementById('modal-service-name');
  if (serviceNameElement) {
    serviceNameElement.innerText = `${serviceName} added to your cart!`;
  }

  // Automatically close the modal after 2 seconds
  setTimeout(closeModal, 2000);
}

// Function to update "Add to Cart" buttons after adding an item
function updateCartButtonStyles(serviceName, buttonElement) {
  // Select all buttons that have the same service and update them
  const allButtons = document.querySelectorAll('.btn-add-to-cart');
  allButtons.forEach((button) => {
    if (button.getAttribute('data-item') === serviceName) {
      button.textContent = 'Already Added';
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
      button.disabled = true; // Disable the button
    }
  });

  // Update the clicked button's style as well
  buttonElement.textContent = 'Already Added';
  buttonElement.style.backgroundColor = 'green';
  buttonElement.style.color = 'white';
  buttonElement.disabled = true; // Disable the clicked button
}

// Function to update the modal button styles
function updateModalButtonStyles(serviceName) {
  const addToCartButtonInModal = document.getElementById('addToCartButton');
  if (addToCartButtonInModal) {
    addToCartButtonInModal.textContent = 'Already Added';
    addToCartButtonInModal.style.backgroundColor = 'green';
    addToCartButtonInModal.style.color = 'white';
    addToCartButtonInModal.disabled = true; // Disable the button
  }
}

// Function to open modal with service details
function openModal(serviceName, videoUrl, price, description, imageUrls = []) {
  // Update the service description
  document.getElementById('serviceDetails').textContent = description;

  // Update the video source
  document.querySelector('#serviceVideo source').src = videoUrl;
  document.getElementById('serviceVideo').load(); // Reload video to apply the new source

  // Update the price
  document.getElementById('price').textContent = '₹' + price;

  // Get the Add to Cart button element inside the modal
  const addToCartButtonInModal = document.getElementById('addToCartButton');

  // Check if the service is already in the cart
  if (cartItems[serviceName]) {
    // If service is already added, update the button's style to indicate it has been added
    updateModalButtonStyles(serviceName);
  } else {
    // If service is not in the cart, reset button style and behavior
    addToCartButtonInModal.textContent = 'Add to Cart';
    addToCartButtonInModal.disabled = false;

    // Set the correct service name and price for adding to cart
    addToCartButtonInModal.setAttribute(
      'onclick',
      `addToCart('${serviceName}', ${price}, this)`
    );
  }

  // Populate the image grid
  const imageGrid = document.getElementById('imageGrid');
  imageGrid.innerHTML = ''; // Clear existing images before adding new ones

  imageUrls.forEach((imageUrl, index) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-6', 'mt-2'); // 2 columns per row

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = `Image ${index + 1}`;
    imgElement.classList.add('img-fluid', 'rounded'); // Make images responsive and rounded

    colDiv.appendChild(imgElement);
    imageGrid.appendChild(colDiv);
  });
}

// Function to update the cart count and handle the glow effect for the View Cart button
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  const viewCartButton = document.querySelector(
    'button[data-bs-target="#cartModal"]'
  );

  // Update the cart count display
  cartCountElement.textContent = Object.keys(cartItems).length; // Total number of unique items

  // Check if the cart is empty
  if (Object.keys(cartItems).length > 0) {
    viewCartButton.classList.add('glow'); // Add glow effect if cart has items
  } else {
    viewCartButton.classList.remove('glow'); // Remove glow effect if cart is empty
  }
}

// Function to refresh cart data when opening the modal
function refreshCart() {
  let cartItemsList = document.getElementById('cart-items-list');
  cartItemsList.innerHTML = ''; // Clear previous cart data

  // Check if cart is empty
  if (Object.keys(cartItems).length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    // Add each cart item to the list
    for (const item in cartItems) {
      let li = document.createElement('li');
      li.classList.add(
        'd-flex',
        'justify-content-between',
        'align-items-center'
      );
      li.textContent = `${item} - ₹${cartItems[item].price}`;

      // Create a remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'btn btn-danger btn-sm';
      removeBtn.onclick = () => removeFromCart(item);
      li.appendChild(removeBtn);

      cartItemsList.appendChild(li);
    }
  }
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
  if (cartItems[itemName]) {
    delete cartItems[itemName]; // Remove item from cart
    updateCartCount(); // Update cart display
    saveCartToLocalStorage(); // Save the updated cart to localStorage
    refreshCart(); // Refresh the cart display in the modal

    // Revert the button back to "Add to Cart"
    const addButton = document.querySelector(`button[data-item="${itemName}"]`);
    if (addButton) {
      addButton.textContent = 'Add to Cart';
      addButton.style.backgroundColor = ''; // Reset button background color
      addButton.style.color = ''; // Reset text color
      addButton.disabled = false; // Enable the button again
    }
  }
}

// Function to update buttons on page load based on cart status
function updateButtonsOnLoad() {
  document.querySelectorAll('.btn-add-to-cart').forEach((button) => {
    const itemName = button.getAttribute('data-item');
    if (cartItems[itemName]) {
      button.textContent = 'Already Added'; // If the item is in the cart
      button.style.backgroundColor = 'green'; // Keep background green for items in cart
      button.style.color = 'white'; // Keep text color white for better visibility
      button.disabled = true;
    }
  });
}

// Attach event listener to 'View Cart' button to refresh cart
document
  .querySelector('button[data-bs-target="#cartModal"]')
  .addEventListener('click', refreshCart);
