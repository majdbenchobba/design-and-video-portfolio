"""Build responsive browsing copies while preserving the original PNG files."""

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
WIDTHS = (480, 960, 1600)


def build_image(source: Path) -> dict:
    output = ROOT / "assets/images/gallery"
    original_bytes = source.read_bytes()
    with Image.open(source) as opened:
        profile = opened.info.get("icc_profile", b"")
        image = opened.convert("RGBA")
        if image.getchannel("A").getextrema() == (255, 255):
            image = image.convert("RGB")
    if image.width < max(WIDTHS):
        raise ValueError(f"{source.name} is too small for the configured variants; do not upscale it.")
    variants = []
    for width in WIDTHS:
        size = (width, round(image.height * width / image.width))
        resized = image.resize(size, Image.Resampling.LANCZOS)
        target = output / f"{source.stem}-{width}.webp"
        resized.save(target, "WEBP", quality=88, method=6, icc_profile=profile)
        data = target.read_bytes()
        variants.append({
            "file": target.name, "width": size[0], "height": size[1],
            "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(),
        })
    assert source.read_bytes() == original_bytes
    return {
        "source": source.name, "source_bytes": len(original_bytes),
        "source_sha256": hashlib.sha256(original_bytes).hexdigest(),
        "variants": variants,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, help="Optional JSON report with sizes and hashes.")
    args = parser.parse_args()
    sources = sorted((ROOT / "assets/images").glob("*.png"))
    (ROOT / "assets/images/gallery").mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as pool:
        images = list(pool.map(build_image, sources))
    report = {
        "images": images,
        "original_bytes": sum(image["source_bytes"] for image in images),
        "variant_bytes": {
            str(width): sum(
                variant["bytes"] for image in images
                for variant in image["variants"] if variant["width"] == width
            )
            for width in WIDTHS
        },
    }
    if args.report:
        args.report.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key != "images"}))
    print(f"Built {len(images) * len(WIDTHS)} variants from {len(images)} unchanged originals.")


if __name__ == "__main__":
    main()
