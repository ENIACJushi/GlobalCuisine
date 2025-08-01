import { system } from "@minecraft/server";
import {BlockCircularStatesManager} from "./src/blocks/BlockCircularStatesManager";


system.beforeEvents.startup.subscribe((e) => {
  BlockCircularStatesManager.registerCC(e);
});