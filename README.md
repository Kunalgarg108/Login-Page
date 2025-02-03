# Login Page with Firebase Authentication
This is a **React-Vte based Login Page** that uses **Firebase Authentication** for:  
- Google Sign-In  
- Email & Password Authentication  
- React Router for navigation  
- React Toastify for notifications
  
---

## 📸 Project Screenshots  

🔑 **Login Page** 
![Screenshot 2025-02-01 123323](https://github.com/user-attachments/assets/d12f72bf-f2e2-4e63-babd-021cbaf9ccb2)

🔑 **SignUp Page**  
![Screenshot 2025-02-01 123338](https://github.com/user-attachments/assets/f78bad7a-c00c-42dc-91e9-95eee41368b3)

---

## 🚀 Features  
- User Authentication with Firebase  
- Google Sign-In & Email/Password Login  
- Protected Routes using **React Router**  
- User-friendly **Toast Notifications**  
- Environment Variables for security  

---

## 🔧 Technologies Used  
- React.js  
- Firebase  
- React Router DOM  
- React Toastify  
- TailwindCSS  

---

## 🛠️ Installation Guide 
### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/login-page.git
cd login-page
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Setup Firebase
- Go to Firebase Console
- Create a new project
- Enable Authentication > Sign-in Methods
- Enable Google Sign-In and Email/Password Sign-In
- Copy Firebase Config from Project Settings


### 4️⃣ Create .env File
Create a .env file in the root directory and add your Firebase credentials:
```sh
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

```
### 5️⃣ Run the Project
```sh
npm run dev
```

---

## 📂 Project Structure  

```
/login-page
├── /src
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
├── .env
├── README.md
├── package.json
├── vite.config.js
```
