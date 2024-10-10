const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'kikiyulia223@gmail.com',
    pass: 'hrtz jlgp suak qtjr'
  },
});

const sendEmail = async (toEmail, subject = 'Congratulation You Have Been Enrolled!', htmlContent= 'Halo'
    ) => {
  try {
    let mailOptions = {
      from: 'kikiyulia223@gmail.com',
      to: toEmail,
      subject: subject,
      html: htmlContent
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail }