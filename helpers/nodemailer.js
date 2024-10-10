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

const sendEmail = async (toEmail, name
    ) => {
  try {
    let mailOptions = {
      from: 'kikiyulia223@gmail.com',
      to: toEmail,
      subject: `Congratulation ${name} You Have Been Enrolled!`,
      html: `  <div>
        <div class="text-center my-10">
          <h2 class="text-gray-800 text-3xl font-bold mb-3">Selamat Datang ${name} di Kursus Vakir Kami!</h2>
          
          <p class="text-gray-600 mb-4">Terima kasih telah mendaftar di kursus online kami. Kami senang Anda telah bergabung untuk meningkatkan keterampilan Anda.</p>
          
          <p class="text-gray-600 mb-4">Anda dapat mulai belajar kapan saja dengan mengakses materi kursus yang telah Anda pilih.</p>
          
          <p class="text-gray-600 mb-4">Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi tim dukungan kami.</p>
          
          <p class="text-gray-600 mb-4">Selamat belajar dan semoga sukses dalam perjalanan pembelajaran Anda!</p>
          
          <p class="text-gray-600">Salam,<br>Tim Vakir Online</p>
        </div>
      </div>`
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail }