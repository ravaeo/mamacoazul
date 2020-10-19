'use strict';

const puppeteer = require('puppeteer');
const shell = require('shelljs');

var erou = 0


const led  = async() => {
 
  const browser =  await puppeteer.launch({
    args : [
     '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
  ],
});
  try {
  
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
  //  await page.setCacheEnabled(false);
   // await page.setViewport({ width: 1024, height:1000 });
    await page.goto('https://www.instagram.com/accounts/login/');
    
   
    await page.waitForSelector('input[name="username"]')
    await page.type('input[name="username"]', '_ravaeo', {delay:100})
  //  await page.type(String.fromCharCode(13));
    await page.waitForSelector('input[name="password"]')
    await page.type('input[name="password"]', '61127385', {delay:100})
    await page.keyboard.press('Enter');
    await page.waitForSelector('button[class="sqdOP  L3NKy   y3zKF     "]', {visible:true})
    await Promise.all([
      await page.click('button[class="sqdOP  L3NKy   y3zKF     "]'),
      await page.waitForNavigation()
    ]);
    await page.goto('https://www.instagram.com/p/CGdEIpZFhrd/');

    var a = 0
    while (a<9) {
    
      
      try {
          await page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea', {timeout: 3000});
          await page.type('#react-root > section > main > div > div.ltEKP > article > div.eo2As > section.sH9wk._JgwE > div > form > textarea',' EU QUERO ', {delay:500})
          await page.keyboard.press('Enter');
           console.log('ok')
        } catch (e) {
          console.log('not ok')
          erou++
        if(erou == 10){
          erou = 0
          await browser.close();
         
         
          }
            
          
        }
    
      a++
    }
    
   
   a=0
    const articles = await page.evaluate(() => {
      let titleLinks = document.querySelectorAll('h3.knswli-title > a');
      titleLinks = [...titleLinks];
      let articles = titleLinks.map(link => ({
        title: link.getAttribute('title'),
        url: link.getAttribute('href')
      }));
      return articles;
    });

    module.exports = articles;
  
  } catch (err) {
    console.log('e');
    process.exit(1);
  } finally {
    
     await browser.close();
     shell.exec('pkill chrome')
    console.log('just execute')
  }
   
   
  
};

setInterval(() => {
  led();
},300000);
