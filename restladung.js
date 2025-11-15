import { el, container } from "./ui.js";
import { State } from "./state.js";

export function renderRestladung(){
  const s = State.currentSession();
  const slider = el("input",{type:"range",min:0,max:10,
    value: s.notes["restladung"] ?? 5,
    oninput:(e)=>{ s.notes["restladung"] = Number(e.target.value); State.save(); }
  });
  return container("Restladung", el("div",{},
    el("label",{},"Wie viel Restspannung spürst du?"),
    slider
  ));
}
