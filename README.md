1 . Introduction:
We chose to create a triple registry triple login website because we wanted a challenge, something to really examine the skills we gained from this bootcamp and to truly test ourselves and our capability to create a fully running MERN  stack project, 3 different users means 3 different experiences and 3 different parts of code, the website will be able to connect clients, businesses, and delivery men. It will be a mix of diverse exciting technologies, and it will be scalable and easily adaptable to all kinds of businesses and industries.
2 . Website Overview:
Homepage:
The homepage serves as the entry point to the website, providing an overview of the platform's features and benefits.
It will include a search bar where clients can search for restaurants/businesses or specific items/services, and a section where the client will be able to select his location(either automatically or manually).
Featured restaurants/businesses, popular items, and special offers may also be highlighted here.
Client Dashboard:
Clients have a special dashboard where they can manage their account, view order history, track ongoing orders, and track their delivery man.
They can browse available restaurants/businesses, explore menus, and place orders for delivery or pickup.
Clients may have the option to save favorite restaurants/businesses, reorder previous items, and leave reviews and ratings.
Restaurant/Business Dashboard:
Restaurants/businesses have their own dashboard where they can manage their menu, update business details , update working hours (open or closed) and track order history and earnings.
They can receive and manage incoming orders, update inventory availability, and set delivery zones.
Restaurant/business owners may have access to analytics and reporting tools to track sales and customer feedback.
Delivery Personnel Dashboard:
Delivery personnel have a dashboard where they can manage their availability, view assigned orders, and track deliveries.
They can accept or decline incoming delivery requests, communicate with clients/restaurants, and update delivery status.
Delivery personnel may have access to navigation tools to help them reach their destinations efficiently.
Order Management System:
The website includes an order management system that facilitates communication between clients, restaurants/businesses, and delivery personnel.
Orders are processed in real-time, with notifications sent to all parties involved.
Clients can track the status of their orders from placement to delivery.
User Authentication and Profiles:
The website requires users to create accounts or log in to access its features, three kinds of registrations and three kinds of loggins.
User profiles store personal information, order history, and preferences.
Security features such as password encryption and account verification are implemented to protect user data.
Messaging and Support (optional and to agree upon with teammates)
The website may include messaging functionality to allow clients, restaurants/businesses, and delivery personnel to communicate directly.
Additionally, there may be a support center with FAQs, troubleshooting guides, and contact information for customer support.
Mobile Responsiveness:
The website is optimized for mobile devices, ensuring a seamless user experience across desktops, tablets, and smartphones.
3. Navigation:
Navigation is really important on our website. It helps users find what they need easily. You'll see a menu at the top of the page with links to Home, About Us, Services, and Contact. For different users like clients, restaurants/businesses, and delivery people, there are special links to their own pages once they log in.
Clients can quickly find features to order, manage their accounts, and see past orders. Restaurant/business owners can easily manage menus, track orders, and update their business info. Delivery people can handle their availability, see assigned orders, and update delivery info.
There are search bars and filters to help users find specific stuff like restaurants or menu items. Breadcrumb navigation shows where you are on the site, and the footer has more important links like Terms of Service and Privacy Policy to make things easy to find and use.
4. Features:
Three types of user registration: clients, restaurants/businesses, and delivery personnel.
Secure authentication system with password encryption and account verification.
Forgot password functionality with email verification for account recovery.
Personalized dashboard for managing account settings, preferences, and profile information.
Order placement for delivery or pickup from a wide range of restaurants/businesses.
Browse and search functionality to discover restaurants by cuisine, location, ratings, etc.
Order tracking in real-time, from placement to delivery, with status updates and notifications.
View order history, reorder favorite items, and leave reviews and ratings for past orders.
Integration with multiple payment gateways for secure online transactions.
Ability to save delivery addresses and payment methods for convenience.
Dedicated dashboard for managing menu items, categories, pricing, and inventory.
Update business details, including working hours, contact information, and delivery zones.
Receive and manage incoming orders in real-time, with notifications for new orders.
Track order fulfillment status, update order status (e.g., preparing, ready for pickup/delivery).
Manage promotions, discounts, and special offers to attract and retain customers.
Customizable menu layouts and design options to showcase products.
Dashboard for managing availability, accepting/rejecting incoming delivery requests, and updating status.
View assigned orders, including order details, delivery addresses, and special instructions.
Navigate efficiently to delivery destinations using integrated mapping and GPS..
Update delivery status in real-time, including pickup, en route, and delivery confirmation.
Earn and track earnings for the delivery personnel..
order management system for seamless communication between clients, restaurants/businesses, and delivery personnel.
Real-time order processing, with notifications and updates sent to all 3 parts (business/client/delivery man).
Order tracking for clients, allowing them to monitor order status and delivery progress.
Automatic assignment of delivery personnel based on proximity, availability, and order volume (to discuss with the team)
Optimized user experience across devices, including desktops, tablets, and smartphones.
Responsive design elements for seamless navigation, readability, and interaction on smaller screens.
Mobile-friendly interfaces for order placement, tracking, and communication with delivery personnel.
Live chat support, using a chat bot.
Support for multiple currencies.
5. Basic explanation of the Content:
The website contains detailed listings of restaurants and businesses, including descriptions, operating hours, and delivery options. Users can explore visually appealing menus with prices, images, and dietary information. They can also discover ongoing promotions, read user-generated reviews, and track their orders in real-time. Additionally, users can manage their account details, preferences, and communication settings. With localization options and internationalization support, the website provides a seamless and personalized experience for users across different regions and languages.
6. How the users will be able to Interact with the Website:
Users interact with the website by browsing restaurant listings, selecting menu items, and placing orders for delivery or pickup. They can track their orders in real-time and leave reviews based on their experiences. Restaurant owners manage their menus, update business details, and receive and fulfill orders. Delivery personnel manage their availability, accept delivery requests, and communicate with clients and restaurants for smooth order delivery. All interactions are facilitated through intuitive user interfaces, ensuring a seamless and efficient experience for all parties involved.
7. How the technologies used will interact with each other:

