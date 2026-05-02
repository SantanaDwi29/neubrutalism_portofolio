from PIL import Image
import os

def optimize_image(input_path, target_size_kb=500):
    img = Image.open(input_path)
    
    # If image has alpha channel, convert to RGB for better compression if possible
    # But since it's a PNG, we might want to keep transparency. 
    # Let's try saving as WebP which is much smaller.
    
    output_path = input_path.replace(".png", ".webp")
    
    quality = 80
    while quality > 10:
        img.save(output_path, "WEBP", quality=quality, optimize=True)
        if os.path.getsize(output_path) <= target_size_kb * 1024:
            break
        quality -= 5
    
    print(f"Optimized image saved to {output_path}")
    print(f"Original size: {os.path.getsize(input_path) / 1024:.2f} KB")
    print(f"New size: {os.path.getsize(output_path) / 1024:.2f} KB")

if __name__ == "__main__":
    optimize_image("public/hero.png")
