# Birthday Site

Simple multi-page birthday website (HTML/CSS/JS) with page navigation:

1) Countdown timer screen
2) “Do you want to see your surprise gift?” prompt
3) Balloon popping reveal (Next unlocks after all balloons are popped)
4) Gift hub with 4 icons
5) Camera gallery
6) Love letter
7) Coupon unlock → coupon list
8) Bouquet page

## Run

Open `index.html` in a browser.

### Coupons (JSON persistence)

Browsers can’t write to local `.json` files directly. To make the Love Coupons page support **Add / Delete / Redeem / Unredeem** and persist to `data/coupons.json`, run the local server:

- `node server.cjs`
- Open `http://localhost:5500/`

Optional local server (recommended if clipboard is blocked when opened as a file):

- Python: `python -m http.server 5500`
- Then visit: `http://localhost:5500/`

## Customize

Edit `script.js` → the `SITE` object:

- `targetDateIso`: set your countdown target date/time (example: `2026-05-10T00:00:00`)
	- If left empty, the site uses a short demo countdown (`timerFallbackSeconds`).
- `couponCode`: secret word for the Love Coupons unlock page.
- `balloons`: title/text/image for each balloon reveal.
- `letterText`: the love letter text.
- `coupons`: coupon titles/subtitles.
- `bouquet.bubbles`: the little text bubbles around the bouquet.

Pages:
- `index.html` → timer + prompt
- `balloons.html` → balloons (Next → `hub.html`)
- `hub.html` → 4 icons
- `gallery.html`, `letter.html`, `unlock.html`, `coupons.html`, `cake.html`
