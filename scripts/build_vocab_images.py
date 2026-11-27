#!/usr/bin/env python3
"""Build local vocabulary pictures and the attribution record.

Photographs come from Openverse results whose licence is CC0.
Drawings are original artwork made for this app.
"""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "vocab"
META = ROOT / "src" / "data" / "pictures.ts"
CREDITS = OUT / "ATTRIBUTION.md"
VOCAB = json.loads(Path("/tmp/vocab.json").read_text())
UA = "ABCIslandLingo-curriculum/1.0 (educational; local asset build)"

# Concrete island things: try a CC0 photograph first.
PHOTOS: dict[str, tuple[str, str]] = {
    "food-1": ("glass of drinking water", "water"),
    "food-2": ("loaf of bread", "bread"),
    "food-3": ("cup of coffee", "coffee"),
    "food-4": ("cup of tea", "tea"),
    "food-5": ("cooked rice", "rice"),
    "food-6": ("roasted chicken", "chicken"),
    "food-7": ("fresh fish", "fish"),
    "food-ing-1": ("white sugar", "sugar"),
    "food-ing-2": ("salt crystals", "salt"),
    "food-ing-5": ("piece of cheese", "cheese"),
    "food-ing-7": ("chicken egg", "egg"),
    "food-ing-8": ("raw meat", "meat"),
    "food-ing-9": ("assorted fruit", "fruit"),
    "food-fv-1": ("red apple", "apple"),
    "food-fv-2": ("banana fruit", "banana"),
    "food-fv-3": ("lemon fruit", "lemon"),
    "food-fv-4": ("red tomato", "tomato"),
    "food-fv-5": ("onion vegetable", "onion"),
    "food-fv-6": ("potato vegetable", "potato"),
    "drk-2": ("orange juice glass", "juice"),
    "drk-3": ("glass of milk", "milk"),
    "rest-6": ("glass of beer", "beer"),
    "wea-1": ("bright sun sky", "sun"),
    "wea-2": ("windy palm trees", "wind"),
    "wea-3": ("white cloud sky", "cloud"),
    "wea-4": ("caribbean sea", "sea"),
    "nat-env-1": ("tropical beach", "beach"),
    "nat-env-2": ("beach sand", "sand"),
    "nat-2": ("green tree", "tree"),
    "nat-3": ("flower blossom", "flower"),
    "nat-4": ("green hill", "hill"),
    "ani-1": ("friendly dog", "dog"),
    "ani-2": ("house cat", "cat"),
    "ani-3": ("brown horse", "horse"),
    "ani-4": ("green iguana", "iguana"),
    "ani-5": ("sea turtle", "turtle"),
    "ani-7": ("chicken bird", "chicken"),
    "ani-8": ("dairy cow", "cow"),
    "ani-9": ("hummingbird", "hummingbird"),
    "hse-1": ("caribbean house", "house"),
    "hse-2": ("home kitchen", "kitchen"),
    "hse-4": ("bathroom sink", "bathroom"),
    "hse-6": ("house window", "window"),
    "hse-7": ("wooden door", "door"),
    "hous-rm-3": ("wooden table", "table"),
    "hous-rm-4": ("wooden chair", "chair"),
    "hous-rm-6": ("made bed", "bed"),
    "plc-1": ("school building", "school"),
    "plc-4": ("supermarket aisle", "supermarket"),
    "plc-6": ("city street", "street"),
    "trans-1": ("red car", "car"),
    "trans-2": ("city bus", "bus"),
    "trans-5": ("bicycle", "bicycle"),
    "trav-6": ("yellow taxi", "taxi"),
    "trav-4": ("small boat", "boat"),
    "trav-3": ("airplane", "airplane"),
    "cloth-1": ("cotton shirt", "shirt"),
    "cloth-3": ("pair of shoes", "shoes"),
    "rest-2": ("dining table", "table"),
    "nat-env-4": ("garden flowers", "garden"),
    "nat-env-6": ("full moon", "moon"),
    "nat-env-7": ("night stars", "star"),
}

# Actions, feelings, numbers, and abstract ideas: original drawings.
DRAW_CATS = {
    "numbers", "colors", "emotions", "verbs", "family", "abstract",
    "basics", "pronouns", "health", "work", "grammar", "prepositions",
    "directions", "social",
}


