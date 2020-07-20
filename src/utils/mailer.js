const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "", // INSERT YOUT USER ON MAILTRAP
    pass: "" // INSERT YOURPASS ON MAILTRAP
  }
});