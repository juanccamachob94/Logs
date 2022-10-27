const { response } = require('express');
const EnVivo = require('../models/enVivo');
const JsonUrlReader = require('../services/json_url_reader');

const getAll = async (req, res = response)  => {
  const enVivos = await EnVivo.find()
  res.json(enVivos)
}

const addEvent = async (req, res = response)  => {
  let webSiteData = await JsonUrlReader.perform("https://www.tvazteca.com/superapp/envivo");
  let currentdate = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
  const enVivo = new EnVivo({
    date: currentdate,
    captureDate: webSiteData
  });
  await enVivo.save();
  res.json(enVivo)
}

module.exports = {
  getAll,
  addEvent
}