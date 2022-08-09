const { nanoid } = require('nanoid');
const VehicleLog = require('../models/vehicleLog.model');

const addToLog = async (payload) => {
  try {
    const splitData = payload.split('#');
    const vehicleUID = splitData[2];
    const power = splitData[3];
    const eco = splitData[4];
    const lamp = splitData[5];
    const warning = splitData[6];
    const sign = splitData[7];
    const speed = splitData[8];
    const rangeLeft = splitData[9];
    const batteryPercentage = splitData[10];
    const temperature = splitData[11];
    const current = splitData[12];
    const rpm = splitData[13];
    const lat = splitData[14];
    const lng = splitData[15];

    await VehicleLog.query().insert({
      id: nanoid(),
      latitude: lat,
      longitude: lng,
      altitude: '0.0',
      speedGps: speed,
      heading: '0.0',
      timestamp: new Date(Date.now()),
      voltage: batteryPercentage,
      current,
      rpm,
      speedMotor: speed,
      internalTemperature: temperature,
      externalTemperature: temperature,
      vehicleUid: vehicleUID,
    });
    console.log('success insert');
  } catch (error) {
    console.log(`error when insert = ${error}`);
  }
};

module.exports = {
  addToLog,
};
