const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const breeds = [
  "Dachshund",
  "Golden Retriever",
  "Labrador",
  "Corgi",
  "Shiba Inu",
  "Poodle",
  "Bichon Frise",
  "Pomeranian",
  "French Bulldog",
  "Bulldog",
  "Beagle",
  "Siberian Husky",
  "Alaskan Malamute",
  "Samoyed",
  "German Shepherd",
  "Border Collie",
  "Australian Shepherd",
  "Shetland Sheepdog",
  "Doberman",
  "Rottweiler",
  "Boxer",
  "Great Dane",
  "Dalmatian",
  "Chihuahua",
  "Yorkshire Terrier",
  "Maltese",
  "Shih Tzu",
  "Pug",
  "Miniature Schnauzer",
  "West Highland Terrier",
  "Jack Russell Terrier",
  "Scottish Terrier",
  "Bull Terrier",
  "Boston Terrier",
  "Cocker Spaniel",
  "Cavalier King Charles",
  "Basset Hound",
  "Greyhound",
  "Whippet",
  "Bernese Mountain Dog",
  "Newfoundland",
  "Akita",
];
function dog(i = 0, stretch = 0, custom = null, centerBody = false) {
  return DogArt.render(
    i === -1 ? "Custom dog" : breeds[i],
    stretch,
    custom,
    centerBody,
  );
}
const labels = [
  "Hard pellets",
  "Firm & segmented",
  "Moist log",
  "Soft log",
  "Soft piles",
  "Mushy",
  "Watery",
];
const desc = [
  "Dry, separate pellets",
  "Firm & pliable · ideal reference",
  "Holds shape, moist surface",
  "Soggy, loses shape when lifted",
  "Soft, with a distinct outline",
  "Texture, but no defined shape",
  "Liquid, no solid texture",
];
function poop(n = 2) {
  let shapes = [
    '<circle cx="27" cy="30" r="9"/><circle cx="50" cy="39" r="10"/><circle cx="43" cy="18" r="7"/>',
    '<path d="M15 40Q12 30 23 28Q22 17 35 18Q41 9 49 19Q63 16 62 30Q72 40 58 45L27 48Q17 49 15 40Z"/><path d="M28 28l6 12M45 21l4 19" fill="none"/>',
    '<rect x="12" y="24" width="56" height="20" rx="10" transform="rotate(-15 40 34)"/>',
    '<path d="M12 42Q8 30 24 29Q36 33 46 22Q61 18 68 30Q73 43 55 45L23 49Z"/>',
    '<path d="M13 44Q8 33 25 31Q17 21 33 22Q45 19 40 10Q63 18 54 29Q73 33 67 44Z"/>',
    '<path d="M12 45Q4 34 22 31Q16 19 36 25Q48 15 53 29Q73 25 69 40Q77 51 54 48Q37 54 30 46Z"/>',
    '<path d="M8 40Q5 28 25 31Q38 20 49 29Q69 24 73 39Q70 51 46 47Q19 54 8 40Z"/>',
  ];
  return `<svg viewBox="0 0 80 60" fill="#b89a72" stroke="#504637" stroke-width="2.3" stroke-linejoin="round" aria-label="${labels[n - 1]}">${shapes[n - 1]}</svg>`;
}
let data;
try {
  data = JSON.parse(localStorage.getItem("littleWalk") || "null");
} catch {}
data = data || {
  profile: null,
  logs: [],
  walks: [],
  active: null,
  friends: [],
  messages: {},
  sound: "happy",
}; // Migrate the single-dog diary without losing its records.
if (!data.dogs) {
  data.dogs = data.profile
    ? [{ ...data.profile, id: crypto.randomUUID() }]
    : [];
  data.currentDogId = data.dogs[0]?.id || null;
  data.activeByDog = {};
  if (data.active && data.currentDogId)
    data.activeByDog[data.currentDogId] = data.active;
  for (const row of [...data.logs, ...data.walks])
    row.dogId = data.currentDogId;
}
if (data.sound !== "mute") data.sound = "pant";
data.account ||= {
  username: data.profile?.user || "",
  avatar: "",
  searchable: true,
};
data.activeByDog ||= {};
if (data.profile && data.currentDogId) data.profile.id = data.currentDogId;
let storageKey = "littleWalk";
function activateAccount(id, profile) {
  storageKey = "littleWalk:account:" + id;
  let stored;
  try {
    stored = JSON.parse(localStorage.getItem(storageKey));
  } catch {}
  data = stored || {
    profile: null,
    dogs: [],
    logs: [],
    walks: [],
    active: null,
    activeByDog: {},
    friends: [],
    messages: {},
    sound: "pant",
  };
  data.account = {
    ...data.account,
    username: profile.username,
    searchable: profile.searchable,
  };
  const fresh = !data.profile;
  if (fresh) data.profile = { id: crypto.randomUUID(), name: "Milo", breed: 0 };
  selected = data.profile.breed;
  page = fresh ? "breeds" : "home";
  save();
}
const save = () => {
  if (data.profile?.id) {
    const i = data.dogs.findIndex((d) => d.id === data.profile.id);
    if (i >= 0) data.dogs[i] = { ...data.profile };
    else data.dogs.push({ ...data.profile });
    data.currentDogId = data.profile.id;
    data.activeByDog[data.currentDogId] = data.active || null;
  }
  localStorage.setItem(storageKey, JSON.stringify(data));
};
let page = data.profile && !data.signedOut ? "home" : "signup",
  selected = data.profile?.breed ?? 0,
  viewDate = new Date(),
  chosen = dayKey(new Date()),
  chatWith = "",
  addingDog = false,
  friendQuery = "";
