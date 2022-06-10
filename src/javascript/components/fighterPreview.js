import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if (fighter) {
    fighter.position = position;
    const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name'});
    fighterName.textContent = fighter.name;
    const fighterHealth = createElement({ tagName: 'span', className: 'arena___fighter-name'});
    fighterHealth.textContent = `Health: ${fighter.health}`;
    const fighterAttack = createElement({ tagName: 'span', className: 'arena___fighter-name'});
    fighterAttack.textContent = `Attack: ${fighter.attack}`;
    const fighterDefense = createElement({ tagName: 'span', className: 'arena___fighter-name'});
    fighterDefense.textContent = `Defense: ${fighter.defense}`;
    const fighterImg = createFighterImage(fighter);
    if (position === 'right') {
      fighterImg.style.transform = 'scaleX(-1)';
    }
    fighterElement.append(fighterImg, fighterName, fighterHealth, fighterAttack, fighterDefense);  
  }
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
