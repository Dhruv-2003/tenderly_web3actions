import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import TicTacToe from "./TicTacToe.json";
import { ethers } from "ethers";

export type Game = {
  players: { [address: string]: number };
  board: number[][];
};

export const newGameAction: ActionFn = async (
  context: Context,
  event: Event
) => {
  let txEvent = event as TransactionEvent;

  let iface = new ethers.utils.Interface(TicTacToe.abi);

  const result = iface.decodeEventLog(
    "GameCreated",
    txEvent.logs[0].data,
    txEvent.logs[0].topics
  );

  const { gameId, playerNumber, player } = result;

  console.log("Game Created Event:", {
    gameId: gameId.toString(),
    playerNumber,
    player,
  });

  const game: Game = createNewGame();
  await context.storage.putJson(gameId.toString(), game);
};

const createNewGame = (): Game => {
  return {
    players: {},
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  };
};
