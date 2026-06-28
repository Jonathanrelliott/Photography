require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const app = express();
const port = process.env.PORT || 3000;
const toEmail = process.env.TO_EMAIL || "jonathan@editgenlx.com";
const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@editgenlx.com";
const mailtrapToken = process.env.MAILTRAP_API_TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.post("/api/contact", async (req, res) => {
  const { name, email, plan, details } = req.body || {};

  if (!name || !email || !details) {
    return res.status(400).json({ message: "Please fill out your name, email, and message." });
  }

  if (!mailtrapToken) {
    return res.status(500).json({
      message: "Email service is not configured yet. Set MAILTRAP_API_TOKEN in your .env file.",
    });
  }

  const transporter = nodemailer.createTransport(
    MailtrapTransport({
      token: mailtrapToken,
    })
  );

  const subject = `EditGenlx booking request from ${name}`;
  const messageText = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Plan: ${plan || ""}`,
    "",
    `Details: ${details}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `EditGenlx Team <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text: messageText,
    });

    return res.json({ message: `Thanks, ${name}. Your message has been sent to ${toEmail}.` });
  } catch (error) {
    return res.status(500).json({
      message: "I could not send that message yet. Check your Mailtrap configuration and try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`EditGenlx site running at http://localhost:${port}`);
});