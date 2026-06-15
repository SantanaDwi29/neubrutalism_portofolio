import os
from PIL import Image

def optimize_image(filepath, max_size=1000):
    try:
        with Image.open(filepath) as img:
            # Convert RGBA to RGB if needed to save as WebP without issues, though WebP supports alpha
            # Calculate resize ratio
            width, height = img.size
            if width > max_size or height > max_size:
                ratio = min(max_size / width, max_size / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Save as webp
            base, ext = os.path.splitext(filepath)
            new_filepath = base + '.webp'
            img.save(new_filepath, 'webp', quality=80)
            print(f"Optimized {filepath} -> {new_filepath}")
            
            return new_filepath
    except Exception as e:
        print(f"Error optimizing {filepath}: {e}")
        return None

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png'):
                filepath = os.path.join(root, file)
                new_file = optimize_image(filepath)
                if new_file:
                    os.remove(filepath)
                    print(f"Deleted {filepath}")

if __name__ == '__main__':
    # Optimize directories
    process_directory('public/projectt')
    process_directory('public/certification')
    
    # Also optimize hero.webp if it exists
    hero_path = 'public/hero.webp'
    if os.path.exists(hero_path):
        optimize_image(hero_path, max_size=800)
