# Admin Guide — Quantum Art Thailand Association CMS

## How to access the CMS

1. Go to the site and click **Login**.
2. Enter your admin email and click **Send magic link**.
3. Click the link in your inbox.
4. After logging in, the header shows **Admin** — click it.

Your email must be in the `admin_emails` Supabase table. Add admins with:

```sql
insert into public.admin_emails (email) values ('your@email.com');
```

---

## Creating content

1. CMS sidebar → **Content** → **New**.
2. Choose a **Category** — a guide explains the required fields.
3. Fill **Title** (slug auto-generates).
4. Write **Excerpt** (shown on cards, max 500 chars).
5. Write **Body** in Markdown.
6. Add **Cover image URL** (paste any public URL or Supabase storage URL).
7. Add **External URL** if content lives elsewhere.
8. Set **Location**, **Start date**, **End date** for events.
9. Set **Status** to **Draft** while writing, **Published** when ready.
10. Click **Create content**.

---

## Draft vs Published

| Status | Visible to public |
|---|---|
| Draft | No |
| Published | Yes |
| Archived | No |

Save as Draft first. Review. Then publish.

---

## Sending update notifications

1. CMS sidebar → **Notifications** → **Send notification**.
2. Enter a subject and short preview message.
3. Click **Send** — all opted-in subscribers receive the email.

If email is not configured, instructions appear to set up Resend.

---

## Content categories

| Category | Use for |
|---|---|
| Event | Workshops, talks, openings |
| Project | Ongoing QAT programs |
| Game | Interactive quantum experiences |
| Course | Structured learning |
| Exhibition | Past or upcoming installations |
| Research / Article | Papers, essays |
| News | Announcements, press releases |

---

## Updating social media links

Edit `content/social-media.md` in the repo. Format:
```
- Facebook: https://…
- Instagram: https://…
- Gmail: email@example.com
```
Redeploy to Vercel after editing.

---

## If email notifications fail

1. Check `RESEND_API_KEY` is set in Vercel env vars.
2. Check `EMAIL_FROM` is a verified sender in Resend.
3. Verify the sender domain at resend.com/domains.
4. Check `email_delivery_logs` in Supabase for error details.
