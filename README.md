# 🧠 Smart Login System

A simple and interactive login/registration system built with **JavaScript**, **HTML**, and **LocalStorage**.  
It allows users to **register**, **log in**, and get a personalized welcome message — all without a backend.

---

## 🚀 Features

- Register new users with name, email, and password
- Validate email and password format using **Regex**
- Save users in browser's **LocalStorage**
- Login and logout functionality
- Show the currently logged-in user with a custom greeting
- Switch between login and registration forms
- Lightweight and beginner-friendly project

---

## 🖥️ Technologies Used

- HTML
- CSS
- JavaScript (Vanilla JS -DOM) 
- LocalStorage
-Regex =>  Regular Expression

---

## 📸 Screenshot

![Welcome Page](images/Screenshot%202025-06-23%20015124.png)



---

## 🧪 How It Works

- On page load, the script checks if a user is already logged in.
- If yes, it shows the welcome screen with the user's name.
- If not, it shows the registration form by default.
- Upon successful registration, the user is automatically logged in and greeted.
- User data is stored in `localStorage`, including the email of the currently logged-in user.
- You can logout at any time to return to the login screen.

---

## ✅ Validation Rules

- **Email:** Must be in a valid email format (`example@domain.com`)
- **Password:** Minimum 6 characters, includes at least one number and one letter

---



