# FAQ

Kumpulan pertanyaan yang sering diajukan seputar ITS-Typst.

## Umum

### Apakah template ini resmi dari ITS?

Template ini dibuat oleh komunitas mahasiswa ITS dan **bukan** produk resmi dari institusi. Namun, formatnya telah disesuaikan semaksimal mungkin dengan panduan penulisan dokumen akademik ITS. Selalu verifikasi dengan panduan terbaru dari departemenmu.

### Apakah Typst gratis?

Ya, Typst tersedia gratis dan open-source. Kamu bisa menggunakan versi CLI offline maupun editor online di [typst.app](https://typst.app).

### Apa bedanya Typst dengan LaTeX?

| Aspek               | Typst                    | LaTeX                |
| ------------------- | ------------------------ | -------------------- |
| Kurva belajar       | Lebih mudah              | Lebih sulit          |
| Kecepatan kompilasi | Sangat cepat (real-time) | Lambat               |
| Error messages      | Jelas dan informatif     | Sering membingungkan |
| Ekosistem           | Masih berkembang         | Sangat mature        |
| Package             | Terbatas                 | Sangat lengkap       |

### Template apa saja yang tersedia?

Saat ini ITS-Typst menyediakan template untuk:

- Tugas Akhir (Skripsi S1)
- Kerja Praktik / Magang

Template untuk Tesis (S2), Disertasi (S3), Proposal, dan dokumen lainnya sedang dalam pengembangan. Pantau terus [GitHub ITS-Typst](https://github.com/ITS-Typst) untuk update terbaru.

---

## Teknis

### Kenapa PDF hasil kompilasi berbeda dari preview?

Ini biasanya terjadi karena:

1. Font yang digunakan di editor tidak sama dengan yang dikompilasi
2. Cache Typst yang outdated — coba hapus folder `.typst-cache`
3. Versi Typst yang berbeda

Solusi: update Typst ke versi terbaru dengan `typst update` atau `winget upgrade Typst.Typst`.

### Bagaimana cara menambahkan font kustom?

```typst
#set text(font: "Times New Roman")

// Atau kombinasi font dengan fallback:
#set text(font: ("Libertinus Serif", "Liberation Serif"))
```

Font harus diinstal di sistem operasi kamu agar bisa digunakan.

### Kenapa gambar saya blur/pecah?

Gunakan gambar dengan resolusi tinggi (minimal 300 DPI untuk cetak). Format yang direkomendasikan:

- **SVG** untuk diagram dan ilustrasi vektor
- **PNG** untuk screenshot dan gambar dengan transparansi
- **JPG** untuk foto

### Bagaimana cara menambahkan referensi dari Mendeley/Zotero?

1. Di Mendeley/Zotero, pilih semua referensi yang ingin diekspor
2. Export sebagai format **BibTeX** (`.bib`)
3. Simpan di `references/bibliography.bib`
4. Gunakan citation key di file `.typ`:
   ```typst
   Menurut @smith2023...
   ```

### Apakah template ini kompatibel dengan Typst versi terbaru?

Template selalu diupdate untuk kompatibilitas dengan versi Typst terbaru. Cek [halaman releases](https://github.com/ITS-Typst) untuk informasi versi yang didukung.

---

## Kontribusi

### Bagaimana cara berkontribusi?

Kami sangat menyambut kontribusi! Cara berkontribusi:

1. **Laporkan bug** — Buka issue di GitHub dengan deskripsi jelas
2. **Usulkan template baru** — Diskusikan di bagian Discussions GitHub
3. **Pull Request** — Fork repo, buat perubahan, dan submit PR

### Saya menemukan kesalahan format, apa yang harus saya lakukan?

Buka issue di GitHub dengan:

- Nama template dan versi yang digunakan
- Screenshot dokumen yang dihasilkan
- Screenshot panduan resmi yang berbeda
- Langkah reproduksi masalah

---

Tidak menemukan jawaban yang dicari? Buka diskusi di [GitHub Issues](https://github.com/ITS-Typst/ITS-Typst/issues).
