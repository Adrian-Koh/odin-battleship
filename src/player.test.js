import { Player } from "./player";

const player = new Player(true);
const computer = new Player(false);
test("player object is not null", () => {
  expect(player).not.toBeNull();
});
test("player places ships", () => {
  player.placeCarrier([1, 1], true); // 5, horizontal
  player.placeBattleship([3, 0], false); // 4, vertical
  player.placeCruiser([7, 7], true); // 3, horizontal
  player.placeSubmarine([5, 2], false); // 3, vertical
  player.placeDestroyer([8, 0], true); // 2, horizontal
});
