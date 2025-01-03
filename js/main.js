let check_fb_login = localStorage.getItem('login_info');

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 500);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 50, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

function set_service_info(service) {
    console.log("set item");
    
    sessionStorage.setItem('fb_service_type', service);
}

let curr_page = window.location.pathname.replace("/", "");;
console.log(curr_page);

// List of services for the search functionality
const services_info = fix_buddy_storage_loc.fb_services_info;

function appending_elements(parent_ele_name,ele,clear_ele){
    let parent_ele = document.querySelector(parent_ele_name);
    if(clear_ele == "true"){
        parent_ele.innerHTML = "";
    }
    if(parent_ele){
        parent_ele.appendChild(ele);
    }
    else{
        console.warn('Parent ele not found!')
    }
}
creating_navbar_ele();
creating_main_service_card();
creating_sub_service_card();

function creating_navbar_ele(){
    let navbar_ele = document.createElement('nav');
    navbar_ele.setAttribute('class','navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5');

    // Create the user info icon (for logged-in users)
    let user_info_icons = document.createElement('a');
    user_info_icons.setAttribute("class", "theme_clr_1 me-2");
    user_info_icons.setAttribute("href", "");
    user_info_icons.innerHTML = "Hi, Hifzur";

    // Create the no user info icon (for logged-out users)
    let no_user_info_icons = document.createElement('a');
    no_user_info_icons.setAttribute("class", "btn btn-square rounded-circle bg-light theme_clr_1 me-2");
    no_user_info_icons.setAttribute("href", "login.html"); // Redirect to login page
    no_user_info_icons.innerHTML = "<box-icon name='user'></box-icon>";

    let user_icons_HTML = check_fb_login ? user_info_icons.outerHTML : no_user_info_icons.outerHTML;

    //creating navbar element
    navbar_ele.innerHTML =  `
                <a href="index.html" class="navbar-brand d-flex align-items-center">
                    <h1 class="m-0"><img class="img-fluid me-3" src="img/icon/icon-02-primary.png" alt=""></h1>
                </a>
                <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav mx-auto bg-light pe-4 py-3 py-lg-0">
                        <a href="index.html" data-page-value="index.html" class="nav-item nav-link">Home</a>
                        <a href="about.html" data-page-value="about.html" class="nav-item nav-link">About Us</a>
                        <a href="service.html" data-page-value="service.html" class="nav-item nav-link">Our Services</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu bg-light border-0 m-0">
                                <a href="feature.html" data-page-value="feature.html" class="dropdown-item">Features</a>
                                <a href="quote.html" data-page-value="quote.html" class="dropdown-item">Free Quote</a>
                                <a href="team.html" data-page-value="team.html" class="dropdown-item">Our Team</a>
                                <a href="testimonial.html" data-page-value="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="404.html" data-page-value="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div>
                        <a href="contact.html" data-page-value="contact.html" class="nav-item nav-link">Contact Us</a>
                    </div>
                        <div class="h-100 d-lg-inline-flex align-items-center d-none"></div>
                        <div class="search-container mx-2">
                            <input type="text" id="searchInput" class="search-input" placeholder="Search for services..." onkeyup="filterServices()" autocomplete="off">
                            <span class="search-icon"><box-icon name='search-alt-2'></box-icon></span>
                            <div id="dropdownList" class="dropdown-list"></div>
                        </div>
                        <a class="btn btn-square rounded-circle bg-light theme_clr_1 me-2" href=""><box-icon name='cart'></box-icon></a>
                        ${user_icons_HTML}
                </div>`;
        appending_elements('#navbar_section',navbar_ele ,true);

        let curr_act_page = document.querySelector('a[data-page-value="'+curr_page+'"]');
        if(curr_act_page){
            curr_act_page.classList.add('active');
        }
}

//creating services card element
function creating_main_service_card(){
    if(curr_page === "index.html"){
        services_info.forEach((ele,index)=>{
            let service_card = document.createElement('div');
            service_card.setAttribute('class','col-lg-4 col-md-6 wow fadeInUp');
            service_card.setAttribute('data-wow-delay','0.1s');
            service_card.innerHTML = `
                            <div id = fb-service-${index+1} class="service-item" >
                                <img class="img-fluid" src="img/service-${index+1}.jpg" alt="">
                                <div class="d-flex align-items-center bg-light">
                                    <div class="service-icon flex-shrink-0 theme_bgclr_1">
                                        <img class="img-fluid" src="img/icon/icon-01-light.png" alt="">
                                    </div>
                                    <a class="h4 mx-4 mb-0" onclick="set_service_info('${ele.service_name}')" data-service-name="`+ele.service_name+`" href="${ele.service_url}">${ele.srvc_heading}</'a>
                                </div>
                            </div>`;
            appending_elements('[data-services-card]',service_card);
        })
    }
}

