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
            "link": "#",
            "btn_words": "Li's Go!",
            "img": "img/project_img/0.png"
        },
        {
            "id": 1,
            "name": "Expressive Bubble",
            "type": "Motion Graphics",
            "description": "A motion graphics art project made with the P5 library",
            "link": "#",
            "btn_words": "I'm feeling emotional",
            "img": "img/project_img/1.png"
        },
        {
            "id": 2,
            "name": "Nothing",
            "type": "Branding & Graphic Design",
            "description": "A luxury brand started, designed and crafted my Chris Feng",
            "link": "#",
            "btn_words": "$9999",
            "img": "img/project_img/2.png"
        }
    ],

    "play": [
        {
            "id": 0,
            "name": "I am a Poster",
            "type": "Art & Graphic Design",
            "description": "A series of welf-aware posters",
            "link": "#",
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
            "img": "img/project_img/4.png"
        },
        {
            "id": 2,
            "name": "Chelsea Cookie",
            "type": "Graphic Design",
            "description": "Logo and package design for Chelsea Cookie Company, New York",
            "link": "#",
            "btn_words": "Yuuuuuuummy!",
            "img": "img/project_img/5.png"
        }
    ]
}



$(document).ready(function(){

    // do not show project at first
    $("#project-container").display = "none";
    page = "intro";

    $("#work_btn").click(function(){
        if (page == "work") return;
        page = "work";
        $(".container.intro").slideUp(1000);
        // transition
        transition_dark_to_light();
        // append the projects
        var source = $("#project-template").html();
        var template = Handlebars.compile(source);
        var newHTML = template(projects);
        $("#project-container").append(newHTML);
        $("#project-container").show(1000);
    });
});

function transition_dark_to_light() {
    $("body").animate({
            backgroundColor: "#ffffff",
        },1000);
    $("body").css("color","black");
    $(".intro_para").animate({ opacity: 0}, 1000);
    $(".navbar").attr("class", "navbar navbar-default");
    $("#defaultCanvas0").fadeOut(1000);
}

