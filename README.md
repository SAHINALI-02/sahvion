# SAHVION — TECH • INNOVATION • FUTURE

A premium, cinematic, futuristic technology experience featuring an interactive **Three.js / React Three Fiber** frontend and a production-ready **FastAPI + PostgreSQL** backend.

---

## ⚡ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript (Vite 5)
- **3D Engine**: Three.js, React Three Fiber (R3F), `@react-three/drei`
- **Animation**: GSAP, ScrollTrigger, CSS Keyframes
- **Styling**: Tailwind CSS (Obsidian dark `#050508`, metallic silver, electric violet glow)
- **Icons**: Lucide Icons
- **Branding**: Modular `BrandWordmark` architecture (designed to swap in final logo symbol when finalized)

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL (with SQLAlchemy 2.0 ORM)
- **Validation**: Pydantic v2
- **Authentication**: JWT (JSON Web Tokens) with passlib bcrypt
- **Security**: CORS middleware, in-memory rate limiting, SQL injection protection, environment isolation
- **Notifications**: Modular SMTP email dispatcher forwarding inquiries to `sahvion26@gmail.com`
- **Documentation**: Swagger UI (`/docs`) and ReDoc (`/redoc`)

---

## 📞 Official SAHVION Contact Details

- **Official Contact Email**: [`sahvion26@gmail.com`](mailto:sahvion26@gmail.com)
- **Official Mobile / WhatsApp**: [`+91 8531833975`](tel:+918531833975)
- **Coordinates**: `37.7749° N, 122.4194° W` (Global Edge)

---

## 📁 Project Directory Structure

```text
SAHVION/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   └── jwt.py               # JWT generation, verification & bcrypt hashing
│   │   ├── models/
│   │   │   ├── admin.py             # AdminUser model
│   │   │   ├── contact.py           # ContactInquiry model
│   │   │   ├── newsletter.py        # NewsletterSubscriber model
│   │   │   └── project.py           # Project model
│   │   ├── routes/
│   │   │   ├── admin.py             # /api/admin/* endpoints
│   │   │   ├── contact.py           # POST /api/contact endpoint
│   │   │   ├── newsletter.py        # POST /api/newsletter/subscribe endpoint
│   │   │   └── projects.py          # GET /api/projects endpoints
│   │   ├── schemas/
│   │   │   ├── auth.py              # Pydantic schemas for auth
│   │   │   ├── contact.py           # Pydantic schemas for contact
│   │   │   ├── newsletter.py        # Pydantic schemas for newsletter
│   │   │   └── project.py           # Pydantic schemas for projects
│   │   ├── services/
│   │   │   ├── email.py             # Modular email notification dispatcher
│   │   │   └── rate_limiter.py      # In-memory IP rate limiter
│   │   ├── config.py                # Pydantic environment configuration
│   │   ├── database.py              # SQLAlchemy engine & sessionmaker
│   │   └── main.py                  # FastAPI application & lifespan seeder
│   ├── .env                         # Backend environment variables
│   ├── .env.example                 # Backend environment template
│   └── requirements.txt             # Python dependencies
├── src/
│   ├── components/
│   │   ├── BrandWordmark.tsx        # Modular text wordmark & tagline
│   │   ├── ContactSection.tsx       # Live Contact section connected to API
│   │   ├── Footer.tsx               # Footer with official info & newsletter
│   │   ├── FutureStatement.tsx      # Manifesto section
│   │   ├── Hero3DCanvas.tsx         # Interactive Three.js metallic 3D core
│   │   ├── HeroSection.tsx          # Full-viewport hero
│   │   ├── IntroSection.tsx         # Philosophy & interactive 3D telemetry
│   │   ├── LoadingScreen.tsx        # Cinematic boot sequence
│   │   ├── Navbar.tsx               # Floating glass navbar
│   │   ├── ProcessSection.tsx       # 6-stage interactive timeline
│   │   ├── ServiceBranding.tsx      # Visual identity laboratory
│   │   ├── ServiceDigitalProducts.tsx # Connected 3D digital ecosystem
│   │   ├── ServicesGrid.tsx         # 4 floating magnetic service cards
│   │   ├── ServiceUIUX.tsx          # Floating 3D UI panels & design tokens
│   │   ├── ServiceWebDev.tsx        # Floating 3D browser/mobile transformer
│   │   └── WhySahvion.tsx           # Capability comparison matrix
│   ├── services/
│   │   └── api.ts                   # Frontend API client for FastAPI
│   ├── styles/
│   │   └── index.css                # Tailwind directives & glow effects
│   ├── App.tsx                      # Root application layout
│   └── main.tsx                     # React DOM entrypoint
├── .env                             # Frontend environment variables
├── .env.example                     # Frontend environment template
├── package.json
└── README.md
```

