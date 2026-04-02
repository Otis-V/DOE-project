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
    description: "De capacitoren moeten van de PWb's worden verwijderd, vanwege het feit dat ze zeer klein zijn gebeurt dit automatisch. Hierbij wordt met 2D en 3D camera's gescand naar visuele eigenschappen zoals de kleur, vorm... Eens de componenten gevonden zijn worden ze verwijderd via bijvoorbeeld een LASER. Dit proces heeft een efficiëntie van 93.6%, de foutmarge is grotendeels afkomstig van schade of wanneer het zicht geblokkeerd wordt door andere componenten.",
    image: "assets/capacitoren op PMB.jpg",
    caption: "Herkenning van gele en zwarte condensatoren op een PMB"
  },
  {
    title: "Stap 2: Mechanische behandeling",
    description: "De tantalum heeft een behuizing van epoxyhars en silica-vulsel die verwijdert moet worden, dit kan gedaan worden via vermaling via een disk-mill. Dit zorgde voor een 0.1 wt% tantalum in de fijne of gemalen fractie, wat betekent dat de tantalum kern grotendeels intact bleef. Ook was de behuizing voor het grootste deel verwijderd. De kwaliteit van deze stap is cruciaal voor de efficiëntie van verdere stappen.",
    image: "assets/mechanical.jpg",
    caption: "kernen, behuizing en fijne fractie"
  },
  {
    title: "Stap 3: Magnetische separatie",
    description: "Elektrische contacten gemaakt uit een nikkel-ijzerlegering worden hier magnetisch verwijderd. In het geval dat er nog veel legering aan de kern blijft zal deze ook weggesorteerd worden wat voor verlies zorgt. In het geval van dit onderzoek kan van 3 tot 15 wt% tantalum verloren gaan, wat leidt tot een efficiëntie van 85% voor deze stap.",
    image: "assets/magnetic.png",
    caption: "voorbeeld magnetische separatie"
  },
  {
    title: "Stap 4: Densiteitseparatie",
    description: "Hier wordt het tantalum nog meer gezuiverd door het te splitsen in een lichte en zware fractie. De lichte fractie bevat 90wt% epoxyhars en nikkel-ijzerlegering en 10 wt% andere metalen. Binnen de zware fractie is er slechts 28.5 wt% behuizing. Deze stap heeft een efficiëntie van 98% voor tantalum, dus er wordt hier weinig verlies gemaakt.",
    image: "assets/separating-funnel.gif",
    caption: "voorbeeld densiteitseparatie"
  },
  {
    title: "Stap 5: Elektrochemische behandeling",
    description: "Dit is een 3-stappen proces waarin onzuiverheden worden verwijderd via elektrochemische reacties (reducties en oxidaties) met een elektrolyt. In de eerste stap wordt mangaandioxide gereduceerd met als doel om deze te verwijderen door in oplossing te gaan. Hierna vindt er een oxidatie plaats van koper, zilver, ijzer en zink, waarbij een neerslag van AgCl ontstaat en er een afzetting van koper op de kathode vormt, en lossen de ijzer en zink op in de oplossing.Het nikkel kan nog verwijderd worden door een oxidatiereactie in een licht basisch elektrolyt waarbij er een nikkelhydroxide neerslag ontstaat.",
    image: "assets/elektrochemical.jpg",
    caption: "2-cell opbouw met drum elektrode"
  },
  {
    title: "Stap 6: Thermische behandeling",
    description: "Nu resteren er nog alleen grafiet en Epoxy. Bij een verhoogde temperatuur van 540 °C gebeurt er een verbrandingsreactie van deze onzuiverheden, waardoor deze reageren en verdwijnen uit de kern in de vorm van onder andere CO2. Door de reactie wordt het eindproduct, tantalumpentoxide, gevormd met een zuiverheidsgraad van net geen 99.6%",
  },
  {
    title: "extra stap: Distillatie van het elektrolyt",
    description: "Bij deze stap wordt het elektrolyt gedestilleerd. Hierbij is het doel om een geconcentreerd zuur te verkrijgen. Metaalzouten worden hierbij als een bijproduct gevormd, voornamelijk zink-nikkel-chloride. Het totale verlies van de elektrolyt per cyclus wordt geschat op 5%.",
    image: "assets/distillatie.webp",
    caption: "voorbeeld destillatieopstelling"
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

    // Alle stappen: afbeelding naast tekst (rechts)
    if (stepContentRow) {
      stepContentRow.classList.remove("stacked");
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