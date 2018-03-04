// keep track of which page i'm on
var page = "intro";


// project info (for handle bar)
var projects = {
    "work": [
        {
            "id": 0,
            "name": "Settle",
            "type": "Service & UI/UX Design and Research",
            "description": "An online marketplace specifically designed for major life transitions",
            "link": "settle/settle.html",
            "btn_words": "Settle",
            "img": "img/project_img/settle.png"
        },
        {
            "id": 1,
            "name": "Design Intern at Bizy",
            "type": "UI/UX Design",
            "description": "I interned at Bizy, LLC. where I redesigned the Dashboard for the Bizy mobile app",
            "link": "bizy/bizy1.html",
            "btn_words": "Being Busy",
            "img": "img/project_img/bizy.png",
        },
        {
            "id": 2,
            "name": "Nothing",
            "type": "Branding & Graphic Design",
            "description": "A luxury brand started, designed and crafted by Chris Feng",
            "link": "nothing/nothing.html",
            "btn_words": "$4299",
            "img": "img/project_img/2.png"
        },
        {
            "id": 3,
            "name": "Bizy Onboarding",
            "type": "UI Prototyping With P5.js",
            "description": "Designing and prototyping an interactive onboarding amination",
            "link": "onboarding/onboarding.html",
            "btn_words": "Get Onboard!",
            "img": "img/project_img/onboarding.png"
        }

    ],

    "play": [
        {
            "id": 0,
            "name": "The Simplicity Book",
            "type": "Photography & Graphic Design",
            "description": "A photography book",
            "link": "book/book.html",
            "btn_words": "<blank>",
            "img": "img/project_img/book.png",
        },
        {
            "id": 1,
            "name": "Mountains",
            "type": "",
            "description": "The great mountains I've conquered",
            "link": "mountains/mountains.html",
            "btn_words": "Let's Go Climb!",
            "img": "img/project_img/mountains.png",
        },
        {
            "id": 2,
            "name": "Graphic Design Collection",
            "type": "",
            "description": "A variety of graphic design projects",
            "link": "collection/collection.html",
            "btn_words": "Feeling Artsy",
            "img": "img/project_img/collection.png",
        },
        {
            "id": 3,
            "name": "I am a Poster",
            "type": "Art & Graphic Design",
            "description": "A series of self-aware posters",
            "link": "poster/poster.html",
            "btn_words": "Burn Me!",
            "img": "img/project_img/poster.png"
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
        },
        {
            "id": 2,
            "name": "Nothing",
            "type": "Branding & Graphic Design",
            "description": "A luxury brand started, designed and crafted my Chris Feng",
            "link": "#",
            "btn_words": "$9999",
            "img": "img/project_img/2.png",
        }
    ]
}



$(document).ready(function(){
    // when document reload, it always goes to "intro"
    page = "intro";

    var target_page = JSON.parse(sessionStorage.getItem("saved_page"));
    if (target_page == null) {
        target_page = "intro";
    }

    // do not show project at first
    $(".project-container").display = "none";
    //generate project content
    generateProjects();

    // when user go back from a projct, or reload on work or play
    if (target_page != "intro") {
        $("body").css("display","none");
        $("body").css("backgroundColor","#ffffff");
        target = target_page + "_btn";
        transitionToProjects(target, "fast");
    }

    $("#intro_btn").click(function() {
        //save the current page to "intro"
        page = "intro";
        sessionStorage.setItem("saved_page", JSON.stringify(page));
        // reload
        location.reload();
    })

    $(".nav-btn").click(function(){
        //var btnID = $(this).attr("id");
        var btnID = $(this).attr('class').split(' ')[1];
        transitionToProjects(btnID, "slow");
    });

    $("#suprised").hover(function(){
        addNewOval();
    });

});

function transitionToProjects(target, speed) {
    // when speed = "fast", changes happens instantly
    fade_out_time = 500;
    fade_in_time = 1000;

    // play fading animation
    if (speed == "slow") {
        fade_out_time = 500;
        fade_in_time = 1000;
    }

    // when nothing should happen
    var future_stage = "";
    switch (target) {
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
    console.log(page);
    if (future_stage == page) return;

    // if on intro page, going to work/play, so fade out the current page
    if (page == "intro") {
        transitionDarkToLight_forP5(target, fade_out_time, fade_in_time);
        /*
        if (speed == "slow"){
            transitionDarkToLight(target, fade_out_time, fade_in_time);
        } else {
            transitionDarkToLight_forP5(target, fade_out_time, fade_in_time);
        }
        */
    }

    // pull up the current stuff if on a project page
    switch (page) {
        case "work":
            $("#work-container").fadeOut(fade_out_time, function() {
                displayNewPage(target, fade_in_time);
            });
            break;
        case "play":
            $("#play-container").fadeOut(fade_out_time, function() {
                displayNewPage(target, fade_in_time);
            });
            break;
        case "myself":
            $("#myself-container").fadeOut(fade_out_time, function() {
                displayNewPage(target, fade_in_time);
            });
            break;
    }  
    // store the current page
    page = future_stage;
    sessionStorage.setItem("saved_page", JSON.stringify(page));

}

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

function displayNewPage(target, time) {
    switch (target) {
        case "work_btn":
            $("#work-container").fadeIn(time);
            break;
        case "play_btn":
            $("#play-container").fadeIn(time);
            break;
        case "myself_btn":
            $("#myself-container").fadeIn(time);
            break;
        case "contact_btn":
            break;
    }
}

function transitionDarkToLight(target, fade_out_time, fade_in_time) {
    $(".container.intro").slideUp(fade_out_time, function() {
                    displayNewPage(target, fade_in_time);
                });
    $("body").animate({
            backgroundColor: "#ffffff",
        },fade_out_time);
    $("body").css("color","black");
    $(".intro_para").animate({ opacity: 0}, fade_out_time);
    $(".navbar").attr("class", "navbar navbar-default");
    // get rid of the canvas
    $("#defaultCanvas0").fadeOut(fade_out_time);
    //noLoop();
    $("#defaultCanvas0").remove();
}

function transitionDarkToLight_forP5(target, fade_out_time, fade_in_time) {
    $(".container.intro").slideUp(fade_out_time, function() {
                    displayNewPage(target, fade_in_time);
                });
    $("body").animate({
            backgroundColor: "#ffffff",
        },fade_out_time);
    $("body").css("color","black");
    $(".intro_para").animate({ opacity: 0}, fade_out_time);
    $(".navbar").attr("class", "navbar navbar-default");
    checkFlag();
}

function checkFlag() {
    console.log("checking flag");
    var canvas = document.getElementById("defaultCanvas0");
    var flag = (canvas == null);
    console.log(canvas);
    if(flag) {
       window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        // get rid of the canvas
        $("#defaultCanvas0").fadeOut(fade_out_time);
        //noLoop();
        $("#defaultCanvas0").remove();
        // put body back on
        $("body").css("display","block");
    }
}

function p5FadeOut(fade_out_time){
    // get rid of the canvas
    $("#defaultCanvas0").fadeOut(fade_out_time);
    //noLoop();
    $("#defaultCanvas0").remove();
    // put body back on
    $("body").css("display","block");

}


