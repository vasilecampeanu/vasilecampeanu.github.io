"use strict";

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "js/dist/search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(async function () {
    const BASE_URL = "{{.Site.BaseURL}}";
    
    const source  = document.getElementById("search-bar");
    const results = document.getElementById("results-container");
    const searchContainer = document.getElementById("search-container");
    const searchButton = document.getElementById("search-icon");

    const searchDataURL = '{{ $searchData.RelPermalink }}';
    const indexConfig = Object.assign({{ $searchConfig }}, {
        doc: {
            id: 'id',
            field: ['title', 'content'],
            store: ['title', 'href', 'section']
        }
    });

    function openSearch() {
        if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
            source.value = "";
            results.innerHTML = "";
            searchContainer.style.display = "block";
            source.focus();
        } else {
            searchContainer.style.display = "none";
        }
    }

    function closeSearch() {
        searchContainer.style.display = "none";
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === "/") {
            event.preventDefault();
            openSearch();
        }
        if (event.key === "Escape") {
            event.preventDefault();
            closeSearch();
        }
    })
    
    searchButton.addEventListener('click', (evt) => {
        openSearch();
    });

    searchButton.addEventListener('keydown', (evt) => {
        openSearch();
    });
    
    searchContainer.addEventListener('click', (evt) => {
        closeSearch();
    });

    document.getElementById("search-space").addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

    if (!source) 
    {
        return;
    }

    function init() {
        source.removeEventListener('focus', init);
        source.required = true;
    
        fetch(searchDataURL)
            .then(pages => pages.json())
            .then(pages => {
                window.bookSearchIndex = FlexSearch.create('balance', indexConfig);
                window.bookSearchIndex.add(pages);
            })
            .then(() => source.required = false)
            .then(search);
    }

    function element(content) {
        const div = document.createElement('div');
        div.innerHTML = content;
        return div.firstChild;
    }
    
    const redir = (id, term) => {
        window.location.href = BASE_URL + `${id}#:~:text=${encodeURIComponent(term)}`
    }

    function search() {
        while (results.firstChild) {
            results.removeChild(results.firstChild);
        }

        if (!source.value) {
            return;
        }

        const searchHits = window.bookSearchIndex.search(source.value, 10);
        let term;

        searchHits.forEach(function (page) {
            var url = page.href;
            var resultTitle = page.title;

            const li = element(
                `<button class="result-card" id="${url}">
                    <h3>${resultTitle}</h3>
                    <p>${resultTitle}</p>
                 </button>`                
            );
            
            results.appendChild(li);
        });

        const anchors = document.getElementsByClassName("result-card");
        [...anchors].forEach(anchor => {
            console.log("Hello world!");
            anchor.onclick = () => redir(anchor.id, term);
        });
    }
    
    source.addEventListener('focus', init);
    source.addEventListener('keyup', search);
})();