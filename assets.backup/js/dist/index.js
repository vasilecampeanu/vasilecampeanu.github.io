"use strict";

// --------------------------------------------------------------------------------------------
// Global variables
// --------------------------------------------------------------------------------------------

const loadin_animation = document.getElementById("loading-animation");
const loader  = document.querySelector(".loader");
const wrapper = document.querySelector(".site-wrapper");
const body    = document.getElementById("body");

// ---------------
// Loading switch
// ---------------
window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart; 
    
    console.log('Page load time was '+ loadTime);
    
    if(loadTime < 500)
    {
        loadTime = 0;
    }

    (function () {
        wrapper.style.display = 'grid';
        body.classList.add("hide-overflow");
        
        setTimeout(() => {
            loader.style.opacity  = 0;
            loader.style.display  = 'none';
            loadin_animation.remove();
            setTimeout(() => (wrapper.style.opacity = 1), 50);
        }, loadTime);

        setTimeout(() => (body.classList.remove("hide-overflow")), loadTime + 50);
        
        // Set timeout for tartup modal
        // setTimeout(() => (
        //     $('#modal-container').removeAttr('class').addClass('one'),
        //     $('body').addClass('modal-active')
        // ), loadTime + 1000);
    }());
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// ------------
// Theme script
// ------------
const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const currentTheme = localStorage.getItem('theme') ?? userPref;

if (currentTheme)
{
    document.documentElement.setAttribute('saved-theme', currentTheme);
}

const switchTheme = (e) => {
    if (e.target.checked) 
    {
        document.documentElement.setAttribute('saved-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } 
    else 
    {
        document.documentElement.setAttribute('saved-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Darkmode toggle
    const toggleSwitch = document.querySelector('#darkmode-toggle');

    // listen for toggle
    toggleSwitch.addEventListener('change', switchTheme, false);

    if (currentTheme === 'dark') 
    {
        toggleSwitch.checked = true;
    }
});

// ---------------
// Language switch
// ---------------

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) 
    {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        
        for (var i = 0; i < dropdowns.length; i++) 
        {
            var openDropdown = dropdowns[i];
            
            if (openDropdown.classList.contains('show')) 
            {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function dropDownFunction() 
{
    document.getElementById("dropdown-language-content").classList.toggle("show");
}

// --------------------------------------------------------------------------------------------
// Mobile navbar
// --------------------------------------------------------------------------------------------

var burger = document.getElementById('burger'),
    nav    = document.getElementById('mobile-navbar');

burger.addEventListener('click', function(e) {
    this.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    body.classList.toggle('hide-overflow');
});

// --------------------------------------------------------------------------------------------
// Highlight blog link in post pages
// --------------------------------------------------------------------------------------------

const links = document.getElementsByTagName('a')
const current_url = location.href;
const post_page = "/post";

console.log("Post page: " + current_url.includes(post_page));

if (current_url.includes(post_page)) {
    const blog_url = current_url.substring(0, current_url.lastIndexOf(post_page)) + '/';

    for (const link of links) {
        if (link.href === blog_url) {
            link.classList.add('active')
        }
    }
}

// --------------------------------------------------------------------------------------------
// Table of content
// --------------------------------------------------------------------------------------------

// Initialize tcbot
tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.table-of-contet',
    
    // Where to grab the headings to build the table of contents.
    contentSelector: '.toc-content-selector',
    
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3, h4, h5, h6',
    
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: true,

    // Include the HTML markup from the heading node instead of just including the textContent.
    includeHtml: true,

    // Create unorder lists
    orderedList: false,

    // How many heading levels should not be collapsed.
    collapseDepth: 2,
});