const dogLogs = () => data.logs.filter((l) => l.dogId === data.currentDogId),
  dogWalks = () => data.walks.filter((w) => w.dogId === data.currentDogId);
function switchDog(id) {
  save();
  const next = data.dogs.find((d) => d.id === id);
  if (!next) return;
  data.profile = { ...next };
  data.currentDogId = id;
  data.active = data.activeByDog[id] || null;
  selected = next.breed;
  save();
  render();
}
function dogSwitcher() {
  return `<div class="dog-switcher"><div class="dog-chips">${data.dogs.map((d) => `<button data-dog="${d.id}" class="dog-chip ${d.id === data.currentDogId ? "selected" : ""}" aria-pressed="${d.id === data.currentDogId}">${icon("paw")}<span>${esc(d.name)}</span>${data.activeByDog[d.id] ? '<i class="live-dot"></i>' : ""}</button>`).join("")}</div><button class="icon-button add-dog" id="addDog" aria-label="Add dog" title="Add dog">${icon("paw")}<span>+</span></button></div>`;
}
function wireDogSwitcher() {
  document
    .querySelectorAll("[data-dog]")
    .forEach((b) => (b.onclick = () => switchDog(b.dataset.dog)));
  if ($("#addDog"))
    $("#addDog").onclick = () => {
      addingDog = true;
      selected = 0;
      page = "breeds";
      render();
      window.scrollTo(0, 0);
    };
}
function dayKey(d) {
  return `${String(d.getFullYear()).padStart(4, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function toast(s) {
  $("#toast").textContent = s;
  $("#toast").style.opacity = 1;
  setTimeout(() => ($("#toast").style.opacity = 0), 2600);
}
const icons = {
  calendar:
    '<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v5m8-5v5M4 11h16"/>',
  home: '<path d="M3 11L12 3l9 8v10h-6v-7H9v7H3Z"/>',
};
function icon(name) {
  const paths = {
    muted: '<path d="M4 9h4l5-5v16l-5-5H4Z"/><path d="m17 9 5 6m0-6-5 6"/>',
    paw: '<ellipse cx="12" cy="16" rx="5" ry="4"/><ellipse cx="5" cy="10" rx="2" ry="3"/><ellipse cx="10" cy="5" rx="2" ry="3"/><ellipse cx="16" cy="5" rx="2" ry="3"/><ellipse cx="21" cy="10" rx="2" ry="3"/>',
    play: '<path d="M8 4l12 8-12 8Z"/>',
    stop: '<rect x="5" y="5" width="14" height="14" rx="3"/>',
    sound:
      '<path d="M4 9h4l5-5v16l-5-5H4Z"/><path d="M17 8q5 4 0 8m3-11q7 7 0 14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12l5 5L20 6"/>',
    edit: '<path d="M5 19l1-5L17 3l4 4-11 11Z"/>',
    send: '<path d="M3 3l19 9-19 9 4-9Z"/><path d="M7 12h15"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    search: '<circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || icons[name] || ""}</svg>`;
}
function infoNote(text) {
  return `<details class="info-note"><summary aria-label="Information" title="Information">${icon("info")}</summary><p class="tiny">${text}</p></details>`;
}
let previousTab = null;
function nav() {
  return `<nav class="bottomnav" aria-label="Main navigation"><span class="tab-slider" aria-hidden="true" style="--from:${previousTab ?? Math.max(0, Object.keys(icons).indexOf(page))};--to:${Math.max(0, Object.keys(icons).indexOf(page))};--visible:${Number(page in icons)}"></span>${Object.keys(
    icons,
  )
    .map(
      (k) =>
        `<button data-nav="${k}" aria-label="${{ calendar: "Diary", home: "Home" }[k]}" title="${{ calendar: "Diary", home: "Home" }[k]}" ${page === k ? 'aria-current="page"' : ""} class="${page === k ? "active" : ""}">${icon(k)}</button>`,
    )
    .join("")}</nav>`;
}
function render() {
  updateAvatar();
  if (page === "signup") signup();
  else if (page === "breeds") chooseBreed();
  else {
    $("#app").innerHTML = `<div class="app-shell" id="screen"></div>${nav()}`;
    ({ home, calendar, settings })[page]();
    document.querySelectorAll("[data-nav]").forEach(
      (b) =>
        (b.onclick = () => {
          previousTab = page in icons ? Object.keys(icons).indexOf(page) : null;
          page = b.dataset.nav;
          render();
          previousTab = null;
          window.scrollTo(0, 0);
        }),
    );
  }
}
async function passwordProof(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: Uint8Array.from(atob(salt), (c) => c.charCodeAt(0)),
      iterations: 210000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return btoa(String.fromCharCode(...new Uint8Array(bits)));
}
async function setLocalPassword(password) {
  const salt = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))),
  );
  data.account.passwordSalt = salt;
  data.account.passwordHash = await passwordProof(password, salt);
}
function signup() {
  $("#app").innerHTML =
    `<div class="signup-shell"><div class="hero-art"><span class="star one">✧</span><div id="longdog">${dog(0, 0, null, true)}</div><span class="star two">✦</span></div><label class="sound-toggle"><span class="sound-state-icon">${icon(data.sound === "mute" ? "muted" : "sound")}</span><span class="sound-state-text">${data.sound === "mute" ? "Sound off" : "Sound on"}</span><input id="signupMute" aria-label="Sound" class="switch" type="checkbox" ${data.sound !== "mute" ? "checked" : ""}></label><form class="signup" id="signup"><h1>${data.signedOut ? (data.account.passwordHash ? "Sign in" : "Set password") : "Sign up"}</h1><label class="field">Username<input id="username" required maxlength="30" autocomplete="username"></label><label class="field">Password<input id="password" type="password" placeholder="8+ characters" minlength="8" maxlength="64" required autocomplete="new-password"></label><button class="primary">${data.signedOut ? (data.account.passwordHash ? "Sign in" : "Set password") : "Sign up"} ${icon("paw")}</button><span class="prototype-label">Local demo</span>${infoNote("Local account only. Your password is verified on this browser using a salted hash. No email recovery. Keep this browser’s data to retain your account.")}</form></div>`;
  $("#signupMute").onchange = (e) => {
    data.sound = e.target.checked ? "pant" : "mute";
    document
      .querySelectorAll(".sound-state-text")
      .forEach(
        (n) => (n.textContent = e.target.checked ? "Sound on" : "Sound off"),
      );
    document
      .querySelectorAll(".sound-state-icon")
      .forEach(
        (n) => (n.innerHTML = icon(e.target.checked ? "sound" : "muted")),
      );
    save();
  };
  let previousLength = 0,
    paw = new Audio("audio/paws-run.wav"),
    pawTimer;
  paw.volume = 0.55;
  $("#password").oninput = (e) => {
    const length = e.target.value.length;
    if (length > previousLength && !e.isComposing && data.sound !== "mute") {
      clearTimeout(pawTimer);
      paw.currentTime = 0.05;
      paw
        .play()
        .then(() => {
          pawTimer = setTimeout(() => paw.pause(), 350);
        })
        .catch(() => toast("Tap the page to enable sound"));
    }
    previousLength = length;
    $("#longdog").innerHTML = dog(
      0,
      Math.min(220, e.target.value.length * 8),
      null,
      true,
    );
  };
  $("#signup").onsubmit = async (e) => {
    e.preventDefault();
    const username = $("#username").value.trim(),
      password = $("#password").value,
      button = $("#signup button.primary");
    if (!username) return;
    button.disabled = true;
    try {
      if (data.signedOut) {
        if (username !== data.account.username) {
          toast("Incorrect username or password");
          return;
        }
        if (data.account.passwordHash) {
          if (
            (await passwordProof(password, data.account.passwordSalt)) !==
            data.account.passwordHash
          ) {
            toast("Incorrect username or password");
            return;
          }
        } else {
          await setLocalPassword(password);
        }
        data.signedOut = false;
        save();
        page = "home";
        render();
        return;
      }
      await setLocalPassword(password);
      data.account.username = username;
      data.profile = {
        id: crypto.randomUUID(),
        user: username,
        name: "Milo",
        breed: 0,
      };
      save();
      page = "breeds";
      render();
    } catch {
      toast("Could not save login. Please try again.");
    } finally {
      if (button.isConnected) button.disabled = false;
    }
  };
}

