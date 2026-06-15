import fitz # PyMuPDF

def pdf_to_png(pdf_path, png_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0) # first page
    pix = page.get_pixmap(dpi=150)
    pix.save(png_path)
    print(f"Saved {png_path}")

pdf_to_png("public/certification/dicoding_AI_Praktis_untuk_Produktivitas.pdf", "public/certification/dicoding_AI_Praktis_untuk_Produktivitas.png")
pdf_to_png("public/certification/dicoding_Belajar_Penggunaan_Generative_AI.pdf", "public/certification/dicoding_Belajar_Penggunaan_Generative_AI.png")
