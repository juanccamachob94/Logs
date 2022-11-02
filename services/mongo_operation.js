const data_getter_service = require('../services/data_getter_service');
const {model} = require('mongoose')

module.exports = {
  newMongoRegister : async (ModelDB) => {

    const data = await data_getter_service.getData(ModelDB.getUrl(),ModelDB);
    let Model = model('model', ModelDB.getSchema());
    const doc = new Model(data);
    await doc.save()
      .then((doc) => {
        console.log("Guardado Exitoso");
      })
      .catch((err) => {
        console.log("Error al guardar en la db", err);
      });
  }
}