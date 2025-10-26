# 🧾 Inventory Management App

A simple full-stack **Node.js + Express + PostgreSQL** app for managing **Suppliers, Categories, and Parts** — containerized with **Docker** for smooth local setup.

---

## 🚀 How It Works

- **Suppliers** → top-level entities.  
- Each supplier can have **multiple categories**.  
- Each category contains **parts/items**.  
- You can **view**, **edit**, **delete**, or **add** entries across all three levels.  
- The app uses **EJS templates** to render pages and **PostgreSQL** to store data.

🧭 **Flow Example:**
1. Go to `/suppliers` → see all suppliers.  
2. Click *View Supplier Details* → see categories under that supplier.  
3. Click a category → see its parts.  
4. Add, edit, or delete items (redirects back to category details).  

---

## 🧩 Stack

- Node.js + Express  
- PostgreSQL  
- EJS (templates)  
- Docker & Docker Compose  
- connect-flash (feedback messages)

---

## ⚙️ Setup (Docker)

```bash
# 1️⃣ Clone the project
git clone <repo-url>
cd inventory-application

# 2️⃣ Start containers
docker compose up --build

# 3️⃣ Seed database
docker compose exec app node populatedb.js

# 4️⃣ Visit the app
http://localhost:3000

# 🧠 Default DB credentials (set in .env):

PGUSER=raven
PGPASSWORD=raven123
PGDATABASE=inventory_db
PGHOST=db
PGPORT=5432

# 💻 Local Setup (Without Docker)

npm install
node populatedb.js
npm run dev
# http://localhost:3000

# 🧠 Core Routes
Route	Description
/suppliers	List all suppliers
/suppliers/:id	Supplier detail (with categories)
/categories/details/:id	Category details + parts
/parts/details/:id	Part detail page
/parts/delete/:id	Delete part (redirects to category)

# 🧰 Common Commands

| Command                                      | Purpose               |
| -------------------------------------------- | --------------------- |
| `docker compose up --build`                  | Start the app         |
| `docker compose exec app bash`               | Enter container shell |
| `docker compose exec app node populatedb.js` | Seed tables           |
| `docker compose down`                        | Stop containers       |


# ✨ Author

Zion Musa
“Every discipline affects every other discipline.” — Jim Rohn