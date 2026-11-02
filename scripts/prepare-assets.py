"""Extract only artwork from the supplied references; all page UI is rendered in React.

Optional: python3 scripts/prepare-assets.py (requires Pillow).
The generated JPEG files are already included in public/images.
"""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)


def source(number):
    return Image.open(ROOT / 'assets' / f'{number}.png').convert('RGB')


def save(image, name, width=1500):
    if image.width > width:
        image = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
    image.save(OUT / f'{name}.jpg', quality=92, optimize=True)


def clean_pointer(image, box, offset):
    """Blend a neighboring piece of the same image over a captured mouse pointer."""
    x, y, w, h = box
    dx, dy = offset
    patch = image.crop((x + dx, y + dy, x + dx + w, y + dy + h))
    mask = Image.new('L', (w, h))
    ImageDraw.Draw(mask).ellipse((4, 4, w - 4, h - 4), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(4))
    image.paste(patch, (x, y), mask)
    return image


facade = source(2)
facade = clean_pointer(facade, (2570, 1088, 110, 116), (-105, 0))
save(ImageEnhance.Brightness(facade.crop((0, 246, 2880, 1478))).enhance(1.8), 'facade', 2200)
save(source(1).crop((98, 460, 173, 536)), 'avatar', 150)
save(source(6).crop((508, 721, 1253, 1180)), 'health-ai')
save(source(7).crop((178, 738, 1370, 1407)), 'bugspoon')
save(source(7).crop((1568, 694, 2764, 1329)), 'herzify')
save(source(9).crop((60, 630, 1253, 1396)), 'vle')
water = clean_pointer(source(9), (1829, 935, 100, 100), (110, 0))
save(water.crop((1452, 699, 2642, 1193)), 'water')
bird = clean_pointer(source(10), (1790, 785, 108, 118), (0, -120))
save(bird.crop((1710, 422, 2758, 1310)), 'bird')
perfume = clean_pointer(source(11), (1982, 954, 93, 88), (-65, 45))
save(perfume.crop((1700, 415, 2715, 1305)), 'perfume')
print(f'Prepared {len(list(OUT.glob("*.jpg")))} local artwork files.')
