
const google = require('googleapis');
const sheets = google.sheets('v4');
const spreadsheetId = '1SwkOE4sLWTo-mtii0Buk5yySw2Fewfew';

module.exports = {

    addRow: (auth, row) => {
        return new Promise(resolve => {
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: 'A:B',
                insertDataOption: 'INSERT_ROWS',
                valueInputOption: 'RAW',
                resource: {
                    values: [row]
                }
            }, (err, response) => {
                if (err) throw err;
                resolve(response)
            });
        })
    },

    getRows: (auth, date) => {
        return new Promise((resolve, reject) => {
            sheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: 'A:B',
            }, (err, response) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return reject(err);
                }
                const rows = response.values;
                const array = [];
                for (let i = 1; i < rows.length; i++) {
                    let row = rows[i];
                    if (date === row[0]) {
                        array.push(row[1]);
                    }
                }
                return resolve(array)
            });
        });
    },

    updateRow: (auth, data, range) => {
        return new Promise((resolve, reject) => {
            sheets.spreadsheets.values.update({
                auth,
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: {
                    values: [data]
                }
            }, (err, response) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return reject(err);
                }
                const rows = response.values;
                return resolve(rows)
            });
        });
    },

    getAllRows: auth => {
        return new Promise((resolve, reject) => {
            sheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: 'A:J',
            }, (err, response) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return reject(err);
                }
                const rows = response.values;
                return resolve(rows)
            });
        });
    }

};