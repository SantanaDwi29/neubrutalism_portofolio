import os
from PIL import Image

def optimize_image(filepath, max_size=700):
    try:
        with Image.open(filepath) as img:
            width, height = img.size
            if width > max_size or height > max_size:
                ratio = min(max_size / width, max_size / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
                img.save(filepath, 'webp', quality=80)
                print(f"Resized {filepath} to {new_size}")
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.webp'):
                filepath = os.path.join(root, file)
                optimize_image(filepath)

if __name__ == '__main__':
    process_directory('public/projectt')
    process_directory('public/certification')
    hero_path = 'public/hero.webp'
    if os.path.exists(hero_path):
        optimize_image(hero_path, max_size=400)
