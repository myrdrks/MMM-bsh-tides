const path = require('path');
const fs = require('fs');
const moment = require('moment');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

  socketNotificationReceived: function(notification, payload) {
    if(notification === 'START'){
        this.config = payload;
        this.readData();
        setInterval(() => {
            this.readData();
        }, this.config.updateInterval);
    }
  },

  readData: function(){
    //to read a file to do the following
    const l = {
      N: this.config.lowTide,
      H: this.config.highTide,
    }
    const buffer = fs.readFileSync(path.join(__dirname, this.config.filename));
    const fileContent = buffer.toString();
    const elements = fileContent.split('\n');

    const getTides = (d) => elements.filter(el => el.replace(/ /g,"").includes(d.format("D.M.YYYY"))).map(el => {
      const e = el.split('#');
      const tide = l[e[3]];
      const zeit = moment(e[6],'H:mm').add(e[10].split(":")[0].replace(/\D+/g, ''), 'hour').format("HH:mm");
      const datum = e[5];
      if(tide && zeit)
        return { date: datum, tide, time: zeit };
        // return `${datum} ${tide} um ${zeit} Uhr`;
    });
    const today = getTides(moment());
    const tomorrow = getTides(moment().add(1,'days'));
    this.sendSocketNotification('TIDEDATA', { today, tomorrow });

  }
});