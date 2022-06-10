import App from "../../app";
import { createElement } from "../../helpers/domHelper";
import { createFighterImage } from "../fighterPreview";
import { showModal } from "./modal";


export function showWinnerModal(fighter) {
  const title = `🦾🦾🦾Congrats, CHAMP!!!😎\nPlayer ${fighter.name} from the ${fighter.position} side is the WINNER!`;
  const fighterElement = createFighterImage(fighter);
  const bodyElement = createElement({tagName: 'div'});
  bodyElement.append(fighterElement);
  // call showModal function 
  const onClose = () => {
    console.log('Thanks for the interesting lecture and the task! Very creative way of studying!👏');
    const root = document.getElementById('root');
    while (root.firstChild) {
      root.removeChild(root.lastChild);
    }
    App.startApp();
  }
  showModal({ title, bodyElement, onClose });
}
