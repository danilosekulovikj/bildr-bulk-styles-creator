export let isPrimary = true;

export function createClassTypeSwitch() {
  const switchHeader = document.createElement("div");
  const headerHeading = document.createElement("span");
  const switchWrapper = document.createElement("div");
  const switchLabel = document.createElement("span");
  const classTypeSwitch = document.createElement("div");
  const switchCircle = document.createElement("div");
  const switchText = document.createElement("div");
  switchLabel.innerText = "Primary";
  switchLabel.style = "font-size: 0.875rem; color: gray;";
  switchText.innerText = "On";
  switchCircle.classList.add("css_23181");
  classTypeSwitch.append(switchText, switchCircle);
  classTypeSwitch.classList.add("css_23172");

  classTypeSwitch.addEventListener("click", () => {
    classTypeSwitch.classList.toggle("css_23170");
    classTypeSwitch.classList.toggle("css_23172");
    switchCircle.classList.toggle("css_23181");
    switchCircle.classList.toggle("css_23171");
    if (switchText.innerText === "On") {
      switchText.innerText = "Off";
      isPrimary = false;
    } else {
      switchText.innerText = "On";
      isPrimary = true;
    }
  });

  switchWrapper.style =
    "display:flex;color:white;align-items:center;justify-content:end;gap:0.5rem;";
  switchWrapper.append(switchLabel, classTypeSwitch);

  headerHeading.innerText = "Type of classes to be created:";
  switchHeader.style =
    "display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;padding:1rem;color:white;";
  switchHeader.append(headerHeading, switchWrapper);
  return switchHeader;
}
