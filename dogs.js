/* Each breed keeps its stable index in app.js; appearance is keyed by name. */
const DogArt = (() => {
  const ink = "#2c302b",
    white = "#fffdf5",
    tan = "#bf8756",
    black = "#424340";
  const base = {
    size: 1,
    length: 130,
    leg: 48,
    depth: 58,
    head: 30,
    muzzle: 31,
    ears: "drop",
    tail: "long",
    coat: "#d4aa72",
    patch: "none",
    fur: "smooth",
    earColor: null,
  };
  const traits = {
    Dachshund: {
      size: 0.85,
      length: 185,
      leg: 24,
      depth: 45,
      head: 26,
      muzzle: 38,
      ears: "long",
      tail: "thin",
      coat: "#b67843",
    },
    "Golden Retriever": {
      size: 1.08,
      length: 142,
      leg: 58,
      depth: 66,
      ears: "drop",
      tail: "feather",
      coat: "#d6aa59",
      fur: "feather",
    },
    Labrador: {
      size: 1.08,
      length: 143,
      leg: 57,
      depth: 67,
      head: 33,
      muzzle: 34,
      tail: "thick",
      coat: "#e2c998",
    },
    Corgi: {
      size: 0.84,
      length: 147,
      leg: 25,
      depth: 62,
      head: 31,
      ears: "big-point",
      tail: "short",
      coat: "#d59c58",
      patch: "chest",
    },
    "Shiba Inu": {
      size: 0.87,
      length: 112,
      leg: 48,
      head: 29,
      ears: "point",
      tail: "curl",
      coat: "#c8894e",
      patch: "cream",
    },
    Poodle: {
      size: 0.88,
      length: 106,
      leg: 65,
      depth: 48,
      head: 25,
      muzzle: 30,
      ears: "puff",
      tail: "pom",
      coat: "#c9ab89",
      fur: "curly",
    },
    "Bichon Frise": {
      size: 0.68,
      length: 100,
      leg: 33,
      depth: 58,
      head: 34,
      muzzle: 17,
      ears: "puff",
      tail: "plume",
      coat: white,
      fur: "curly",
    },
    Pomeranian: {
      size: 0.66,
      length: 86,
      leg: 32,
      depth: 64,
      head: 27,
      muzzle: 21,
      ears: "point",
      tail: "plume",
      coat: "#dfa963",
      fur: "fluffy",
    },
    "French Bulldog": {
      size: 0.78,
      length: 96,
      leg: 31,
      depth: 65,
      head: 37,
      muzzle: 13,
      ears: "bat",
      tail: "short",
      coat: "#c9b294",
      patch: "mask",
    },
    Bulldog: {
      size: 0.94,
      length: 116,
      leg: 30,
      depth: 75,
      head: 40,
      muzzle: 13,
      ears: "fold",
      tail: "short",
      coat: "#b7875e",
      patch: "pied",
    },
    Beagle: {
      size: 0.88,
      length: 126,
      leg: 46,
      head: 29,
      muzzle: 34,
      ears: "long",
      tail: "upright",
      coat: white,
      patch: "tricolor",
      earColor: tan,
    },
    "Siberian Husky": {
      size: 1.02,
      length: 130,
      leg: 59,
      head: 30,
      muzzle: 30,
      ears: "point",
      tail: "sickle",
      coat: "#7c868b",
      patch: "husky",
    },
    "Alaskan Malamute": {
      size: 1.12,
      length: 143,
      leg: 56,
      depth: 75,
      head: 36,
      muzzle: 29,
      ears: "point",
      tail: "plume",
      coat: "#808580",
      patch: "husky",
      fur: "fluffy",
    },
    Samoyed: {
      size: 1.02,
      length: 125,
      leg: 54,
      depth: 68,
      head: 31,
      ears: "point",
      tail: "plume",
      coat: white,
      fur: "fluffy",
    },
    "German Shepherd": {
      size: 1.08,
      length: 145,
      leg: 65,
      head: 31,
      muzzle: 40,
      ears: "big-point",
      tail: "feather",
      coat: "#c59c65",
      patch: "saddle",
    },
    "Border Collie": {
      size: 0.98,
      length: 125,
      leg: 55,
      head: 28,
      muzzle: 32,
      ears: "semi",
      tail: "feather",
      coat: black,
      patch: "blaze",
      fur: "feather",
    },
    "Australian Shepherd": {
      size: 1,
      length: 129,
      leg: 52,
      head: 30,
      muzzle: 27,
      ears: "fold",
      tail: "feather",
      coat: "#94999a",
      patch: "merle",
      fur: "feather",
    },
    "Shetland Sheepdog": {
      size: 0.86,
      length: 123,
      leg: 48,
      head: 27,
      muzzle: 39,
      ears: "semi",
      tail: "feather",
      coat: "#ae7848",
      patch: "blaze",
      fur: "fluffy",
    },
    Doberman: {
      size: 1.07,
      length: 121,
      leg: 81,
      depth: 55,
      head: 26,
      muzzle: 38,
      ears: "fold",
      tail: "thin",
      coat: black,
      patch: "tan",
    },
    Rottweiler: {
      size: 1.1,
      length: 134,
      leg: 58,
      depth: 77,
      head: 37,
      muzzle: 29,
      ears: "fold",
      tail: "long",
      coat: black,
      patch: "tan",
    },
    Boxer: {
      size: 1.02,
      length: 116,
      leg: 68,
      depth: 64,
      head: 33,
      muzzle: 17,
      ears: "fold",
      tail: "long",
      coat: "#b58153",
      patch: "mask",
    },
    "Great Dane": {
      size: 1.15,
      length: 130,
      leg: 91,
      depth: 67,
      head: 32,
      muzzle: 34,
      ears: "drop",
      tail: "thin",
      coat: "#b2b6b1",
    },
    Dalmatian: {
      size: 1.03,
      length: 137,
      leg: 66,
      depth: 56,
      head: 28,
      muzzle: 34,
      ears: "drop",
      tail: "thin",
      coat: white,
      patch: "spots",
    },
    Chihuahua: {
      size: 0.59,
      length: 91,
      leg: 45,
      depth: 43,
      head: 33,
      muzzle: 15,
      ears: "big-point",
      tail: "sickle",
      coat: "#d4b58a",
    },
    "Yorkshire Terrier": {
      size: 0.63,
      length: 107,
      leg: 27,
      depth: 53,
      head: 26,
      muzzle: 20,
      ears: "point",
      tail: "upright",
      coat: "#737c80",
      patch: "yorkie",
      fur: "silky",
    },
    Maltese: {
      size: 0.65,
      length: 109,
      leg: 26,
      depth: 53,
      head: 28,
      muzzle: 19,
      ears: "long",
      tail: "plume",
      coat: white,
      fur: "silky",
    },
    "Shih Tzu": {
      size: 0.7,
      length: 112,
      leg: 24,
      depth: 55,
      head: 35,
      muzzle: 12,
      ears: "long",
      tail: "plume",
      coat: "#b89b7b",
      patch: "pied",
      fur: "silky",
    },
    Pug: {
      size: 0.75,
      length: 100,
      leg: 34,
      depth: 61,
      head: 34,
      muzzle: 12,
      ears: "fold",
      tail: "curl",
      coat: "#d9c39b",
      patch: "mask",
    },
    "Miniature Schnauzer": {
      size: 0.77,
      length: 110,
      leg: 43,
      head: 28,
      muzzle: 26,
      ears: "fold",
      tail: "upright",
      coat: "#92958d",
      patch: "beard",
      fur: "wire",
    },
    "West Highland Terrier": {
      size: 0.73,
      length: 112,
      leg: 34,
      head: 30,
      muzzle: 22,
      ears: "point",
      tail: "upright",
      coat: white,
      fur: "wire",
    },
    "Jack Russell Terrier": {
      size: 0.77,
      length: 116,
      leg: 40,
      depth: 46,
      head: 25,
      muzzle: 30,
      ears: "fold",
      tail: "upright",
      coat: white,
      patch: "eye",
      earColor: tan,
    },
    "Scottish Terrier": {
      size: 0.76,
      length: 122,
      leg: 25,
      depth: 58,
      head: 24,
      muzzle: 38,
      ears: "point",
      tail: "upright",
      coat: "#55564e",
      patch: "beard",
      fur: "wire",
    },
    "Bull Terrier": {
      size: 0.91,
      length: 112,
      leg: 45,
      depth: 63,
      head: 34,
      muzzle: 18,
      ears: "point",
      tail: "thin",
      coat: white,
      patch: "bull",
    },
    "Boston Terrier": {
      size: 0.76,
      length: 94,
      leg: 41,
      depth: 51,
      head: 31,
      muzzle: 13,
      ears: "bat",
      tail: "short",
      coat: black,
      patch: "blaze",
    },
    "Cocker Spaniel": {
      size: 0.86,
      length: 118,
      leg: 38,
      head: 30,
      muzzle: 24,
      ears: "spaniel",
      tail: "feather",
      coat: "#bb874f",
      fur: "feather",
    },
    "Cavalier King Charles": {
      size: 0.74,
      length: 108,
      leg: 37,
      head: 30,
      muzzle: 19,
      ears: "spaniel",
      tail: "feather",
      coat: white,
      patch: "chestnut",
      earColor: "#aa673f",
    },
    "Basset Hound": {
      size: 0.95,
      length: 157,
      leg: 24,
      depth: 68,
      head: 32,
      muzzle: 38,
      ears: "basset",
      tail: "upright",
      coat: white,
      patch: "tricolor",
      earColor: "#a76d49",
    },
    Greyhound: {
      size: 1.07,
      length: 138,
      leg: 88,
      depth: 48,
      head: 23,
      muzzle: 45,
      ears: "rose",
      tail: "whip",
      coat: "#929da1",
    },
    Whippet: {
      size: 0.89,
      length: 128,
      leg: 79,
      depth: 45,
      head: 22,
      muzzle: 41,
      ears: "rose",
      tail: "whip",
      coat: "#d2b899",
      patch: "chest",
    },
    "Bernese Mountain Dog": {
      size: 1.13,
      length: 145,
      leg: 57,
      depth: 77,
      head: 35,
      muzzle: 28,
      ears: "drop",
      tail: "feather",
      coat: black,
      patch: "bernese",
      fur: "fluffy",
    },
    Newfoundland: {
      size: 1.16,
      length: 150,
      leg: 51,
      depth: 82,
      head: 38,
      muzzle: 27,
      ears: "drop",
      tail: "feather",
      coat: "#514840",
      fur: "fluffy",
    },
    Akita: {
      size: 1.1,
      length: 125,
      leg: 61,
      depth: 70,
      head: 36,
      muzzle: 26,
      ears: "point",
      tail: "curl",
      coat: "#b8956d",
      patch: "cream",
    },
  };
  function render(name, stretch = 0, custom = null, centerBody = false) {
    const t = { ...base, ...(traits[name] || {}), ...(custom || {}) };
    const len = t.length + stretch,
      leg = t.leg,
      depth = t.depth,
      rear = 100,
      front = rear + len,
      y = 224 - leg,
      top = y - depth,
      hx = front + 3,
      hy = top - 19,
      r = t.head,
      m = t.muzzle;
    const scale = t.size,
      shift = centerBody
        ? (400 + stretch) / 2 - ((rear + front) / 2) * scale
        : (400 - (rear + front + 55) * scale) / 2;
    const fill = t.coat,
      ear = t.earColor || fill;
    const path = (d, c = fill, cls = "", extra = "") =>
      `<path d="${d}" fill="${c}"${cls ? ` class="${cls}"` : ""} ${extra}/>`;
    let tail = "";
    const ty = top + 22;
    switch (t.tail) {
      case "short":
        tail = path(`M104 ${ty}q-25 -8 -23 6q11 10 23 7`);
        break;
      case "curl":
        tail =
          path(
            `M104 ${ty}C49 ${ty + 1} 55 ${ty - 52} 83 ${ty - 46}C113 ${ty - 43} 94 ${ty - 14} 78 ${ty - 23}q-10 -8 2 -13`,
            "none",
            "",
            `stroke="${fill}" stroke-width="16"`,
          ) +
          path(
            `M104 ${ty}C49 ${ty + 1} 55 ${ty - 52} 83 ${ty - 46}C113 ${ty - 43} 94 ${ty - 14} 78 ${ty - 23}q-10 -8 2 -13`,
            "none",
          );
        break;
      case "plume":
        tail = path(
          `M105 ${ty + 5}Q49 ${ty - 9} 59 ${ty - 52}l9 6 6-16 11 13 13-8q29 40 -1 56Z`,
        );
        break;
      case "feather":
        tail = path(
          `M106 ${ty}Q73 ${ty + 38} 37 ${ty + 29}l10 12 -17 3q37 21 82 -24Z`,
        );
        break;
      case "upright":
        tail = path(
          `M104 ${ty + 15}Q75 ${ty - 4} 77 ${ty - 56}Q91 ${ty - 30} 114 ${ty}`,
        );
        break;
      case "sickle":
        tail = path(
          `M106 ${ty + 10}Q48 ${ty - 13} 67 ${ty - 52}Q61 ${ty - 20} 111 ${ty - 5}`,
        );
        break;
      case "pom":
        tail =
          path(`M103 ${ty + 4}Q72 ${ty - 5} 78 ${ty - 40}`, "none") +
          `<circle cx="76" cy="${ty - 43}" r="14"/>`;
        break;
      case "whip":
        tail = path(`M104 ${ty}Q60 ${ty + 38} 51 219Q49 240 37 233`, "none");
        break;
      case "thin":
        tail = path(
          `M106 ${ty + 9}Q72 ${ty + 11} 50 ${ty - 19}Q72 ${ty - 1} 108 ${ty - 3}`,
        );
        break;
      case "thick":
        tail = path(
          `M109 ${ty + 17}Q70 ${ty + 15} 40 ${ty - 7}Q67 ${ty + 1} 111 ${ty - 4}`,
        );
        break;
      default:
        tail = path(
          `M106 ${ty + 12}Q70 ${ty + 38} 43 ${ty + 4}Q72 ${ty + 24} 110 ${ty - 2}`,
        );
    }
    const limb = (x, cls, far = false) => {
      const knee = y + Math.max(8, leg * 0.43),
        color = far ? "#a99a83" : fill;
      return `<g class="limb ${cls}" style="transform-origin:${x}px ${y - 8}px">${path(`M${x - 8} ${y - 15}L${x - 7} ${knee + 6}Q${x + 2} ${knee + 12} ${x + 12} ${knee + 5}L${x + 12} ${y - 12}`, color)}<g class="lower-leg" style="transform-origin:${x + 2}px ${knee}px">${path(`M${x - 7} ${knee}L${x - 5} 216q-7 0 -9 8h26V${knee}`, color)}${t.patch === "tan" || t.patch === "bernese" ? path(`M${x - 5} 204v12q-7 0 -9 8h26v-20`, tan, "", 'stroke="none"') : ""}</g></g>`;
    };
    const bodyPath = `M${rear} ${y}Q${rear - 22} ${top + 14} ${rear + 24} ${top}Q${front - 35} ${top - 10} ${front} ${top + 9}Q${front + 16} ${top + 35} ${front + 1} ${y}Q${front - 35} ${y + 3} ${front - 48} ${y - (leg > 75 ? 23 : 0)}Q${rear + 38} ${y + 6} ${rear} ${y}Z`;
    let bodyMark = "";
    if (
      [
        "saddle",
        "tricolor",
        "bernese",
        "merle",
        "chestnut",
        "pied",
        "eye",
        "yorkie",
      ].includes(t.patch)
    ) {
      let color =
        t.patch === "merle"
          ? "#626c70"
          : t.patch === "chestnut" || t.patch === "eye"
            ? tan
            : t.patch === "pied"
              ? white
              : black;
      bodyMark = path(
        `M${rear + 28} ${top + 1}Q${rear + 64} ${top - 7} ${front - 24} ${top + 1}L${front - 28} ${top + depth * 0.65}Q${rear + 56} ${top + depth * 0.85} ${rear + 23} ${top + depth * 0.42}Z`,
        color,
        "",
        'stroke="none"',
      );
    }
    if (
      ["chest", "cream", "husky", "blaze", "bernese", "merle"].includes(t.patch)
    )
      bodyMark += path(
        `M${front - 13} ${top + 6}l25 15 -8 ${depth - 15} -28 -4Z`,
        white,
        "",
        'stroke="none"',
      );
    if (t.patch === "spots") {
      bodyMark += Array.from(
        { length: 10 },
        (_, i) =>
          `<ellipse cx="${rear + 12 + ((i * 29) % 112)}" cy="${top + 15 + ((i * 17) % 34)}" rx="${4 + (i % 3)}" ry="${3 + (i % 4)}" fill="${ink}" stroke="none"/>`,
      ).join("");
    }
    if (t.patch === "merle") {
      bodyMark += Array.from({ length: 7 }, (_, i) =>
        path(
          `M${rear + 24 + i * 12} ${top + 10 + (i % 3) * 11}l-6 7 9 8 6-10Z`,
          i % 2 ? "#d0cbc0" : "#3e484e",
          "",
          'stroke="none"',
        ),
      ).join("");
    }
    let fur = "";
    if (t.fur === "curly")
      fur = Array.from({ length: 8 }, (_, i) =>
        path(
          `M${rear + 8 + i * 15} ${top + 5 + (i % 2) * 9}q-8 -12 2 -15q12 -6 13 8`,
          "none",
        ),
      ).join("");
    if (["fluffy", "wire", "feather", "silky"].includes(t.fur))
      fur = path(
        `M${rear + 4} ${y - 8}l-9 12 15-3 3 9 12-6 7 10 9-10 9 7 8-7 10 7 9-8 12 6 8-11 11 4 8-13`,
        fill,
      );
    if (t.fur === "silky")
      fur += path(
        `M${rear + 22} ${top + 12}v${depth - 8}m26 -${depth - 17}v${depth - 9}m26 -${depth - 19}v${depth - 12}`,
        "none",
        "",
        'opacity=".4"',
      );
    let head = path(
      `M${hx - r} ${hy + 18}Q${hx - r - 8} ${hy - r + 4} ${hx - 2} ${hy - r}Q${hx + r} ${hy - r - 6} ${hx + r} ${hy + 2}L${hx + r + m} ${hy + 9}Q${hx + r + m + 7} ${hy + 32} ${hx + r + 5} ${hy + 35}L${hx - r + 4} ${hy + 37}Z`,
      t.patch === "yorkie" ? tan : fill,
    );
    if (
      [
        "cream",
        "chest",
        "husky",
        "blaze",
        "bernese",
        "pied",
        "merle",
        "chestnut",
      ].includes(t.patch)
    )
      head += path(
        `M${hx + 6} ${hy - r + 1}q-8 28 8 38l${r + m - 11} 7q3 20 -21 22l-${r + 14} -1q-5 -21 8 -32Z`,
        white,
        "",
        'stroke="none"',
      );
    if (t.patch === "husky")
      head += path(
        `M${hx - 19} ${hy - r + 4}l21 21 12-20 14 17 -16 -4 -12 12 -9-10Z`,
        fill,
        "",
        'stroke="none"',
      );
    if (t.patch === "mask")
      head += path(
        `M${hx + 6} ${hy - 5}q33 -10 ${r + m - 3} 15q6 26 -29 25q-27 -3 -14 -40`,
        black,
        "",
        'stroke="none"',
      );
    if (t.patch === "tan" || t.patch === "bernese")
      head +=
        `<ellipse cx="${hx + 15}" cy="${hy - 6}" rx="7" ry="4" fill="${tan}" stroke="none"/>` +
        path(
          `M${hx + r - 2} ${hy + 14}l${m + 2} -3q4 20 -24 23h-12Z`,
          tan,
          "",
          'stroke="none"',
        );
    if (t.patch === "eye" || t.patch === "bull")
      head += `<ellipse cx="${hx + 12}" cy="${hy - 1}" rx="14" ry="17" fill="${t.patch === "bull" ? black : tan}" stroke="none"/>`;
    let ears = "";
    const ex = hx - r + 2,
      ey = hy - r + 4;
    switch (t.ears) {
      case "point":
      case "big-point": {
        let h = t.ears === "big-point" ? 47 : 32;
        ears =
          path(`M${ex} ${ey + 14}l-6 -${h}q18 3 29 29Z`, ear) +
          path(`M${hx + 10} ${ey + 1}l20 -${h - 10} 7 ${h + 8}`, ear);
        break;
      }
      case "bat":
        ears =
          path(`M${ex} ${ey + 14}q-20 -59 3 -57q25 3 21 53Z`, ear) +
          path(`M${hx + 11} ${ey + 4}q-1 -44 17 -45q22 1 12 54Z`, ear);
        break;
      case "semi":
        ears = path(`M${ex} ${ey + 12}l-3 -36 27 10 -9 13 -9-6 -1 20`, ear);
        break;
      case "rose":
        ears = path(`M${ex + 4} ${ey + 12}q-30 -20 -33 -6l25 23Z`, ear);
        break;
      case "fold":
        ears = path(`M${ex + 12} ${ey}q-23 -11 -27 6l14 25 15 -24`, ear);
        break;
      case "puff":
        ears = `<circle cx="${ex - 4}" cy="${hy + 8}" r="24" fill="${ear}"/>`;
        break;
      default: {
        const h =
          { long: 65, spaniel: 79, basset: 100, drop: 49 }[t.ears] || 49;
        ears = path(
          `M${ex + 14} ${ey + 6}q-31 -16 -38 15l-2 ${h - 27}q2 30 24 20q15 -12 16 -${h - 8}Z`,
          ear,
        );
        if (t.ears === "spaniel")
          ears += path(
            `M${ex - 13} ${ey + 29}l-3 43m13 -47 -3 48`,
            "none",
            "",
            'opacity=".4"',
          );
      }
    }
    if (t.fur === "curly")
      head += path(
        `M${hx - r} ${hy - 11}q-18 -17 0 -26q3 -18 20 -12q15 -14 26 0q19 0 17 19`,
        fill,
      );
    const eyeWhite = ["mask", "tan", "bernese"].includes(t.patch) ? white : ink;
    head +=
      ears +
      `<circle cx="${hx + 14}" cy="${hy + 3}" r="4" fill="${eyeWhite}" stroke="none"/>` +
      path(`M${hx + r + m - 8} ${hy + 7}q18 -4 14 7q-5 12 -14 5Z`, ink) +
      path(`M${hx + r + 2} ${hy + 26}q10 7 19 0`, "none");
    if (t.patch === "beard")
      head +=
        path(
          `M${hx + 7} ${hy + 20}l4 30 12 -5 9 7 9-11 12 -1 4-20Z`,
          "#d8d9d0",
        ) + path(`M${hx + 3} ${hy - 5}l17 -3`, "none", "", 'stroke-width="5"');
    if (t.patch === "mask")
      head += path(
        `M${hx + 7} ${hy - 14}q10 -8 18 0m-15 6q8 -4 13 1`,
        "none",
        "",
        'stroke="#a99c87"',
      );
    return `<svg class="dog-art" viewBox="0 -30 ${400 + stretch} 300" role="img" aria-label="${name.replace(/[<>"&]/g, "")} illustration" stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="${fill}"><g transform="translate(${shift} ${235 - 224 * scale}) scale(${scale})"><g class="dog-pose" style="transform-origin:${rear + len / 2}px ${y - 24}px"><g class="dog-tail" style="transform-origin:104px ${ty + 6}px">${tail}</g>${limb(rear + 27, "back-far", true)}${limb(front - 24, "front-far", true)}${path(bodyPath)}${bodyMark}${fur}${limb(rear + 10, "back-near")}${limb(front - 5, "front-near")}<g class="dog-head" style="transform-origin:${hx}px ${hy + 25}px">${head}${path(`M${hx - r + 6} ${hy + 37}q23 11 50 -1l-3 8q-24 9 -45 0Z`, "#f0c84e")}</g></g></g></svg>`;
  }
  function belly(name, custom = null) {
    const t = { ...base, ...(traits[name] || {}), ...(custom || {}) },
      c = t.coat,
      L = Math.min(t.length, 180),
      left = 200 - L / 2,
      right = 200 + L / 2;
    return `<svg class="belly-art" viewBox="0 -30 400 300" role="img" aria-label="Dog lying on its back and wiggling" fill="${c}" stroke="${ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(${200 - 200 * t.size} ${235 - 235 * t.size}) scale(${t.size})"><g class="belly-wiggle"><path d="M${left + 7} 217Q${left - 25} 236 ${left - 47} 219" fill="none" stroke-width="7"/><ellipse cx="200" cy="209" rx="${L / 2}" ry="24"/><ellipse cx="205" cy="198" rx="${L / 3}" ry="18" fill="#ecceb0" stroke="none"/><path d="M193 197h20m-10-7v14" stroke="#bb9678" stroke-width="2"/><g class="belly-paw left" style="transform-origin:${left + 22}px 201px"><path d="M${left + 17} 207l-7-30q-13-12-17-3q-2 8 9 13l2 23Z"/></g><g class="belly-paw right" style="transform-origin:${right - 20}px 201px"><path d="M${right - 24} 206l-3-33q6-13 17-7q7 8-6 15l5 28Z"/></g><g class="belly-paw far" style="transform-origin:${left + 44}px 200px"><path d="M${left + 39} 200l9-31q4-10 13-6q11 6-4 15l-4 25Z"/></g><g class="belly-paw far other" style="transform-origin:${right - 40}px 200px"><path d="M${right - 45} 202l-6-30q-10-11-17-2q-4 8 8 14l2 22Z"/></g><g class="belly-head" style="transform-origin:${right + 8}px 211px"><ellipse cx="${right + 12}" cy="209" rx="28" ry="25"/><path d="M${right - 7} 195q-18-12-24 6q-8 21 8 24q15 0 16-21Z"/><path d="M${right + 24} 208q37-3 31 12q-6 13-30 6Z"/><ellipse cx="${right + 49}" cy="214" rx="8" ry="5" fill="${ink}"/><path d="M${right + 10} 204q5-5 10 0m5 18q5 5 10 0" fill="none"/><path d="M${right - 10} 227q20 5 34-1" stroke="#edc64f" stroke-width="7"/></g></g></g></svg>`;
  }
  return { render, belly, traits };
})();
