# How to use studio-skills in claude.ai

This is the guide for non-developers. If you use Claude through [claude.ai](https://claude.ai) (the desktop app or website), this is the doc for you. No CLI, no terminal, no developer tools.

## What you'll do

1. Set up a Project in claude.ai for the domain you want to work on.
2. Upload the relevant skill files as Project knowledge.
3. Configure the Project's custom instructions to invoke the self-improvement skill.
4. Work normally — Claude will follow the rules from the uploaded skills.
5. At session end, copy any new lessons back to GitHub via the web UI.

## Step 1 — Create a Project

In claude.ai:

1. Click **Projects** in the left sidebar.
2. Click **Create project**.
3. Name it after the domain (e.g. *"Live Streaming"*, *"Marketing"*, *"Filming"*).
4. Optionally write a one-sentence description.

## Step 2 — Upload skill files as Project knowledge

For each Project, you'll upload:

- The **meta-skill** — `skills/self-improvement/SKILL.md`
- The **domain skill** — e.g. `skills/live-streaming/SKILL.md`
- The **lesson library** — every file in `skills/<domain>/.learnings/`
- The **references** — every file in `skills/<domain>/references/`
- The **examples** — every file in `skills/<domain>/examples/`
- The **meta-skill references** — every file in `skills/self-improvement/references/` (so Claude can look up the lesson format and promotion criteria)

To upload:

1. Open the Project.
2. Click **Project knowledge** (top right).
3. Drag and drop the files, OR click **Add content** and select them.
4. Wait for "Indexed" status next to each file.

## Step 3 — Configure Project custom instructions

In the Project, click **Set custom instructions** (under the Project name).

Paste this text:

```
At the start of every conversation in this Project, do the following:

1. Read the meta-skill at skills/self-improvement/SKILL.md.
2. Read the domain skill (the active SKILL.md in the project knowledge).
3. Read the contents of .learnings/LEARNINGS.md, .learnings/ERRORS.md, and .learnings/FEATURE_REQUESTS.md.
4. Note any active high-priority lessons. Reference them by ID when they apply during the conversation.

During the conversation, follow the self-improvement skill's three-phase loop: PREP, DO, REFLECT.

Never log a lesson without my explicit approval. Always show me the draft entry first and wait for accept / edit / reject.

Never write secrets, passwords, IPs, hostnames, or real client names into any lesson file. Use placeholders like [CLIENT], [CREDENTIAL], [SERVER_IP] instead.
```

Save the instructions.

## Step 4 — Work normally

Start a conversation in the Project. Claude will:

- Begin by acknowledging the active lessons (PREP).
- Help you with whatever you're working on (DO).
- At natural breakpoints or session end, propose new lessons (REFLECT).

When Claude proposes a lesson, it will show you a draft entry. You respond:

- **"accept"** or **"approved"** → Claude logs it
- **"edit: [your changes]"** → Claude revises the draft and re-asks
- **"reject"** or **"skip"** → Claude drops it

## Step 5 — Copy lessons back to GitHub

At session end, if any new lessons were logged, you need to commit the updated `.learnings/` files back to GitHub. Claude will tell you which files changed.

To commit via GitHub web UI:

1. In claude.ai, ask Claude to show you the **full updated content** of the changed file (e.g. *"show me the full contents of LEARNINGS.md after today's session"*).
2. Copy the full text.
3. In your browser, navigate to the file in GitHub: `github.com/NAJEMWEHBE/studio-skills/blob/main/skills/<domain>/.learnings/LEARNINGS.md`
4. Click the pencil icon (edit).
5. Paste the new content (replacing the old).
6. At the bottom, write a commit message (e.g. *"Add LRN-20260203-001: streaming.bitrate.tuesday-night"*).
7. Click **Commit changes**.

Repeat for each changed file.

## Honest limitations

This is the real picture, not an ad:

- **No auto-loading.** You upload files manually each time you create a new Project. There's no way to point claude.ai at a GitHub URL and have it stay in sync.
- **No file write-back.** Claude in claude.ai cannot directly modify files in your GitHub repo. You manually copy lessons back at session end.
- **No hooks.** The "every session at start" behavior only happens because you wrote it in custom instructions. Claude can forget. If a session feels off, remind it: *"please re-read the self-improvement skill and the active lessons."*
- **Project knowledge has a size limit.** If your skill files grow large, you may need to slim them. The 500-line-per-SKILL.md ceiling is partially driven by this.
- **Each Project is its own context.** Lessons logged in one Project don't automatically show up in another. If you want them to, upload the same files to the other Project.

The loop is manual but it works. The discipline of the user-approval gate, the lesson format, and the Pattern-Key dedup logic all happen the same way they would in an automated system — they're just driven by you copying text instead of an automated job.

## Tips

- **Start every session with the same opening line.** E.g. *"Let's start. Please read the active lessons and tell me which ones apply to today's task."* Builds the habit and ensures Claude actually does the PREP phase.
- **Don't accept every proposed lesson.** Reject lessons that are one-offs, too specific, or low-value. The user-approval gate exists to keep the lesson library high-signal.
- **Keep the lesson IDs sequential per day.** If today is 2026-02-03 and you log two lessons, they're `LRN-20260203-001` and `LRN-20260203-002`. Don't skip numbers.
- **Sanitize as you go.** When Claude proposes a draft and it includes a real client name or IP, edit it to use a placeholder before accepting.

## Troubleshooting

- **"Claude doesn't seem to know about the lessons."** It probably didn't read them. Ask explicitly: *"please read .learnings/LEARNINGS.md and tell me what's in it."*
- **"Claude is logging without asking me."** Stop the session. Reset by saying: *"You broke the user-approval rule. From now on, propose every lesson as a draft and wait for my response."*
- **"My Project knowledge is full."** Remove old reference files you don't need for this domain. Or split into multiple Projects.

## What's next

When you're ready to add a new domain (marketing, filming, editing, etc.), see [`how-to-add-a-new-domain.md`](how-to-add-a-new-domain.md).
