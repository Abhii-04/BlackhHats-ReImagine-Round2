// CARAOUSEL CODE STARTS HERE

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop:true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 2.5,
      slideShadows: true,
    },
    autoplay:{
      delay:3000,
      disableOnInteraction:false,
    }
  
  });

// CARAOUSEL CODE ENDS HERE



// SPIDERMAN CODE STARTS HERE  


let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = banner.offsetWidth;
canvas.height = canvas.offsetHeight;
console.log(canvas.width);
console.log(canvas.height);
const ctx = canvas.getContext('2d');
const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
for (let index = 0; index < 60; index++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 3 + 5,
    color: arrayColors[Math.floor(Math.random() * 5)]
  });
}
const drawDots = () => {
  dots.forEach(dot => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  })
}
drawDots();
banner.addEventListener('mousemove', (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();

  let mouse = {
    x: event.pageX - banner.getBoundingClientRect().left - window.scrollX,
    y: event.pageY - banner.getBoundingClientRect().top - window.scrollY
  }

  dots.forEach(dot => {
    let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
    if (distance < 300) {
      ctx.strokeStyle = dot.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  });
});
banner.addEventListener('mouseout', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
})
window.addEventListener('resize', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = banner.offsetWidth;
  canvas.height = banner.offsetHeight;

  dots = [];
  for (let index = 0; index < 50; index++) {
    dots.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      size: Math.random() * 3 + 5,
      color: arrayColors[Math.floor(Math.random() * 5)]
    });
  }
  drawDots();
})

// SPIDERMAN CODE ENDS HERE



// PRELOADER CODE STARTS HERE

var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  setTimeout(function() {
    loader.style.display = "none";
  }, 5000); // Hide the loader after 5 seconds
});

// PRELOADER CODE ENDS HERE



// FAQS DROP BUTTON JS

const buttons = document.querySelectorAll('button');

    buttons.forEach( button =>{
        button.addEventListener('click',()=>{
            const faq = button.nextElementSibling;
            const icon = button.children[1];
    
            faq.classList.toggle('show');
            icon.classList.toggle('rotate');
        })
    } )

function toggleSection(sectionId) {
   var section = document.getElementById(sectionId);
   section.classList.toggle("show")
    }

// FAQS DROP BUTTON CODE ENDS 



// PARALLAX KA LEFT CHARACTER WITH THE AK 47 IS SHOWING AT THE END OF THE PAGE AFTER FOOTER TRYING TO FIX THAT USING JS
// Function to disable scrolling

