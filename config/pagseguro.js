module.exports = {
    mode: process.env.NODE_ENV === "production" ? "live" : "sandbox",
    sandbox: process.env.NODE_ENV === "production" ? false : true, 
    sandbox_email: process.env.NODE_ENV === "production" ? null : "c67839575090840976078@sandbox.pagseguro.com.br",
    email: "huaksonhuilnner023@gmail.com",
    token: "697B941D92294AA3A8B6BE0C2611143E",
    notificationURL: "localhost:3000/v1/api/pagamentos/notificacao"
};