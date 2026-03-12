// Import font Geist dan Geist Mono dari Google Fonts
// Font ini digunakan sebagai font utama aplikasi
import { Geist, Geist_Mono } from "next/font/google";

// Import file CSS global yang berisi styling untuk seluruh aplikasi
import "./globals.css";

// Inisialisasi font Geist Sans (untuk teks biasa)
// variable: nama CSS variable yang bisa dipakai di className
// subsets: subset karakter yang di-load (latin = huruf A-Z, angka, dll)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Inisialisasi font Geist Mono (untuk teks monospace/kode)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata halaman - ditampilkan di tab browser dan untuk SEO
// title: judul yang muncul di tab browser
// description: deskripsi halaman untuk mesin pencari
export const metadata = {
  title: "Memory Card Game",
  description: "Latihan React Dasar - Memory Card Game",
};

// RootLayout adalah komponen layout utama yang membungkus SEMUA halaman
// Parameter 'children' berisi konten halaman yang sedang ditampilkan (misal page.js)
// Komponen ini wajib ada di Next.js App Router sebagai layout root
export default function RootLayout({ children }) {
  return (
    // Tag <html> sebagai root element halaman
    <html lang="en">
      {/* Tag <body> dengan className font yang sudah diinisialisasi */}
      {/* antialiased: membuat teks terlihat lebih halus di layar */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* children = konten halaman (page.js) akan dirender di sini */}
        {children}
      </body>
    </html>
  );
}
