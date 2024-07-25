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

const updateDotOpacity = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const bannerTop = banner.getBoundingClientRect().top + scrollTop;
  const bannerHeight = banner.offsetHeight;
  const fadeStart = bannerTop - windowHeight;
  const fadeEnd = bannerTop + bannerHeight;

  dots.forEach(dot => {
    if (scrollTop < fadeStart) {
      dot.opacity = 0;
    } else if (scrollTop > fadeEnd) {
      dot.opacity = 0;
    } else {
      dot.opacity = Math.min(1, (scrollTop - fadeStart) / (bannerHeight + windowHeight));
    }
  });

  drawDots();
};

updateDotOpacity();

function animateDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateDotOpacity(); 

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
}
banner.addEventListener('mousemove', animateDots);



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



const sets = {
  "gta5": {
    bg: "assets/gta5/bg2.jpg",
    right: "assets/gta5/right.png",
    left: "assets/gta5/left.png",
    quote: "I RUN THIS CITY !"
  },
  "cs2": {
    bg: "assets/bg2.png",
    right: "assets/right.png",
    left: "assets/left.png",
    quote: "The Bomb Has Been Planted"
  },
  "littleNightmares": {
    bg: "assets/littleNightmares/bg2.jpg",
    right: "assets/littleNightmares/right.png",
    left: "assets/littleNightmares/left.png",
    quote: "Little Nightmares, huge world."
  }
  // Add more sets as needed[
};

// Array of set names in the order you want to iterate through
const setNames = Object.keys(sets);
let currentIndex = 1;

function changeImageSet(setName) {
  const set = sets[setName];
  if (set) {
    changeImageSrc('.parallax__bg', set.bg);
    changeImageSrc('.parallax__right', set.right);
    changeImageSrc('.parallax__left', set.left);
    updateQuote(set.quote);
  } else {
    console.error('Set not found:', setName);
  }
}

function changeImageSrc(selector, newSrc) {
  const image = document.querySelector(selector);
  if (image) {
    image.classList.add('hidden'); // Start fade out
    setTimeout(() => {
      image.src = newSrc; // Change the src value
      image.onload = () => image.classList.remove('hidden'); // Fade in after loading
    }, 1000); // Match this duration with CSS transition duration
  }
}

function updateQuote(newQuote) {
  const quoteElement = document.querySelector('.hero__title > h1');
  if (quoteElement) {
    quoteElement.innerHTML = '';
    let index = 0;
    let quote = newQuote;
      if (index < quote.length) {
        quoteElement.textContent += quote[index];
        index++;
        const interval = setInterval(() => {
          quoteElement.innerHTML += newQuote[index];
          index++;
          if (index >= newQuote.length) {
            clearInterval(interval);
          }
        }, 100);
      }
    }
}

function cycleSets() {
  const setName = setNames[currentIndex];
  changeImageSet(setName);

  // Move to the next set index, wrap around if necessary
  currentIndex = (currentIndex + 1) % setNames.length;
}


setTimeout(()=>{updateQuote(sets[setNames[currentIndex-1]]["quote"])}, 2000);

// Set interval to cycle through the sets every 5 seconds

setTimeout(()=>{setInterval(cycleSets, 7000)}, 7000);

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

