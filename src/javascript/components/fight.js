import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {
    firstFighter.block_status = false,
    secondFighter.block_status = false;
    firstFighter.comboAvailable = true,
    secondFighter.comboAvailable = true;
    firstFighter.currentHealth = firstFighter.health;
    secondFighter.currentHealth = secondFighter.health;
    let keyDownBtns = '';
    controlBtnsForListener = controlBtnsForListener();

    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        console.log('defaultPrevented');
        return; // Do nothing if the event was already processed
      }
      if (controlBtnsForListener.includes(event.key)) {
        if (!keyDownBtns.includes(event.key)) {
          keyDownBtns += event.key;
        }
        if (keyDownBtns.includes(controls.PlayerOneCriticalHitCombination[0].slice(3,4).toLocaleLowerCase()) 
            && keyDownBtns.includes(controls.PlayerOneCriticalHitCombination[1].slice(3,4).toLocaleLowerCase()) 
            && keyDownBtns.includes(controls.PlayerOneCriticalHitCombination[2].slice(3,4).toLocaleLowerCase()) 
            && !keyDownBtns.includes(controls.PlayerOneBlock.slice(3,4).toLocaleLowerCase())
            && firstFighter.comboAvailable === true) {
          firstFighter.hitType = 'PlayerOneCriticalHitCombination';
          let gotDemadge = getDamage(firstFighter, secondFighter);
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerOneCriticalHitCombination');
          HealthChange(secondFighter, gotDemadge);
          if (secondFighter.currentHealth <= 0) {
            resolve(firstFighter);
          }
        } else if (keyDownBtns.includes(controls.PlayerOneAttack.slice(3,4).toLocaleLowerCase()) 
            && !keyDownBtns.includes(controls.PlayerOneBlock.slice(3,4).toLocaleLowerCase())) {
          firstFighter.hitType = 'PlayerOneAttack';
          let gotDemadge = getDamage(firstFighter, secondFighter);
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerOneAttack');
          HealthChange(secondFighter, gotDemadge);
          if (secondFighter.currentHealth <= 0) {
            resolve(firstFighter);
          }
        }
        if (!keyDownBtns.includes(controls.PlayerOneBlock.slice(3,4).toLocaleLowerCase())) {
          firstFighter.block_status = true;
        }

        //second player controls
        if (keyDownBtns.includes(controls.PlayerTwoCriticalHitCombination[0].slice(3,4).toLocaleLowerCase()) 
            && keyDownBtns.includes(controls.PlayerTwoCriticalHitCombination[1].slice(3,4).toLocaleLowerCase()) 
            && keyDownBtns.includes(controls.PlayerTwoCriticalHitCombination[2].slice(3,4).toLocaleLowerCase()) 
            && !keyDownBtns.includes(controls.PlayerTwoBlock.slice(3,4).toLocaleLowerCase())
            && secondFighter.comboAvailable === true) {
          secondFighter.hitType = 'PlayerTwoCriticalHitCombination';
          let gotDemadge = getDamage(secondFighter, firstFighter);
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerTwoCriticalHitCombination');
          HealthChange(firstFighter, gotDemadge);
          if (firstFighter.currentHealth <= 0) {
            resolve(secondFighter);
          }
        } else if (keyDownBtns.includes(controls.PlayerTwoAttack.slice(3,4).toLocaleLowerCase())
                  && !keyDownBtns.includes(controls.PlayerTwoBlock.slice(3,4).toLocaleLowerCase())) {
          secondFighter.hitType = 'PlayerTwoAttack';
          let gotDemadge = getDamage(secondFighter, firstFighter);
          // console.log('second - hit'+ `first block ${firstFighter.block_status} Demadge:${gotDemadge}`);
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerTwoAttack');
          HealthChange(firstFighter, gotDemadge);
          if (firstFighter.currentHealth <= 0) {
            resolve(secondFighter);
          }
        }
        if (!keyDownBtns.includes(controls.PlayerTwoBlock.slice(3,4).toLocaleLowerCase())) {
          secondFighter.block_status = true;
        }
      }
    });
    window.addEventListener("keyup", function (event) {
      if (event.defaultPrevented) {
        console.log('defaultPrevented');
        return; // Do nothing if the event was already processed
      }
      if (controlBtnsForListener.includes(event.key) && keyDownBtns.includes(event.key)) {
        if (event.key.toLocaleLowerCase() === controls.PlayerOneBlock.slice(3,4).toLocaleLowerCase()) {
          firstFighter.block_status = false;
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerOneBlock');
        } else if (event.key.toLocaleLowerCase() === controls.PlayerTwoBlock.slice(3,4).toLocaleLowerCase()) {
          secondFighter.block_status = false;
          keyDownBtns = clearKeyDownBtns(keyDownBtns, 'PlayerTwoBlock');
        } else {
          keyDownBtns.replace(event.key.toLocaleLowerCase(), '');
        }
      }
    });
  });
}

function HealthChange (fighter, demadge) {
  if (demadge > 0) {
    fighter.currentHealth -=demadge;
    let leftHelthPersentage = Math.floor(fighter.currentHealth * 100 / fighter.health);
    leftHelthPersentage = leftHelthPersentage <= 0 ? 0 : leftHelthPersentage;
    let healthBar = document.getElementById(`${fighter.position}-fighter-indicator`);
    healthBar.style.width = `${leftHelthPersentage}%`;
  }
}

function clearKeyDownBtns (keyDownBtns, hitType) {
  let updatedKeyDownBtns = '';
  if (hitType === 'PlayerOneCriticalHitCombination' || hitType === 'PlayerTwoCriticalHitCombination') {
    for (let el of controls[hitType]) {
      updatedKeyDownBtns = keyDownBtns.replace(el.substring(3,4).toLocaleLowerCase(), '');
    }
  } else {
    updatedKeyDownBtns = keyDownBtns.replace(controls[hitType].substring(3,4).toLocaleLowerCase(), '');
  }
  return updatedKeyDownBtns;
}

//get buttons for manipulations listener
function controlBtnsForListener() {
  let controlBtnsForListener = '';
  for (let el in controls) {
    if (typeof controls[el] === 'string' || controls[el] instanceof String) {
      controlBtnsForListener += controls[el].substring(3,4).toLocaleLowerCase();
    } else if (Array.isArray(controls[el]) === true) {
      for (let subEl of controls[el]) {
        controlBtnsForListener += subEl.substring(3,4).toLocaleLowerCase();
      }
    }
  }
  return controlBtnsForListener;
}

export function getDamage(attacker, defender) {
  let hitPower = getHitPower(attacker);
  if (attacker.hitType === 'PlayerOneAttack' || attacker.hitType === 'PlayerTwoAttack') {
    let blockPower = getBlockPower(defender);
    return hitPower > blockPower ? hitPower - blockPower : 0;
  } else if (attacker.hitType === 'PlayerOneCriticalHitCombination' || attacker.hitType === 'PlayerTwoCriticalHitCombination') {
    attacker.comboAvailable = false;
    let timerId = setTimeout((attacker) => {
      attacker.comboAvailable = true;
    }, 10000, attacker);
    return attacker.attack * 2;
  }
  // return damage
}

export function getHitPower(fighter) {
  let hitPower = 0;
  let criticalHitChance = Math.random() * 2;
  hitPower = fighter.attack * criticalHitChance;
  return hitPower;
  // return hit power
}

export function getBlockPower(fighter) {
  let blockPower = 0;
  let dodgeChance = Math.random() * 2;
  blockPower = fighter.defense * dodgeChance;

  return blockPower;
  // return block power
}
