# Publishing your own fork safely

Your lessons and domain skills fill up with real details of your work: venues, clients, servers, carriers. If you fork this repo and make your fork public, run this check before every push. Removing something from a public git history afterwards is close to impossible.

A simple setup: keep your working lessons in a private repo (or only on your machine), and publish a fork that holds the skills and generic example lessons only.

## Sanitization checklist

### Credentials and secrets

- [ ] No passwords, API keys, tokens, SSH keys or other credentials.
- [ ] No `.env` files or environment-variable values.
- [ ] No pasted command output or screenshots that show a credential.

### Network details

- [ ] No real IP addresses (use `[SERVER_IP]`), hostnames (`[HOSTNAME]`) or identifying non-standard ports.
- [ ] No DNS records or subdomains that identify your infrastructure.

### People, clients and suppliers

- [ ] No real client names (`[CLIENT]`) or project codenames (`[PROJECT]`).
- [ ] No personal contact details or employee names (`[CONTACT]`, `[ROLE]`).
- [ ] No carrier, venue, region or hardware model names that fingerprint your operation: write `carrier-a`, `[VENUE]`, "the primary relay", "the bonding router".

### Business content

- [ ] No workflow steps you haven't decided to share.
- [ ] No pricing, contract terms or internal-tool screenshots.

### Repository

- [ ] `.gitignore` has `**/.learnings/private/`, `*.local.md`, `secrets/` and `*.env`.
- [ ] `git ls-files | grep .learnings/private/` prints nothing (CI checks this too).
- [ ] No commit message names a client, an IP or a credential.

## If something leaks

1. **Rotate the credential at once.** Assume it is public: anyone may have cloned the repo already.
2. Remove it from the history (for example with `git filter-repo`), then ask GitHub Support to purge cached views. Clones made before that keep it.
3. Log the leak as a lesson in `ERRORS.md`, so the same slip is caught next time.
