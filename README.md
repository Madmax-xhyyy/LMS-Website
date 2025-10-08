# 📚 Learning Management System (LMS)

A full-stack **Learning Management System (LMS)** built with **React (Vite)** and **Express.js**, designed to provide a smooth and engaging e-learning experience for both students and instructors. This project features user authentication, course management, video integration, and secure payments — all in a clean, modern UI powered by Tailwind CSS.

---

## 🚀 Tech Stack

### Frontend
- **React (Vite)** – Fast and modular frontend framework
- **Tailwind CSS** – For responsive and modern UI styling
- **React Router DOM** – Client-side routing
- **Axios** – For API communication
- **React Toastify** – User notifications
- **Lucide React** – Icon library
- **Quill** – Rich text editor for course content
- **React YouTube** – Embedded course videos
- **@clerk/clerk-react** – Authentication and user management

### Backend
- **Express.js** – Web framework for Node.js
- **MongoDB & Mongoose** – Database for storing users, courses, and enrollments
- **Multer** – File uploads
- **Cloudinary** – Cloud-based image and video storage
- **Stripe** – Payment integration
- **@clerk/express** – Backend authentication middleware
- **CORS & Dotenv** – Environment and security configuration
- **Nodemon** – Development server

---

## 🧠 Features

### 👤 User Features
- Secure **authentication** using Clerk
- **Browse and enroll** in courses
- **Track progress** and course completion
- **Watch embedded videos** via YouTube integration
- View uploaded media and resources

### 🧑‍🏫 Instructor/Admin Features
- **Add and manage courses**
- **Upload course thumbnails or videos** to Cloudinary
- **Create rich course content** using Quill editor
- **Monitor enrolled students**
- **Receive payments** via Stripe

### ⚙️ General Features
- Modern, responsive UI with Tailwind CSS
- Real-time notifications and feedback using Toastify
- Organized modular structure for scalability
- Fully integrated REST API with authentication

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB account or local instance
- Cloudinary account
- Stripe account
- Clerk account for authentication

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Madmax-xhyyy/LMS-Website.git
cd LMS-Website

---

### 2️⃣ Setup the Backend
```bash
cd server
npm install

---

### Create a .env file in /server and add:
```ini
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=5000

---

###3️⃣ Setup the Frontend
```bash
cd ../client
npm install
npm run dev

---

### 🌍 Environment Variables
| Variable            | Description                              |
| ------------------- | ---------------------------------------- |
| `MONGO_URI`         | MongoDB connection string                |
| `CLOUDINARY_*`      | Cloudinary credentials for media storage |
| `STRIPE_SECRET_KEY` | Stripe API key for payments              |
| `CLERK_SECRET_KEY`  | Clerk secret key for authentication      |
| `PORT`              | Server port number                       |

---

### 🔌 API Endpoints (Sample)
| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| `POST` | `/api/courses`     | Create a new course   |
| `GET`  | `/api/courses`     | Get all courses       |
| `GET`  | `/api/courses/:id` | Get specific course   |
| `POST` | `/api/upload`      | Upload course media   |
| `POST` | `/api/payment`     | Handle Stripe payment |

---

## 🧩 Future Enhancements

- ✅ **Student progress tracking** with percentage completion  
- ✅ **Discussion forum** for students and instructors  
- ✅ **Quiz and assessment system** per course  
- ✅ **Certificate generation** after course completion  
- ✅ **Instructor analytics dashboard**  
- ✅ **Dark/Light mode** toggle on frontend  
- ✅ **Email notifications** for enrollments and updates  
- ✅ **Enhanced mobile responsiveness**  
- ✅ **Educators can edit, update, and delete their uploaded courses**  
- ✅ **Educators can add their own payment accounts** to receive payments for their own courses directly

---

## 🤝 Contributing

-Contributions are welcome!
-Fork the repo
-Create a new branch (feature/my-feature)
-Commit your changes
-Open a Pull Request
