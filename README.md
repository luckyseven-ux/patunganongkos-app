# patunganongkos-app
 Here’s a cool and dev-friendly README for your GitHub repo with a fun, casual programmer vibe! 🚀😎

🚀 Patungan Ongkos - Backend API
Welcome to the Patungan Ongkos backend! This is where all the magic happens—authentication, route management, and geospatial queries, all powered by Node.js, Express, PostgreSQL, and MongoDB.

If you love clean code, solid security, and scalable APIs, you’re in the right place! 💻🔥

✨ Features
✅ JWT Auth – Secure login & token-based authentication
✅ Bcrypt Password Hashing – No plain text passwords here! 🛡️
✅ PostgreSQL + MongoDB Hybrid – Best of both worlds!
✅ Find Nearest Routes – Geospatial queries to get the best ride options 🚗
✅ RESTful API – Plug and play with any frontend!

🛠️ Tech Stack
🟢 Node.js – Because JavaScript everywhere, duh!
⚡ Express.js – Fast, unopinionated, and minimal
🐘 PostgreSQL – Structured data? We got you.
🍃 MongoDB – Flexible NoSQL goodness
🔐 JWT + Bcrypt – Keeping your creds safe
📦 Dotenv – Secret sauce for config management

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
3️⃣ Set up your .env
Create a .env file in the root directory and add your configs:

ini
Salin
Edit
# PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=patunganongkos
DB_PASS=yourpassword
DB_PORT=5432

# MongoDB
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
🛡️ Auth Routes
Method	Endpoint	Description	Protected
POST	/api/users/register	Create a new user	❌
POST	/api/users/login	Get a JWT token	❌
POST	/api/users/logout	Destroy session & record logout	✅
🚗 Route API
Method	Endpoint	Description	Protected
GET	/api/routes?lat=-6.200&lng=106.816	Find nearby routes (5km radius)	✅
🔐 Note: Auth-required routes need a token in the header:

h
Salin
Edit
Authorization: Bearer YOUR_JWT_TOKEN
📌 What’s Next?
🔜 Ride Booking & Payments Integration
🔜 Optimized Geospatial Queries with PostGIS
🔜 Role-based Access Control (Admin, Driver, User)
🔜 Real-time Notifications (maybe Firebase?)

🤝 Wanna Contribute?
Fork it, clone it, tweak it, and submit a PR. Let’s build something awesome together! 🤘

1️⃣ Fork this repo
2️⃣ Create a new branch (feature-awesome-stuff)
3️⃣ Commit your changes (git commit -m 'Added some cool stuff')
4️⃣ Push it (git push origin feature-awesome-stuff)
5️⃣ Open a Pull Request 🚀

📜 License
MIT License – Use it, modify it, build something awesome with it. Just don’t forget to credit the OG repo! 😉

🚀 Let’s Code & Make Some Impact!
If you like this project, don’t forget to 🌟 star it on GitHub!
Need help? Open an issue or DM me on Twitter/LinkedIn! 💙💬

This README keeps it fun, clear, and dev-friendly! Let me know if you need any tweaks. Keep coding, legend! 🚀🔥