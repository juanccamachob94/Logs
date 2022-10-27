const JsonUrlReader = require("./json_url_reader");

const newMongoRegister = async (className) => {
  let webSiteData = await JsonUrlReader.perform("https://www.tvazteca.com/superapp/envivo");
  let currentdate = new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City'});
  const enVivo = new className({
    date: currentdate,
    captureDate: webSiteData
  });
  await enVivo.save();
}

module.exports = {
 newMongoRegister
}