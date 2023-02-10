const Records = require("../models/records.model");
// Utilizo esta dependencia para convertir csv a json
const csvToJson = require("csvtojson");
const fs = require("fs");

const upload = async (req, res) => {
  try {
    // Creo array para guardar los json parseados
    let data = [];
    // Guardo el archivo
    const fileName = req.file.path;
    // Inicializo csvtojson
    csvToJson()
      // Enviamos por params el archivo
      .fromFile(fileName)
      // Luego realizamos la iteración
      .then(async (res) => {
        for (let x = 0; x < res.length; x++) {
          data.push({
            id: res[x].id,
            firstname: res[x].firstname,
            lastname: res[x].lastname,
            email: res[x].email,
            email2: res[x].email2,
            profession: res[x].profession,
          });
        }
        await Records.insertMany(data);
        // Elimino el archivo temporal
        fs.unlinkSync(fileName);
      });
    return res.status(200).json({ message: "successful response" });
  } catch (err) {
    res.send({ status: 400, success: false, msg: err.message });
  }
};

const list = async (_, res) => {
  try {
    const data = await Records.find({}).limit(10).lean();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  upload,
  list,
};
