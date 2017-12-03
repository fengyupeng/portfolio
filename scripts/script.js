// keep track of which page i'm on
var page = "intro";


// project info
var projects = {
    "work": [
        {
            "id": 0,
            "name": "LiGo",
            "type": "UX Design",
            "description": "A mobile app for college students to post and navigate through events on campus",
            "link": "html/ligo.html",
            "btn_words": "Li's Go!",
            "img": "img/project_img/0.png",
        },
        {
            "id": 1,
            "name": "Expressive Bubble",
            "type": "Motion Graphics",
            "description": "A motion graphics art project made with the P5 library",
            "link": "#",
            "btn_words": "I'm feeling emotional",
            "img": "img/project_img/1.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        },
        {
            "id": 2,
            "name": "Nothing",
            "type": "Branding & Graphic Design",
            "description": "A luxury brand started, designed and crafted my Chris Feng",
            "link": "#",
            "btn_words": "$9999",
            "img": "img/project_img/2.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        }
    ],

    "play": [
        {
            "id": 0,
            "name": "I am a Poster",
            "type": "Art & Graphic Design",
            "description": "A series of welf-aware posters",
            "link": "html/poster.html",
            "btn_words": "Burn Me!",
            "img": "img/project_img/3.png"
        },
        {
            "id": 1,
            "name": "Paintings & Drawings",
            "type": "Arts",
            "description": "Pretty self explanatory right?",
            "link": "#",
            "btn_words": "Feeling Artsy",
            "img": "img/project_img/4.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        },
        {
            "id": 2,
            "name": "Chelsea Cookie",
            "type": "Graphic Design",
            "description": "Logo and package design for Chelsea Cookie Company, New York",
            "link": "#",
            "btn_words": "Yuuuuuuummy!",
            "img": "img/project_img/5.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        }
    ],

    "myself": [
        {
            "id": 0,
            "name": "I am a Poster",
            "type": "Art & Graphic Design",
            "description": "A series of welf-aware posters",
            "link": "html/poster.html",
            "btn_words": "Burn Me!",
            "img": "img/project_img/3.png"
        },
        {
            "id": 1,
            "name": "Expressive Bubble",
            "type": "Motion Graphics",
            "description": "A motion graphics art project made with the P5 library",
            "link": "#",
            "btn_words": "I'm feeling emotional",
            "img": "img/project_img/1.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        },
        {
            "id": 2,
            "name": "Nothing",
            "type": "Branding & Graphic Design",
            "description": "A luxury brand started, designed and crafted my Chris Feng",
            "link": "#",
            "btn_words": "$9999",
            "img": "img/project_img/2.png",
            "data-toggle": "modal",
            "data-target": "#myModal"
        }
    ]
}



$(document).ready(function(){

    // do not show project at first
    $(".project-container").display = "none";
    page = "intro";

    generateProjects();

    $("#intro_btn").click(function() {
        location.reload();
    })

    $(".nav-btn").click(function(){
        // the case when nothing should happen
        var future_stage = "";
        switch ($(this).attr("id")) {
            case "work_btn":
                future_stage = "work";
                break;
            case "play_btn":
                future_stage = "play";
                break;
            case "myself_btn":
                future_stage = "myself";
                break;
            case "contact_btn":
                break;
        }
        if (future_stage == page) return;
        // if on intro page
        if (page == "intro") {
            transitionDarkToLight($(this).attr("id"));
        }
        // pull up the current stuff if on a project page
        var btnID = $(this).attr("id");
        switch (page) {
            case "work":
                $("#work-container").fadeOut(500, function() {
                    displayNewPage(btnID);
                });
                break;
            case "play":
                $("#play-container").fadeOut(500, function() {
                    displayNewPage(btnID);
                });
                break;
            case "myself":
                $("#myself-container").fadeOut(500, function() {
                    displayNewPage(btnID);
                });
                break;
        }  
        page = future_stage;
    });

    $("#suprised").hover(function(){
        addNewOval();
    });

});

function generateProjects() {
    // work
    var source = $("#work-template").html();
    var template = Handlebars.compile(source);
    var newHTML = template(projects);
    $("#work-container").append(newHTML);
    //play
    var source = $("#play-template").html();
    var template = Handlebars.compile(source);
    var newHTML = template(projects);
    $("#play-container").append(newHTML);
    //myself
    var source = $("#myself-template").html();
    var template = Handlebars.compile(source);
    var newHTML = template(projects);
    $("#myself-container").append(newHTML);
}

function displayNewPage(newPageID) {
    console.log(newPageID)
    switch (newPageID) {
        case "work_btn":
            $("#work-container").fadeIn(1000);
            break;
        case "play_btn":
            $("#play-container").fadeIn(1000);
            break;
        case "myself_btn":
            $("#myself-container").fadeIn(1000);
            break;
        case "contact_btn":
            break;
    }
}

function transitionDarkToLight(newPageID) {
    var transitionTime = 500;
    $(".container.intro").slideUp(transitionTime, function() {
                    displayNewPage(newPageID);
                });
    $("body").animate({
            backgroundColor: "#ffffff",
        },transitionTime);
    $("body").css("color","black");
    $(".intro_para").animate({ opacity: 0}, transitionTime);
    $(".navbar").attr("class", "navbar navbar-default");
    // get rid of the canvas
    $("#defaultCanvas0").fadeOut(transitionTime);
    noLoop();
    $("#defaultCanvas0").remove();
}