8. Technical Overview:
A list of all technologies we will use (to discuss with the team)
Express.js
Mongoose (MongoDB)
Multer (for handling file uploads)
JSON Web Token (JWT) for authentication
Bcrypt (for hashing passwords)
Express Rate Limit (for rate limiting)
Helmet (for securing HTTP headers)
Compression (for compressing responses)
express-validator (For advanced request validation)
xss (For preventing cross-site scripting (XSS) attacks by sanitizing user input)
dotenv 
emailjs (sending mail)
Cors: for enabling Cross-Origin Resource Sharing (CORS)
morgan: for HTTP request logging, which can be useful for debugging and monitoring.
jsonwebtoken: a library for generating and verifying JSON Web Tokens (JWTs), an alternative to the built-in JWT functionality.
bcryptjs: a lightweight version of bcrypt for hashing passwords.
express-session: for session management in Express.js applications.
connect-mongo: a MongoDB session store for Express.js.
lodash: a utility library providing helpful functions for working with arrays, objects, and other data types.
nodemailer-sendgrid-transport: a transport plugin for Nodemailer that allows sending emails via SendGrid, which can be useful for email confirmation and notification functionalities.
winston: a versatile logging library for Node.js applications, offering various logging levels, transports, and formats.
helmet-csp: an extension of Helmet for implementing Content Security Policy (CSP) headers, enhancing security against cross-site scripting (XSS) and other attacks.
express-fileupload: an alternative to Multer for handling file uploads in Express.js applications, providing a simpler interface for basic file upload requirements.
moment: a popular library for parsing, validating, manipulating, and formatting dates and times.
validator: a library for string validation and sanitization, offering a wide range of built-in validators for common use cases.
bcrypt-nodejs: another alternative to bcrypt for hashing passwords.
cookie-parser: for parsing cookies in Express.js applications, useful when working with session-based authentication.
sanitize-html: a library for sanitizing HTML input to prevent cross-site scripting (XSS) attacks, complementing the xss package.


