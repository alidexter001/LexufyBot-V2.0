////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');
const urlencodedParser = require('body-parser').urlencoded({ extended: false});
const fs = require('fs');
const passport = require('passport');
const session = require('express-session');
const config = require(`${process.cwd()}/config.js`);
const path = require('path');
var colors = require('colors');
const client = require(`${process.cwd()}/bot.js`).client;

////////////////////////////////////////////////////////////////

app.enable("trust proxy");// enable [trust proxy], for all browsers
app.set("etag", false); // disable web cache [don't change it]
app.use(express.static('./dashboard')); // importing the dashboard folder
app.set('views', path.join('./dashboard')); // don't change this, i will not tell you what it does, because i don't know either
app.set('view engine', 'ejs'); // setting the view engine to ejs, as default, because we are working with ejs package on this bot
app.use(cookieParser()); // setting the cookie parser to cookies, as default,
app.use(express.json());
app.use(urlencodedParser); // decode the the urlencoded discord link so the bot can read it)
////////////////////////////////////////////////////////////////

//Dashboard Handler
if(config.DASHBOARD.ENABLED){
    console.log(`[${colors.green('Dashboard')}] Loading ${colors.cyan('dashboard events')}...`)
    
    let files = fs.readdirSync(`${process.cwd()}/dashboard/back`).filter(f => f.endsWith('.js'))
    files.forEach(f => {
        try{
        const file = require(`${process.cwd()}/dashboard/back/${f}`)
        if(file && file.name) {
            app.get(file.name, file.run)// Load all the dashboard js files
            if(file.post) app.get(file.name, file.post)
        }
        }catch(err) { console.error(`[${colors.red('Dashboard')}] Error while loading ${colors.cyan(`${process.cwd()}/dashboard/back/${f}`)}`); console.log(err)}
    })
    app.get('*', (req, res) => {
        res.sendFile(`${process.cwd()}/dashboard/HTML/404.html`)// 404 Page Not Found
    })
    app.post('/update-antiinvite', async (req, res) => {
        const { guildId, newStatus } = req.body;
      
        // Assuming you have a way to update the status in your database here
        // Replace this with your actual database update logic
        // Example: client.db.set(`${guildId}.automod.antiinvite.status`, newStatus);
      
        try {
            const newStatuss = newStatus === "true" ? true : false
          await client.db.set(`${guildId}.automod.antiinvite.status`, newStatuss);
      
          // Respond with success status
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating status:', error);
          res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-antighost', async (req, res) => {
        const { guildId, newStatus } = req.body;
      
        // Assuming you have a way to update the status in your database here
        // Replace this with your actual database update logic
        // Example: client.db.set(`${guildId}.automod.antiinvite.status`, newStatus);
      
        try {
            const newStatuss = newStatus === "true" ? true : false
          await client.db.set(`${guildId}.automod.antighost.status`, newStatuss);
      
          // Respond with success status
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating status:', error);
          res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-antiping', async (req, res) => {
        const { guildId, newStatus } = req.body;
      
        // Assuming you have a way to update the status in your database here
        // Replace this with your actual database update logic
        // Example: client.db.set(`${guildId}.automod.antiinvite.status`, newStatus);
      
        try {
            const max = await client.db.get(`${guildId}.automod.antiping.max`);
            const newStatuss = newStatus === "true" ? true : false
          await client.db.set(`${guildId}.automod.antiping.status`, newStatuss);

          if(!max || max === 0) await client.db.set(`${guildId}.automod.antiping.max`, 2);
      
          // Respond with success status
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating status:', error);
          res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-antiscam', async (req, res) => {
        const { guildId, newStatus } = req.body;
      
        // Assuming you have a way to update the status in your database here
        // Replace this with your actual database update logic
        // Example: client.db.set(`${guildId}.automod.antiinvite.status`, newStatus);
      
        try {
            const newStatuss = newStatus === "true" ? true : false
          await client.db.set(`${guildId}.automod.antiscam.status`, newStatuss);
      
          // Respond with success status
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating status:', error);
          res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-antilink', async (req, res) => {
        const { guildId, newStatus } = req.body;
      
        // Assuming you have a way to update the status in your database here
        // Replace this with your actual database update logic
        // Example: client.db.set(`${guildId}.automod.antiinvite.status`, newStatus);
      
        try {
            const newStatuss = newStatus === "true" ? true : false
          await client.db.set(`${guildId}.automod.antilink.status`, newStatuss);
      
          // Respond with success status
          res.json({ success: true });
        } catch (error) {
          console.error('Error updating status:', error);
          res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-prefix', async (req, res) => {
        const { guildId, newPrefix } = req.body;

        const prefix = newPrefix || config.PREFIX
    
        try {
            await client.db.set(`${guildId}.prefix`, `${prefix}`);
    
            // Respond with success status
            res.json({ success: true });
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ success: false, error: 'Failed to update status' });
        }
    });
    app.post('/update-queue', async (req, res) => {
      const { guildId, songg } = req.body;
      const player = client.manager.get(guildId)

      if(player) {
        try{
          const result = await player.search(songg, 'From Dashboard');
          const queue = player.queue;

          switch(result.loadType) {
            case "LOAD_FAILED":
            case'NO_MATCHES':
              if(!queue.current) player.destroy(); 
            case'PLAYLIST_LOADED':
              const pltracks = result.tracks;
              queue.add(pltracks)
            case "TRACK_LOADED":    
            case'SEARCH_RESULT':
              const track = result.tracks[0];
              queue.add(track);
          }
          res.json({ success: true });
        }catch(error){
          res.status(500).json({ success: false, error: 'Failed to update queue' });
        }
      }
    });
    app.post('/update-looptrack', async (req, res) => {
      const { guildId, newStatus } = req.body;
    
      const player = client.manager.get(guildId) 
    
      try {
          const newStatuss = newStatus === "true" ? true : false
          await player.setTrackRepeat(newStatuss)
    
        // Respond with success status
        res.json({ success: true });
      } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, error: 'Failed to update status' });
      }
  });
  app.post('/update-loopqueue', async (req, res) => {
    const { guildId, newStatus } = req.body;
  
    const player = client.manager.get(guildId) 
  
    try {
        const newStatuss = newStatus === "true" ? true : false
        await player.setQueueRepeat(newStatuss)
  
      // Respond with success status
      res.json({ success: true })
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ success: false, error: 'Failed to update status' });
    }
  });
  app.post('/track-start', (req, res) => {
    const guildId = req.query.guildId; // Assuming the guildId is provided in the query parameters
    if (guildId) {
        client.manager.once('trackStart', (player, track) => {
            if (player.guild === guildId) {
                res.status(200).send({ guildId: guildId });
            }
        });
    } else {
        res.sendStatus(400); // Bad request if no guildId provided
    }
  });
  app.post('/track-end', (req, res) => {
    const guildId = req.query.guildId; // Assuming the guildId is provided in the query parameters
    if (guildId) {
        const player = client.manager.get(guildId);
        if (player && player.guild === guildId) {
            // const queueEndListener = () => {
            //     res.status(200).send({ guildId: guildId, event: 'queueEnd' });
            //     client.manager.off('queueEnd', queueEndListener);
            //     client.manager.off('playerDestroy', playerDestroyListener);
            // };

            const playerDestroyListener = () => {
                res.status(200).send({ guildId: guildId, event: 'playerDestroy' });
                // client.manager.off('queueEnd', queueEndListener);
                client.manager.off('playerDestroy', playerDestroyListener);
            };

            // client.manager.on('queueEnd', setTimeout({queueEndListener}, config.IDLE_TIME * 1000));
            client.manager.on('playerDestroy', playerDestroyListener);
        } else {
            res.sendStatus(404); // Player not found or guildId doesn't match player's guild
        }
    } else {
        res.sendStatus(400); // Bad request if no guildId provided
    }
  });
  
  //Run the dashboard
  app.listen(config.DASHBOARD.PORT, () => console.log(`[${colors.green('Dashboard')}] Dashboard Running on port <${colors.cyan(`${config.DASHBOARD.PORT}`)}>`))
}