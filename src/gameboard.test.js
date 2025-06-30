import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

const gameboard = new Gameboard();

test("gameboard is valid", () => {
  expect(gameboard).not.toBeNull();
});
test("gameboard receives attack on empty square", () => {
  expect(gameboard.receiveAttack([2, 2])).toBe(false);
});
test("gameboard throws error on attacked square", () => {
  expect(() => gameboard.addShip([2, 2], true, new Ship(3))).toThrow(Error);
});
test("gameboard receives attack on square with ship", () => {
  gameboard.addShip([2, 3], true, new Ship(3));
  expect(gameboard.receiveAttack([2, 3])).toBe(true);
  expect(gameboard.receiveAttack([2, 4])).toBe(true);
  expect(gameboard.receiveAttack([2, 5])).toBe(true);
  expect(gameboard.receiveAttack([2, 6])).toBe(false);
  expect(gameboard.receiveAttack([3, 2])).toBe(false);
});
test("gameboard throws error when attempting to add ship to attacked square", () => {
  expect(() => gameboard.addShip([2, 6], false, new Ship(2))).toThrow(Error);
});
test("gameboard throws error when attempting to add ship to occupied square", () => {
  gameboard.addShip([5, 5], false, new Ship(2));
  expect(() => gameboard.addShip([6, 5], false, new Ship(2))).toThrow(Error);
});
test("gameboard does not register ship on board if add ship fails", () => {
  expect(() => gameboard.addShip([1, 3], false, new Ship(2))).toThrow(Error);
  expect(gameboard.receiveAttack([1, 3])).toBe(false);
});