def cover(im: Image.Image, size: int = 384) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    scale = max(size / w, size / h)
    im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    left = (im.width - size) // 2
    top = (im.height - size) // 2
    return im.crop((left, top, left + size, top + size))


def save_webp(im: Image.Image, path: Path) -> None:
    cover(im).save(path, "WEBP", quality=68, method=4)


def fetch_cc0(query: str, keyword: str) -> dict | None:
    params = urllib.parse.urlencode({
        "q": query,
        "license": "cc0",
        "page_size": "8",
        "category": "photograph",
    })
    req = urllib.request.Request(
        f"https://api.openverse.org/v1/images/?{params}",
        headers={"User-Agent": UA, "Accept": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=25) as response:
        payload = json.loads(response.read().decode())
    keyword = keyword.lower()
    chosen = None
    for item in payload.get("results", []):
        if item.get("license") not in {"cc0", "pdm"}:
            continue
        blob = f"{item.get('title') or ''} {' '.join(tag.get('name','') for tag in item.get('tags') or [])}".lower()
        if keyword in blob:
            chosen = item
            break
        if chosen is None:
            chosen = item
    if not chosen or not chosen.get("url"):
        return None
    image_req = urllib.request.Request(chosen["url"], headers={"User-Agent": UA})
    with urllib.request.urlopen(image_req, timeout=25) as response:
        raw = response.read()
    im = Image.open(BytesIO(raw))
    return {
        "image": im,
        "author": chosen.get("creator") or "Unknown",
        "source": chosen.get("source") or "Openverse",
        "source_url": chosen.get("foreign_landing_url") or chosen.get("url"),
        "licence": "CC0 1.0" if chosen.get("license") == "cc0" else "Public domain",
        "title": chosen.get("title") or query,
    }


def new_card(bg: str) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGB", (384, 384), bg)
    return im, ImageDraw.Draw(im)


def circle(draw: ImageDraw.ImageDraw, box, fill) -> None:
    draw.ellipse(box, fill=fill)


def draw_number(n: str, bg: str, ink: str) -> Image.Image:
    im, draw = new_card(bg)
    circle(draw, (48, 48, 336, 336), ink)
    draw.text((192, 150), n, fill=bg, anchor="mm")
    # Pillow default font is tiny. Draw the numeral with a scaled bitmap font by rendering large via stroke circles of dots.
    im2, d2 = new_card(bg)
    circle(d2, (42, 42, 342, 342), "#fffaf3")
    circle(d2, (78, 78, 306, 306), ink)
    # Use a bigger font if available.
    try:
        from PIL import ImageFont
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 150)
        d2.text((192, 200), n, fill="#fffaf3", font=font, anchor="mm")
    except Exception:
        d2.text((170, 160), n, fill="#fffaf3")
    return im2


def draw_face(mood: str) -> Image.Image:
    colors = {"happy": "#f6c445", "sad": "#7eb6d9", "angry": "#e15b4a", "tired": "#b7a6e3"}
    im, draw = new_card("#1f2937")
    circle(draw, (48, 36, 336, 348), colors.get(mood, "#f6c445"))
    circle(draw, (120, 130, 160, 175), "#1f2937")
    circle(draw, (224, 130, 264, 175), "#1f2937")
    if mood == "happy":
        draw.arc((120, 180, 264, 280), 20, 160, fill="#1f2937", width=10)
    elif mood == "sad":
        draw.arc((130, 220, 254, 300), 200, 340, fill="#1f2937", width=10)
    elif mood == "angry":
        draw.line((110, 110, 165, 140), fill="#1f2937", width=10)
        draw.line((274, 110, 219, 140), fill="#1f2937", width=10)
        draw.line((140, 240, 244, 240), fill="#1f2937", width=10)
    else:
        draw.line((130, 230, 250, 230), fill="#1f2937", width=10)
        draw.arc((150, 250, 230, 300), 0, 180, fill="#1f2937", width=8)
    return im


