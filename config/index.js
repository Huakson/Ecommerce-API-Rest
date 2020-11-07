module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET: "D22DH82FH28FG2H8B2Y8D2BQHNIJVN2D8HF8QGUHIVFVIUOHQBIQFBOHQ0E8FHQE9OH879EQH0Q",
    api: process.env.NODE_ENV === "production" ? "https://api.loja-teste.ampliee.com" : "http://localhost:3000",
    loja: process.env.NODE_ENV === "production" ? "https://loja-teste.ampliee.com" : "http://localhost:8000",
};