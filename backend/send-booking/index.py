import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку на химчистку на почту и в Telegram."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")

    service = body.get("service", "—")
    date = body.get("date", "—")
    time = body.get("time", "—")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    comment = body.get("comment", "")
    has_photo = body.get("hasPhoto", False)

    photo_note = "📎 Фото прикреплено (отправлено клиентом)" if has_photo else "Фото не прикреплено"

    text_plain = f"""Новая заявка Fresh&Comfort

Услуга: {service}
Дата: {date}
Время: {time}
Имя: {name}
Телефон: {phone}
Комментарий: {comment or "—"}
Фото: {photo_note}
"""

    errors = []

    # --- EMAIL ---
    try:
        smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
        smtp_port = int(os.environ.get("SMTP_PORT", "465"))
        smtp_user = os.environ.get("SMTP_USER", "")
        smtp_pass = os.environ.get("SMTP_PASS", "")
        to_email = os.environ.get("TO_EMAIL", "freshcomfort@yandex.ru")

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка: {service} — {name}"
        msg["From"] = smtp_user
        msg["To"] = to_email

        html = f"""
<html><body style="font-family:sans-serif;color:#222;max-width:500px">
<h2 style="color:#111;border-bottom:2px solid #111;padding-bottom:8px">Fresh&amp;Comfort — Новая заявка</h2>
<table style="width:100%;border-collapse:collapse">
<tr><td style="padding:8px 0;color:#888;width:120px">Услуга</td><td style="padding:8px 0;font-weight:600">{service}</td></tr>
<tr><td style="padding:8px 0;color:#888">Дата</td><td style="padding:8px 0">{date}</td></tr>
<tr><td style="padding:8px 0;color:#888">Время</td><td style="padding:8px 0">{time}</td></tr>
<tr><td style="padding:8px 0;color:#888">Имя</td><td style="padding:8px 0">{name}</td></tr>
<tr><td style="padding:8px 0;color:#888">Телефон</td><td style="padding:8px 0"><a href="tel:{phone}" style="color:#111">{phone}</a></td></tr>
<tr><td style="padding:8px 0;color:#888">Комментарий</td><td style="padding:8px 0">{comment or "—"}</td></tr>
<tr><td style="padding:8px 0;color:#888">Фото</td><td style="padding:8px 0">{photo_note}</td></tr>
</table>
</body></html>
"""
        msg.attach(MIMEText(text_plain, "plain"))
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())
    except Exception as e:
        errors.append(f"email: {str(e)}")

    # --- TELEGRAM ---
    try:
        tg_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
        tg_chat = os.environ.get("TELEGRAM_CHAT_ID", "")

        tg_text = (
            f"📋 *Новая заявка Fresh\\&Comfort*\n\n"
            f"🛋 *Услуга:* {service}\n"
            f"📅 *Дата:* {date}\n"
            f"🕐 *Время:* {time}\n"
            f"👤 *Имя:* {name}\n"
            f"📞 *Телефон:* {phone}\n"
            f"💬 *Комментарий:* {comment or '—'}\n"
            f"📎 *Фото:* {'Да' if has_photo else 'Нет'}"
        )

        tg_url = f"https://api.telegram.org/bot{tg_token}/sendMessage"
        tg_data = json.dumps({
            "chat_id": tg_chat,
            "text": tg_text,
            "parse_mode": "MarkdownV2"
        }).encode("utf-8")

        req = urllib.request.Request(tg_url, data=tg_data, headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=10)
    except Exception as e:
        errors.append(f"telegram: {str(e)}")

    if len(errors) == 2:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"ok": False, "errors": errors})
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "errors": errors})
    }
