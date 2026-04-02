// Toggle "terug naar boven" knop op basis van scrollpositie.
const backToTopButton = document.getElementById("backToTop");
const animatedElements = document.querySelectorAll("[data-animate]");

document.body.classList.add("is-ready");

if (animatedElements.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    animatedElements.forEach((element) => revealObserver.observe(element));
  }
}

if (backToTopButton) {
  const toggleBackToTop = () => {
    if (window.scrollY > 360) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// Proces stepper - 7 stappen
const processSteps = [
  {
    title: "Stap 1: Sorteren en separatie",
    description: "Als eerste stap moeten de capacitoren op de PWB's geïdentificeerd worden, dit gebeurt niet manueel vanwege efficiëntie en ook het feit dat de capacitoren kleiner dan een centimeter kunnen zijn. Dit kan wel gedaan worden aan de hand van 2D en 3D camera's die de componenten op basis van eigenschappen identificeren. In het geval van gele capacitoren is dit de kleur, minimum rondheid, minimum pixels en de verhouding van de assen, voor zwarte capacitoren komen er nog andere, complexere eigenschappen zoals de verhouding van witte tot zwarte pixels erbij. Dit proces heeft een accuraatheid van 93.6%, en het merendeel van de fouten zijn afkomstig van schade en de zichtbaarheid die geblokkeerd wordt door andere componenten. De separatie van de capacitor en het PWB kan bijvoorbeeld gebeuren aan de hand van een laser.",
    image: "assets/capacitoren op PMB.jpg",
    caption: "Voorbeeld van component detectie en sorteerlijn"
  },
  {
    title: "Stap 2: Mechanische behandeling",
    description: "De tantalum heeft een behuizing van epoxyhars en silica-vulsel die verwijdert moet worden, dit kan gedaan worden via vermaling. In dit geval is gekozen voor een disk mill, aangezien deze het meest geschikt was. Het zorgde voor een 0.1 wt% tantalum in de fijne fractie, wat betekent dat de tantalum kern grotendeels intact bleef. Ook was de behuizing voor het grootste deel verwijderd. De kwaliteit van deze stap is cruciaal voor de verdere stappen, en heeft een grote impact op de efficiëntie.",
    image: "assets/mechanical.jpg"
  },
  {
    title: "Stap 3: Magnetische separatie",
    description: "Elektrische contacten gemaakt uit een nikkel-ijzerlegering worden hier magnetisch verwijderd. Afhankelijk van de vorige stap zal hier meer of minder tantalum verloren gaan, dit verlies gebeurt wanneer er nog stukjes van de magnetische legering aan de kern blijven. In het geval van dit onderzoek kan van 3 tot 15 wt% tantalum verloren gaan. Dit leidt tot een efficiëntie van 85% voor deze stap. ",
    image: "assets/magnetic.png"
  },
  {
    title: "Stap 4: Densiteitseparatie",
    description: "Hier wordt het tantalum nog meer gescheiden door de resterende epoxyhars te verwijderen, dit gebeurt door het te splitsen in een lichte en zware fractie. De lichte fractie bevat 90wt% epoxyhars en nikkel-ijzerlegering en 10 wt% andere metalen. Binnen de zware fractie is er slechts 28.5 wt% behuizing. Deze stap heeft een efficiëntie van 98% voor tantalum, dus er wordt hier weinig verlies gemaakt.",
    image: "assets/separating-funnel.gif"
  },
  {
    title: "Stap 5: Elektrochemische behandeling",
    description: "Dit is een 3-stappen proces waarin onzuiverheden worden verwijderd via elektrochemische reacties (reducties en oxidaties) met een elektrolyt. In de eerste stap wordt mangaandioxide gereduceerd met als doel om deze te verwijderen door in oplossing te gaan. Hierna vindt er een oxidatie plaats van koper, zilver, ijzer en zink. Hierbij ontstaat een neerslag van AgCl, vormt er een afzetting van koper op de kathode, en lossen de ijzer en zink op in de oplossing. De tantalum kern bevat nu enkel nog sporen van nikkel, epoxy en grafiet. Het nikkel kan nog verwijderd worden door een oxidatiereactie in een licht basisch elektrolyt waarbij er een nikkelhydroxide neerslag ontstaat.",
    image: "assets/elektrochemical.jpg"
  },
  {
    title: "Stap 6: Thermische behandeling",
    description: "Bij een verhoogde temperatuur van 540 °C gebeurt er een verbrandingsreactie van de epoxy en grafiet, waardoor deze reageren en verdwijnen uit de kern in de vorm van onder andere CO2. Door de reactie wordt het eindproduct, tantalumpentoxide, gevormd met een zuiverheidsgraad van net geen 99.6%",
    image: ""
  },
  {
    title: "extra stap: Distillatie van het elektrolyt",
    description: "Bij deze stap wordt het elektrolyt gedestilleerd. Hierbij is het doel om een geconcentreerd zuur te verkrijgen. Metaalzouten worden hierbij als een bijproduct gevormd, voornamelijk zink-nikkel-chloride. Het totale verlies van de elektrolyt per cyclus wordt geschat op 5%.",
    image: "assets/distillatie.webp"
  }
];

let currentStepIndex = 0;

const stepTitle = document.getElementById("stepTitle");
const stepDescription = document.getElementById("stepDescription");
const stepImage = document.getElementById("stepImage");
const stepCaption = document.getElementById("stepCaption");
const stepCounter = document.getElementById("stepCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateStep() {
  const step = processSteps[currentStepIndex];
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  const stepDisplay = document.querySelector(".step-display");
  const stepContentRow = document.querySelector(".step-content-row");

  if (step.image) {
    stepImage.src = step.image;
    stepImage.alt = step.title;
    stepImage.style.display = "block";
    stepCaption.style.display = "block";
    stepDisplay.classList.remove("no-image");

    // Stap 2 onder tekst (stacked), behoud grotere weergave. Andere stappen naast tekst.
    if (stepContentRow) {
      if (currentStepIndex === 1) {
        stepContentRow.classList.add("stacked");
      } else {
        stepContentRow.classList.remove("stacked");
      }
    }

    stepImage.classList.remove("small", "medium", "large");
    if (currentStepIndex === 1) {
      stepImage.classList.add("large");
    } else if (currentStepIndex === 3 || currentStepIndex === 6) {
      stepImage.classList.add("small");
    } else {
      stepImage.classList.add("medium");
    }
  } else {
    stepImage.style.display = "none";
    stepDisplay.classList.add("no-image");
    stepImage.classList.remove("small", "medium", "large");
    stepCaption.style.display = "none";

    if (stepContentRow) {
      stepContentRow.classList.remove("stacked");
    }
  }

  stepCounter.textContent = `Stap ${currentStepIndex + 1} van ${processSteps.length}`;
  stepCaption.textContent = step.caption || "Beschrijf hier de afbeelding voor stap";
  prevBtn.disabled = currentStepIndex === 0;
  nextBtn.disabled = currentStepIndex === processSteps.length - 1;
}

prevBtn?.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex -= 1;
    updateStep();
  }
});

nextBtn?.addEventListener("click", () => {
  if (currentStepIndex < processSteps.length - 1) {
    currentStepIndex += 1;
    updateStep();
  }
});

// Initialize
updateStep();