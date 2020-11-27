const mockData  = [
  {
    arrayStep : [
      {
        id: 1,
        text: 'Step 1',
        position: 0,
        doubleStep: false,
        visited: 2,
        height: 50,
        order: 0,
        padding: 50,
        step: 1
      }
    ]
  },
  {
    arrayStep : [
      {
        id: 2,
        text: 'Step 2.1',
        position: 1,
        doubleStep: true,
        visited: 2,
        height: 25,
        order: 1,
        padding: 50,
        step: 2
      },
      {
        id: 3,
        text: 'Step 2.2',
        position: 1,
        doubleStep: true,
        visited: 2,
        height: 25,
        order: 2,
        padding: 50,
        step: 2
      },
    ]
  },

  {
    arrayStep : [
      {
        id: 4,
        text: 'Step 3',
        position: 1,
        doubleStep: false,
        visited: 2,
        height: 50,
        order: 0,
        padding: 50,
        step: 3
      }
    ]
  },
  {
    arrayStep : [
      {
        id: 5,
        text: 'Step 4',
        position: 2,
        doubleStep: false,
        visited: 2,
        height: 50,
        order: 0,
        padding: 50,
        step: 4
      }
    ]
  },
]

export default {
  mockData: mockData
}
