// HTTP Status Codes
exports.HTTP_STATUS_CODES = {
    OK: 200, // Successful response
    CREATED: 201, // Resource created
    BAD_REQUEST: 400, // Invalid request data
    UNAUTHORIZED: 401, // Authentication required
    FORBIDDEN: 403, // Access denied
    NOT_FOUND: 404, // Resource not found
    NOT_ALLOWED: 405 , // Resource not allowed
    CONFLICT: 409, // Conflicting resource
    INTERNAL_SERVER_ERROR: 500, // Server error
  };
  
  // Response Messages
  exports.RESPONSE_MESSAGES = {
    SUCCESS: 'Success', // Generic success message
    FAILURE: 'Failure', // Generic failure message
  
    // Menu
    MENU_ITEM_NOT_FOUND: 'Menu item not found', // When a menu item is not found
    NO_MENU_ITEMS_AVAILABLE : 'There are currently no menu items available',
    MENU_CREATED_SUCCESS: 'Menu item created successfully', // When a menu item is created successfully
    MENU_UPDATED_SUCCESS: 'Menu item updated successfully', // When a menu item is updated successfully
    MENU_DELETED_SUCCESS: 'Menu item deleted successfully', // When a menu item is deleted successfully
    MENU_CREATION_FAILED: 'Failed to create menu item', // When creating a menu item fails
    MENU_UPDATE_FAILED: 'Failed to update menu item', // When updating a menu item fails
    MENU_DELETION_FAILED: 'Failed to delete menu item', // When deleting a menu item fails
    MENU_NOT_ALLOWED : 'You are not allowed to create a menu', //
  
    // Order
    ORDER_NOT_FOUND: 'Order not found', // When an order is not found
    ORDER_CREATED_SUCCESS: 'Order placed successfully', // When an order is created successfully
    ORDER_UPDATED_SUCCESS: 'Order updated successfully', // When an order is updated successfully
    ORDER_CANCELED_SUCCESS: 'Order canceled successfully', // When an order is canceled successfully
    ORDER_CREATION_FAILED: 'Failed to place order', // When creating an order fails
    ORDER_UPDATE_FAILED: 'Failed to update order', // When updating an order fails
    ORDER_CANCELLATION_FAILED: 'Failed to cancel order', // When canceling an order fails

    //Admin
    ADMIN_NOT_FOUND : 'Admin not found', //when a admin is not found
    ADMIN_ALREADY_EXIST : 'Admin already exists', //when a admin is already exists
    ADMIN_CREATED_SUCCESS :'Admin created succesfully', //when a admin is created succesfully
    ADMIN_CREATED_FAILED : 'Admin created failed', //when a admin is failed to create
    ADMIN_LOGGED_IN : 'Admin logged in', //when a admin is logged in
    ADMIN_PASSWORD_INCORRECT : 'Admin password incorrect', //when a password is incorrect
    ADMIN_INVALID_CREDENTIAL : 'Invalid credentials', //when credentials are invalid
    ADMIN_LOGOUT_SUCCESS : 'Admin log out' , //when admin log out
    ADMIN_MANAGE_USER_FAILED : 'Failed to manage users' ,//when he failed to manage users
    ADMIN_MANAGE_RESTAURANT_FAILED : 'Failed to manage restaurant' ,//when he failed to manage restaurant
    ADMIN_MANAGE_DELIVERY_FAILED : 'Failed to manage delivery' ,//when he failed to manage delivery
  
    // User
    USER_NOT_FOUND: 'User not found', // When a user is not found
    USER_ALREADY_EXIST : 'User already exists', // When a user is already exists
    USER_CREATED_SUCCESS: 'User registered successfully', // When a user is created successfully
    USER_UPDATED_SUCCESS: 'User updated successfully', // When a user is updated successfully
    USER_CREATION_FAILED: 'Failed to register user', // When creating a user fails
    USER_UPDATE_FAILED: 'Failed to update user', // When updating a user fails
    USER_TOKEN_INVALID : 'Invalid or expired token',
    USER_PASSWORD_RESET_SUCCESS: 'Password reset successfully' ,
    USER_WRONG_PASSWORD : 'Wrong Password', // When a user enters a password incorrect
    USER_LOGGED_IN : 'User logged in successfully', // When a user is logged in successfully
    USER_LOGGED_OUT : 'User logged out successfully', // When a user is logged out successfully
    INVALID_CREDENTIALS: 'Invalid credentials', // When credentials (username/email and password) are invalid

    // Delivery
    DELIVERY_NOT_FOUND: 'Delivery not found', // When a user is not found
    DELIVER_ALREADY_EXIST: 'Delivery already exists', // When a delivery is already exists
    DELIVERY_REGISTER_SUCCESS: 'Delivery registered successfully', // When a user is created successfully
    DELIVERY_UPDATED_SUCCESS: 'Delivery updated successfully', // When a user is updated successfully
    DELIVERY_REGISTER_FAILED: 'Failed to register Delivery', // When creating a user fails
    DELIVERY_UPDATE_FAILED: 'Failed to update Delivery', // When updating a user fails
    DELIVERY_TOKEN_INVALID : 'Invalid or expired token',
    DELIVERY_PASSWORD_RESET_SUCCESS: 'Password reset successfully' ,
    DELIVERY_PASSWORD_WRONG : 'Incorrect Password' , 
    DELIVERY_LOGGED_IN : 'Logged in successfully' , // When a user is logged in successfully
    DELIVERY_INVALID_CREDENTIALS: 'Invalid credentials', // When credentials (username/email and password) are invalid

    //Restaurant
    RESTAU_NOT_FOUND: 'Restaurant not found', // When a user is not found
    RESTAU_CREATED_SUCCESS: 'Restaurant registered successfully', // When a user is created successfully
    RESTAU_ALREADY_EXIST: 'Restaurant already exists', // When a restaurant is already exists
    RESTAU_UPDATED_SUCCESS: 'Restaurant updated successfully', // When a user is updated successfully
    RESTAU_CREATION_FAILED: 'Failed to register Restaurant', // When creating a user fails
    RESTAU_UPDATE_FAILED: 'Failed to update Restaurant', // When updating a user fails
    RESTAU_NOT_FOUND: 'Failed to find restaurant', // When a restau is not found
    RESTAU_INVALID_PASSWORD : 'Invalid password', //When password is invalid
    RESTAU_DELETED_SUCCESS : 'Restaurant deleted successfully', // When a restau is deleted successfully
    RESTAU_INVALID_CREDENTIALS: 'Invalid credentials', // When credentials (username/email and password) are invalid
  
    //Token Verification
    VERIFICATION_LINK_EXPIRED : 'Your verification link may have expired.', // When a verification link is expired 
    UNAUTHORIZED : 'We were enable to find a user for this verification.Signup!', 
    ALREADY_VERIFIED : "User has been already verified.Please login", // When a user is already verified
    VERIFIED_SUCCESS :  "Your account has been successfuly verified", // When a user is successfully verified
    // General
    INTERNAL_SERVER_ERROR: 'Internal server error', // When an unexpected server error occurs
    VALIDATION_ERROR: 'Validation error', // When input data fails validation
    EMPTY_REQUEST: 'Empty request', // When the request body is empty
    NOT_FOUND: 'Not found', // When a resource is not found
  };
  
  // Validation Messages
  exports.VALIDATION_MESSAGES = {
    // Menu
    MENU_NAME_REQUIRED: 'Menu item name is required', // When the menu item name is missing
    MENU_DESCRIPTION_REQUIRED: 'Menu item description is required', // When the menu item description is missing
    MENU_PRICE_REQUIRED: 'Menu item price is required', // When the menu item price is missing
    MENU_CATEGORY_REQUIRED: 'Menu item category is required', // When the menu item category is missing
    MENU_IMAGE_REQUIRED: 'Menu item image is required', // When the menu item image is missing
  
    // Order
    ORDER_ITEMS_REQUIRED: 'At least one order item is required', // When an order does not have any items
    ORDER_CUSTOMER_REQUIRED: 'Customer information is required', // When customer information is missing for an order
    ORDER_PAYMENT_REQUIRED: 'Payment information is required', // When payment information is missing for an order
  
    // User
    USER_NAME_REQUIRED: 'User name is required', // When the user name is missing
    USER_EMAIL_REQUIRED: 'User email is required', // When the user email is missing
    USER_PASSWORD_REQUIRED: 'User password is required', // When the user password is missing
    USER_ADDRESS_REQUIRED: 'User address is required', // When the user address is missing
  };
  
  // Other Constants
  exports.MAX_FILE_SIZE = 5 * 1024 * 1024; // Maximum allowed file size for uploads (5MB)
  exports.ALLOWED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/gif']; // Allowed image formats for uploads
  