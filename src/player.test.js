import { Player } from "./player";

const player = new Player(true);
const computer = new Player(false);
test("player object is not null", () => {
  expect(player).not.toBeNull();
});
test("player places ships", () => {
  expect(player.placeCarrier([1, 1], true)).toBe(true);
  expect(player.placeBattleship([3, 0], false)).toBe(true);
  expect(player.placeCruiser([7, 7], true)).toBe(true);
  expect(player.placeSubmarine([5, 2], false)).toBe(true);
  expect(player.placeDestroyer([8, 0], true)).toBe(true);
});

test("placeCarrier returns false when placing ship on occupied spot", () => {
  expect(player.placeCarrier([7, 5], true)).toBe(false);
});

test("computer places ships", () => {
  expect(() => computer.placeComputerShips()).not.toThrow();
});

test("move made by computer is registered", () => {
  let coords = computer.computerMove();
  expect(computer.isSquareChosen(coords)).toBe(true);
});

test("move made by player is registered", () => {
  let coords = [2, 2];
  expect(player.isSquareChosen(coords)).toBe(false);
  player.chooseSquare(coords);
  expect(player.isSquareChosen(coords)).toBe(true);
});

test("player cannot make the same move twice", () => {
  let coords = [3, 3];
  expect(player.isSquareChosen(coords)).toBe(false);
  player.chooseSquare(coords);
  expect(player.isSquareChosen(coords)).toBe(true);
  expect(() => player.chooseSquare(coords)).toThrow(Error);
});
