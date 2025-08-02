import { system } from "@minecraft/server";
import {BlockCircularStatesManager} from "./src/blocks/BlockCircularStatesManager";
import {BlockSeatManager} from "./src/blocks/BlockSeatManager";


system.beforeEvents.startup.subscribe((e) => {
  BlockCircularStatesManager.registerCC(e);
  BlockSeatManager.registerCC(e);
});