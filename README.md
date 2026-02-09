# 📚 Learning Management System (LMS)

A full-stack **Learning Management System (LMS)** built using **React.js** for the frontend and **Django REST Framework** for the backend. This platform is designed to provide a scalable, secure, and user-friendly environment for managing online learning activities, including course delivery, student management, and academic progress tracking.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register)
- 👨‍🏫 Instructor and Student Roles
- 📘 Course Creation and Management
- 📂 Upload and Access Learning Materials
- 📝 Assignments and Submissions
- 📊 Student Performance Tracking
- 🌐 RESTful API Integration
- ⚡ Responsive and Modern User Interface
- 🔒 Secure Data Handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5 / CSS3
- Axios
- Bootstrap / Material UI

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite / PostgreSQL / MySQL

---


---

## 📄 Research Publication

This Learning Management System project is supported by a peer-reviewed research paper that has been published and presented at an international academic conference. The paper focuses on the design, development, and implementation of a scalable web-based LMS using React.js and Django REST Framework, highlighting system architecture, performance evaluation, security mechanisms, and user experience optimization. The research demonstrates how modern full-stack technologies can be effectively integrated to improve digital learning environments, enhance student engagement, and support efficient academic management. The conference publication validates the technical quality, innovation, and real-world applicability of this system.

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/LMS.git
cd LMS
cd lms_api

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

npm install
npm start


