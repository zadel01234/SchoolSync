const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4,
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"SchoolSync" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;




// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   family: 4, // Force IPv4 — fixes Render ENETUNREACH error
// });

// const sendEmail = async ({ to, subject, html }) => {
//   await transporter.sendMail({
//     from: `"SchoolSync" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };

// module.exports = sendEmail;