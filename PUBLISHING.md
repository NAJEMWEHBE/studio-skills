# Publishing — public vs. private

This repository has two flavors:

- **Private working copy** (`studio-skills/`) — what's on your machine. Contains real, working rules from your operations. Sensitive specifics (IPs, credentials, client names) are replaced with placeholders even in the private copy, but the rules themselves are real.
- **Public template** (`studio-skills-public/`) — what you push to GitHub for others to fork. Same architecture and structure, but seed lessons are replaced with markers like `[EXAMPLE LESSON — REPLACE WITH YOUR OWN]`. Generic, no operational specifics.

## Why two versions

You want:

- A working tool you actually use day-to-day (the private version).
- A shareable scaffold others can fork and adapt to their own domains (the public version).

Trying to do both with one repo means either you sanitize too aggressively (and lose your real working tool) or not aggressively enough (and leak operational detail). Two flavors solves it. Sync the *structure* and *meta-skill content* between them; never sync the seed lessons or domain-specific specifics.

## The sanitization checklist

**Run through this list before any commit to the public repository.** Even if you've done it before. Things slip in.

### Credentials and secrets — zero tolerance

- [ ] No passwords, API keys, tokens, SSH private keys, or any credential.
- [ ] No `.env` files or environment-variable values.
- [ ] No copy-pasted command outputs that contain credentials.
- [ ] No screenshots that show credentials in any visible UI.

### Network specifics — zero tolerance

- [ ] No real IP addresses (use `[SERVER_IP]`, `[CDN_IP]`, etc.).
- [ ] No real hostnames (use `[RELAY_HOSTNAME]`, `[CDN_HOSTNAME]`, etc.).
- [ ] No real ports if the port is non-standard and identifying.
- [ ] No DNS records or subdomains that identify your infra.

### People and clients — zero tolerance

- [ ] No real client names (use `[CLIENT]`).
- [ ] No real project codenames (use `[PROJECT]`).
- [ ] No personal contact info — phone numbers, personal email addresses, home addresses.
- [ ] No employee names (use `[ROLE]` or generic terms).

### Proprietary content — case by case

- [ ] No workflow steps that you haven't explicitly approved for public release.
- [ ] No pricing, contract terms, or commercial agreements.
- [ ] No internal-tool screenshots or schemas.

### Repository hygiene

- [ ] `.gitignore` includes `.learnings/private/`, `*.local.md`, `secrets/`, `*.env`.
- [ ] No `private/` folder content has been moved out of its protective folder.
- [ ] No commit messages that reference real client names, IPs, or credentials.
- [ ] Branch protection enabled on `main` (recommended on the public repo).

## Working flow

1. Do all your real work in `studio-skills/` (private).
2. Once a quarter (or whenever you have major updates), generate or refresh the public version:
   - Copy `studio-skills/` to `studio-skills-public/`.
   - Replace each seed lesson in `.learnings/LEARNINGS.md` files with `[EXAMPLE LESSON — REPLACE WITH YOUR OWN]`.
   - Genericize anything domain-specific in `references/` and `examples/` (e.g. carrier names, server names, hardware product names if proprietary).
   - Run through the sanitization checklist above.
3. Commit `studio-skills-public/` content to your public GitHub repo.
4. Never commit `studio-skills/` (private) to a public repo. Use a private repo if you want backup, or keep it on local machine + cloud sync only.

## When in doubt

If you're not sure whether something is safe to publish, **don't publish it.** It's much easier to add content later than to scrub it from a public commit history (which is essentially impossible).

## Recovery if you leak something

If you accidentally commit something sensitive:

1. **Rotate the credential immediately.** The commit is in your git history forever; the only safe assumption is that the credential is now public.
2. Open a GitHub support request to remove the file from the cache (this won't remove it from anyone who already cloned the repo, but reduces ongoing exposure).
3. Add a lesson to `.learnings/ERRORS.md` documenting the leak so the same mistake doesn't repeat.