function creating_sub_service_card(){
    const curr_service_sel = sessionStorage.getItem('fb_service_type');
    if(curr_service_sel){
        let sub_service = get_sub_service(curr_service_sel);
        console.log(sub_service);
        if(sub_service){
            sub_service.forEach((ele,ele_index)=>{
                let sub_servc_cont = document.createElement('div');
                sub_servc_cont.setAttribute('class','col');
                sub_servc_cont.innerHTML = `
                                    <div class="card service-card" style="border-radius: 10px; transition: transform 0.3s; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); height: 150px;">
                                        <img src="img/services/${fix_buddy_storage_loc.fb_services_info.find(
                                            (service) => service.service_name === curr_service_sel
                                        ).img_folder_name}/sub_services/sub_service_${ele_index+1}.jpg" class="card-img-top" alt="Gas Feeling Service" loading="lazy" style="height: 80%; object-fit: cover; width: 100%;" /> 
                                        <div class="card-body text-center" style="height: 10px; display: flex; align-items: center; justify-content: center; padding: 0;">
                                            <a href="#" class="card-title" style="font-size: 0.8rem; color: #333; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-decoration: none;">${ele.sub_srvc_heading}</a>
                                        </div>
                                    </div>`;
                appending_elements('[data-sub_service-card]',sub_servc_cont);

            })
        }else{
            console.log("sub services not defined.");
        }
    }
}

function get_sub_service(servc_typ) {
    // Find the service object that matches the provided servc_typ
    const service = fix_buddy_storage_loc.fb_services_info.find(
        (service) => service.service_name === servc_typ
    );

    // Return only the sub_services array, or null if not found
    return service ? service.sub_services : null;
}


// let hideTimeout; // To keep track of the timeout for hiding the search input
function filterServices() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const dropdownList = document.getElementById('dropdownList');

    // Clear previous search results
    dropdownList.innerHTML = '';

    // Only show dropdown if the input is not empty
    if (input) {
        // Filter services based on input
        const filteredServices = services_info.filter(service => service.service_name.toLowerCase().includes(input));
        // If services match the search query, show them
        if (filteredServices.length > 0) {
            dropdownList.style.display = 'block';
            filteredServices.forEach(service => {
                let service_index = services_info.indexOf(service)+1;
                let goto_ele;
                if(curr_page == "index.html"){
                    goto_ele = "#fb-service-"+service_index;
                }else{
                    goto_ele = "index.html#fb-service-"+service_index;
                }
                const item = document.createElement('div');
                item.classList.add('dropdown-item');
                item.innerHTML = "<a href='"+goto_ele+"' >"+service.service_name+"<a/>";
                item.onclick = (e) => selectService(e,service,item);
                dropdownList.appendChild(item);
                console.log(service_index);
                
            });
        } else {
            // If no services match, show "No results found"
            const noResults = document.createElement('div');
            noResults.classList.add('dropdown-item');
            noResults.textContent = 'No services found';
            dropdownList.appendChild(noResults);
            dropdownList.style.display = 'block';
        }
    } else {
        // Hide dropdown if the input is empty
        dropdownList.style.display = 'none';
    }
}

function scrollToSection(event) {
    // event.preventDefault()
    const targetId = event.getAttribute('href');

    // If the href contains a valid ID (e.g., #section1)
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        // If the element with the ID exists, scroll to it
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Optional: Highlight the section after scrolling
            targetElement.classList.add('highlighted');

            // Remove highlight after a delay (e.g., 2 seconds)
            setTimeout(() => {
                targetElement.classList.remove('highlighted');
            }, 2000);
        }
    }
}

// When a service is selected from the dropdown
function selectService(e,service,sel_service) {
    let curr_service = e.currentTarget.querySelector('a');    
    document.getElementById('searchInput').value = service.service_name;
    document.getElementById('dropdownList').style.display = 'none'; // Hide the dropdown
    scrollToSection(curr_service);
}

let charIndex = 0;
let serviceIndex = 0;
let currentService = '';
let isDeleting = false;
let typingSpeed = 25; // Typing speed in milliseconds
let deleting_speed = 15;

// Function to simulate typing effect
function typeService() {
    const input = document.getElementById('searchInput');

    if (isDeleting) {
        // Deleting effect: remove characters one by one
        currentService = services_info[serviceIndex].service_name.substring(0, charIndex--);
    } else {
        // Typing effect: add characters one by one
        currentService = services_info[serviceIndex].service_name.substring(0, charIndex++);
    }

    // Update the input placeholder value
    input.setAttribute('placeholder', `Search for ${currentService}`);

    // If the word is fully typed out
    if (!isDeleting && charIndex === services_info[serviceIndex].service_name.length+1) {
        isDeleting = true; // Start deleting after typing
        setTimeout(typeService, 2000); // Pause before deleting
    }
    // If the word is fully deleted
    else if (isDeleting && charIndex+1 === 0) {
        isDeleting = false; // Start typing the next word
        serviceIndex = (serviceIndex + 1) % services_info.length; // Cycle through the services_info
        setTimeout(typeService, 500); // Pause before typing the next word
    } else {
        // Continue typing or deleting at a faster pace
        setTimeout(typeService, isDeleting ? deleting_speed : typingSpeed);
    }
}

// Start the typing animation
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(typeService, 100); // Initial delay before starting
});




