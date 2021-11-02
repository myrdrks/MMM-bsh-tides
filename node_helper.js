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
    const l = {
      N: this.config.lowTide,
      H: this.config.highTide,
    }
    const buffer = fs.readFileSync(path.join(__dirname, this.config.filename));
    const fileContent = buffer.toString();
    const elements = fileContent.split('\n');

    const formattedElements = elements.filter(el => el.split('#')[0] === 'VB2').map(el => {
      const e = el.split('#');
      const tide = l[e[3]];
      const timestr = `${moment(e[5] && e[5].replace(/ /g, '0'), 'DD.MM.YYYY').format('YYYY-MM-DD')} ${e[6]} ${e[10].replace(/ /g, 0)}`;
      const datetime = moment(timestr, "YYYY-MM-DD HH:mm Z");
      
      return ({
        tide,
        datetime,
        timestr,
      })
    });

    const getTides = (d) => formattedElements.filter(f => f.datetime.format('DDMMYYY') === d.format('DDMMYYY'));

    const today = getTides(moment());
    const tomorrow = getTides(moment().add(1,'days'));
    this.sendSocketNotification('TIDEDATA', { today, tomorrow });
  }
});
