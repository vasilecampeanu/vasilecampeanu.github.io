(async function () {
    const source  = document.getElementById("search-bar");
    const results = document.getElementById("results-container");
    const searchContainer = document.getElementById("search-container");
    const searchButton = document.getElementById("search-icon");

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
        if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
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
    })

    searchButton.addEventListener('keydown', (evt) => {
        openSearch();
    })
    
    searchContainer.addEventListener('click', (evt) => {
        closeSearch();
    })

    document.getElementById("search-space").addEventListener('click', (evt) => {
        evt.stopPropagation();
    })
})();