def draw_person(kind: str) -> Image.Image:
    im, draw = new_card("#16324f")
    shirt = {"father": "#3d7ea6", "mother": "#d96c8a", "child": "#f2b544", "elder": "#8d6b4a", "group": "#2a9d8f"}.get(kind, "#3d7ea6")
    circle(draw, (132, 48, 252, 168), "#f3d2b3")
    draw.rounded_rectangle((108, 176, 276, 330), 40, fill=shirt)
    if kind == "elder":
        draw.arc((140, 58, 244, 120), 200, 340, fill="#f7f7f2", width=16)
    if kind == "group":
        circle(draw, (70, 90, 150, 170), "#f3d2b3")
        circle(draw, (234, 90, 314, 170), "#f3d2b3")
    return im


def draw_blob(bg: str, fg: str, shape: str) -> Image.Image:
    im, draw = new_card(bg)
    if shape == "sun":
        circle(draw, (92, 92, 292, 292), "#f6c445")
    elif shape == "moon":
        circle(draw, (100, 70, 300, 270), "#f4f1de")
        circle(draw, (150, 70, 330, 250), bg)
    elif shape == "heart":
        circle(draw, (90, 110, 200, 220), fg)
        circle(draw, (184, 110, 294, 220), fg)
        draw.polygon([(96, 180), (288, 180), (192, 310)], fill=fg)
    elif shape == "book":
        draw.rounded_rectangle((78, 70, 306, 310), 16, fill="#f4efe4")
        draw.line((192, 80, 192, 300), fill="#c47b4a", width=6)
    elif shape == "arrow":
        draw.polygon([(70, 170), (230, 170), (230, 120), (320, 192), (230, 264), (230, 214), (70, 214)], fill=fg)
    elif shape == "coin":
        circle(draw, (84, 84, 300, 300), "#e6b325")
        circle(draw, (120, 120, 264, 264), "#f6d365")
    elif shape == "cross":
        draw.rounded_rectangle((166, 70, 218, 314), 12, fill="#f4f7fb")
        draw.rounded_rectangle((70, 166, 314, 218), 12, fill="#f4f7fb")
    else:
        circle(draw, (84, 84, 300, 300), fg)
    return im


def illustrate(entry: dict) -> Image.Image:
    en = entry["en"].lower()
    if entry["cat"] == "numbers":
        digit = {
            "one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
            "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
            "eleven": "11", "twelve": "12", "fifteen": "15", "twenty": "20",
            "twenty-one": "21", "thirty": "30", "forty": "40", "fifty": "50",
            "sixty": "60", "seventy": "70", "eighty": "80", "ninety": "90",
            "one hundred": "100", "two hundred": "200", "five hundred": "500",
            "one thousand": "1000",
        }.get(en, "?")
        return draw_number(digit, "#0f766e", "#115e59")
    if entry["cat"] == "colors":
        swatch = {
            "red": "#e11d48", "blue": "#2563eb", "green": "#16a34a", "yellow": "#eab308",
            "black": "#111827", "white": "#f8fafc", "orange": "#f97316", "grey": "#6b7280",
            "pink": "#f472b6", "purple": "#7c3aed", "brown": "#92400e",
        }.get(en.split("/")[0].strip(), "#94a3b8")
        im, draw = new_card("#0f172a")
        circle(draw, (52, 52, 332, 332), swatch)
        if en.startswith("white") or en.startswith("yellow"):
            draw.ellipse((52, 52, 332, 332), outline="#334155", width=6)
        return im
    if "happy" in en:
        return draw_face("happy")
    if "sad" in en:
        return draw_face("sad")
    if "angry" in en:
        return draw_face("angry")
    if "tired" in en or "sleep" in en:
        return draw_face("tired")
    if entry["cat"] in {"family", "pronouns"}:
        kind = "mother" if any(word in en for word in ("mother", "aunt", "sister", "niece")) else "elder" if "grand" in en else "child" if any(word in en for word in ("child", "nephew")) else "group" if any(word in en for word in ("we", "they", "you (all)", "family")) else "father"
        return draw_person(kind)
    icon = "dot"
    if any(word in en for word in ("water", "sea", "rain")):
        icon = "water"
    elif any(word in en for word in ("coffee", "tea", "drink", "juice", "milk")):
        icon = "cup"
    elif any(word in en for word in ("eat", "food", "bread", "rice")):
        icon = "plate"
    elif any(word in en for word in ("sun",)):
        icon = "sun"
    elif any(word in en for word in ("moon", "night")):
        icon = "moon"
    elif any(word in en for word in ("money", "expensive", "cheap", "profit", "budget", "cost", "buy", "investment")):
        icon = "coin"
    elif any(word in en for word in ("doctor", "pain", "health", "medicine", "body")):
        icon = "cross"
    elif any(word in en for word in ("read", "book", "write", "learn", "school", "theory", "analysis")):
        icon = "book"
    elif any(word in en for word in ("go", "left", "right", "straight", "come", "run")):
        icon = "arrow"
    elif any(word in en for word in ("love", "believe", "sweet", "free", "heart")):
        icon = "heart"
    elif any(word in en for word in ("work", "job", "office", "meeting", "boss")):
        icon = "case"
    elif any(word in en for word in ("speak", "talk", "name", "question", "what", "who", "where")):
        icon = "bubble"
    elif "house" in en or "home" in en:
        icon = "house"
    elif "car" in en or "bus" in en:
        icon = "car"
    else:
        icon = ("dot", "book", "coin", "heart", "arrow", "sun")[sum(ord(c) for c in entry["id"]) % 6]
    bg = ("#14342b", "#1e3a5f", "#4c1d35", "#3f2a1d", "#1e293b", "#134e4a")[sum(ord(c) for c in entry["id"]) % 6]
    return draw_icon(bg, icon)