Endpoints/routes:
**Client Pages:**
**Authentication and Profile Pages:**
- `/register`: Registration page for clients.
- `/login`: Login page for clients.
- `/profile`: Client's profile page.
- `/profile/edit`: Edit profile page for clients.
- `/profile/delete`: Delete profile page for clients.
**Product Pages:**
- `/products`: Browse all products page.
- `/products/:id`: Product details page.
- `/products/search`: Search products page.
- `/products/category/:category`: Products by category page.
**Order Pages:**
- `/orders`: View all orders page.
- `/orders/:id`: Order details page.
- `/orders/track`: Track orders page.
**Restaurant/Business Pages:**
**Authentication and Profile Pages:**
- `/restaurant/register`: Registration page for restaurants/businesses.
- `/restaurant/login`: Login page for restaurants/businesses.
- `/restaurant/profile`: Restaurant/business profile page.
- `/restaurant/profile/edit`: Edit profile page for restaurants/businesses.
- `/restaurant/profile/delete`: Delete profile page for restaurants/businesses.
**Menu Pages:**
- `/restaurant/menu`: View all items in the menu page.
- `/restaurant/menu/add`: Add item to the menu page.
- `/restaurant/menu/:id/edit`: Edit item in the menu page.
- `/restaurant/menu/:id/delete`: Delete item from the menu page.
**Order Pages:**
- `/restaurant/orders`: View all orders received page.
- `/restaurant/orders/:id`: Order details page.
- `/restaurant/orders/:id/process`: Process order page.
**Delivery Personnel Pages:**
**Authentication and Profile Pages:**
- `/delivery/register`: Registration page for delivery personnel.
- `/delivery/login`: Login page for delivery personnel.
- `/delivery/profile`: Delivery personnel profile page.
- `/delivery/profile/edit`: Edit profile page for delivery personnel.
- `/delivery/profile/delete`: Delete profile page for delivery personnel.
**Order Pages:**
- `/delivery/orders`: View all assigned orders page.
- `/delivery/orders/:id`: Order details page.
- `/delivery/orders/:id/complete`: Complete order page.
**General Pages:**
**Home Page:**
- `/`: Home page for all users.
**About Page:**
- `/about`: About page for the website.
**Contact Page:**
- `/contact`: Contact page for inquiries.
**Search Page:**
- `/search`: Search results page for products.
**404 Error Page:**
- `/404`: Error page for page not found.
**500 Error Page:**
- `/500`: Error page for internal server errors.

Entities/schemas:
Client User Entity:
username: The unique username chosen by the user for identification.
email: The unique email address of the user, used for authentication and communication.
password: The hashed password chosen by the user for authentication.
age: The age of the user.
Country: The address of the user.
sex: The gender of the user, which can be either "male" or "female".
phoneNumber: The phone number of the user.
bio: Other optional profile fields: Additional information about the user such as bio, interests, etc. (optional)
Delivery Personnel Entity:
username: The unique username chosen by the user for identification.
email: The unique email address of the user, used for authentication and communication.
password: The hashed password chosen by the user for authentication.
age: The age of the user.
Country: The address of the user.
sex: The gender of the user, which can be either "male" or "female".
phoneNumber: The phone number of the user.
vehicleType: The type of vehicle used by the delivery personnel (e.g., motorcycle, car).
available: A boolean value indicating whether the delivery personnel is available for assignments.
Restaurant Entity:
name: The name of the restaurant.
email: The unique email address of the restaurant, used for authentication and communication.
password: The hashed password chosen by the restaurant for authentication.
country: The country where the restaurant is located.
city: The city where the restaurant is located.
address: The address of the restaurant.
phoneNumber: The phone number of the restaurant.
openingHours: The opening hours of the restaurant for each day of the week.
menu: An array containing the menu items offered by the restaurant, each with attributes such as name, price, and category.

