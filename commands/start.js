const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
	name: 'start',
	description: 'Start test',
	execute(message) {
        var age;
        var district_id;
        async function getData(message) {
            await message.channel.send("```Welcome to CoWin WhatsApp ChatBot!\nSelect your Age Group to Proceed...\nSend 1   : to Select Age Group 18 - 44\nSend 2   : to Select Age Group 45+\nSend END : to Cancel All and End Current Chat Session```");
            await message.channel
              .awaitMessages((m) => m.author.id == message.author.id, 
              {
                max: 1,
                time: 10000,
                errors: ["time"],
              }
              )
              .then(async (collected) => {
                //second question
                console.log(collected.first().content);
                let opt=collected.first().content;
                opt==1?age=18:age=45;
                console.log(age);
                await message.channel.send("```DISTRICT LIST\nID: District Name\n301: Alappuzha\n307: Ernakulam\n306: Idukki\n297: Kannur\n295: Kasaragod\n298: Kollam\n304: Kottayam\n305: Kozhikode\n302: Malappuram\n308: Palakkad\n300: Pathanamthitta\n296: Thiruvananthapuram\n303: Thrissur\n299: Wayanad```");
                await message.channel
                  .awaitMessages((m) => m.author.id == message.author.id,
                   {
                    max: 1,
                    time: 10000,
                    errors: ["time"],
                  }
                  )
                  .then(async (collected) => {
                    id = collected.first().content;
                    district_id = id
                    console.log(id)
                    let date_ob = new Date();
                    let date = ("0" + date_ob.getDate()).slice(-2);
                    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    let year = date_ob.getFullYear();
                    var formattedDate = date + "-" + month + "-" + year;
                    console.log(formattedDate);
                    var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + district_id +"&date=" + formattedDate;
                    axios.get(url,{
                      headers: {
                        'User-Agent':
                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                      },
                    },
                    )
                            .then((res) => {
                            //  console.log('RES:', res.data)
                             var list = res.data['sessions'];
                             const hospListWithAge = list.filter(hosp=>hosp.min_age_limit===age);  
                             const hospList = hospListWithAge.map(hosp=>`\nHosp Name:${hosp.name}\nFee:${hosp.fee}\n`);
                             hospList.push('List of Hospitals Where vacines are available');
                             console.log(hospList);
                             var indeded ="```" + hospList.join(' ') +"```"
                             message.channel.send(indeded);
                             sessions.push(list);
                             console.log(sessions)            
                            })
                            .catch((err) => {
                              console.error('ERR:', err)
                            })
                  
                  });
              })
              .catch(() => message.channel.send("Timed out"));
          }
      
          getData(message);
	},
};