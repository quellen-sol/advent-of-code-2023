import { Solution } from "../definitions";
import { LCM } from "../utils/utils";

type PointMap = {
  [addr: string]: {
    L: string;
    R: string;
  };
};

export class Day8Solution extends Solution {
  constructor() {
    super("./src/solutions/day-8-input.txt");
  }
  part1Solution() {
    const [instructions, _, ...points] = this.lines;
    const pointMap = this.makePointMap(points);
    return this.walkThroughInstructions(instructions, pointMap);
  }
  part2Solution() {
    const [instructions, _, ...points] = this.lines;
    const pointMap = this.makePointMap(points);
    const startingPoints = Object.keys(pointMap).filter((p) => p.endsWith("A"));
    return this.walkThroughMultiStartingPoints(instructions, pointMap, startingPoints);
  }

  walkThroughMultiStartingPoints(instructions: string, pointMap: PointMap, startingPoints: string[]): number {
    const ixs = instructions.split("");
    const eachSteps = [];
    for (const startPoint of startingPoints) {
      let current = startPoint;
      let steps = 0;
      while (!current.endsWith("Z")) {
        const point = pointMap[current];
        const ix = ixs[steps % ixs.length];
        current = point[ix as keyof PointMap[string]];
        steps++;
      }
      eachSteps.push(steps);
    }

    return LCM(...eachSteps);
  }

  walkThroughInstructions(instructions: string, pointMap: PointMap): number {
    const ixs = instructions.split("");
    let currentPoint = "AAA";
    let steps = 0;
    while (currentPoint !== "ZZZ") {
      const point = pointMap[currentPoint];
      const ix = ixs[steps % ixs.length];
      currentPoint = point[ix as keyof PointMap[string]];
      steps++;
    }

    return steps;
  }

  makePointMap(points: string[]): PointMap {
    return points.reduce<PointMap>((acc, p) => {
      const [addr, left, right] = p.match(/\w+/g)!;
      acc[addr] = {
        L: left,
        R: right,
      };
      return acc;
    }, {});
  }
}