---

## 🚀 Step-by-Step Local Development Guide

### 1. Install Frontend Dependencies

```bash
# In project root:
npm install
# or with Bun:
bun install
```

### 2. Install Backend Dependencies

```bash
# In backend directory:
cd backend
pip install -r requirements.txt
```

### 3. Configure PostgreSQL

Create a PostgreSQL database for SAHVION:

```sql
CREATE DATABASE sahvion_db;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE sahvion_db TO postgres;
```

> **Note**: If PostgreSQL is not installed or running during local testing, the backend automatically falls back to SQLite (`sahvion_dev.db`) so development continues without crashing, and switches to PostgreSQL as soon as `DATABASE_URL` is available.

### 4. Create Environment Variables

#### Backend (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sahvion_db
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173
JWT_SECRET_KEY=your_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
SMTP_HOST=
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
CONTACT_EMAIL=sahvion26@gmail.com
CONTACT_PHONE=+91 8531833975
ENVIRONMENT=development
```

#### Frontend (`.env` in root):
```env
VITE_API_URL=http://localhost:8000/api
```

### 5. Start Backend Server

```bash
cd backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
- API Base: `http://127.0.0.1:8000/`
- Interactive API Docs: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

### 6. Start Frontend Server

In another terminal:
```bash
# From project root:
npm run dev
# or:
bun run dev --host 127.0.0.1 --port 3000
```
- Open `http://127.0.0.1:3000/` in your browser.

### 7. Test `/docs` and API Endpoints

1. Navigate to [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
2. You will see:
   - `POST /api/contact`: Submit project inquiries.
   - `POST /api/newsletter/subscribe`: Subscribe email to newsletter.
   - `GET /api/projects`: Retrieve published projects (auto-seeded).
   - `GET /api/projects/{id}`: Retrieve project details.
   - `POST /api/admin/login`: Admin JWT login.
   - `POST /api/admin/projects`: Create project (JWT required).
   - `GET /api/admin/inquiries`: View all inquiries (JWT required).
   - `GET /api/admin/subscribers`: View all subscribers (JWT required).

### 8. Test Contact Form

1. On the website, scroll to the **Contact** section (`LET'S BUILD SOMETHING FUTURE-READY`).
2. Fill in your name, email, phone number, company, choose a service track, and enter your project requirements.
3. Click **DISPATCH ENQUIRY**.
4. The form submits asynchronously to `POST /api/contact` without reloading the page.
5. On success, it displays:
   > **“Thank you. Your project enquiry has been received.”**
6. The inquiry is stored in PostgreSQL and dispatched to `sahvion26@gmail.com`.

### 9. Test Newsletter Subscription

1. In the **Footer**, locate the `// TECHNOLOGICAL RADAR NEWSLETTER` input box.
2. Enter an email address and click the submit arrow button.
3. The email is stored in PostgreSQL with duplicate prevention.
4. An instant success notification appears inline.

### 10. Connecting Frontend to Backend in Production

When deploying to production:
1. Set `VITE_API_URL=https://api.yourdomain.com/api` in your frontend deployment environment.
2. Set `CORS_ORIGINS=https://yourdomain.com` in your backend deployment `.env`.
3. Set your production PostgreSQL URL in `DATABASE_URL`.
4. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, and `SMTP_PASSWORD` to enable live external email delivery to `sahvion26@gmail.com`.

---

## 🔒 Security Architecture

- **No Exposed Secrets**: Frontend never touches database credentials, secret keys, or SMTP passwords.
- **SQL Injection Prevention**: SQLAlchemy parameterized queries across all database operations.
- **Rate Limiting**: In-memory rate limiting on `/api/contact` and `/api/newsletter/subscribe` to prevent automated spam.
- **CORS Restricted**: Controlled origin access allowing only authorized frontend hosts.
- **Strict Validation**: Pydantic models validate email formats, string lengths, and payload schemas before database insertion.

---

© 2026 SAHVION. All rights reserved. TECH • INNOVATION • FUTURE.
