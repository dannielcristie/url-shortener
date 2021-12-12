var express = require('express');
const Link = require('../models/link');
var router = express.Router();

router.get('/:code/stats', async (req, res, next) =>{
  const code = req.params.code;
  const results = await Link.findOne({where:{code} });
  if(!results) return res.sendStatus(404);
  res.render('stats',results.dataValues);
})

router.get('/:code', async (req, res, next) =>{
  const code = req.params.code;

  const results = await Link.findOne({where:{code} });
  if(!results) return res.sendStatus(404);

  results.hits++;
  await results.save();

  res.redirect(results.url);
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title:'URL Shrinker' });
});

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};


router.post('/new', async(req, res, next) => {

  try {
    const url = req.body.url;
    const code = generateCode();
  
    const result = await Link.create({
      url,
      code
    }); 
  
    res.render('stats',result.dataValues);
  } catch (error) {
    res.render('/')
  }

});

module.exports = router;
