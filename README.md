# ✅ Task Management Web App - Tugas Extreme Programming

Aplikasi ini dikembangkan sebagai simulasi **Extreme Programming (XP)** dalam pengembangan perangkat lunak. Kami membangun aplikasi **Task Manager** berbasis web yang memungkinkan pengguna mengelola tugas sehari-hari secara efisien, dengan mengikuti praktik XP seperti **Pair Programming, TDD, CI/CD, Refactoring, dan Small Releases**.

---

## 🌐 Demo Aplikasi

🖥️ [Klik untuk melihat aplikasi](https://task-management-tau-ruby.vercel.app)

---

## 👥 Anggota Kelompok

| NIM         | Nama                            |
|-------------|---------------------------------|
| 231110569   | Arya Ghuna Faturrahman          |
| 231110333   | Ade Kurnia Setialu Dani         |
| 231112747   | Muhammad Dhani Irvansyah        |

---

## 🎯 Studi Kasus

> Startup "TaskEasy" ingin aplikasi task management ringan berbasis web. Aplikasi ini harus bisa membuat, melihat, memperbarui, dan menghapus tugas. Pengguna juga bisa memberi **prioritas** (low, medium, high) dan melacak **status** (to-do, in-progress, done).

---

## 🔧 Fitur Utama

- 🆕 Tambah task dengan judul, deskripsi, prioritas, dan status
- 📋 Lihat daftar task yang diurutkan berdasarkan prioritas
- ✏️ Edit dan hapus task
- ✅ Quick actions untuk ubah status task
- 🎛️ Filter berdasarkan status dan prioritas
- 🌙 Tema dark/light toggle
- 💾 Penyimpanan lokal menggunakan `localStorage`

---

## 🚀 Teknologi yang Digunakan

- **React & Next.js (TypeScript)**
- **Tailwind CSS**
- **Jest** untuk unit testing (TDD)
- **GitHub Actions** untuk CI
- **Vercel** untuk deployment
- **LocalStorage** untuk data persistence

---

## 🧪 Praktik XP yang Diterapkan

| Praktik XP               | Implementasi                                                                  |
|--------------------------|-------------------------------------------------------------------------------|
| ✅ Pair Programming       | Seluruh fitur dikerjakan berpasangan, driver-navigator bergantian             |
| ✅ Test-Driven Development (TDD) | Menulis unit test terlebih dahulu untuk validasi form & filtering       |
| ✅ Continuous Integration | Menggunakan GitHub Actions untuk menjalankan test otomatis saat push          |
| ✅ Small Releases         | Fitur dirilis bertahap setiap hari (form, list, filtering, tema, dll)         |
| ✅ Refactoring            | Refactor komponen kompleks dan logika task agar lebih modular dan bersih      |
| ✅ Customer Collaboration | 1 anggota sebagai "customer" memberikan feedback dan prioritas setiap hari    |
| ✅ Planning Game          | Sesi perencanaan hari pertama dengan estimasi story points per user story     |

---

## 🧾 Pembagian Tugas Tim

### 👤 Arya Ghuna Faturrahman
- Komponen: `task-form.tsx`, `task-manager.tsx`
- Fokus: input data, validasi, manajemen status
- Commit:
  - `feat: Membuat form input task`
  - `test: Unit test validasi form`
  - `refactor: Pemisahan logic task`
  - `fix: Perbaikan bug field prioritas`

---

### 👤 Ade Kurnia Setialu Dani
- Komponen: `task-list.tsx`, `task-filters.tsx`
- Fokus: tampilan daftar dan filter
- Commit:
  - `feat: Menampilkan task terurut berdasarkan prioritas`
  - `style: Styling tailwind`
  - `fix: Perbaikan filter status`
  - `refactor: Optimasi komponen`

---

### 👤 [Nama Anggota Ketiga]
- Komponen: `task-quick-actions.tsx`, `theme-toggle.tsx`
- Fokus: interaksi cepat & UI tema
- Commit:
  - `feat: Toggle tema dark/light`
  - `feat: Tombol cepat ubah status`
  - `review: Revisi fitur berdasarkan feedback`
  - `chore: Pembersihan kode sebelum demo`

---

## 📦 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/username/task-manager-app.git
cd task-manager-app

# Install dependensi
npm install

# Jalankan lokal
npm run dev
