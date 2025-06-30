import { Ship } from "./ship";

const ship = new Ship(4);

test("ship length", () => expect(ship.length).toBe(4));
test("ship not sunk", () => expect(ship.isSunk()).toBe(false));
test("ship not sunk after n-1 hits", () => {
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
test("ship sunk after n hits", () => {
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
test("ship does not receive hits after sinking", () =>
  expect(() => ship.hit()).toThrow(Error));
