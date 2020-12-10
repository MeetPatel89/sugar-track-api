function makeMedsLogsArray() {
    return [
      {
        id: 1,
        meds: "metformin, insulin",
        user_id: 2,
        date_time: '2020-12-08T01:59:00.000Z',
      },
      {
        id: 2,
        meds: "atenolol",
        user_id: 2,
        date_time: '2020-12-06T00:00:00.000Z',
      },
      {
        id: 3,
        meds: "ayurvedic medications",
        user_id: 1,
        date_time: '2020-12-05T03:20:00.000Z',
      },
      {
        id: 4,
        meds: "thiazide diuretics, insulin",
        user_id: 1,
        date_time: '2020-12-08T04:19:00.000Z',
      },
    ];
}

module.exports = {
    makeMedsLogsArray
}