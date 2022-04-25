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

burger.addEventListener('click', function(e){
    this.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    body.classList.toggle('hide-overflow');
});