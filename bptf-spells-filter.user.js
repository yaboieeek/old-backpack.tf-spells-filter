// ==UserScript==
// @name         we need spelled filters on old backpack tf
// @namespace    eeek
// @version      1.2.0
// @description  it does what it does
// @author       eeek
// @match        https://backpack.tf/classifieds*
// @match        https://backpack.tf/premium/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=backpack.tf
// @downloadURL   https://github.com/yaboieeek/old-backpack.tf-spells-filter/raw/refs/heads/main/bptf-spells-filter.user.js
// @updateURL    https://github.com/yaboieeek/old-backpack.tf-spells-filter/raw/refs/heads/main/bptf-spells-filter.user.js
// @grant        none
// ==/UserScript==
(function() {

    const spellsList = [
        "Exorcism",
        "Voices from Below",
        "Pumpkin Bombs",
        "Halloween Fire",
        "Team Spirit Footprints",
        "Headless Horseshoes",
        "Corpse Gray Footprints",
        "Violent Violet Footprints",
        "Bruised Purple Footprints",
        "Gangreen Footprints",
        "Rotten Orange Footprints",
        "Die Job",
        "Chromatic Corruption",
        "Putrescent Pigmentation",
        "Spectral Spectrum",
        "Sinister Staining",
    ]
    const spellColor = {
        "Exorcism": '',
        "Voices from Below": '',
        "Pumpkin Bombs": '',
        "Halloween Fire":'',
        "Team Spirit Footprints": '#546956',
        "Headless Horseshoes":'#9660EA',
        "Corpse Gray Footprints":'#7A9465',
        "Violent Violet Footprints":'#A16854',
        "Bruised Purple Footprints":'#DB6772',
        "Gangreen Footprints":'#FFF63D',
        "Rotten Orange Footprints":'#FD6B20',
        "Die Job":'#FFE300',
        "Chromatic Corruption":'#610EC5',
        "Putrescent Pigmentation":'#C4B040',
        "Spectral Spectrum":'#ABD0DD',
        "Sinister Staining":'#78C927',
    }
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
                     const killstreakerPanel = document.querySelectorAll('#filter-panels .panel')[6];
                     // document.querySelector('#filter-panels').append(spellsPanelElement);
                     document.querySelector('#filter-panels').insertBefore(spellsPanelElement, killstreakerPanel)

            } else {
                let interval = setInterval(reloader, 500);
                function reloader() {
                    if (!document.querySelector('#filter-panels') || typeof window.itemFilterModal === undefined) return;
                    clearInterval(interval);
                     const killstreakerPanel = document.querySelectorAll('#filter-panels .panel')[6];
                     // document.querySelector('#filter-panels').append(spellsPanelElement);
                     document.querySelector('#filter-panels').insertBefore(spellsPanelElement, killstreakerPanel)
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
              <div>
        <div class>
          <span class="btn-list" data-key="spell"
            ></span
          >
              </div>
            </div>
          </div>
        </div>
        `


    function spellsButtonsGenerator (spellsArray) {
        console.log('generating buttons.....');
        const windowSpell = window.itemFilterModal.model.attributes;
        let currentSpells = Array.from(windowSpell.spell ? windowSpell.spell.split(',') : '');
        const existingValues = Array.from(document.querySelector('span[data-key = "spell"]').querySelectorAll('input')).map(btn => btn.value);
        spellsArray.forEach((spell, index) => {
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

            if (index > 3) {
                const colorCircle = document
                .createElement('span');
                colorCircle.innerText = '⬤ '
                spellElement.prepend(colorCircle);
                colorCircle.style.color = spellColor[spell];
                switch (index) {
                    case 4: {
                        const colorCircle = document
                        .createElement('span');
                        colorCircle.innerText = '⬤ ';
                        colorCircle.style = 'color: #FD5845 !important';
                        spellElement.prepend(colorCircle);
                        break;
                    }
                    case 14: {
                        const colorCircle = document
                        .createElement('span');
                        colorCircle.innerText = '⬤ ';
                        colorCircle.style = 'color: #FD5845 !important';
                        spellElement.prepend(colorCircle);
                        break;
                    }
                }
            }
            if (window.location.href.match(/https:\/\/backpack\.tf\/premium\/*/)) {
                if (!placementSelector.querySelector('h4')) {
                    const premSearchAlert = document.createElement('h4');
                    premSearchAlert.innerText = 'Premium search will only work with one spell clicked';
                    premSearchAlert.style.color = '#8e44ad';
                    placementSelector.prepend(premSearchAlert);
            }

            }
            spellElement.addEventListener('click', function (event) {
                event.preventDefault();
                this.classList.toggle('active');
                const spellToAdd = this.querySelector('input').value.trim();


                if (this.classList.contains('active')) {
                    currentSpells.push(spellToAdd);
                } else {
                    currentSpells = currentSpells.filter(spell => spell !== spellToAdd);
                }
                Object.assign(windowSpell, {spell: currentSpells.join(',').trim()})
            })
        })
    }

})()
