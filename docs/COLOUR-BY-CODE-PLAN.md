# Colour by code – plan (26 Nov 2026)

A new printable in **🖨 Printables**, next to Tests, Puzzles, Tarsia and Mind maps: a picture split into areas, every area
holds a word or a short code, a colour key says which answer gets which colour. The pupil solves every area and colours it;
the picture appears only when the answers are right, so the sheet checks itself.

Nothing about pupils is stored or sent. Like Puzzles and Tarsia, the words come from the public exercise files of a unit.

## 1. The page `colour/`

- Same look and sign-in as Puzzles / Tarsia (teacher account), English UI, phone first, print to A4.
- Settings: **book and unit(s)** (one or several, like Tarsia) · **mode** (section 3) · **picture** (section 2) ·
  **size** (coarse / fine) · **groups A and B** (same picture, words in other places) · title line.
- Preview on screen, then **🖨 Print**: page 1 = the sheet, page 2 = the answer page (coloured picture + key with answers).
- A short code on the sheet (e.g. `CC-7bc-u1-cat-A-4821`) so the same sheet can be printed again, and a QR code to practise
  the unit online, like the other printables.

## 2. Pictures

- **Original motifs drawn for this page** (no pictures copied from books, games or films). Each motif is a small grid in the
  code, one letter per square = its colour. First set (about 10): cat, dog, fish, house, tree, flower, ship, rocket,
  heart, star; for the seasons: Christmas tree, snowman, pumpkin, Easter egg. More can be added later.
- **Areas – my recommendation: "blocks".** The squares of the same colour are joined into areas of 3–6 squares, so a picture
  has about 30–60 areas instead of 200 squares. Bigger areas = fewer words to read, room for longer words, quicker to colour.
  The other option, **mosaic** (one word in every square), stays as a choice for short words or numbers.
- Two sizes: **coarse** (about 25–35 areas, for 4th–6th grade) and **fine** (about 45–60 areas, 7th–9th grade).
- Background areas also get a word (a "leave it white" group), otherwise the picture is given away.
- Colours: red, orange, yellow, green, blue, brown, black, grey + white – the usual crayons. The key writes the colour names
  **in English** (colours are vocabulary too) with a small swatch; the sheet itself is black outlines only, so it prints
  well in black and white.

## 3. Modes (what is written in the areas)

1. **Word groups.** The areas show English words; the key gives one colour per group. The unit files have no word groups
   (only English–Slovenian pairs), so the groups are made one of two ways:
   - **by unit**: tick 2–5 units, each unit is one colour (e.g. Unit 1 words = blue, Unit 2 words = red);
   - **edit the groups**: the page fills a text box `months: January, March, May …` that the teacher changes before printing
     (like the Mind maps text box); one line = one colour.
2. **Translation.** The areas show Slovenian words; the key lists the English words under each colour
   (red: cat, dog, horse · blue: …). The pupil translates the area and finds the word in the key.
3. **Grammar.** Small built-in lists, not tied to a unit (first: **past simple** regular = one colour, irregular = another;
   **plural** regular / irregular; **a / an**). The areas show the word ("went", "played"; "child"; "apple").
4. **Numbers** (lower grades). The areas show numbers as words ("seven") or small sums ("3 + 4"); the key says 7 = red.

Words that are too long for an area are left out (or shortened if they have a "/" form); the page says how many words were
used. A word may appear in several areas.

## 4. How it is built (technical)

- One page `colour/index.html`, no server work: the unit lists are loaded the same way as on Tarsia (`exercises/*.js`).
- Motifs: an array of strings per picture (letters = colours). The "blocks" are made by joining neighbouring squares of the
  same colour into groups of 3–6 with a fixed random seed (the code on the sheet), drawn as one SVG outline per area.
- The word for each area: by mode, at random from the right group (seeded); groups A / B = other seed.
- Print CSS: A4 portrait, the picture as large as possible, key at the top, answer page after a page break.
- Printables index gets a fourth card "🎨 Colour by code".

## 5. Steps

1. Page with one motif, mosaic and blocks, mode "word groups by unit", print + answer page. Check the printout on paper.
2. All first motifs, both sizes, groups A / B, the sheet code.
3. Modes translation, edit the groups, grammar, numbers.
4. QR code, Printables card, notes.

## 5b. Version 2 – nicer and harder pictures (26 Nov 2026, the teacher's wish after the first version)

Decisions: **both styles** (stained glass as the main style, squares as a choice), **all four kinds of pictures** (animals, scenes,
seasons and holidays, mandalas), **three difficulty levels** chosen on the page.

- `colour/art.js`: 14 original vector drawings (owl, fox, butterfly, sea turtle, parrot, whale; lighthouse, castle, mountain lake;
  winter village, Christmas baubles, Easter basket, autumn tree, summer beach), up to 8 colours, and the **mandala maker**
  (a new symmetric pattern for every sheet number; the difficulty sets rings and colours). The first 10 square pictures stay as
  "Simple squares".
- `colour/engine.js`: every picture is drawn as a fine colour map and cut into areas. **Stained glass**: spread-out points in each
  colour area, every point gets the nearest part (mandalas are cut along their symmetry); the borders are smoothed curves.
  **Squares**: the colour map on a grid (16 / 24 / 32 squares wide), squares of one colour joined into blocks. **Mosaic**: one
  square per area. Specks under about 22 mm² take the colour around them.
- **Difficulty**: easy about 30 areas, medium about 55, hard about 95–125.
- Words: the page tries up to 12 places in every area and takes the largest letters; a word that does not fit well is swapped for
  a shorter one of the same group.
- **Fewer groups than colours** (a book has 6 units; verb forms have 5 groups): the smallest colours join the most similar kept
  colour, and the page says which (e.g. "black → brown").
- The answer page fills the original drawing in colour, with the words on top.

## 6. Decisions of the teacher (26 Nov 2026)

- Default areas: **blocks** (mosaic stays as a choice).
- Word groups: **both** – "by unit" and the text box to edit the groups.
- Grammar, first list: **past simple** regular / irregular (plurals and a / an later).
- Colour names on the key: **English only**.

Still open: which motifs first, and any wishes (e.g. something for December).
