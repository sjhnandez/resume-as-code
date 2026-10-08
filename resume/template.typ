// Shared layout for Sebastian Hernandez's ATS-friendly resume (EN + ES).
// Design rules: single column flow, standard fonts, no graphics, linear text
// order, uppercase section headings, right-aligned dates via h(1fr).

#let accent = rgb("#274060")   // deep slate blue
#let ink = rgb("#1a1a1a")
#let dim = rgb("#54606b")
#let hairline = rgb("#c7ced6")
#let pipe = rgb("#9aa4b0")

#let contact-sep = h(0.7em) + text(size: 8.5pt, fill: pipe)[|] + h(0.7em)

#let resume(
  paper: "us-letter",
  lang: "en",
  margin-y: 1.1cm,
  name: "Sebastian Hernandez",
  role: "Software Engineer",
  contacts: (),
  body,
) = {
  set document(title: name + " - " + role, author: name)
  set page(paper: paper, margin: (x: 1.35cm, y: margin-y))
  // Carlito (bundled in resume/fonts/, OFL) is metrically compatible with
  // Calibri and is what the Docker build uses; New Computer Modern is Typst's
  // built-in fallback.
  set text(
    font: ("Carlito", "New Computer Modern"),
    size: 9.5pt,
    fill: ink,
    lang: lang,
    ligatures: false,
  )
  set par(justify: false, leading: 0.63em, spacing: 0.7em)
  set list(indent: 0.5em, body-indent: 0.5em, spacing: 0.42em)
  show link: it => text(fill: accent, it)

  let header = stack(
    dir: ttb,
    spacing: 0em,
    text(size: 21pt, weight: "bold", tracking: 0.2pt)[#name],
    v(0.42em),
    text(size: 9.4pt, weight: "bold", tracking: 1.1pt, fill: accent)[#upper(role)],
    v(0.6em),
    text(size: 8.6pt, fill: dim)[#(contacts.join(contact-sep))],
    v(0.78em),
    line(length: 100%, stroke: 1.1pt + accent),
  )
  block(above: 0em, below: 0.15em, header)

  body
}

#let section(title, body) = {
  v(1.25em)
  stack(
    dir: ttb,
    spacing: 0em,
    text(size: 9.8pt, weight: "bold", tracking: 0.9pt, fill: accent)[#upper(title)],
    v(0.33em),
    line(length: 100%, stroke: 0.6pt + hairline),
    v(0.55em),
  )
  body
}

// One resume entry: bold title (with optional right-aligned dates), an italic
// org line (with optional right-aligned meta info), then body (usually a list).
// Note: `body` must stay default-less so the trailing content block binds to it.
#let entry(title: none, dates: none, org: none, meta: none, body) = {
  let line1 = if dates != none {
    [#strong(title)#h(1fr)#text(size: 8.5pt, fill: dim)[#dates]]
  } else {
    [#strong(title)]
  }
  let line2 = if org != none {
    if meta != none {
      [#text(size: 9.1pt, style: "italic", fill: dim)[#org]#h(1.4em)#h(1fr)#text(size: 8.5pt, fill: dim)[#meta]]
    } else {
      [#text(size: 9.1pt, style: "italic", fill: dim)[#org]]
    }
  } else { none }

  let children = (line1,)
  if line2 != none { children = children + (v(0.18em), line2) }
  if body != none and body != [] { children = children + (v(0.42em), body) }

  block(above: 0.9em, below: 0em, stack(dir: ttb, spacing: 0em, ..children))
}
