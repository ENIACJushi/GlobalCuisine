import { system, world } from "@minecraft/server";
import {BlockCircularStatesManager} from "./src/blocks/BlockCircularStatesManager";
import {BlockSeatManager} from "./src/blocks/BlockSeatManager";
import {BlockFoodManager} from "./src/blocks/BlockFoodManager";
import {SteamerManager} from "./src/blocks/steamer/SteamerManager";


system.beforeEvents.startup.subscribe((e) => {
  BlockCircularStatesManager.registerCC(e);
  BlockSeatManager.registerCC(e);
  BlockFoodManager.registerCC(e);
  SteamerManager.registerCC(e);
});

world.beforeEvents.playerBreakBlock.subscribe((e) => {
  let block = e.block;
  for (let tag of block.getTags()) {
    // 不完整食物方块被破坏时直接设为空气，避免掉落物品
    if (tag === 'amp:food_block') {
      if (block.permutation.getState("amp:eat_step") !== 0) {
        e.cancel = true;
        system.run(() => {
          block.dimension.playSound('dig.stone', block.location);
          block.dimension.setBlockType(block.location, 'air');
        });
      }
    }
  }
});

world.afterEvents.playerInteractWithBlock.subscribe((e) => {
  if (!e.player.isSneaking && e.block.typeId === 'minecraft:cauldron') {
    SteamerManager.placeByCauldron(e);
  }
});

system.afterEvents.scriptEventReceive.subscribe((event)=> {
  let item = getPlayerMainHand(event.sourceEntity);
  if (item) {
    world.sendMessage(item.typeId);
    console.log(item.typeId);
    world.sendMessage(item.getTags().join(', '));
    console.log(item.getTags().join(', '));
  }
}, {'namespaces': ['doge']});

function getPlayerMainHand(player){
  let container = player.getComponent("inventory").container;
  let slot = player.selectedSlotIndex;
  // pl.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
  return container.getItem(slot);
}