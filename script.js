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

// ===================================================
// ADMISSION & PAYMENT MODAL WORKFLOW WITH PDF RECEIPT
// ===================================================

// 1. Open Pop-up Layer Window
function openPaymentWindow() {
    const formElement = document.getElementById("admissionForm");
    if (formElement.checkValidity()) {
        document.getElementById("paymentModalOverlay").style.display = "flex";
    } else {
        alert("Please fill out all required fields before moving to payment.");
        formElement.reportValidity(); 
    }
}

// 2. Close Pop-up Layer Window
function closePaymentWindow() {
    document.getElementById("paymentModalOverlay").style.display = "none";
}

// 3. Local PDF Generation Handler (Triggers BEFORE Form Reset)
function generateDownloadablePDF() {
    const sName = document.getElementById("studentName").value;
    const sClass = document.getElementById("studentClass").value;
    const pName = document.getElementById("parentName").value;
    const mobileNum = document.getElementById("mobile").value;
    const transactionNum = document.getElementById("transactionId").value.trim();
    const currentDate = new Date().toLocaleDateString('en-IN', {
        dateStyle: 'long'
    });

    // Write input values straight into our hidden canvas spans
    document.getElementById("rcptDate").innerText = currentDate;
    document.getElementById("rcptStudentName").innerText = sName;
    document.getElementById("rcptClass").innerText = sClass;
    document.getElementById("rcptParentName").innerText = pName;
    document.getElementById("rcptMobile").innerText = mobileNum;
    document.getElementById("rcptTxId").innerText = transactionNum;

    const receiptElement = document.getElementById("receiptTemplate");

    const options = {
        margin:       0.5,
        filename:     'Radicle_Institute_Admission_Receipt_' + mobileNum + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    return html2pdf().set(options).from(receiptElement).save();
}

// 4. Final Sheet Handshake Database Submission Flow
function submitAdmissionData() {
    const txVal = document.getElementById("transactionId").value.trim();
    const submitBtn = document.getElementById("finalSubmitBtn");
    const mainForm = document.getElementById("admissionForm");

    if (txVal.length < 12 || isNaN(txVal)) {
        alert("Please supply a valid 12-digit UPI UTR validation code number.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Processing Details...";

    let submissionPayload = new FormData(mainForm);
    submissionPayload.append("transactionId", txVal);

    // PASTE YOUR GOOGLE DEPLOYMENT URL HERE BELOW:
    fetch("https://script.google.com/macros/s/AKfycby4ZJ5mmnYERHezU_QDU4TiSap1NtPEIzSAXFykcYOMd7udNjX8dU05-qd9MLYKOS4V/exec", {
        method: "POST",
        mode: "no-cors",
        body: submissionPayload
    })
    .then(() => {
        alert("Form details verified successfully! Your Admission Receipt PDF download will start now.");
        
        // Safely generate PDF first, then clear variables and refresh browser view context
        generateDownloadablePDF().then(() => {
            closePaymentWindow();
            mainForm.reset();
            document.getElementById("transactionId").value = "";
            location.reload();
        });
    })
    .catch(() => {
        alert("Something went wrong with the database connection. Please try again.");
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Payment & Submit Form";
    });
}

// Coming Soon Alert
function comingSoon() {
    alert("📚 Study notes will be available soon. Please check back later.");
}
