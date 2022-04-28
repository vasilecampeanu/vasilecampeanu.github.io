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

        setTimeout(() => (body.classList.remove("hide-overflow")), loadTime);
        
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

// Implements a scroll spy system for the ToC, displaying the current section with an indicator and scrolling to it when needed.
// Inspired from https://gomakethings.com/debouncing-your-javascript-events/
function debounced(func) {
    var timeout;

    return function () {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () { return func(); });
    };
}

var headersQuery = ".post-content h1[id], .post-content h2[id], .post-content h3[id], .post-content h4[id], .post-content h5[id], .post-content h6[id]";
var tocQuery = "#TableOfContents";
var navigationQuery = "#TableOfContents li";
var activeClass = "active";

function scrollToTocElement(tocElement, scrollableNavigation) {
    var textHeight = tocElement.querySelector("a").offsetHeight;
    var scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;

    if (scrollTop < 0) {
        scrollTop = 0;
    }

    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
}

function buildIdToNavigationElementMap(navigation) {
    var sectionLinkRef = {};

    navigation.forEach(function (navigationElement) {
        var link = navigationElement.querySelector("a");
        var href = link.getAttribute("href");

        if (href.startsWith("#")) {
            sectionLinkRef[href.slice(1)] = navigationElement;
        }
    });

    return sectionLinkRef;
}

function computeOffsets(headers) {

    var sectionsOffsets = [];

    headers.forEach(function (header) { sectionsOffsets.push({ id: header.id, offset: header.offsetTop }); });
    sectionsOffsets.sort(function (a, b) { return a.offset - b.offset; });

    return sectionsOffsets;
}

function setupScrollspy() {

    var headers = document.querySelectorAll(headersQuery);

    if (!headers) {
        console.warn("No header matched query", headers);
        return;
    }

    var scrollableNavigation = document.querySelector(tocQuery);

    if (!scrollableNavigation) {
        console.warn("No toc matched query", tocQuery);
        return;
    }

    var navigation = document.querySelectorAll(navigationQuery);

    if (!navigation) {
        console.warn("No navigation matched query", navigationQuery);
        return;
    }

    var sectionsOffsets = computeOffsets(headers);

    // We need to avoid scrolling when the user is actively interacting with the ToC. Otherwise, if the user clicks on a link in the ToC,
    // we would scroll their view, which is not optimal usability-wise.
    var tocHovered = false;

    scrollableNavigation.addEventListener("mouseenter", debounced(function () { return tocHovered = true; }));
    scrollableNavigation.addEventListener("mouseleave", debounced(function () { return tocHovered = false; }));

    var activeSectionLink;
    var idToNavigationElement = buildIdToNavigationElementMap(navigation);

    function scrollHandler() {

        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        var newActiveSection;
        // Find the section that is currently active.
        // It is possible for no section to be active, so newActiveSection may be undefined.

        sectionsOffsets.forEach(function (section) {
            if (scrollPosition >= section.offset - 20) {
                newActiveSection = document.getElementById(section.id);
            }
        });
        // Find the link for the active section. Once again, there are a few edge cases:
        // - No active section = no link => undefined
        // - No active section but the link does not exist in toc (e.g. because it is outside of the applicable ToC levels) => undefined
        var newActiveSectionLink;

        if (newActiveSection) {
            newActiveSectionLink = idToNavigationElement[newActiveSection.id];
        }

        if (newActiveSection && !newActiveSectionLink) {
            // The active section does not have a link in the ToC, so we can't scroll to it.
            console.debug("No link found for section", newActiveSection);
        }

        else if (newActiveSectionLink !== activeSectionLink) {
            if (activeSectionLink) {
                activeSectionLink.classList.remove(activeClass);
            }

            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                if (!tocHovered) {
                    // Scroll so that newActiveSectionLink is in the middle of scrollableNavigation, except when it's from a manual click (hence the tocHovered check)
                    scrollToTocElement(newActiveSectionLink, scrollableNavigation);
                }
            }

            activeSectionLink = newActiveSectionLink;
        }
    }

    window.addEventListener("scroll", debounced(scrollHandler));

    // Resizing may cause the offset values to change: recompute them.
    function resizeHandler() {
        sectionsOffsets = computeOffsets(headers);
        scrollHandler();
    }

    window.addEventListener("resize", debounced(resizeHandler));
}

// Smooth ancors
var anchorLinksQuery = "a[href]";
function setupSmoothAnchors() {
    document.querySelectorAll(anchorLinksQuery).forEach(function (aElement) {
        var href = aElement.getAttribute("href");
        if (!href.startsWith("#")) {
            return;
        }
        aElement.addEventListener("click", function (clickEvent) {
            clickEvent.preventDefault();
            var targetId = aElement.getAttribute("href").substring(1);
            // The replace done on ':' is here for footnotes, as this character would otherwise interfere when used as a CSS selector.
            var target = document.querySelector("#".concat(targetId.replace(":", "\\:")));
            window.history.pushState({}, "", aElement.getAttribute("href"));
            scrollTo({ top: target.offsetTop, behavior: "smooth" });
        });
    });
}

// setupSmoothAnchors();
setupScrollspy();