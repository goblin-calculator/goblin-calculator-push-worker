// src/pages/shared.js
function placeSaveBar(slotId) {
  const slot = document.getElementById(slotId);
  const bar = document.getElementById("skillSaveBar");
  if (slot && bar && bar.parentElement !== slot) slot.appendChild(bar);
}
function setOpenClass(id, on) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("open", on);
}

export {
  placeSaveBar,
  setOpenClass
};
