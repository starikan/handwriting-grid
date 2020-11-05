import { BlockProps } from '../../Block/Block';

export const samplePages = [
  {
    blocks: [
      {
        positionX: 100,
        positionY: 130,
        cells: [
          {
            left: 150,
            top: 10,
            width: 100,
            height: 120,
            borderWidth: 4,
          },
          {
            left: 50,
            top: 50,
            width: 50,
            height: 30,
            borderWidth: 1,
            fontSize: 30,
            conture: false,
            grid: {
              vertical: [0.25, 0.75],
              horizontal: [0.25, 0.75],
              diagonalUp: [0.25, 0.75],
              diagonalDown: [0.25, 0.75],
            },
          },
        ],
        multiply: [
          {
            times: 3,
            direction: 90,
            distance: 200,
          },
          {
            times: 2,
            direction: 45,
            distance: 400,
          },
        ],
      } as BlockProps,
    ],
  },
];