def draw_icon(bg: str, shape: str) -> Image.Image:
    im, draw = new_card(bg)
    fg = "#f8fafc"
    if shape == "sun":
        circle(draw, (92, 92, 292, 292), "#f6c445")
    elif shape == "moon":
        circle(draw, (100, 70, 300, 270), "#f4f1de")
        circle(draw, (150, 70, 330, 250), bg)
    elif shape == "heart":
        circle(draw, (90, 110, 200, 220), "#fb7185")
        circle(draw, (184, 110, 294, 220), "#fb7185")
        draw.polygon([(96, 180), (288, 180), (192, 310)], fill="#fb7185")
    elif shape == "book":
        draw.rounded_rectangle((78, 70, 306, 310), 16, fill="#f4efe4")
        draw.line((192, 80, 192, 300), fill="#c47b4a", width=8)
    elif shape == "arrow":
        draw.polygon([(70, 160), (230, 160), (230, 110), (330, 192), (230, 274), (230, 224), (70, 224)], fill="#99f6e4")
    elif shape == "coin":
        circle(draw, (84, 84, 300, 300), "#e6b325")
        circle(draw, (124, 124, 260, 260), "#f6d365")
    elif shape == "cross":
        draw.rounded_rectangle((166, 70, 218, 314), 12, fill="#fecaca")
        draw.rounded_rectangle((70, 166, 314, 218), 12, fill="#fecaca")
    elif shape == "water":
        circle(draw, (70, 150, 170, 250), "#7dd3fc")
        circle(draw, (150, 120, 270, 240), "#38bdf8")
        circle(draw, (210, 170, 320, 280), "#0ea5e9")
    elif shape == "cup":
        draw.rounded_rectangle((110, 90, 250, 250), 24, fill="#f8fafc")
        draw.arc((230, 120, 310, 210), 280, 80, fill="#f8fafc", width=16)
        draw.rectangle((140, 120, 220, 180), fill="#6f4e37")
    elif shape == "plate":
        circle(draw, (70, 100, 314, 300), "#f8fafc")
        circle(draw, (120, 145, 264, 255), "#f59e0b")
    elif shape == "case":
        draw.rounded_rectangle((70, 130, 314, 300), 18, fill="#b45309")
        draw.rectangle((150, 100, 234, 140), fill="#b45309")
    elif shape == "bubble":
        circle(draw, (60, 70, 300, 250), "#e0f2fe")
        draw.polygon([(120, 230), (150, 310), (190, 230)], fill="#e0f2fe")
    elif shape == "house":
        draw.polygon([(192, 60), (330, 170), (54, 170)], fill="#f8fafc")
        draw.rectangle((90, 170, 294, 320), fill="#fb923c")
        draw.rectangle((168, 220, 220, 320), fill="#7c2d12")
    elif shape == "car":
        draw.rounded_rectangle((50, 170, 334, 250), 20, fill="#f8fafc")
        draw.polygon([(90, 170), (140, 110), (250, 110), (300, 170)], fill="#e2e8f0")
        circle(draw, (100, 230, 160, 290), "#0f172a")
        circle(draw, (230, 230, 290, 290), "#0f172a")
    else:
        circle(draw, (92, 92, 292, 292), fg)
    return im


