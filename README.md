# Paw by Paw

Paw by Paw is a website for tracking dog walks and logging when your dog poops. I made it to give dog owners a place to keep a record of their walks and look back on them over time. These records can also help users notice changes in their dog's usual routine.

I want the everyday details of a walk to feel a little more playful. The first experiment happens at sign-up: as you type a password, a dachshund grows longer from the center, and each typed character plays a soft pawstep when sound is on.

The interaction I am most excited about is what happens when users press **Start walk**. Before the walk, the dog stands still and gently wags its tail. When users tap the button, the dog starts running, the timer starts, and they hear panting and quick pawsteps. I want those sounds to feel like a small signal that something good is about to begin. Starting a walk becomes a ritual users share with their dog.

## Try it

[Open Paw by Paw](https://little-walk-liv-1113.xj2365.chatgpt.site/)

## Features

- Create a local profile, sign in with its saved username and password, and sign out.
- Choose a breed or customize a mixed-breed dog.
- Add multiple dogs and select who is joining a walk.
- Start a shared timer and see the selected dogs running together.
- Log poop shape and notes for a specific dog.
- Finish a walk and see a summary grouped by dog.
- Review each dog's records in the calendar.
- Adjust the year using individual sliding digit pickers.
- Turn sound on or off and upload a user avatar.

## Files

HTML, CSS, and JavaScript are separate:

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and script links |
| `style.css` | Hand-drawn colors, layout, transitions, and animations |
| `app.js` | State, local login, walk timer, records, calendar, and event handlers |
| `dogs.js` | SVG dog illustrations and breed appearance |
| `audio/` | Panting and pawstep recordings with credits |

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Use a local server rather than double-clicking the HTML file. Localhost and HTTPS support the Web Crypto API used for password verification.

## How the interaction works

The selected dog IDs are stored in `data.walkSelection`. Clicking **Start walk** calls `toggleWalk()`, which combines that selection with the current walk state to create a shared walk. No dogs selected means the app prompts the user to choose a dog first. One selected dog produces a solo walk; several selected dogs run together.

Poop entries store the selected dog's ID and the walk's start time. The finish summary uses those values to show the right entries under each dog's name. A walk without entries still shows its duration.

The code uses variables, arrays, objects, named functions, click and change handlers, conditional logic, and iteration. `render()` updates the screen based on state; `tick()` updates the timer once per second.

## Design process

I worked with Codex to revise sounds, animations, and UI layouts. I replaced the original barking feedback with panting, changed the default dog animation to a gentle tail wag, and removed play and social features to focus on walking and personal records.

The illustrations vary in size, body shape, ears, tails, coat color, and markings so the dogs feel more recognizable. The bottom tab highlight slides between Diary and Home to make the transition feel continuous. The light blue, warm paper, and terracotta palette supports the hand-drawn diary style.

## Local data and limitations

This is a browser-local class project. Dog profiles, walks, entries, and avatar data are saved in this browser's local storage; they do not sync across devices. Local passwords are checked against a salted PBKDF2 hash, not stored in plaintext. This is not a server-backed security boundary: someone with access to the browser's storage can alter it. There is no email verification or password recovery. Use a demo password, not a password reused elsewhere.

Clearing site data removes the saved profile and records. Changing to a different website address also uses a different storage area. Poop shape logging supports observation and is not a medical diagnosis.

## Audio credits

See [audio credits](audio/credits.html) for sources and licenses. Panting comes from Mixkit; the pawstep sequence is adapted from canine running recordings credited to congusbongus and sabotovat under CC BY 3.0.
