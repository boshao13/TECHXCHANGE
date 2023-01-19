const db = require('../db');

module.exports = {
  getMap: async (req, res) => {
    const data = {
      type: 'FeatureCollection',
      features: [],
    };

    try {
      const conn = db.promise();
      const [users] = await conn.query('SELECT * FROM users;');
      await Promise.all(
        users.map(async (user) => {
          const [devices] = await conn.query(
            `SELECT * FROM devices WHERE user_id = ${user.id}`
          );
          devices.forEach((device) => {
            const feature = {
              type: 'Feature',
              id: device.id,
              properties: device,
              geometry: {
                type: 'Point',
                coordinates: [user.latitude, user.longitude],
              },
            };
            data.features.push(feature);
          });
        })
      );

      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
