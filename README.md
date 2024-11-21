# 🏨 Stay Hotel Web App

A modern hotel listing web application built with Next.js that allows users to search for hotels based on filters such as country, state, city, and title. The site displays detailed hotel information, including amenities, images, and descriptions, for a seamless user experience.

## Features

### 🔍 Search and Filter:

- Search hotels by title, country, state, and city.
- Dynamic filtering updates the displayed hotels in real-time.

### 📖 Detailed Hotel Information:

- View hotel descriptions, amenities, and available rooms.
- Displays attractive images for each hotel.

### 📱 Responsive Design:

- Fully optimized for desktop, tablet, and mobile devices.

### ⚡ Fast Performance:

- Server-side rendering (SSR) for fast data loading and SEO optimization.

## Tech Stack

### Frontend

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide Icons**: Modern icon library.
- **TypeScript**: Type-safe development.

### Backend

- **Prisma**: ORM for database access and management.
- **PostgreSQL**: Database for storing hotel data.

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/hotel-finder.git
   cd hotel-finder
   ```

2. **Install Dependencies**

   ```bash
   # Using Yarn
   yarn install

   # Or, if you prefer npm
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/hotel_finder
   ```

4. **Run Database Migrations**
   Use Prisma to generate the database schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**
   ```bash
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```bash
.
├── /components      # Reusable React components
├── /data            # Static JSON data (optional)
├── /pages           # Next.js pages
│   ├── index.tsx    # Home page
│   └── api          # API routes
├── /styles          # Global styles
├── /lib             # Utility and helper functions
├── /hooks           # Custom React hooks
├── /public          # Static assets
└── prisma           # Prisma schema
```

## Usage

### Filter Hotels

- Select a Country, State, and City from the dropdown filters.
- Use the search bar to find hotels by title.
- Click Clear Filter to reset the filters and view all hotels.

### View Hotel Details

Each hotel card includes:

- Name and location.
- Description and key amenities.
- Available rooms and pricing.

## Screenshots

- Home Page
- Search Filters

## Future Improvements

- ✈️ **Booking Integration**: Add room booking functionality.
- 🌍 **Map View**: Display hotels on an interactive map.
- 🛠️ **Admin Panel**: Manage hotel listings through an admin dashboard.
- 💬 **Reviews**: Allow users to leave reviews and ratings for hotels.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

Feel free to reach out with questions or suggestions:

- **Email**: sajjadmugdho@gmail.com
- **GitHub**: [Your GitHub Profile](https://github.com/sajjad-mugdho)

Happy coding! 🎉

## Vision for V2 Release

### Enhanced User Experience

- **Personalized Recommendations**: Implement machine learning algorithms to provide personalized hotel recommendations based on user preferences and past searches.
- **User Profiles**: Allow users to create profiles, save favorite hotels, and manage bookings.

### Advanced Search and Filters

- **Price Range Filter**: Add the ability to filter hotels by price range.
- **Advanced Filters**: Include more filters such as star rating, amenities, and guest reviews.

### Improved Performance

- **Caching**: Implement caching strategies to reduce load times and improve performance.
- **Optimized Images**: Use image optimization techniques to ensure faster loading of hotel images.

### New Features

- **Booking Integration**: Enable users to book rooms directly through the application.
- **Interactive Map**: Display hotels on an interactive map for easier location-based searches.
- **User Reviews and Ratings**: Allow users to leave reviews and ratings for hotels, enhancing the decision-making process for other users.

### Admin Panel

- **Hotel Management**: Provide an admin dashboard for hotel owners to manage their listings, update information, and view booking statistics.
- **User Management**: Allow admins to manage user accounts and monitor activity.

### Security Enhancements

- **Two-Factor Authentication**: Implement two-factor authentication for added security.
- **Data Encryption**: Ensure all sensitive data is encrypted to protect user information.

Stay tuned for more updates and exciting features in the V2 release!

### Payment Integration

- **Stripe Payment Gateway**: Integrate Stripe to handle secure online payments for hotel bookings.
- **Payment History**: Allow users to view their payment history and download receipts.
- **Refunds and Cancellations**: Implement functionality for processing refunds and managing booking cancellations.
