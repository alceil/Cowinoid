const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
	name: 'start',
	description: 'Start test',
	execute(message) {
        var age;
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
                    title = collected.first().content;
                    console.log(title)
                    axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date=21-05-2021',{
                      headers: {
                        'User-Agent':
                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                      },
                    },
                    )
                            .then((res) => {
                            //  console.log('RES:', res.data['sessions'])
                             var list = res.data['sessions'];
                             //console.log(list);

                             const hospList = list.map(hosp=>`Hosp Name:${hosp.name}\nFee:${hosp.fee}`)
                             console.log(hospList);
                             var indeded ="```" + hospList.join('/n') +"```"
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