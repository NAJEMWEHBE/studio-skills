# Using studio-skills in claude.ai

For Claude through [claude.ai](https://claude.ai), on the website or the desktop app. You upload the skills once, keep each domain's lesson files in a Project, and save the files Claude updates.

> **Menu labels not confirmed.** The steps below follow claude.ai's Skills feature as introduced in October 2025: Settings → Capabilities → Skills, upload a zip. Labels change; if yours differ, look for "Skills" in Settings. If a step here is out of date, please open an issue.

## Step 1: Upload the skills

Each skill is uploaded on its own, as a zip of its folder:

1. Get the zips: download `self-improvement.zip` and `live-streaming.zip` from the repo's latest release, if there is one; otherwise zip each folder under `skills/` yourself, so the zip holds the folder (`self-improvement/SKILL.md`, `self-improvement/references/...`).
2. In claude.ai, open **Settings → Capabilities**. Skills need code execution and file creation turned on there.
3. Under **Skills**, upload `self-improvement.zip`, then the zip for your domain.
4. Make sure both skills are switched on.

## Step 2: A Project per domain

1. Click **Projects**, then **Create project**. Name it after the domain, such as *Live Streaming*.
2. Copy the four files from `skills/self-improvement/templates/` and rename them `LEARNINGS.md`, `ERRORS.md`, `FEATURE_REQUESTS.md` and `RULES.md`. Put the domain name in each heading. (For the example domain, use the files in `examples/.learnings/live-streaming/`.)
3. Add the four files to the Project's knowledge.
4. Set the Project's instructions to:

```
This Project is the live-streaming domain of the self-improvement skill.
Its lesson files are LEARNINGS.md, ERRORS.md, FEATURE_REQUESTS.md and RULES.md
in the Project knowledge. Run PREP at the start of each conversation.
```

## Step 3: Work

In a conversation in the Project, Claude:

- tells you which rules and high-priority lessons apply to the task (PREP);
- notes corrections and failures as you work (DO);
- at the end or a break, shows drafts of new lessons, changes to existing ones, and promotions (REFLECT).

Answer each draft with **accept**, **edit: [your change]** or **reject**.

## Step 4: Save the updated files

Claude in claude.ai can't change Project files. After you accept a draft, it prints the whole updated file. Then:

1. In the Project's knowledge, delete the old file.
2. Add the printed text as a file with the same name.

If you keep the lessons in your own fork on GitHub as well, open the file there (`github.com/<you>/<your-fork>/...`), click the pencil icon, paste the new text and commit.

## Limits

- **Nothing syncs.** The lesson files in the Project are the only copy Claude sees; each Project is separate.
- **PREP depends on the instructions.** If Claude skips it, ask: *"run PREP for this domain"*.
- **Lesson files grow.** Archive stale lessons (ask Claude to review them) so the Project's knowledge stays small.

## Troubleshooting

- **Claude doesn't mention the lessons:** check that both skills are switched on, then ask it to run PREP.
- **Claude says it logged something without a draft:** it can't write the files here, so nothing changed. Ask it to show the draft and wait for your answer.
- **A skill zip is rejected:** check the zip holds the skill folder with `SKILL.md` inside, and that the frontmatter is intact.
