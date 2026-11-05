# Contributing to studio-skills

Bug reports, new domain skills, lesson examples and doc fixes are all welcome.

## A new domain skill

1. Follow [`docs/how-to-add-a-new-domain.md`](docs/how-to-add-a-new-domain.md).
2. Add 2 or 3 eval cases for it under `evals/` (copy an existing case).
3. Open a pull request saying what the domain is and why you built it. CI checks the frontmatter and links.

## An example lesson

1. Write it in the format in `skills/self-improvement/references/lesson-format.md`.
2. Use placeholders for every client, person, address and secret: `[CLIENT]`, `[CONTACT]`, `[SERVER_IP]`, `[CREDENTIAL]`.
3. Open a pull request adding it to the domain's file under `examples/.learnings/`.

## Conduct

- **Be useful and honest:** contributions should come from real work.
- **Sanitize before you push** (see [`PUBLISHING.md`](PUBLISHING.md)).
- **Critique ideas, not people.**
