function makeMealsLogsArray() {
    return [
      {
        id: 1,
        meals: "Sandwich",
        user_id: 2,
        date_time: '2020-12-08T01:59:00.000Z',
      },
      {
        id: 2,
        meals: "Egg BreakFast",
        user_id: 2,
        date_time: '2020-12-06T00:00:00.000Z',
      },
      {
        id: 3,
        meals: "Indian meal",
        user_id: 1,
        date_time: '2020-12-05T03:20:00.000Z',
      },
      {
        id: 4,
        meals: "Chinese meal",
        user_id: 1,
        date_time: '2020-12-08T04:19:00.000Z',
      },
    ];
}

module.exports = {
    makeMealsLogsArray
}