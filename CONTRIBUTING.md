# Contributing to studio-skills

This project grows through real-world usage in media production work. All contributions are welcome — bug reports, new domain skills, lesson templates, doc improvements.

## How to add a new domain skill

A "domain skill" covers a specific area of work (live streaming, virtual studios, podcast production, wedding photography, etc.).

1. Read [`docs/how-to-add-a-new-domain.md`](docs/how-to-add-a-new-domain.md) for the full walkthrough.
2. Use the `live-streaming` skill folder as your template — copy the structure and frontmatter.
3. Write your `SKILL.md` body covering: when to use the skill, what steps to take, what good output looks like.
4. Bootstrap empty `.learnings/` files using the templates in `skills/self-improvement/templates/`.
5. Open a pull request with a short description of the domain and why you built the skill.

## How to submit a lesson template

If you've found a recurring pattern in your domain that others would benefit from:

1. Format the lesson using the entry format in `skills/self-improvement/references/lesson-format.md`.
2. **Sanitize all secrets, IPs, client names, and personal info** — use placeholders like `[CLIENT]`, `[CREDENTIAL]`, `[SERVER_IP]`.
3. Open a pull request adding the lesson to the relevant domain's `.learnings/LEARNINGS.md`.

## Code of conduct

- **Be useful, be honest.** Contributions should reflect real work, not theory.
- **Sanitize before you push.** Never commit credentials, client names, real IPs, or personal contact info.
- **Disagreement is fine, condescension is not.** Critique ideas, not people.
