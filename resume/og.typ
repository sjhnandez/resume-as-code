// Open Graph card (1200 x 630 px at 96 ppi) for link previews.
// Compiled by scripts/build-cv.sh from the same JSON as the site and PDFs.
// Matches the site: warm paper, big serif name, one highlighter stroke.
#set page(width: 900pt, height: 472.5pt, margin: 0pt, fill: rgb("#f4f2f0"))

#let d = json("data/en.json")
#let ink = rgb("#0c0a08")
#let dim = rgb("#6d6c6b")
#let accent = rgb("#e4f222")

#set text(font: ("Carlito", "New Computer Modern"), fill: ink)

#place(top + left, dx: 56pt, dy: 52pt, text(size: 13pt, tracking: 1.2pt, fill: dim)[SOFTWARE ENGINEER / WEB · MOBILE · INFRASTRUCTURE])

#place(top + left, dx: 52pt, dy: 92pt, block[
  #set par(leading: 10pt)
  #text(font: "Libertinus Serif", size: 104pt, tracking: -1.5pt)[#d.name.split(" ").join(linebreak())]
])

#place(bottom + left, dx: 56pt, dy: -54pt, box(fill: accent, inset: (x: 8pt, y: 5pt))[
  #text(size: 17pt)[One JSON source → Typst CVs + this React page]
])

#place(bottom + right, dx: -56pt, dy: -58pt, text(size: 15pt)[profile.superseb.xyz])
