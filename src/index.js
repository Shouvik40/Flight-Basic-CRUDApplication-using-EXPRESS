const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Start");
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

  const { City, Airport } = require("./models");
  let bengaluru = await City.findByPk(10);
  // const kmpAirport = await bengaluru.createAirport({
  //   name: "Kumbhirgram",
  //   code: "IXS",
  // });
  // console.log(kmpAirport);

  // const dbairport = await bengaluru.createAirport({
  //   name: "Huballi Airport",
  //   code: "HBL",
  // });
  // console.log(dbairport);

  // const bengaluru = await City.findByPk(1); // Replace 'bengaluruId' with the actual ID of Bengaluru
  // const hbAirport = await Airport.findByPk(3);
  // console.log(hbAirport);
  // await bengaluru.removeAirport(hbAirport);
  // await City.destroy({
  //   where: {
  //     id: 10,
  //   },
  // });
});
