const axios = require('axios')
let baseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='
const date = require('date-and-time');

async function fetchVacAvailability(id) {
    const now = new Date();
    let TodaysDate = date.format(now, 'DD/MM/YYYY'); 
    let url = baseUrl + id + '&date=' + TodaysDate
    const response = await axios.get(url, {
                            headers: {
                                'User-Agent':
                                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
                            }
                        })
    return response.data.sessions
}


module.exports={
    fetchVacAvailability
}