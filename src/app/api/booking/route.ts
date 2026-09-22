import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface BookingPayload {
  postcode: string;
  venueAddress?: string;
  areaLocation?: string;
  eventType?: string;
  date?: string;
  start?: string;
  duration?: string;
  guests?: string;
  supplies?: string;
  timeline?: string;
  role?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  urgent?: boolean;
  updates?: boolean;
  requestedDj?: string;
}

export async function POST(request: Request) {
  try {
    const data: BookingPayload = await request.json();

    // Validation
    if (!data.name || !data.email || !data.postcode) {
      return NextResponse.json(
        { success: false, message: "Please provide your name, email, and postcode." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || gmailUser;

    const isPlaceholder =
      !gmailUser ||
      !gmailPass ||
      gmailUser.includes("your-email") ||
      gmailPass.includes("your-16-character");

    // If credentials are not set, log cleanly in terminal and return simulated success
    if (isPlaceholder) {
      console.log("=================================================");
      console.log("📬 [BOOKING RECEIVED — SIMULATION MODE]");
      console.log("Gmail credentials not configured in .env.local yet.");
      console.log("Booking Details:", JSON.stringify(data, null, 2));
      console.log("=================================================");

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Enquiry received! (Simulation mode: Set GMAIL_USER & GMAIL_APP_PASSWORD in .env.local to send live emails)",
      });
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, ""), // strip any spaces copied with app password
      },
    });

    const isUrgent = Boolean(data.urgent);
    const eventType = data.eventType || "Event";
    const subjectPrefix = isUrgent ? "🚨 [URGENT] " : "🎧 ";
    const subject = `${subjectPrefix}New DJ Booking Enquiry: ${eventType} in ${data.postcode} — ${data.name}`;

    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
            .header { background: #000000; color: #ffffff; padding: 28px 32px; }
            .header h1 { margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 0; font-size: 14px; opacity: 0.8; }
            .urgent-badge { display: inline-block; background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; text-transform: uppercase; }
            .content { padding: 32px; }
            .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin: 24px 0 12px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
            .section-title:first-child { margin-top: 0; }
            .info-grid { width: 100%; border-collapse: collapse; }
            .info-grid td { padding: 8px 0; font-size: 14px; vertical-align: top; }
            .info-grid td.label { width: 150px; color: #64748b; font-weight: 500; }
            .info-grid td.value { color: #0f172a; font-weight: 600; }
            .notes-box { background: #f8fafc; border-left: 3px solid #000000; padding: 14px 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 8px; }
            .reply-button { display: inline-block; background: #000000; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-top: 24px; }
            .footer { padding: 20px 32px; background: #f8fafc; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Brief Received</h1>
              <p>Submitted via Book My DJ online wizard</p>
              ${isUrgent ? '<div class="urgent-badge">Urgent Booking Request</div>' : ""}
            </div>

            <div class="content">
              <div class="section-title">Client Contact Details</div>
              <table class="info-grid">
                <tr>
                  <td class="label">Name:</td>
                  <td class="value">${data.name}</td>
                </tr>
                <tr>
                  <td class="label">Email:</td>
                  <td class="value"><a href="mailto:${data.email}" style="color: #000000;">${data.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone:</td>
                  <td class="value"><a href="tel:${data.phone}" style="color: #000000;">${data.phone}</a></td>
                </tr>
                ${data.role ? `<tr><td class="label">Client Role:</td><td class="value">${data.role}</td></tr>` : ""}
              </table>

              <div class="section-title">Event Specifications</div>
              <table class="info-grid">
                <tr>
                  <td class="label">Postcode / Location:</td>
                  <td class="value">${data.postcode}${data.areaLocation ? ` &bull; ${data.areaLocation}` : ""}</td>
                </tr>
                ${
                  data.venueAddress
                    ? `<tr><td class="label">Venue / Address:</td><td class="value">${data.venueAddress}</td></tr>`
                    : ""
                }
                <tr>
                  <td class="label">Event Type:</td>
                  <td class="value">${data.eventType || "Not specified"}</td>
                </tr>
                <tr>
                  <td class="label">Date of Event:</td>
                  <td class="value">${data.date || "Not specified"}</td>
                </tr>
                <tr>
                  <td class="label">Estimated Start:</td>
                  <td class="value">${data.start || "Flexible"}</td>
                </tr>
                <tr>
                  <td class="label">Duration:</td>
                  <td class="value">${data.duration ? `${data.duration} hours` : "4 hours"}</td>
                </tr>
                <tr>
                  <td class="label">Guest Count:</td>
                  <td class="value">${data.guests || "Not specified"}</td>
                </tr>
                <tr>
                  <td class="label">Supplies Needed:</td>
                  <td class="value">${data.supplies || "Not specified"}</td>
                </tr>
                <tr>
                  <td class="label">Confirm Timeline:</td>
                  <td class="value">${data.timeline || "Not specified"}</td>
                </tr>
                ${
                  data.requestedDj
                    ? `<tr><td class="label">Requested DJ:</td><td class="value" style="color: #4f46e5;">${data.requestedDj}</td></tr>`
                    : ""
                }
              </table>

              ${
                data.message
                  ? `
                <div class="section-title">Client Notes & Message</div>
                <div class="notes-box">${data.message.replace(/\n/g, "<br>")}</div>
              `
                  : ""
              }

              <div class="section-title">Preferences</div>
              <table class="info-grid">
                <tr>
                  <td class="label">Urgent Booking:</td>
                  <td class="value">${isUrgent ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td class="label">Marketing Opt-In:</td>
                  <td class="value">${data.updates ? "Yes" : "No"}</td>
                </tr>
              </table>

              <a href="mailto:${data.email}?subject=Regarding%20your%20DJ%20booking%20enquiry" class="reply-button">
                Reply to ${data.name}
              </a>
            </div>

            <div class="footer">
              Book My DJ Notification System &bull; Received ${new Date().toLocaleString("en-GB")}
            </div>
          </div>
        </body>
      </html>
    `;

    // Send Admin Notification
    await transporter.sendMail({
      from: `"Book My DJ Notifications" <${gmailUser}>`,
      to: notificationEmail,
      replyTo: data.email,
      subject: subject,
      html: adminHtml,
    });

    // Send Customer Acknowledgment
    try {
      const firstName = data.name.trim().split(/\s+/)[0] || "there";
      const customerHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
              .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
              .header { background: #000000; color: #ffffff; padding: 28px 32px; }
              .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
              .content { padding: 32px; font-size: 15px; line-height: 1.6; color: #334155; }
              .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 20px 0; font-size: 14px; }
              .summary-item { margin-bottom: 6px; }
              .summary-item strong { color: #0f172a; }
              .footer { padding: 20px 32px; background: #f8fafc; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>We've Received Your DJ Brief</h1>
              </div>
              <div class="content">
                <p>Hi ${firstName},</p>
                <p>Thank you for submitting your event details to <strong>Book My DJ</strong>. Our team is currently reviewing your brief and checking DJ availability around <strong>${data.postcode}</strong>.</p>
                
                <div class="summary-card">
                  <div class="summary-item"><strong>Event:</strong> ${eventType}</div>
                  <div class="summary-item"><strong>Date:</strong> ${data.date || "To be confirmed"}</div>
                  <div class="summary-item"><strong>Location:</strong> ${data.postcode}${data.areaLocation ? ` (${data.areaLocation})` : ""}</div>
                  ${data.venueAddress ? `<div class="summary-item"><strong>Venue / Address:</strong> ${data.venueAddress}</div>` : ""}
                  ${data.duration ? `<div class="summary-item"><strong>Duration:</strong> ${data.duration} hours</div>` : ""}
                </div>

                <p>We typically get back to you with matched DJ profiles and transparent quotes within <strong>24 hours</strong> (sooner for urgent bookings).</p>
                <p>If you need to update anything in the meantime, simply reply directly to this email.</p>
                <p>Best regards,<br><strong>Book My DJ Team</strong></p>
              </div>
              <div class="footer">
                Book My DJ &bull; Across the UK
              </div>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Book My DJ" <${gmailUser}>`,
        to: data.email,
        subject: `We've received your DJ enquiry for ${eventType} — Book My DJ`,
        html: customerHtml,
      });
    } catch (custError) {
      console.warn("Notice: Customer confirmation email could not be dispatched:", custError);
    }

    return NextResponse.json({
      success: true,
      message: "Booking enquiry submitted successfully!",
    });
  } catch (error: unknown) {
    console.error("Booking API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process booking enquiry.";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
