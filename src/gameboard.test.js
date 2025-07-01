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
  expect(gameboard.addShip([2, 2], true, new Ship(3))).toBe(false);
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
  expect(gameboard.addShip([2, 6], false, new Ship(2))).toBe(false);
});
test("gameboard throws error when attempting to add ship to occupied square", () => {
  expect(gameboard.addShip([5, 5], false, new Ship(2))).toBe(true);
  expect(gameboard.addShip([6, 5], false, new Ship(2))).toBe(false);
});
test("gameboard does not register ship on board if add ship fails", () => {
  expect(gameboard.addShip([1, 3], false, new Ship(2))).toBe(false);
  expect(gameboard.receiveAttack([1, 3])).toBe(false);
});

test("gameboard returns game over correctly", () => {
  let board = new Gameboard();
  board.addShip([3, 3], true, new Ship(5));
  board.addShip([0, 0], false, new Ship(4));
  board.addShip([8, 4], true, new Ship(3));

  board.receiveAttack([3, 3]);
  board.receiveAttack([3, 4]);
  board.receiveAttack([3, 5]);
  board.receiveAttack([3, 6]);
  board.receiveAttack([3, 7]);
  expect(board.isGameOver()).toBe(false);

  board.receiveAttack([0, 0]);
  board.receiveAttack([1, 0]);
  board.receiveAttack([2, 0]);
  board.receiveAttack([3, 0]);
  expect(board.isGameOver()).toBe(false);

  board.receiveAttack([8, 4]);
  board.receiveAttack([8, 5]);
  board.receiveAttack([8, 6]);
  expect(board.isGameOver()).toBe(true);
});
