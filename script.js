// ======================================
// RADICLE INSTITUTE
// SCRIPT.JS
// ======================================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior:"smooth"
            });
        }
    });
});


// Hero button animation

const buttons=document.querySelectorAll(".btn1,.btn2,.admission-btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-5px) scale(1.03)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});


// Card animation while scrolling

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0px)";

}

});

},{
threshold:0.2
});


document.querySelectorAll(".card,.course-card,.feature-card,.fee-card,.contact-box,.promise-box").forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(50px)";

el.style.transition="all .8s ease";

observer.observe(el);

});


// Counter Animation

const counters=document.querySelectorAll(".card h2");

counters.forEach(counter=>{

const update=()=>{

const target=parseInt(counter.innerText);

if(isNaN(target)) return;

let count=0;

const speed=target/80;

const interval=setInterval(()=>{

count+=speed;

if(count>=target){

counter.innerText=target+"+";

clearInterval(interval);

}else{

counter.innerText=Math.floor(count);

}

},20);

};

update();

});
const form = document.getElementById("admissionForm");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", function(e){
    e.preventDefault();

    // Disable button and change text to prevent multiple clicks
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Submitting...";

    fetch("https://script.google.com/macros/s/AKfycbxHgDBx1EAsVYmEn6aUIAd3lucR7aFmUIJAVTJrNDxkj-9viEN7X8RHHcOtED87JCcs/exec", {
        method: "POST",
        body: new FormData(form)
    })
    .then(response => response.json()) // Expect JSON response from backend
    .then(data => {
        if (data.status === "duplicate") {
            alert("This mobile number has already submitted an admission form.");
        } else if (data.status === "success") {
            alert("Admission submitted successfully!");
            form.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(() => {
        alert("Something went wrong.");
    })
    .finally(() => {
        // Re-enable the button after process completes
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    });
});
function comingSoon() {
    alert("📚 Study notes will be available soon. Please check back later.");
}
