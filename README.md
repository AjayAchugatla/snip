# 🔗 Snip – Modern URL Shortener

**Snip** is a sleek and simple URL shortening platform that allows users to shorten links with custom slugs, monitor click analytics (including location data), and manage their URLs — all with authentication powered by **Supabase**.

---

## ✨ Features

### 🔐 Authentication
- Sign up / Sign in using **email + password**
- Session management via **Supabase Auth**

### ✂️ URL Shortening
- Generate short links from long URLs
- Option to provide a **custom slug**
- Automatic slug generation with conflict handling

### 📊 Analytics Dashboard
- Track:
  - Total number of clicks
  - **Geolocation** of visitors (country/city)
- Link-level analytics available per user

### 🧑‍💼 User Dashboard
- View and manage all your short links
- Delete or regenerate URLs
- View real-time analytics

---

## 🧰 Tech Stack

| Layer         | Tech                         |
|---------------|------------------------------|
| Frontend      | React.js                     |
| Styling       | Tailwind CSS                 |
| Auth & DB     | Supabase (PostgreSQL + Auth) |

