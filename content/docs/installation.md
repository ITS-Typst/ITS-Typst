# Instalasi

Panduan ini menjelaskan cara mengunduh dan menyiapkan template ITS-Typst di komputermu.

## Prasyarat

Sebelum memulai, pastikan kamu sudah menginstal:

- **Typst** (versi terbaru) — [typst.app/docs](https://typst.app/docs)
- **Editor teks** — Direkomendasikan VS Code dengan ekstensi Typst LSP

### Menginstal Typst

**Windows** (via Winget):

```bash
winget install --id Typst.Typst
```

**macOS** (via Homebrew):

```bash
brew install typst
```

**Linux**:

```bash
# Unduh binary dari GitHub Releases
curl -fsSL https://github.com/typst/typst/releases/latest/download/typst-x86_64-unknown-linux-musl.tar.xz | tar -xJ
sudo mv typst /usr/local/bin/
```

Verifikasi instalasi:

```bash
typst --version
```

## Mengunduh Template

### Cara 1: Download ZIP (Direkomendasikan untuk pemula)

1. Buka halaman template yang kamu inginkan di website ini
2. Klik tombol **Download** pada kartu template
3. Ekstrak file ZIP ke folder pilihan kamu

### Cara 2: Gunakan GitHub Template (Direkomendasikan)

Setiap repositori template ITS-Typst adalah _public template_ di GitHub, sehingga kamu bisa langsung membuat repo baru dari template tersebut tanpa menyertakan history commit-nya.

1. Buka halaman repositori template di [GitHub ITS-Typst](https://github.com/ITS-Typst)
2. Klik tombol **Use this template** → **Create a new repository**
3. Isi nama repositori dan visibilitas, lalu klik **Create repository**
4. Clone repo baru kamu:
   ```bash
   git clone https://github.com/<username>/<nama-repo>.git
   ```

> Cara ini lebih disarankan daripada clone langsung karena repo kamu akan bersih dari history template.

### Cara 3: Clone via Git

```bash
git clone https://github.com/ITS-Typst/<nama-template>.git
cd <nama-template>
```

Ganti `<nama-template>` dengan nama repositori template yang ingin digunakan. Daftar template tersedia di [GitHub ITS-Typst](https://github.com/ITS-Typst).

## Menginstal Ekstensi VS Code

Untuk pengalaman terbaik, instal ekstensi berikut di VS Code:

1. Buka VS Code
2. Tekan `Ctrl+P` dan ketik:
   ```
   ext install nvarner.typst-lsp
   ```
3. Restart VS Code

Ekstensi ini memberikan fitur:

- Syntax highlighting untuk file `.typ`
- Auto-complete untuk fungsi Typst
- Preview dokumen secara langsung
- Error highlighting saat mengetik

## Kompilasi Dokumen

Setelah template siap, kompilasi ke PDF dengan:

```bash
# Kompilasi sekali
typst compile main.typ

# Kompilasi dengan watch mode (auto-recompile saat file berubah)
typst watch main.typ
```

File PDF akan dihasilkan di folder yang sama dengan `main.typ`.
