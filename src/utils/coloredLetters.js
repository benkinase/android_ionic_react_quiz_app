import $ from "jquery";

let colors = [
    "#56fbb5",
    "#fb7756",
    "#fb569f",
    "#FF9966",
    "#996666",
    "#00FF00",
    "#CC9933",
    " #03fc45",
    "#03fcdb",
    "#0390fc",
    "#fc0303",
    " #e7fc03",
    "#032cfc",
    "#8003fc",
    "#d703fc",
  ],
  idx;

export const ColoredLetter = (id) => {
  $(function () {
    let element = $(id);
    let chars = element.text().split("");
    element.html("");
    for (let i = 0; i < chars.length; i++) {
      idx = Math.floor(Math.random() * colors.length);
      let span = $("<span>" + chars[i] + "</span>").css("color", colors[idx]);
      element.append(span);
    }
  });
};

export const styleIconiQ = {
  fonty: { fontSize: "1.5rem", letterSpacing: "0.3rem", fontWeight: "bold" },
};
