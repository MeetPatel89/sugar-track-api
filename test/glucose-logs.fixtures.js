function makeGlucoseLogsArray() {
  return [
    {
      id: 1,
      glucose: 120,
      user_id: 2,
      date_time: '2020-12-08T01:59:00.000Z',
    },
    {
      id: 2,
      glucose: 200,
      user_id: 2,
      date_time: '2020-12-06T00:00:00.000Z',
    },
    {
      id: 3,
      glucose: 300,
      user_id: 1,
      date_time: '2020-12-05T03:20:00.000Z',
    },
    {
      id: 4,
      glucose: 400,
      user_id: 1,
      date_time: '2020-12-08T04:19:00.000Z',
    },
  ];
}

module.exports = {
  makeGlucoseLogsArray,
};
