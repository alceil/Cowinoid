const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
	name: 'start',
	description: 'Start test',
	execute(message) {
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
                channel = collected.first().content.replace(/\D/g, "");
                message.delete();
                collected.delete();
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
                    // axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date=21-05-2021')
                    // .then(res=>{
                    //   console.log(res);
                    // })


                    axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date=21-05-2021',{
                      headers: {
                        'User-Agent':
                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                      },
                    },
                    )
                            .then((res) => {
                             console.log('RES:', res.data)
                             
                            })
                            .catch((err) => {
                              console.error('ERR:', err)
                            })
                    //third question
                    await message.channel
                      .awaitMessages((m) => m.author.id == message.author.id,
                       {
                        max: 1,
                        time: 60000,
                        errors: ["time"],
                      }
                      )
                      .then(async (collected) => {
                        content = collected.first().content;
      
                        //fourth question
                        await message.channel.send(
                          "Lastly, what should be the colour of the embed? \n eg. `RANDOM` if you dont want to choose particularly, or `#ff0000` or `RED`"
                        );
                        await message.channel
                          .awaitMessages((m) => m.author.id == message.author.id,
                        //    {
                        //     max: 1,
                        //     time: 10000,
                        //     errors: ["time"],
                        //   }
                          )
                          .then(async (collected) => {
                            color = collected.first().content.toUpperCase();
      
                            //generating embed
                            // const EmbedCommandEmbed = new Embed()
                            //   .setColor(color)
                            //   .setTitle(title)
                            //   .setDescription(content)
                            //   .setTimestamp();
      
                            // message.client.channels.cache.get(channel).send(EmbedCommandEmbed);
                            // message.channel.bulkDelete(8);
                            message.channel.send(`Embed sent to <#${channel}>!`);
                          });
                      });
                  });
              })
              .catch(() => message.channel.send("Timed out"));
          }
      
          getData(message);
	},
};