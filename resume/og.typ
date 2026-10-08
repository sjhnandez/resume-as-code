// Open Graph card (1200 x 630 px at 96 ppi) for link previews.
// Compiled by scripts/build-cv.sh from the same JSON as the site and PDFs.
#set page(width: 900pt, height: 472.5pt, margin: 0pt, fill: rgb("#0a0c10"))

#let d = json("data/en.json")
#let accent = rgb("#4f8cff")
#let accent2 = rgb("#8b5cf6")
#let ink = rgb("#e8ecf4")
#let muted = rgb("#9aa7bd")
#let grad = gradient.linear(accent, accent2, angle: 35deg)

// Soft mesh glow.
#place(top + left, dx: -90pt, dy: -150pt, circle(radius: 270pt, fill: accent.transparentize(88%)))
#place(top + right, dx: 70pt, dy: -130pt, circle(radius: 230pt, fill: accent2.transparentize(86%)))
#place(bottom + right, dx: 40pt, dy: 70pt, circle(radius: 210pt, fill: accent.transparentize(92%)))

// Gradient edge along the left.
#place(top + left, rect(width: 7pt, height: 100%, fill: grad))

#set text(font: ("Carlito", "New Computer Modern"), fill: ink)

#place(top + left, dx: 76pt, dy: 92pt, block[
  #text(size: 12.5pt, weight: "bold", tracking: 2.4pt, fill: accent)[SOFTWARE ENGINEER — WEB · MOBILE · INFRASTRUCTURE]
  #v(16pt)
  #text(size: 52pt, weight: "bold")[#d.name]
  #v(10pt)
  #text(size: 19pt, fill: muted)[One JSON source → Typst CVs + this React page]
])

#place(bottom + left, dx: 76pt, dy: -76pt, block[
  #text(size: 15pt, weight: "bold", fill: accent2)[profile.superseb.xyz]
  #h(24pt)
  #text(size: 15pt, fill: muted)[#d.contacts.at(0).label]
])
