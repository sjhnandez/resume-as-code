// Data-driven resume renderer: maps resume/data/{en,es}.json onto the shared
// layout helpers in template.typ. The two resume files are thin wrappers —
// edit content in the JSON, never here.
#import "template.typ": *

// Bulleted list from an array of strings; nothing at all when empty.
#let bullet-list(items) = if items.len() == 0 { none } else { list(..items.map(b => [#b])) }

// "**Label:** a, b, c" rows for the skills section, one per group.
#let skills-body(groups) = groups.map(g => [*#g.label:* #g.items.join(", ")]).join(linebreak())

// One experience / education entry, with bullets when the entry has any.
#let resume-entry(e) = entry(
  title: e.title,
  dates: e.at("dates", default: none),
  org: e.at("org", default: none),
  meta: e.at("meta", default: none),
)[#bullet-list(e.at("bullets", default: ()))]

// The website splits projects into per-card entries; the PDF merges every
// entry flagged inResume into the single reviewed CV entry, keeping the PDF
// exactly as approved while the site gets its richer card layout.
#let projects-entry(projects) = {
  let inc = projects.entries.filter(e => e.at("inResume", default: false))
  let title = inc.first().at("resumeTitle", default: projects.title)
  let bullets = inc.fold((), (acc, e) => acc + e.at("bullets", default: ()))
  entry(title: title)[#bullet-list(bullets)]
}

#let render(lang: "en", paper: "us-letter", margin-y: 1.1cm) = {
  let d = json("data/" + lang + ".json")
  let s = d.sections

  resume(
    paper: paper,
    lang: d.meta.lang,
    margin-y: margin-y,
    name: d.name,
    role: d.role,
    contacts: d.contacts.map(c => if "href" in c { link(c.href)[#c.label] } else { [#c.label] }),
  )[
    #section(s.profile.title)[#s.profile.text]

    #section(s.skills.title)[#skills-body(s.skills.groups)]

    #section(s.experience.title)[
      #for e in s.experience.entries { resume-entry(e) }
    ]

    #section(s.projects.title)[#projects-entry(s.projects)]

    #section(s.education.title)[
      #for e in s.education.entries { resume-entry(e) }
    ]
  ]
}
