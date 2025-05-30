// ==UserScript==
// @name         we need spelled filters on old backpack tf
// @namespace    eeek
// @version      1
// @description  it does what it does
// @author       eeek
// @match        https://backpack.tf/classifieds?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=backpack.tf
// @grant        none
// ==/UserScript==
(function() {    let windowSpells;


    const spellsList = [
    "Violent Violet Footprints",
    "Corpse Gray Footprints",
    "Headless Horseshoes",
    "Bruised Purple Footprints",
    "Gangreen Footprints",
    "Rotten Orange Footprints",
    "Team Spirit Footprints",
    "Chromatic Corruption",
    "Die Job",
    "Putrescent Pigmentation",
    "Sinister Staining",
    "Spectral Spectrum",
    "Voices from Below",
    "Exorcism",
    "Pumpkin Bombs",
    "Halloween Fire"
]
    const spellsPanelElement = document.createElement('div');
    spellsPanelElement.classList.add('panel', 'panel-filter');
    spellsPanelElement.setAttribute('id', 'spells-filtering');



    const targetElement = document.querySelector('.app-440');
    const config = {
        attributes: true,
        attributesFilter: ['class']
    }

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList){
            if (!mutation.type && !targetElement.classList.contains('modal-open')) return;
                 if (document.querySelector('#filter-panels')) {
                     document.querySelector('#filter-panels').append(spellsPanelElement);

            } else {
                let interval = setInterval(reloader, 500);
                function reloader() {
                    if (!document.querySelector('#filter-panels') || typeof window.itemFilterModal === undefined) return;
                    clearInterval(interval);
                    document.querySelector('#filter-panels').append(spellsPanelElement)
                    spellsButtonsGenerator(spellsList);
                }
            }



        }
    }
    const observer = new MutationObserver(callback);
    observer.observe(targetElement, config);

    spellsPanelElement.innerHTML =
        `<div class="panel-heading">
  <a
    class="panel-title collapsed"
    data-toggle="collapse"
    data-parent="#filter-panels"
    href="#panel-spells"
    aria-expanded="false"
    >Spells</a
  >
</div>
<div
  class="panel-collapse collapse"
  id="panel-spells"
  data-key="spells"
  aria-expanded="false"
  style="height: 0px"
>
  <div class="panel-body">
    <div class="row">
      <div>
<div>
  <span class="btn-list" data-key="spell"
    ></span
  >
</div>


      </div>
    </div>
  </div>
</div>
`
    function spellsButtonsGenerator (spellsArray) {
        console.log('generating buttons.....');
            const windowSpell = window.itemFilterModal.model.attributes;
            let currentSpells = Array.from(windowSpell.spell ? windowSpell.spell.split(', ') : '');
        const existingValues = Array.from(document.querySelector('span[data-key = "spell"]').querySelectorAll('input')).map(btn => btn.value);
        spellsArray.forEach(spell => {
            if (existingValues.includes(spell)) return;

            const spellElement = document.createElement('label');
            spellElement.classList.add('btn', 'btn-default', 'btn-multi-filter', 'btn-xs');
            currentSpells.includes(spell) ? spellElement.classList.add('active') : '';

            spellElement.innerText = spell;
            const spellInputButton = document.createElement('input');
            spellInputButton.classList.add('filter-multi');
            spellInputButton.setAttribute('type', 'checkbox');
            spellInputButton.setAttribute('value', spell);
            spellInputButton.setAttribute('data-key', 'spell');

            const placementSelector = spellsPanelElement.querySelector('.btn-list');
            spellElement.append(spellInputButton);
            placementSelector.append(spellElement);
            spellElement.addEventListener('click', function (event) {
                event.preventDefault();
                this.classList.toggle('active');
                const spellToAdd = this.querySelector('input').value.trim();


                if (this.classList.contains('active')) {
                    currentSpells.push(spellToAdd);
                } else {
                    currentSpells = currentSpells.filter(spell => spell !== spellToAdd);
                }
                Object.assign(windowSpell, {spell: currentSpells.join(', ').trim()})
            })
        })
    }

})()
