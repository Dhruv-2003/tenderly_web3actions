// File: actions/myCoolTsFile.ts
import {
  ActionFn,
  Context,
  Event,
  BlockEvent,
  PeriodicEvent,
  TransactionEvent,
  WebhookEvent,
} from "@tenderly/actions";

// importing ethers available in Tenderly Runtime
import { ethers } from "ethers";

export const awesomeActionFunction: ActionFn = async (
  context: Context,
  event: Event
) => {
  // cast the event parameter to an appropriate type, based on the Trigger
  // this function subscribed to.
  // Of course, only one of these casts makes sense
  const blockEvent = event as BlockEvent;
  const periodicEvent = event as PeriodicEvent;
  const transactionEvent = event as TransactionEvent;
  const webhookEvent = event as WebhookEvent;

  /// storage
  const key = "KEY";
  const storedValue = "49an03nofaj";
  await context.storage.putJson(key, storedValue);

  //

  const keyValue = await context.storage.getJson(key);

  /// Secrets
  // Added Only Via Dashboard
  const value = await context.secrets.get("API_KEY");
};
