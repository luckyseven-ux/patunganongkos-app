🚀 Patungan Ongkos - Backend API
Your Ride, Your Rules! 🏎️💨
This is the backend API for Patungan Ongkos, a ride-sharing platform that helps users split transportation costs efficiently. Built with Node.js, Express, PostgreSQL, and MongoDB, this backend provides secure JWT authentication, geospatial route searching, and a hybrid SQL/NoSQL database system.

Let’s build something amazing together! 💻🔥

✨ Features
✅ User Authentication (Register, Login, Logout) using JWT
✅ Password Hashing with Bcrypt (No plain text passwords! 🔐)
✅ Hybrid Database (PostgreSQL + MongoDB) for optimized storage
✅ Find Nearest Routes with geospatial queries 🌍
✅ Secure RESTful API ready for frontend integration
✅ Clean & Scalable Codebase for easy maintenance

🛠️ Tech Stack
🔹 Node.js – JavaScript everywhere!
🔹 Express.js – Fast and minimal backend framework
🔹 PostgreSQL – Structured data with SQL power 💪
🔹 MongoDB – NoSQL for user profiles & flexible data 📦
🔹 JWT (JSON Web Token) – Secure user authentication 🔐
🔹 Bcrypt.js – Hashing passwords like a pro
🔹 Dotenv – Secret management made easy

🚀 Getting Started
1️⃣ Clone this repo
sh
Salin
Edit
git clone https://github.com/username/patunganongkos-backend.git
cd patunganongkos-backend
2️⃣ Install dependencies
sh
Salin
Edit
npm install
3️⃣ Set up your .env file
Create a .env file in the root directory and add:

ini
Salin
Edit
# PostgreSQL Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=patunganongkos
DB_PASS=yourpassword
DB_PORT=5432

# MongoDB Database
MONGO_URL=mongodb+srv://buncit:password@cluster0.mongodb.net/patunganongkos?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=supersecretkey

# Server Port
PORT=3000
4️⃣ Fire up the server
sh
Salin
Edit
npm run dev
✅ Now your API is live at http://localhost:3000 🎉

🔗 API Endpoints
🛡️ Authentication Routes
Method	Endpoint	Description	Protected
POST	/api/users/register	Register a new user	❌
POST	/api/users/login	Authenticate user and get JWT token	❌
POST	/api/users/logout	Record logout and clear session	✅
🚗 Route API
Method	Endpoint	Description	Protected
GET	/api/routes?lat=-6.200&lng=106.816	Find nearby routes within a 5km radius	✅
🔐 Note: Authenticated routes require a JWT token in the header:

http
Salin
Edit
Authorization: Bearer YOUR_JWT_TOKEN
📌 What's Next?
🔜 Ride Booking & Payments Integration
🔜 Optimized Geospatial Queries with PostGIS
🔜 Role-based Access Control (Admin, Driver, User)
🔜 Real-time Notifications (maybe Firebase?)

🤝 Contributing
We love open-source contributions! 💙 If you want to help:
1️⃣ Fork this repo
2️⃣ Create a new branch (feature-xyz)
3️⃣ Commit your changes (git commit -m 'Added feature XYZ')
4️⃣ Push your changes (git push origin feature-xyz)
5️⃣ Open a Pull Request 🚀

📜 License
MIT License – Feel free to use, modify, and improve. Just don’t forget to give credit to the original repo! 😉

🚀 Let’s Code & Build Something Amazing!
If you find this project useful, don’t forget to 🌟 star the repo on GitHub!
Need help? Open an issue or DM me on Twitter/LinkedIn! 💙💬

🔥 Now your GitHub repo looks awesome and professional! 🔥 🚀✨
Let me know if you want any modifications! 😊