# 🎮 Tic Tac Toe Pro

Project Tic Tac Toe keren buatan **Rafly Romeo**. Game ini mendukung mode single player melawan bot AI cerdas dan mode multiplayer online secara real-time.

## ✨ Fitur Utama
- **Arena Bot**: Lawan bot AI dengan algoritma Minimax (Mudah, Sedang, Sulit).
- **Mabar Online**: Duel real-time via Socket.io dengan sistem kode ruangan.
- **Brutalist UI**: Desain bold dengan border tebal dan warna kontras.
- **Full Responsive**: Optimal di Desktop, Tablet (iPad), dan Mobile.
- **Theme Support**: Mendukung Mode Terang, Gelap, dan Sistem.

## 📂 Struktur Project
```text
tictactoe/
├── backend/                # Server Python (Flask-SocketIO)
│   ├── app.py              # Logika utama server & socket
│   └── requirements.txt    # Library Python
└── frontend/               # Aplikasi Web (Next.js)
    ├── src/
    │   ├── app/            # Routing (Next.js App Router)
    │   ├── components/     # UI Components (React)
    │   ├── hooks/          # Custom hooks (Logika game)
    │   └── lib/            # Utility functions
    ├── public/             # Assets statis
    └── package.json        # Dependencies JS
```

## 🚀 Cara Menjalankan (Lokal)

### 1. Clone Project
```bash
git clone https://github.com/USERNAME/REPO-NAME.git
cd tictactoe
```

### 2. Jalankan Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 3. Jalankan Frontend
```bash
cd frontend
npm install
npm run dev
```

## ⬆️ Cara Push ke GitHub
Jika kamu ingin menyimpan perubahan ke repository kamu sendiri:
```bash
# Inisialisasi (Jika belum)
git init
git add .
git commit -m "update: fitur mabar online & UI responsif"

# Tambahkan remote (Ganti dengan link repo kamu)
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## 🌐 Tech Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion.
- **Backend**: Python 3, Flask, Flask-SocketIO.

---
**Dibuat oleh Rafly Romeo.** 🚀