def ts_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace("'", "\\'")


FORCE_DRAW = {"food-1", "food-3", "food-4", "cloth-1"}


def redraw() -> None:
    text = META.read_text()
    ids = set(FORCE_DRAW)
    by_id = {item["id"]: item for item in VOCAB}
    for entry in VOCAB:
        marker = f"'{entry['id']}':"
        if marker not in text:
            continue
        snippet = text.split(marker, 1)[1][:280]
        if "style: 'illustration'" in snippet:
            ids.add(entry["id"])
    for item_id in sorted(ids):
        save_webp(illustrate(by_id[item_id]), OUT / f"{item_id}.webp")
    print("redrew", len(ids))


def main() -> None:
    if "--redraw" in __import__("sys").argv:
        redraw()
        return
    OUT.mkdir(parents=True, exist_ok=True)
    records = []
    photo_jobs = []
    for entry in VOCAB:
        if entry["type"] == "word" and entry["id"] in PHOTOS:
            photo_jobs.append(entry)

    def load_photo(entry: dict):
        query, keyword = PHOTOS[entry["id"]]
        found = fetch_cc0(query, keyword)
        return entry, found

    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = [pool.submit(load_photo, entry) for entry in photo_jobs]
        for future in as_completed(futures):
            entry = None
            try:
                entry, found = future.result()
            except Exception as error:
                print("photo failed", error)
                continue
            if not found:
                print("photo miss", entry["id"])
                continue
            save_webp(found["image"], OUT / f"{entry['id']}.webp")
            records.append({
                "id": entry["id"],
                "style": "photo",
                "source": found["source"],
                "licence": found["licence"],
                "author": found["author"],
                "sourceUrl": found["source_url"],
                "title": found["title"],
                "pap": entry["pap"],
                "en": entry["en"],
            })
            print("photo", entry["id"], found["title"][:60])

    have = {record["id"] for record in records}
    for entry in VOCAB:
        if entry["type"] != "word" or entry["id"] in have:
            continue
        if entry["cat"] not in DRAW_CATS and entry["id"] not in PHOTOS:
            continue
        save_webp(illustrate(entry), OUT / f"{entry['id']}.webp")
        records.append({
            "id": entry["id"],
            "style": "illustration",
            "source": "Original illustration for ABC Island Lingo",
            "licence": "Original work, all rights reserved by the app",
            "author": "ABC Island Lingo",
            "sourceUrl": "",
            "title": entry["en"],
            "pap": entry["pap"],
            "en": entry["en"],
        })

    lines = [
        "export interface VocabPicture {",
        "    id: string;",
        "    src: string;",
        "    style: 'photo' | 'illustration';",
        "    source: string;",
        "    licence: string;",
        "    author: string;",
        "    sourceUrl: string;",
        "}",
        "",
        "export const pictures: Record<string, VocabPicture> = {",
    ]
    for record in records:
        lines.append(
            f"    '{record['id']}': {{ id: '{record['id']}', src: '/assets/vocab/{record['id']}.webp', "
            f"style: '{record['style']}', source: '{ts_escape(record['source'])}', "
            f"licence: '{ts_escape(record['licence'])}', author: '{ts_escape(record['author'])}', "
            f"sourceUrl: '{ts_escape(record['sourceUrl'])}' }},"
        )
    lines += [
        "};",
        "",
        "export function pictureFor(id: string): VocabPicture | undefined {",
        "    return pictures[id];",
        "}",
        "",
    ]
    META.write_text("\n".join(lines))

    credits = ["# Picture credits", "", "Each file is named with the vocabulary id. Photographs are CC0. Drawings were made for this app.", ""]
    for record in records:
        where = record["sourceUrl"] or "original illustration"
        credits.append(f"- `{record['id']}.webp` — {record['pap']} ({record['en']}). {record['style']}. {record['title']}. {record['author']}. {record['licence']}. {where}")
    CREDITS.write_text("\n".join(credits) + "\n")
    photos = sum(1 for record in records if record["style"] == "photo")
    print(f"TOTAL {len(records)} photos {photos} drawings {len(records) - photos}")


if __name__ == "__main__":
    main()
