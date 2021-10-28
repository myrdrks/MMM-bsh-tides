// Tides for today and tomorrow fetched from Bundesamt für Seeschifffahrt und Hydrographie!

Module.register("MMM-bsh-tides",{
  // Default module config.
  defaults: {
    filename: "DE__750P2021.txt",
    todayLabel: "Heute",
    tomorrowLabel: "Morgen",
    highTide: "Hochwasser",
    lowTide: "Niedrigwasser",
    showIcons: true,
    updateInterval: 60 * 60 * 1000, // 1 hour
  },

  getScripts: function(){
    return ['moment.js', this.file('node_modules/feather-icons/dist/feather.min.js')]; // needed for MM versions without moment
  },
  start: function() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification('START', this.config);
  },
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'TIDEDATA'){
      this.tides = payload;
      this.updateDom();
    }
  },
  getStyles: function() {
      return [`${this.name}.css`, 'font-awesome.css'];
  },
  getTemplate: function () {
    return `${this.name}.njk`;
  },
  getTemplateData: function () {
    const { config } = this.config;
    return {
      config: this.config,
      today: this.tides.today,
      tomorrow: this.tides.tomorrow,
      ltIcon: this.getIcon('arrow-down', 'dimmed'),
      htIcon: this.getIcon('arrow-up', 'dimmed'),
    };
  },
  getIcon: function(iconId, classes) {
    return `<svg class="feather tideIcon ${classes}"><use xlink:href="${this.file('node_modules/feather-icons/dist/feather-sprite.svg')}#${iconId}"/></svg>`;
  }
});