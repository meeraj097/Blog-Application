# 📝 Blog Application

A full-stack Blog Application built with **React** (frontend) and **Django REST Framework** (backend), fully Dockerized and ready for deployment.

---

## 📂 Project Structure

blog-app/

│

├── backend/ # Django backend (API)

│ ├── blogapi/ # Main Django project

│ ├── blogapp/ # App containing blog logic

│ ├── Dockerfile

│ ├── requirements.txt

│ └── manage.py

│
├──  frontend/ # React frontend

│ ├── public/

│ ├── src/

│ ├── Dockerfile

│ └── package.json

│

├── docker-compose.yml

└── README.md

---

## ⚙️ How to Run

### 📦 Prerequisites

- Docker & Docker Compose
- Git

---

### 🚀 Getting Started

1. **Clone the Repository**
   
   ```bash
   git clone https://github.com/meeraj097/Blog-Application.git
   cd Blog-Application
   
2. Run the Application

   ```
   docker-compose up
   ```

3. Access the App

   Frontend: http://localhost:3000
   
   Backend API: http://localhost:8000/api/blogs/

---


## 🛠 Tech Stack

Frontend: React, React Router DOM

Backend: Django, Django REST Framework

Database: SQLite (for development)

Containerization: Docker, Docker Compose

---


## 📦 Installing Requirements Manually (Alternative)


If you're not using Docker, install backend & frontend dependencies manually:



Backend

```
cd backend

python -m venv env

env\Scripts\activate      # On Windows

pip install -r requirements.txt

python manage.py runserver
```


Frontend

```
cd frontend

npm install

npm start
```
---

## ✅ Features


### Admin Login


JWT Authentication

Blog CRUD (Create, Read, Update, Delete)

Responsive UI

---

## 🔗 Live Deployment


- **Frontend #1 (Netlify)**: [Blog Application Frontend (Netlify)](https://comfy-bubblegum-e9c093.netlify.app/)
- **Frontend #2 (Vercel)**: [Blog Application Frontend (Vercel)](https://blog-application-gamma-nine.vercel.app/)
- **Backend Admin Creation Endpoint**: [Create Admin User](https://blog-application-gzkv.onrender.com/api/create-admin/)
  
  ```
   Username: admin
   Password: admin123
   ```

---

## 🛠 Admin Login – Invalid Credentials Issue

If the frontend displays **"Invalid Credentials"** during login, follow these steps:

1. Visit this link in your browser to create the default admin user:  
   👉 [https://blog-application-gzkv.onrender.com/api/create-admin/](https://blog-application-gzkv.onrender.com/api/create-admin/)

2. The response will be either:
   - `{"message": "Test admin user created"}` – Admin user was created successfully.
   - `{"message": "Admin already exists"}` – Admin user already exists.

3. Once this is done, open the deployed frontend link (either one):  
   👉 [Netlify Frontend](https://comfy-bubblegum-e9c093.netlify.app/)  
   👉 [Vercel Frontend](https://blog-application-gamma-nine.vercel.app/)

4. Log in using the default credentials:

   
 ```
Username: admin
Password: admin123
```

---


## 📄 License


This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

Kakarla Meeraj

GitHub: meeraj097


---



### ✅ Next Step:

Save this content into a new file `README.md` inside your root directory (`blog-app`), commit and push again:



```bash
git add README.md
git commit -m "Added README file"
git push



