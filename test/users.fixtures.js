function makeUsersArray() {
  return [
    {
      id: 1,
      fullname: 'First User',
      username: 'firstuser12',
      password: 'RandomFirstUser12',
    },
    {
      id: 2,
      fullname: 'Second User',
      username: 'seconduser12',
      password: 'RandomSecondUser12',
    },
    {
      id: 3,
      fullname: 'Third User',
      username: 'thirduser12',
      password: 'RandomThirdUser12',
    },
    {
      id: 4,
      fullname: 'Fourth User',
      username: 'fourthuser12',
      password: 'RandomFourthUser12',
    },
  ];
}

module.exports = {
    makeUsersArray,
}