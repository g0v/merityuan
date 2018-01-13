const fs = require('fs');
const _ = require('lodash');
const fetch = require('node-fetch');

const key = 'AIzaSyCfjXSVSV9m8s6tlphcG46NUWzXjTNUC4U';
const zipcode = fs.readFileSync('./static/zipcode.csv');

const data = [];

const regex = /[^村里]+[村里]/i;
const addressRegex = /([0-9之]+號)/i;
_.reduce(String(zipcode).split('\n'), (result, item) => {
  const items = item.replace(/ /gi, '').split(',');
  if (fs.existsSync(`./temp/${items[0]}.csv`)) {
    return result;
  }

  let tmp;
  return result
    .then(() => {
      const address = addressRegex.exec(items[4]);
      if (address) {
        items[4] = address[0];
      } else {
        delete items[4];
      }
      tmp = _.take(items, 4);
      delete items[0];
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(items.join(''))}`)
        .then(res => res.json());
    })
    .then(reply => reply.results[0].geometry.location)
    .then(location => {
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?language=zh-TW&latlng=${location.lat},${location.lng}`)
        .then(res => res.json());
    })
    .then(reply => {
      const village = _.find(
        _.flatten(_.map(reply.results, ({ address_components }) => address_components)),
        ({ long_name }) => regex.test(long_name)
      );
      if (village) tmp.push(village.long_name);
      console.log(tmp);
      data.push(tmp.join(','));
      fs.writeFileSync(`./temp/${tmp[0]}.csv`, tmp.join(','));
      return new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    }, (e) => {
      console.log(tmp, e);
    })
}, Promise.resolve()).then(() => {
  fs.writeFileSync('./static/data.csv', data.join('\n'));
});
