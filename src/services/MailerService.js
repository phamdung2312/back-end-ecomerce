const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let render = "";
  const attachImage = [];
  orderItems.forEach((order) => {
    render += `<div>
        <div>
            Bạn đã được sản phẩm <b>${order.name}</b> với số lượng:
            <b>${order.amount}</b> và giá là <b>${order.discount}</b>
        </div>
        <div>
            <img src=${order.image} alt="san pham"></img>
        </div>
        </div>`;
    attachImage.push({ path: order.image });
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "phamdung2312qn@gmail.com", // sender address
    to: "dungp7674@gmail.com", // list of receivers
    subject: "Bạn đã đặt hàng thành công", // Subject line
    text: "Hello world?", // plain text body
    html: render, // html body
    attachments: attachImage,
  });
};

module.exports = { sendEmailCreateOrder };
