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
├── frontend/ # React frontend

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
   
Run the Application



docker-compose up

Access the App

Frontend: http://localhost:3000

Backend API: http://localhost:8000/api/blogs/

🛠 Tech Stack

Frontend: React, React Router DOM

Backend: Django, Django REST Framework

Database: SQLite (for development)

Containerization: Docker, Docker Compose



📦 Installing Requirements Manually (Alternative)


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

✅ Features


Admin Login


JWT Authentication

Blog CRUD (Create, Read, Update, Delete)

Responsive UI


📄 License


This project is licensed under the MIT License.

🙋‍♂️ Author

Kakarla Meeraj

GitHub: meeraj097



### ✅ Next Step:

Save this content into a new file `README.md` inside your root directory (`blog-app`), commit and push again:






Login Credentials 

Username - admin
Password - admin123

```bash
git add README.md
git commit -m "Added README file"
git push



