const accesskey = 'XgPK8848lbEbrSlqr8Ewxuk1crVkrs5qwm_AkT9hjVw';
const searchForm = document.querySelector(".search-form"); // Changed to match class
const searchBox = document.getElementById("search-box");
const searchResult = document.querySelector(".search-result"); // Changed to match class
const showMoreBtn = document.getElementById("show-more-btn"); // Corrected ID

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`; // Changed from collections to photos
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const results = data.results;

        // Clear previous results before adding new ones
        searchResult.innerHTML = '';

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html; 
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error('Error fetching the images:', error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    page = 1; 
    searchImage(); 
});

if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
        page++; 
        searchImage(); 
    });
}
