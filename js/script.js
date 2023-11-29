const dataLoad = word => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
    .then(res => res.json())
    .then(data => wordLoad(data[0]))
}


const setWordDetails = (setId, setValue) => {
    document.getElementById(setId).innerText = setValue ? setValue : '';
}

const checkUndefined = element => {
    const result = element ? element : '';
    return result;
}

const wordLoad = word => {
    if(word === undefined){
        alert('Please enter right word');
        return;
    }


    setWordDetails('word', word.word);
    setWordDetails('word-phonetic', word.phonetic);
    setWordDetails('source-link', word.sourceUrls[0]);
    document.getElementById('source-link').href = word.sourceUrls[0];

    // Audio section 
    const audio = () => {
        const allAudio = word.phonetics;
        for(const audio of allAudio) {
            const audioLink = audio.audio
            if(audioLink !== ''){
                const link = new Audio(audioLink);
                link.play();
            }
        }
    }
    
    
    document.getElementById('audio-btn').addEventListener('click', function(){
        console.log('click');
        audio();
        document.getElementById('audio-btn').removeEventListener;
    })

    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerText = '';

    const wordMeanings = word.meanings;

    for (let i = 0; i < wordMeanings.length; i++) {

        const meaning = wordMeanings[i];

        const sectionDiv = document.createElement('section');
        sectionDiv.innerText = '';

        sectionDiv.classList.add('mb-10');
        sectionDiv.innerHTML = `
        <div class="flex items-center gap-1 mb-8">
            <p class="font-[Courgette] font-bold text-xl">${checkUndefined(meaning.partOfSpeech)}</p><hr class="inline-block basis-full">
        </div>
            <div class="word-details">
                <p class="mb-4 text-stone-500 text-xl">Meaning</p>
                <ul id="details-list-${i}" class="ms-12 list-disc mb-4">
                    
                </ul>
                <div class="flex flex-wrap mt-8">
                <p class="mr-4 text-stone-500 text-xl">${checkUndefined(meaning.synonyms[0]) ? 'Synonyms' : ''}</p>
                <p class="text-purple-500 mr-1 font-bold text-xl">${checkUndefined(meaning.synonyms[0])}</p>
            </div>
        </div>
        `;

        detailContainer.appendChild(sectionDiv);

        const definitions = meaning.definitions;
        const ul = document.getElementById(`details-list-${i}`);

        for(const definition of definitions){
            const li = document.createElement('li');
            li.classList.add('mb-3', 'text-lg', 'font-medium')
            li.innerText = definition.definition;
            ul.appendChild(li);
        }
    }      
}

document.getElementById('search').addEventListener('change', function(){
    dataLoad(`${this.value}`);
})

dataLoad('keyboard');