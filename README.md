# MMM-bsh-tides
Magic Mirror Module for displaying tides from German Bundesamt für Seeschifffahrt und Hydrographie

## Preview
![Screenshot](https://github.com/myrdrks/MMM-bsh-tides/blob/main/Screenshot.png?raw=true)

## Module installation
1. Navigate into your MagicMirror's modules folder `cd MagicMirror/modules` and clone this repository `git clone https://github.com/myrdrks/MMM-bsh-tides`
2. cd into the module folder `cd MMM-bsh-tides` and install dependencies `npm i`

## Tide data installation
1. go to https://tableau.bsh.de/views/Gezeitenvorausberechnung_V02/Download-Bereich
2. Select your region (Ort) and year (Jahr)
3. IMPORTANT: Select filetype (Produkt) "txt-Datei (HW/NW)"
4. Accept terms of use (Akzeptieren)
5. Click Download
6. Put the downloaded file into MMM-bsh-tides module folder
7. Edit `config/config.js`: filename: "DE_XXX2021"

## Usage
To use this module, add it to the modules array in the `config/config.js` file:
````javascript
{
  module: "MMM-bsh-tides",
  position: "right",
  config: {
    filename: "DE__750P2021.txt", // file from https://tableau.bsh.de/views/Gezeitenvorausberechnung_V02/Download-Bereich
    todayLabel: "Heute",
    tomorrowLabel: "Morgen",
    highTide: "Hochwasser",
    lowTide: "Niedrigwasser",
    showIcons: true, // Hide or show arrow icons
    updateInterval: 60 * 60 * 1000, // 1 hour
  }
},
````

## Dependencies
- [Feather Icons](https://github.com/feathericons/feather "feather") installed via `npm i`
