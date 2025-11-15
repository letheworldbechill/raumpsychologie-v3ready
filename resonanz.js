import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderResonanz(){
  const s = State.currentSession();
  const area = el("textarea",{placeholder:"Resonanz – was fühlst du im Raum?", rows:6,
    oninput:(e)=>{ s.notes["resonanz"] = e.target.value; State.save(); }
  });
  area.value = s.notes["resonanz"] || "";
  return container("Resonanz", el("div",{}, area));
}