let customDraft = null,
  dogNameDraft = "";
function chooseBreed() {
  const editing = addingDog ? { name: "", breed: 0 } : data.profile;
  customDraft = {
    size: 0.9,
    length: 125,
    leg: 45,
    depth: 58,
    head: 30,
    muzzle: 28,
    ears: "drop",
    tail: "long",
    coat: "#c49b6b",
    patch: "none",
    fur: "smooth",
    ...(editing.custom || {}),
  };
  dogNameDraft = editing.name || "";
  $("#app").innerHTML =
    `<div class="app-shell"><div class="topline"><h1 class="page-title">${addingDog ? "Add dog" : "Your dog"}</h1><button id="cancelDog" class="icon-button" aria-label="Cancel">×</button><span class="sort-label">A–Z</span></div><div class="toolbar"><label class="field">Name<input id="dogname" maxlength="24" value="${esc(dogNameDraft)}"></label><label class="field">Breed<input id="breedSearch" placeholder="Search breeds"></label><button class="primary" id="choose">Continue →</button></div><div class="custom-choice"><button id="otherDog" class="secondary ${selected === -1 ? "selected" : ""}">${icon("plus")} Other / Mixed breed</button></div><div id="customPanel"></div><div class="breedgrid" id="breedgrid"></div></div>`;
  const grid = () => {
    $("#breedgrid").innerHTML =
      breeds
        .map((b, i) => ({ b, i }))
        .sort((a, b) => a.b.localeCompare(b.b, "en"))
        .filter(({ b }) =>
          b.toLowerCase().includes($("#breedSearch").value.toLowerCase()),
        )
        .map(
          ({ b, i }) =>
            `<button class="breed ${i === selected ? "selected" : ""}" data-breed="${i}" aria-pressed="${i === selected}">${dog(i)}<strong>${b}</strong>${i === selected ? icon("check") : ""}</button>`,
        )
        .join("") || "<p>No matches</p>";
    document.querySelectorAll("[data-breed]").forEach(
      (b) =>
        (b.onclick = () => {
          selected = Number(b.dataset.breed);
          $("#customPanel").innerHTML = "";
          $("#otherDog").classList.remove("selected");
          grid();
        }),
    );
  };
  function showCustom() {
    $("#customPanel").innerHTML =
      `<section class="custom-editor"><div class="custom-preview"><div id="customDrawing">${dog(-1, 0, customDraft)}</div></div><label class="field">Breed<input id="customBreed" placeholder="Mixed breed or breed name" maxlength="60" value="${esc(editing.customBreed || "")}"></label><div class="trait-controls"><label class="field">Size<select id="customSize"><option value="0.65">Small</option><option value="0.9">Medium</option><option value="1.1">Large</option></select></label><label class="field">Build<select id="customBuild"><option value="regular">Balanced</option><option value="long">Long & low</option><option value="slender">Tall & slender</option><option value="stocky">Stocky</option></select></label><label class="field">Ears<select id="customEars"><option value="drop">Floppy</option><option value="point">Pointed</option><option value="bat">Rounded upright</option><option value="long">Long</option></select></label><label class="field">Tail<select id="customTail"><option value="long">Long</option><option value="short">Short</option><option value="curl">Curled</option><option value="plume">Fluffy</option></select></label><label class="field">Coat<input id="customColor" type="color" value="${customDraft.coat}"></label><label class="field">Markings<select id="customPatch"><option value="none">Solid</option><option value="chest">White chest</option><option value="spots">Spotted</option><option value="saddle">Dark saddle</option><option value="pied">Patches</option><option value="tan">Tan points</option></select></label></div></section>`;
    $("#customSize").value = String(customDraft.size);
    if (!$("#customSize").value) $("#customSize").value = "0.9";
    $("#customBuild").value = customDraft.build || "regular";
    $("#customEars").value = customDraft.ears;
    $("#customTail").value = customDraft.tail;
    $("#customPatch").value = customDraft.patch;
    const preview = () => {
      $("#customDrawing").innerHTML = dog(-1, 0, customDraft);
    };
    for (const [id, key] of [
      ["customSize", "size"],
      ["customEars", "ears"],
      ["customTail", "tail"],
      ["customColor", "coat"],
      ["customPatch", "patch"],
    ])
      $("#" + id).oninput = (e) => {
        customDraft[key] =
          key === "size" ? Number(e.target.value) : e.target.value;
        preview();
      };
    $("#customBuild").onchange = (e) => {
      Object.assign(
        customDraft,
        {
          regular: { length: 125, leg: 45, depth: 58 },
          long: { length: 182, leg: 23, depth: 45 },
          slender: { length: 135, leg: 80, depth: 46 },
          stocky: { length: 114, leg: 32, depth: 74 },
        }[e.target.value],
        { build: e.target.value },
      );
      preview();
    };
  }
  $("#cancelDog").onclick = () => {
    addingDog = false;
    selected = data.profile.breed;
    page = "home";
    render();
  };
  grid();
  if (selected === -1) showCustom();
  $("#otherDog").onclick = () => {
    selected = -1;
    $("#otherDog").classList.add("selected");
    grid();
    showCustom();
  };
  $("#breedSearch").oninput = grid;
  $("#choose").onclick = () => {
    const previous = { ...data.profile },
      previousActive = data.active;
    data.profile = {
      ...editing,
      id: addingDog ? crypto.randomUUID() : data.profile.id,
      user: data.account.username,
      breed: selected,
      name: $("#dogname").value.trim() || "Milo",
      ...(selected === -1
        ? {
            custom: { ...customDraft },
            customBreed: $("#customBreed").value.trim() || "Mixed breed",
          }
        : {}),
    };
    if (addingDog) data.active = null;
    try {
      save();
    } catch {
      data.profile = previous;
      data.active = previousActive;
      toast("Storage full. Remove the photo and try again.");
      return;
    }
    addingDog = false;
    page = "home";
    render();
    window.scrollTo(0, 0);
  };
}
function todayLogs() {
  return dogLogs().filter((l) => dayKey(new Date(l.at)) === dayKey(new Date()));
}
function dogNameForLog(log) {
  return data.dogs.find((d) => d.id === log.dogId)?.name || "Unknown dog";
}
function labeledPoop(log) {
  return `<div class="named-poop">${poop(log.shape)}<span>${esc(dogNameForLog(log))}</span></div>`;
}
function rows(logs) {
  return logs.length
    ? logs
        .map(
          (l) =>
            `<div class="logrow">${poop(l.shape)}<div><strong class="log-dog-name">${esc(dogNameForLog(l))}</strong>${labels[l.shape - 1]}<br><small>${new Date(l.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${l.note ? " · " + esc(l.note) : ""}</small></div><button data-delete="${l.id}" aria-label="Delete entry">×</button></div>`,
        )
        .join("")
    : '<div class="empty">No entries</div>';
}
function wireDelete() {
  document.querySelectorAll("[data-delete]").forEach(
    (b) =>
      (b.onclick = () => {
        data.logs = data.logs.filter((l) => l.id !== b.dataset.delete);
        save();
        render();
        toast("Entry removed");
      }),
  );
}
// Start or finish the current walk when the button is clicked.
function toggleWalk() {
  if (data.groupWalk) {
    const w = data.groupWalk,
      end = Date.now(),
      seconds = Math.floor((end - w.start) / 1000);
    for (const id of w.ids) {
      data.walks.push({ dogId: id, start: w.start, end });
      data.activeByDog[id] = null;
    }
    data.groupWalk = null;
    data.active = null;
    stopSound();
    save();
    render();
    openModal(
      `<h2>Walk complete</h2><p>${Math.floor(seconds / 60)} min ${seconds % 60} sec</p>${w.ids
        .map((id) => {
          const d = data.dogs.find((d) => d.id === id),
            logs = data.logs.filter(
              (l) => l.dogId === id && l.walk === w.start,
            );
          return `<h3>${esc(d.name)}</h3><div class="poops">${logs.map((l) => labeledPoop(l)).join("")}</div>`;
        })
        .join("")}`,
    );
    return;
  }
  const ids = (data.walkSelection || []).filter((id) =>
    data.dogs.some((d) => d.id === id),
  );
  if (!ids.length) {
    toast("Select a dog first");
    return;
  }
  data.groupWalk = { ids, start: Date.now() };
  data.active = data.groupWalk.start;
  for (const id of ids) data.activeByDog[id] = data.active;
  save();
  playSound();
  render();
  toast("Walk started");
}
function walkDogs() {
  return data.dogs.filter((d) =>
    (data.groupWalk?.ids || data.walkSelection || []).includes(d.id),
  );
}
function groupPicker() {
  return `<fieldset class="walk-picker"><legend>Who’s walking?</legend>${data.dogs.map((d) => `<label><input type="checkbox" data-participant="${d.id}" ${(data.groupWalk?.ids || data.walkSelection || []).includes(d.id) ? "checked" : ""} ${data.groupWalk ? "disabled" : ""}>${esc(d.name)}</label>`).join("")}</fieldset>`;
}
function home() {
  const p = data.profile;
  data.walkSelection ??= [data.currentDogId];
  data.active = data.groupWalk?.start || null;
  const logs = data.logs.filter(
    (l) =>
      walkDogs().some((d) => d.id === l.dogId) &&
      dayKey(new Date(l.at)) === dayKey(new Date()),
  );
  $("#screen").innerHTML =
    `<section class="home-focus"><div class="topline"><div><h1>${walkDogs().length === 1 ? esc(walkDogs()[0].name) : walkDogs().length > 1 ? "Walking together" : "Your walk"}</h1>${
      walkDogs().length > 1
        ? `<p class="walk-names">${walkDogs()
            .map((d) => esc(d.name))
            .join(" · ")}</p>`
        : ""
    }</div><div class="walk-dog-actions"><button class="icon-button" id="editDog" aria-label="Manage dogs" title="Manage dogs">${icon("edit")}</button><button class="icon-button add-dog" id="addDog" aria-label="Add dog" title="Add dog">${icon("paw")}<span>+</span></button></div></div>${groupPicker()}<div class="playground" data-motion="${data.active ? "run" : "idle"}"><span class="star one">✧</span><span class="star two">✦</span><div class="ground-shadow"></div><div class="dog-wrap">${walkDogs()
      .map(
        (d) =>
          `<div class="walking-dog">${dog(d.breed, 0, d.breed === -1 ? d.custom : null)}<span>${esc(d.name)}</span></div>`,
      )
      .join(
        "",
      )}</div><div class="ground-line"></div><div class="run-track" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="walk-controls">${data.active ? '<div class="walking-status"><i></i>Walking</div>' : ""}<div class="timer" id="timer" aria-label="Walk time">00:00</div><label class="sound-toggle" for="soundOff"><span class="sound-state-icon">${icon(data.sound === "mute" ? "muted" : "sound")}</span><span class="sound-state-text">${data.sound === "mute" ? "Sound off" : "Sound on"}</span><input id="soundOff" aria-label="Sound" class="switch" type="checkbox" ${data.sound !== "mute" ? "checked" : ""}></label><div class="walk-actions"><button class="primary" id="walk">${icon(data.active ? "stop" : "play")}${data.active ? "Finish walk" : "Start walk"}</button><button class="poop-add" id="log" aria-label="Log a poop" title="Log a poop" ${data.active ? "" : "disabled"}>${poop(5)}${icon("plus")}</button></div></div><div class="sectionline"><h3>Today</h3><div class="count" title="Completed walks today" aria-label="${new Set(data.walks.filter((w) => walkDogs().some((d) => d.id === w.dogId) && dayKey(new Date(w.start)) === dayKey(new Date())).map((w) => w.start)).size} completed walks today">${icon("paw")}${new Set(data.walks.filter((w) => walkDogs().some((d) => d.id === w.dogId) && dayKey(new Date(w.start)) === dayKey(new Date())).map((w) => w.start)).size}</div></div><div class="poops" aria-label="${logs.length} poops today">${logs.map((l) => labeledPoop(l)).join("")}</div>${rows(logs)}</section>`;
  $("#soundOff").onchange = (e) => {
    data.sound = e.target.checked ? "pant" : "mute";
    document
      .querySelectorAll(".sound-state-text")
      .forEach(
        (n) => (n.textContent = e.target.checked ? "Sound on" : "Sound off"),
      );
    document
      .querySelectorAll(".sound-state-icon")
      .forEach(
        (n) => (n.innerHTML = icon(e.target.checked ? "sound" : "muted")),
      );
    stopSound();
    save();
  };
  $("#editDog").onclick = () => {
    openModal(
      `<h2>Your dogs</h2>${data.dogs.map((d) => `<button class="settings-row" data-edit-dog="${d.id}"><span>${esc(d.name)}</span>${icon("edit")}</button>`).join("")}`,
    );
    document.querySelectorAll("[data-edit-dog]").forEach(
      (b) =>
        (b.onclick = () => {
          $("#modal").close();
          addingDog = false;
          const d = data.dogs.find((d) => d.id === b.dataset.editDog);
          switchDog(d.id);
          selected = d.breed;
          page = "breeds";
          render();
          window.scrollTo(0, 0);
        }),
    );
  };
  $("#walk").onclick = toggleWalk;
  document.querySelectorAll("[data-participant]").forEach(
    (c) =>
      (c.onchange = () => {
        data.walkSelection = Array.from(
          document.querySelectorAll("[data-participant]:checked"),
        ).map((c) => c.dataset.participant);
        save();
        render();
      }),
  );
  wireDogSwitcher();
  $("#log").onclick = logModal;
  wireDelete();
  tick();
}
function tick() {
  if ($("#timer")) {
    let s = data.active ? Math.floor((Date.now() - data.active) / 1000) : 0;
    $("#timer").textContent =
      `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }
}
setInterval(tick, 1000);
let soundPlayers = [],
  soundTimers = [];
function stopSound() {
  soundTimers.forEach(clearTimeout);
  soundTimers = [];
  soundPlayers.forEach((a) => {
    a.pause();
    a.currentTime = 0;
  });
  soundPlayers = [];
}
function playSound(withPaws = true) {
  stopSound();
  if (data.sound === "mute") return;
  const pant = new Audio("audio/dog-panting.wav"),
    paws = new Audio("audio/paws-run.wav");
  pant.volume = 0.55;
  paws.volume = 0.3;
  soundPlayers = [pant, paws];
  pant.play().catch(() => toast("Audio unavailable"));
  soundTimers.push(setTimeout(() => pant.pause(), 4000));
  if (withPaws) {
    paws.play().catch(() => toast("Paw audio unavailable"));
    soundTimers.push(setTimeout(() => paws.pause(), 3000));
  }
}
function openModal(html) {
  $("#modalBody").innerHTML = html;
  $("#modal").showModal();
}
$(".close").onclick = () => $("#modal").close();
function logModal() {
  let shape = 2;
  openModal(
    `<h2>Poop shape</h2><label class="field">Dog<select id="poopDog" required>${walkDogs()
      .map((d) => `<option value="${d.id}">${esc(d.name)}</option>`)
      .join(
        "",
      )}</select></label><div class="shapes">${labels.map((l, i) => `<button class="shape ${i === 1 ? "selected" : ""}" data-shape="${i + 1}">${poop(i + 1)}${i + 1}. ${l}</button>`).join("")}</div><label class="field">Note (optional)<input id="note" maxlength="180" placeholder=""></label>${infoNote('Based on the <a href="https://www.purinainstitute.com/sites/default/files/2021-04/fecal-chart.pdf" target="_blank" rel="noopener">Purina 7-point fecal chart</a>. Score 2 is the ideal reference. Shape alone cannot diagnose health. Contact your vet for blood, persistent changes, or a pup who seems unwell.')}<button class="primary" id="savePoop">${icon("check")} Save</button>`,
  );
  document.querySelectorAll("[data-shape]").forEach(
    (b) =>
      (b.onclick = () => {
        shape = +b.dataset.shape;
        document
          .querySelectorAll("[data-shape]")
          .forEach((x) => x.classList.toggle("selected", x === b));
      }),
  );
  $("#savePoop").onclick = () => {
    data.logs.push({
      id: crypto.randomUUID(),
      dogId: $("#poopDog").value,
      at: Date.now(),
      shape,
      note: $("#note").value.trim(),
      walk: data.groupWalk?.start || data.active,
    });
    save();
    $("#modal").close();
    render();
    $(".playground").classList.add("record-spark");
    toast("Poop saved ✦");
  };
}
function calendar() {
  const year = viewDate.getFullYear(),
    month = viewDate.getMonth(),
    start = (() => {
      const d = new Date(2000, 0, 1);
      d.setFullYear(year, month, 1);
      return d.getDay();
    })(),
    days = (() => {
      const d = new Date(2000, 0, 1);
      d.setFullYear(year, month + 1, 0);
      return d.getDate();
    })();
  const allLogs = dogLogs(),
    allWalks = dogWalks(),
    logs = allLogs.filter((l) => dayKey(new Date(l.at)) === chosen),
    walks = allWalks.filter((w) => dayKey(new Date(w.start)) === chosen);
  $("#screen").innerHTML =
    `<section class="diary-focus">${dogSwitcher()}<div class="topline"><h1>Diary</h1><button class="secondary" id="calendarToday">Today</button></div><div class="year-individual" role="group" aria-label="Year"><span>Year</span>${String(
      year,
    )
      .padStart(4, "0")
      .split("")
      .map(
        (digit, i) =>
          `<div class="digit-slot"><button class="digit-trigger" data-open-digit="${i}" aria-label="Change ${["thousands", "hundreds", "tens", "ones"][i]} digit" aria-expanded="false"><b>${digit}</b><span aria-hidden="true">⌄</span></button><div class="digit-popover" hidden><div class="year-reel" data-digit="${i}" tabindex="0" role="spinbutton" aria-label="${["Thousands", "Hundreds", "Tens", "Ones"][i]}" aria-valuemin="0" aria-valuemax="9" aria-valuenow="${digit}">${Array.from({ length: 10 }, (_, n) => `<div class="reel-number">${n}</div>`).join("")}</div></div></div>`,
      )
      .join(
        "",
      )}</div><div class="month-picker"><button class="icon-button" id="prev" aria-label="Previous month">‹</button><label class="sr-only" for="monthSelect">Month</label><select id="monthSelect">${Array.from({ length: 12 }, (_, i) => `<option value="${i}" ${i === month ? "selected" : ""}>${new Date(2020, i, 1).toLocaleDateString("en-US", { month: "long" })}</option>`).join("")}</select><button class="icon-button" id="next" aria-label="Next month">›</button></div><div class="card"><div class="calendar">${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => `<div class="weekday">${d}</div>`).join("")}${"<div></div>".repeat(start)}${Array.from(
      { length: days },
      (_, i) => {
        let key = dayKey(new Date(year, month, i + 1));
        return `<button class="day ${key === chosen ? "selected" : ""}" data-day="${key}">${i + 1}${allLogs.some((l) => dayKey(new Date(l.at)) === key) || allWalks.some((w) => dayKey(new Date(w.start)) === key) ? '<span class="dot">•</span>' : ""}</button>`;
      },
    ).join(
      "",
    )}</div></div><div class="sectionline"><h3>${chosen}</h3><span class="tiny">${walks.length} walks · ${logs.length} poops</span></div>${walks.map((w) => `<p>${icon("clock")} ${new Date(w.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} · ${Math.floor((w.end - w.start) / 60000)} min ${Math.floor((w.end - w.start) / 1000) % 60} sec</p>`).join("")}${rows(logs)}</section>`;
  const move = (y, m) => {
    const next = new Date(2000, 0, 1);
    next.setFullYear(y, m, 1);
    if (next.getFullYear() < 1 || next.getFullYear() > 9999) return;
    viewDate = next;
    chosen = dayKey(viewDate);
    calendar();
  };
  $("#prev").onclick = () => move(year, month - 1);
  $("#next").onclick = () => move(year, month + 1);
  let openDigit = null;
  const reels = Array.from(document.querySelectorAll(".year-reel"));
  const closeDigit = () => {
    if (openDigit === null) return;
    const i = openDigit,
      w = reels[i],
      old = Number(String(year).padStart(4, "0")[i]),
      n = Math.max(0, Math.min(9, Math.round(w.scrollTop / 36)));
    openDigit = null;
    const y = year + (n - old) * 10 ** (3 - i);
    if (y > 0 && y !== year) {
      move(y, month);
      return;
    }
    document
      .querySelectorAll(".digit-popover")
      .forEach((p) => (p.hidden = true));
    document
      .querySelectorAll(".digit-trigger")
      .forEach((b) => b.setAttribute("aria-expanded", "false"));
  };
  document.querySelectorAll("[data-open-digit]").forEach(
    (b) =>
      (b.onclick = () => {
        const i = +b.dataset.openDigit;
        if (openDigit !== null) {
          closeDigit();
          if (!b.isConnected) return;
        }
        openDigit = i;
        b.setAttribute("aria-expanded", "true");
        const panel = b.nextElementSibling;
        panel.hidden = false;
        reels[i].scrollTop = Number(String(year).padStart(4, "0")[i]) * 36;
        reels[i].focus({ preventScroll: true });
      }),
  );
  reels.forEach((w) => {
    let drag = null;
    w.onpointerdown = (e) => {
      if (e.pointerType === "touch") return;
      drag = { y: e.clientY, top: w.scrollTop };
      w.setPointerCapture(e.pointerId);
      w.classList.add("dragging");
    };
    w.onpointermove = (e) => {
      if (drag) w.scrollTop = drag.top + drag.y - e.clientY;
    };
    w.onpointerup = () => {
      drag = null;
      w.classList.remove("dragging");
      w.scrollTo({
        top: Math.round(w.scrollTop / 36) * 36,
        behavior: "smooth",
      });
    };
    w.onpointercancel = () => {
      drag = null;
      w.classList.remove("dragging");
    };
    w.onkeydown = (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        w.scrollTo({
          top:
            Math.max(
              0,
              Math.min(
                9,
                Math.round(w.scrollTop / 36) + (e.key === "ArrowDown" ? 1 : -1),
              ),
            ) * 36,
          behavior: "smooth",
        });
      }
      if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        closeDigit();
      }
    };
    w.onscroll = () => {
      const n = Math.max(0, Math.min(9, Math.round(w.scrollTop / 36)));
      w.setAttribute("aria-valuenow", String(n));
      w.closest(".digit-slot").querySelector("b").textContent = n;
    };
  });
  document.onpointerdown = (e) => {
    if (openDigit !== null && !e.target.closest(".digit-slot")) closeDigit();
  };
  $("#monthSelect").onchange = (e) => move(year, +e.target.value);
  $("#calendarToday").onclick = () => {
    viewDate = new Date();
    chosen = dayKey(viewDate);
    calendar();
  };
  document.querySelectorAll("[data-day]").forEach(
    (b) =>
      (b.onclick = () => {
        chosen = b.dataset.day;
        calendar();
      }),
  );
  wireDogSwitcher();
  wireDelete();
}
async function imageData(file, maxSize = 400) {
  if (
    !file ||
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    file.size > 8 * 1024 * 1024
  )
    throw Error("Choose a JPG, PNG or WebP under 8 MB.");
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const ratio = Math.min(1, maxSize / Math.max(img.width, img.height)),
      c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.width * ratio));
    c.height = Math.max(1, Math.round(img.height * ratio));
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fffdf5";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.8);
  } finally {
    URL.revokeObjectURL(url);
  }
}
function avatarHTML(avatar = data.account.avatar) {
  return avatar
    ? `<img src="${avatar}" alt="Your avatar">`
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></svg>';
}
function updateAvatar() {
  let btn = $("#userAvatar");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "userAvatar";
    btn.className = "user-avatar";
    btn.setAttribute("aria-label", "User settings");
    btn.title = "User settings";
    $("header").append(btn);
  }
  btn.hidden = page === "signup" || !data.profile;
  btn.innerHTML = avatarHTML();
  btn.onclick = () => {
    page = "settings";
    render();
    window.scrollTo(0, 0);
  };
}
function settings() {
  let draftAvatar = data.account.avatar;
  $("#screen").innerHTML =
    `<section class="settings-focus"><div class="topline"><h1>Settings</h1><span class="prototype-label">Local demo</span></div><form id="settingsForm"><div class="avatar-editor"><label for="avatarFile" id="avatarPreview" class="avatar-large">${avatarHTML()}</label><label class="upload-button" for="avatarFile">${icon("edit")} Photo</label><input class="sr-only" id="avatarFile" type="file" accept="image/jpeg,image/png,image/webp"><button type="button" id="removeAvatar" class="tiny" ${draftAvatar ? "" : "hidden"}>Remove</button></div><p class="tiny" id="avatarStatus" role="status"></p><label class="field">Username<input id="accountUsername" value="${esc(data.account.username)}" required minlength="2" maxlength="30" pattern="[A-Za-z0-9_]{2,30}" title="2–30 letters, numbers or underscores" autocomplete="username"></label><button type="button" id="passwordSettings" class="settings-row"><span>Password</span><span>Change ›</span></button><button class="primary" type="submit">${icon("check")} Save</button></form><div class="signout-row"><button class="secondary" id="signOut">Sign out</button></div><a class="audio-credits" href="audio/credits.html" target="_blank" rel="noopener">Audio credits</a></section>`;
  $("#signOut").onclick = () => {
    stopSound();
    data.signedOut = true;
    save();
    page = "signup";
    render();
    window.scrollTo(0, 0);
  };
  $("#avatarFile").onchange = async (e) => {
    if (!e.target.files[0]) return;
    $("#avatarStatus").textContent = "Loading…";
    try {
      draftAvatar = await imageData(e.target.files[0]);
      $("#avatarPreview").innerHTML = avatarHTML(draftAvatar);
      $("#removeAvatar").hidden = false;
      $("#avatarStatus").textContent = "";
    } catch (err) {
      $("#avatarStatus").textContent = err.message;
    }
  };
  $("#removeAvatar").onclick = () => {
    draftAvatar = "";
    $("#avatarPreview").innerHTML = avatarHTML("");
    $("#removeAvatar").hidden = true;
    $("#avatarFile").value = "";
  };
  $("#passwordSettings").onclick = () =>
    openModal(
      `<h2>Change password</h2><p class="tiny">Account passwords are not connected in this prototype. No password will be changed.</p><label class="field">Current password<input type="password" disabled placeholder="Unavailable in local demo"></label><label class="field">New password<input type="password" disabled></label><button class="primary" disabled>Change password</button>`,
    );
  $("#settingsForm").onsubmit = (e) => {
    e.preventDefault();
    const old = { ...data.account };
    data.account = {
      ...data.account,
      username: $("#accountUsername").value.trim(),
      avatar: draftAvatar,
    };
    try {
      save();
      updateAvatar();
      toast("Settings saved");
    } catch {
      data.account = old;
      toast("Storage full. Try a smaller photo.");
    }
  };
}

render();
