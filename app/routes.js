// ************************
// NOTIFY
// ************************
var NotifyClient = require('notifications-node-client').NotifyClient
var notifyClient = new NotifyClient('evidenceemail-d7f10c49-d20f-49b4-95e5-0c8b5e4fe650-277df34b-ea50-4a10-b24b-504213e86940')

var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// The URL here needs to match the URL of the page that the user is on
// when they type in their email address
router.get(/sendEmail-handler/, function (req, res) {

  var email = req.session.data['email'];
  var uploadSkip = req.session.data['uploadskip'];

  if (uploadSkip) {
    res.redirect('more-information')
  }
  else if (email) {
    
    notifyClient.sendEmail(
      // this long string is the template ID, copy it from the template
      // page in GOV.UK Notify. It’s not a secret so it’s fine to put it
      // in your code.
      'c06d2f17-e510-427a-9a49-c0bc2640e7b1',
      // `emailAddress` here needs to match the name of the form field in
      // your HTML page
      req.session.data['email']
    );
  
    // This is the URL the users will be redirected to once the email
    // has been sent
    res.redirect('further-information-email');  

  }
  else {
    res.redirect('more-information')
  }








});

// add your routes here

module.exports = router


// ************************
// GLOBAL VARIABLES
// ************************

var applicantMaster = require('./applicant.js');
var applicant = applicantMaster.createApplicant();

applicant.partner = null;
applicant.maintenancefor = null;
applicant.saveforlater = null;

var benificiary = {
  firstname : "Molly",
  lastname : "Smith",
  thirdParty : false,
  dobDay : "0",
  dobMonth : "0",
  dobYear : "0",
};

// ************************
// PRE-APPLY
// ************************

router.get(/applyonline-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/apply/what-you-will-need-split');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/applyonlineiteration1-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/apply/iteration-1/what-you-will-need');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

// ************************
// BEFORE YOU START
// ************************


// ** router.get(/partner-handler/, function (req, res) {
  //** if (req.query.partner == 'yes') {
    //**   applicant.partner = true;
    //** res.redirect('/beforeyoustart/asylum/claimed-asylum-partner');
 //**  } else if (req.query.partner == 'no') {
   //**  applicant.partner = false;
  //**   res.redirect('/beforeyoustart/asylum/claimed-asylum-single');
 //**  }
//**    }); 



router.get(/partner-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/asylum/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/asylum/claimed-asylum-single');
  }
});

router.get(/educationtraining-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  }
});


router.get(/educationtrainingPartner-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('../../kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('../../beforeyoustart/money-coming-in-partner');
  }
});


//router.get(/qualification-handler/, function (req, res) {
  
//if (req.query.qualification.includes('nil')) {
 // res.redirect('/kickouts/students-developed');
 // } else if (req.query.qualification.includes('gcse')) {
 //   res.redirect('/beforeyoustart/student/tuition fee');
  //} else if (req.query.qualification.includes('btec1')) {
  //  res.redirect('/beforeyoustart/student/tuition fee');
  // } else 
  //  res.redirect('/beforeyoustart/student/qualification');
//});

router.get(/qualification-handler/, function (req, res) {
 
  if (req.query.qualification == 'yes') {
    res.redirect('/beforeyoustart/student/tuition fee.html');
  } else if (req.query.qualification== 'no') {
    res.redirect('/kickouts/students-developed');
  }
});

router.get(/fulltimeedu-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'Full time') {
    res.redirect('/kickouts/students-developed');
  } else if  (req.query.fulltimeedu == 'Part time') {
    res.redirect('/beforeyoustart/student/qualification');
  } else {
    res.redirect('/beforeyoustart/full-time-edu');
  }
});

router.get(/tuition-handler/, function (req, res) {
  
  if (req.query.tuition == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.tuition == 'no') {
    res.redirect('/beforeyoustart/student/parental-cont');
  }
});

router.get(/parentcontribution-handler/, function (req, res) {
  if (req.query.parentcontribution == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.parentcontribution == 'no') {
    res.redirect('/beforeyoustart/student/student-funding');;
  }
});



router.get(/funding-handler/, function (req, res) {
  if (req.query.funding.includes('SL-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('money-from-parents');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('money-from-parents');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('money-from-parents');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('money-from-parents');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  }
});

router.get(/whatispartnersincome-handler/, function (req, res) {
  if (req.query.incomepartner.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomepartner.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomepartner.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomepartner.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomepartner.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomepartner == 'pension-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner == 'earned-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner == 'benefits-income') {
      res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner == 'nil-income') {
      res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else {
    res.redirect('/beforeyoustart/money-coming-in-partner');
  }
});

router.get(/whatissingleincome-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart//more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/money-coming-in-single');
  }
});

router.get(/asylumsingle-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('../../beforeyoustart/student/edu-or-training');
  }
});

router.get(/asylumPartner-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('../../kickouts/developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('../../beforeyoustart/student/edu-or-training-partner');
  }
});

router.get(/asylumdecision-handler/, function (req, res) {
  if (req.query.asylumdecision == 'still-waiting') {
    res.redirect('/beforeyoustart/asylum/ukvi');
  } else if (req.query.asylumdecision == 'given-permission') {
    res.redirect('../../beforeyoustart/money-coming-in-single');
  } else if (req.query.asylumdecision == 'refused-permission') {
    res.redirect('/beforeyoustart/asylum/ukvi');
  }
});

router.get(/whoissupporting-handler/, function (req, res) {
  if (req.query.whoissupporting.includes('uk-visas')) {
    res.redirect('/beforeyoustart/asylum/passport');
  } else if (req.query.whoissupporting == 'local-authority') {
    res.redirect('/beforeyoustart/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'a-charity') {
    res.redirect('/beforeyoustart/asylum/what-type-of-support');
  } else if (req.query.whoissupporting.toString() == 'local-authority,a-charity') {
    res.redirect('/beforeyoustart/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'none') {
    res.redirect('/beforeyoustart/asylum/tell-us-supporting-you');
  } 
});

router.get(/telluswhoissupportingyou-handler/, function (req, res) {
  res.redirect('/beforeyoustart/asylum/what-type-of-support');
});

router.get(/whatsupport-handler/, function (req, res) {
  if (req.query.whatsupport.includes('cash')) {
    res.redirect('/beforeyoustart/asylum/how-often-receive');
  } else if (req.query.whatsupport.includes('vouchers')) {
    res.redirect('../../beforeyoustart/money-coming-in-single');
  } else if (req.query.whatsupport.includes('prepaid-card')) {
    res.redirect('../../beforeyoustart/money-coming-in-single');
  } else if (req.query.whatsupport.includes('food-meals')) {
    res.redirect('../../beforeyoustart/money-coming-in-single');
  }
});

router.get(/asylumhowoften-handler/, function (req, res) {
  if (req.query.asylumhowoften == 'every week' || req.query.asylumhowoften == 'every 2 weeks' || req.query.asylumhowoften == 'every 4 weeks' || req.query.asylumhowoften == 'every calendar month') {
    res.redirect('/beforeyoustart/asylum/how-much-you-receive');
  } else {
    res.redirect('/beforeyoustart/asylum/how-often-receive');
  }
});

router.get(/asylumhowmuch-handler/, function (req, res) {
  res.redirect('/beforeyoustart/answers-asylum');
});

router.get(/ukvi-handler/, function (req, res) {
  if (req.query.ukvi == 'yes') {
    res.redirect('/beforeyoustart/asylum/passport');
  } else if (req.query.ukvi == 'no') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  }
});



router.get(/qualification-handler-handler/, function (req, res) {
  if (req.query.qualification.includes('ug-course')) {
    res.redirect('#');
  } else if (req.query.qualification.includes('pg-course')) {
    res.redirect('#');
  } else if (req.query.qualification.includes('pgce-course')) {
    res.redirect('#');
  } else if (req.query.qualification.includes('hnc-course')) {
    res.redirect('/kickouts/developed');
  } else if (req.query.qualification.includes('hnd-course')) {
    res.redirect('#');
  } else if (req.query.qualification.includes('nvq-course')) {
    res.redirect('#');
  } else if (req.query.qualification == 'none-course') {
    res.redirect('#');
  } 
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 2
// *****************************************

router.get(/educationtrainingiteration2-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-2/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/money-coming-in-single');
  }
});

router.get(/fulltimeeduiteration2-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if  (req.query.fulltimeedu == 'no') {
    res.redirect('/beforeyoustart/student/iteration-2/qualification');
  } else {
    res.redirect('/beforeyoustart/student/iteration-2/full-time-edu');
  }
});

router.get(/qualificationiteration2-handler/, function (req, res) {
  
  if (req.query.qualification == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-2/parental-cont');
  } else if  (req.query.qualification == 'no') {
    res.redirect('/kickouts/students-developed');
  } else {
    res.redirect('/beforeyoustart/student/iteration-2/qualification');
  }
});

router.get(/parentcontributioniteration2-handler/, function (req, res) {
  if (req.query.parentcontri == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.parentcontri == 'no') {
    res.redirect('/beforeyoustart/student/iteration-2/student-funding');;
  }
});

router.get(/fundingiteration2-handler/, function (req, res) {
  if (req.query.funding.includes('SL-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/money-coming-in-single');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 3
// *****************************************

router.get(/applyonlineiteration3-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-3/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration3-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/country-split');
  }
});

router.get(/carehomesplititeration3-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/iteration-3/partner');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-split');
  }
});

router.get(/carehomesupportsplititeration3-handler/, function (req, res) {
  if (req.query.carehomesupport == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-name-split');
  } else if (req.query.carehomesupport == 'no') {
    res.redirect('/kickouts/developed');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/care-home-split');
  }
});

router.get(/partneriteration3-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/iteration-3/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/iteration-3/claimed-asylum-single');
  }
});

router.get(/asylumsingleiteration3-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/iteration-3/edu-or-training');
  }
});



router.get(/educationtrainingiteration3-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-3/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/iteration-3/money-coming-in-single');
  }
});


router.get(/fulltimeeduiteration3-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/kickouts/students-developed');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-3/qualification');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/full-time-edu');
  }
});

router.get(/qualificationiteration3-handler/, function (req, res) {
  
  if (req.query.qualification == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-3/student-funding');
  } else if  (req.query.qualification == 'no') {
    res.redirect('/kickouts/students-developed');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/qualification');
  }
});


router.get(/studentfundingiteration3-handler/, function (req, res) {
  if (req.query.funding.includes('SL-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/student/iteration-3/money-coming-in-single');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

router.get(/whatissingleincomeiteration3-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-3/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/iteration-3/money-coming-in-single');
  }
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 4
// *****************************************


router.get(/applyonlineiteration4-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/Iteration-4/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration4-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/Iteration-4/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/Iteration-4/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/Iteration-4/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/country-split');
  }
});


router.get(/carehomesplititeration4-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/Iteration-4/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/partner');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/care-home-split');
  }
});

router.get(/partneriteration4-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/Iteration-4/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/Iteration-4/claimed-asylum-single');
  }
});


router.get(/asylumsingleiteration4-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/edu-or-training');
  }
});

router.get(/asylumPartneriteration4-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/edu-or-training-partner');
  }
});


router.get(/educationtrainingiteration4-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/Iteration-4/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/money-coming-in-single');
  }
});

router.get(/educationtrainingPartneriteration4-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('../../kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/money-coming-in-partner');
  }
});


router.get(/fulltimeeduiteration4-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/Iteration-4/qualification');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/Iteration-4/qualification');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/full-time-edu');
  }
});

router.get(/qualificationiteration4-handler/, function (req, res) {
  
  if (req.query.qualification == 'yes') {
    res.redirect('/beforeyoustart/student/Iteration-4/student-funding');
  } else if  (req.query.qualification == 'no') {
    res.redirect('/kickouts/students-developed');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/qualification');
  }
});

router.get(/fundingiteration4-handler/, function (req, res) {

  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.funding.includes('SL-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding == 'none-help' && fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/Iteration-4/live-with-parents.html');
  } else if (req.query.funding == 'none-help' && fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/Iteration-4/final-year.html');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

router.get(/finalyeariteration4-handler/, function (req, res) {
  var fulltimeedu = req.session.data['fulltimeedu'];
  
  if (req.query.finalyear == 'yes' && fulltimeedu == 'ft') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.finalyear == 'yes' && fulltimeedu == 'pt') {
    res.redirect('live-with-parents');
  } else if (req.query.finalyear == 'no') {
    res.redirect('live-with-parents');
  }
});


router.get(/livewithparents-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.liveparents == 'yes' ) {
    res.redirect('/beforeyoustart/student/Iteration-4/money-coming-in-single');
  } else if (req.query.liveparents == 'no' && fulltimeedu == 'ft'){
    res.redirect('/kickouts/students-developed');

  } else 
  res.redirect('/beforeyoustart/student/Iteration-4/money-coming-in-single')
});

router.get(/whatissingleincomeiteration4-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/money-coming-in-single');
  }
});

router.get(/savingssplititeration4-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/Iteration-4/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/Iteration-4/more-than-6000');
  }
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 5
// *****************************************

router.get(/applyonlineiteration5-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-5/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration5-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/iteration-5/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/iteration-5/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/iteration-5/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/country-split');
  }
});


router.get(/carehomesplititeration5-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-5/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/partner');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/care-home-split');
  }
});

router.get(/partneriteration5-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/iteration-5/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/iteration-5/claimed-asylum-single');
  }
});


router.get(/asylumsingleiteration5-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/edu-or-training');
  }
});

router.get(/asylumPartneriteration5-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/edu-or-training-partner');
  }
});

router.get(/educationtrainingiteration5-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-5/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single');
  }
});

router.get(/educationtrainingPartneriteration5-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('../../kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-partner');
  }
});


router.get(/fulltimeeduiteration5-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/iteration-5/qualification');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-5/qualification');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/full-time-edu');
  }
});


router.get(/qualificationiteration5-handler/, function (req, res) {
  
  if (req.query.qualification == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-5/student-funding');
  } else if  (req.query.qualification == 'no') {
    res.redirect('/kickouts/students-developed');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/qualification');
  }
});

router.get(/fundingiteration5-handler/, function (req, res) {

  var fulltimeedu = req.session.data['fulltimeedu'];

 if (req.query.funding == 'friendsfamily-help' && fulltimeedu == 'pt') {
  res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single');

} else if (req.query.funding == 'none-help' && fulltimeedu == 'pt') {
  res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single');

 } else if (req.query.funding.includes('SL-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');

    }else if (req.query.funding.includes('friendsfamily-help')) {
      res.redirect('/beforeyoustart/student/iteration-5/live-with-parents.html');

  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/student/iteration-5/live-with-parents.html');
    
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

router.get(/livewithparentsiteration5-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.liveparents == 'yes' ) {
    res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single');
  } else if (req.query.liveparents == 'no' && fulltimeedu == 'ft'){
    res.redirect('/kickouts/students-developed');

  } else 
  res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single')
});


router.get(/whatissingleincomeiteration5-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/money-coming-in-single');
  }
});

router.get(/savingssplititeration5-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/iteration-5/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/iteration-5/more-than-6000');
  }
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 6
// *****************************************

router.get(/applyonlineiteration6-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration6-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/iteration-6/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/iteration-6/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/iteration-6/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6/country-split');
  }
});

router.get(/carehomesplititeration6-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/partner');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6/care-home-split');
  }
});

router.get(/partneriteration6-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/iteration-6/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/iteration-6/claimed-asylum-single');
  }
});


router.get(/asylumsingleiteration6-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/edu-or-training');
  }
});

router.get(/asylumPartneriteration6-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/edu-or-training-partner');
  }
});

router.get(/educationtrainingiteration6-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6/student-funding');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single');
  }
});

router.get(/educationtrainingPartneriteration6-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-partner');
  }
});


router.get(/fulltimeeduiteration6-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/iteration-6/student-funding');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-6/student-funding');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6/full-time-edu');
  }
});




router.get(/fundingiteration6-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.funding == 'friendsfamily-help' && fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single');
  } else if (req.query.funding == 'none-help' && fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single');
} else if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/student/iteration-6/live-with-parents.html');
  }else if (req.query.funding.includes('SL-help')) {
      res.redirect('/beforeyoustart/student/iteration-6/live-with-parents.html');
}else if (req.query.funding.includes('friendsfamily-help')) {
      res.redirect('/beforeyoustart/student/iteration-6/live-with-parents.html');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

//Note to self : else if (req.query.liveparents == 'no' && fulltimeedu == 'pt') - change this to 'ft' for Iteration 6

router.get(/livewithparentsiteration6-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.liveparents == 'yes' ) {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single');
  } else if (req.query.liveparents == 'no' && fulltimeedu == 'pt'){
    res.redirect('/kickouts/students-developed');

  } else 
  res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single')
});


router.get(/whatissingleincomeiteration6-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6/money-coming-in-single');
  }
});

router.get(/savingssplititeration6-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/iteration-6/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6/more-than-6000');
  }
});



// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 6b
// *****************************************

router.get(/applyonlineiteration6b-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6b/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration6b-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/iteration-6b/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/iteration-6b/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/iteration-6b/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6b/country-split');
  }
});

router.get(/carehomesplititeration6b-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6b/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/partner');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6b/care-home-split');
  }
});

router.get(/partneriteration6b-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/iteration-6b/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/iteration-6b/claimed-asylum-single');
  }
});


router.get(/asylumsingleiteration6b-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/edu-or-training');
  }
});

router.get(/asylumPartneriteration6b-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/edu-or-training-partner');
  }
});

router.get(/educationtrainingiteration6b-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-6b/full-time-edu');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/money-coming-in-single');
  }
});

router.get(/educationtrainingPartneriteration6b-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/money-coming-in-partner');
  }
});


router.get(/fulltimeeduiteration6b-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/iteration-6b/student-funding');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-6b/student-funding');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6b/full-time-edu');
  }
});




router.get(/fundingiteration6b-handler/, function (req, res) {
  
 if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/student/iteration-6b/live-with-parents.html');
  }else if (req.query.funding.includes('SL-help')) {
      res.redirect('/beforeyoustart/student/iteration-6b/live-with-parents.html');
}else if (req.query.funding.includes('family-help')) {
      res.redirect('/beforeyoustart/student/iteration-6b/live-with-parents.html');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

router.get(/livewithparentsiteration6b-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.liveparents == 'yes' ) {
    res.redirect('/beforeyoustart/student/iteration-6b/money-coming-in-single');
  } else if (req.query.liveparents == 'no' && fulltimeedu == 'ft'){
    res.redirect('/kickouts/students-developed');

  } else 
  res.redirect('/beforeyoustart/student/iteration-6b/money-coming-in-single')
});


router.get(/whatissingleincomeiteration6b-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6b/money-coming-in-single');
  }
});

router.get(/savingssplititeration6b-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/iteration-6b/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/iteration-6b/more-than-6000');
  }
});

// *****************************************
// BEFORE YOU START - STUDENT - ITERATION 7
// *****************************************

router.get(/applyonlineiteration7-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-7/what-you-will-need.html');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplititeration7-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/student/iteration-7/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/student/iteration-7/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/student/iteration-7/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/student/iteration-7/country-split');
  }
});

router.get(/carehomesplititeration7-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-7/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/partner');
  } else {
    res.redirect('/beforeyoustart/student/iteration-7/care-home-split');
  }
});

router.get(/partneriteration7-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/student/iteration-7/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/student/iteration-7/claimed-asylum-single');
  }
});


router.get(/asylumsingleiteration7-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/beforeyoustart/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/edu-or-training');
  }
});

router.get(/asylumPartneriteration7-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/edu-or-training-partner');
  }
});
router.get(/educationtrainingiteration7-handler/, function (req, res) {
 
  if (req.query.educationtraining == 'yes') {
    res.redirect('/beforeyoustart/student/iteration-7/student-funding');
  } else if (req.query.educationtraining == 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single');
  }
});

router.get(/educationtrainingPartneriteration7-handler/, function (req, res) {
 
  if (req.query.educationtrainingPartner == 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.educationtrainingPartner == 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-partner');
  }
});


router.get(/fulltimeeduiteration7-handler/, function (req, res) {
 
  if (req.query.fulltimeedu == 'ft') {
    res.redirect('/beforeyoustart/student/iteration-7/student-funding');
  } else if  (req.query.fulltimeedu == 'pt') {
    res.redirect('/beforeyoustart/student/iteration-7/student-funding');
  } else {
    res.redirect('/beforeyoustart/student/iteration-7/full-time-edu');
  }
});




router.get(/fundingiteration7-handler/, function (req, res) {
  
 if (req.query.funding.includes('NHS-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('HEI-help')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('scholarship-help')) {
    res.redirect('/kickouts/students-developed');
  }else if (req.query.funding.includes('grant-help')) {
      res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.includes('none-help')) {
    res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single.html');
  }else if (req.query.funding.includes('SL-help')) {
      res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single.html');
}else if (req.query.funding.includes('family-help')) {
      res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single.html');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'SL-help,NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,HEI-help,scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'NHS-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,scholarship-help.grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'HEI-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.funding.toString() == 'scholarship-help,grant-help') {
    res.redirect('/kickouts/students-developed');
  } 
});

router.get(/livewithparentsiteration7-handler/, function (req, res) {
  
  var fulltimeedu = req.session.data['fulltimeedu'];

  if (req.query.liveparents == 'yes' ) {
    res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single');
  } else if (req.query.liveparents == 'no' && fulltimeedu == 'ft'){
    res.redirect('/kickouts/students-developed');

  } else 
  res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single')
});


router.get(/whatissingleincomeiteration7-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  } else {
    res.redirect('/beforeyoustart/student/iteration-7/money-coming-in-single');
  }
});

router.get(/savingssplititeration7-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/iteration-7/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/iteration-7/more-than-6000');
  }
});

// ************************
// PAYE
// ************************

router.get(/jobtitle-handler/, function (req, res) {
  res.redirect('../iteration-1/job-recent1');
});

router.get(/jobrecent-handler/, function (req, res) {
  if (req.query.jobrecent == 'yes') {
    res.redirect('../iteration-1/job-start-date1');
  } else if (req.query.jobrecent == 'no') {
    res.redirect('../iteration-1/job-zero-hour1');
  }
});

router.get(/jobstartdate-handler/, function (req, res) {
  if (req.query.jobstartdateday && req.query.jobstartdatemonth && req.query.jobstartdateyear) {
    res.redirect('../iteration-1/job-zero-hour1');
  } else {
    res.redirect('../iteration-1/job-start-date1');
  }
});
router.get(/zerohour-handler/, function (req, res) {
  if (req.query.zerohour == 'yes') {
    res.redirect('../iteration-1/job-how-often1');
  } else if (req.query.zerohour == 'no') {
    res.redirect('../iteration-1/job-hours1');
  }
});

router.get(/jobhours-handler/, function (req, res) {
  if (req.query.jobhours && req.query.jobminutes) {
    res.redirect('../iteration-1/job-how-often1');
  } else {
    res.redirect('../iteration-1/job-hours1');
  }
});



router.get(/joboften-handler/, function (req, res) {
  if (req.query.joboften == 'every week' || req.query.joboften == 'every 2 weeks' || req.query.joboften == 'every 4 weeks' || req.query.joboften == 'every calendar month') {
    res.redirect('../iteration-1/job-fit-notes1');
  } else if (req.query.joboften == 'it varies') {
    res.redirect('../iteration-1/job-date-last-worked1');
  } else {
    res.redirect('../iteration-1/job-how-often1');
  }
});

router.get(/jobdatelastworked-handler/, function (req, res) {
  if (req.query.jobdatelastworkedday && req.query.jobdatelastworkedmonth && req.query.jobdatelastworkedyear) {
    res.redirect('../iteration-1/job-fit-notes1');
  } else {
    res.redirect('../iteration-1/job-date-last-worked1');
  }
});

router.get(/jobfitnote-handler/, function (req, res) {
  if (req.query.jobfitnote == 'yes') {
    res.redirect('../iteration-1/job-date-fit-notes1');
  } else if (req.query.jobfitnote == 'no') {
    res.redirect('../iteration-1/job-another1');
  }
});

router.get(/jobdatefitnote-handler/, function (req, res) {
  if (req.query.jobdatefitnoteday && req.query.jobdatefitnotemonth && req.query.jobdatefitnoteyear) {
    res.redirect('../iteration-1/job-another1');
  } else {
    res.redirect('../iteration-1/job-date-fit-notes1');
  }
});


router.get(/jobanother-handler/, function (req, res) {
  if (req.query.jobanother == 'yes') {
    res.redirect('../iteration-1/job-title2');
  } else if (req.query.jobanother == 'no') {
    res.redirect('../iteration-1/pension/personal-pension1');
  }
});

// *******

// Job (Loop)

router.get(/jobtitle-loop-handler/, function (req, res) {
  res.redirect('../iteration-1/job-recent2');
});

router.get(/jobrecent-loop-handler/, function (req, res) {
  if (req.query.jobrecentloop == 'yes') {
    res.redirect('../iteration-1/job-start-date2');
  } else if (req.query.jobrecentloop == 'no') {
    res.redirect('../iteration-1/job-zero-hour2');
  }
});

router.get(/jobstartdate-loop-handler/, function (req, res) {
  if (req.query.jobstartdatedayloop && req.query.jobstartdatemonthloop && req.query.jobstartdateyearloop) {
    res.redirect('../iteration-1/job-zero-hour2');
  } else {
    res.redirect('../iteration-1/job-start-date2');
  }
});

router.get(/zerohour-loop-handler/, function (req, res) {
  if (req.query.zerohourloop == 'yes') {
    res.redirect('../iteration-1/job-how-often2');
  } else if (req.query.zerohourloop == 'no') {
    res.redirect('../iteration-1/job-hours2');
  }
});

router.get(/jobhours-loop-handler/, function (req, res) {
  if (req.query.jobhoursloop && req.query.jobminutesloop) {
    res.redirect('../iteration-1/job-how-often2');
  } else {
    res.redirect('../iteration-1/job-hours2');
  }
});

router.get(/joboften-loop-handler/, function (req, res) {
  if (req.query.joboftenloop == 'every week' || req.query.joboftenloop == 'every 2 weeks' || req.query.joboftenloop == 'every 4 weeks' || req.query.joboftenloop == 'every calendar month') {
    res.redirect('../iteration-1/job-fit-notes2');
  } else if (req.query.joboftenloop == 'it varies') {
    res.redirect('../iteration-1/job-date-last-worked2');
  } else {
    res.redirect('../iteration-1/job-how-often2');
  }
});

router.get(/jobdatelastworked-loop-handler/, function (req, res) {
  if (req.query.jobdatelastworkeddayloop && req.query.jobdatelastworkedmonthloop && req.query.jobdatelastworkedyearloop) {
    res.redirect('../iteration-1/job-fit-notes2');
  } else {
    res.redirect('../iteration-1/job-date-last-worked2');
  }
});

router.get(/jobfitnote-loop-handler/, function (req, res) {
  if (req.query.jobfitnoteloop == 'yes') {
    res.redirect('../iteration-1/job-date-fit-notes2');
  } else if (req.query.jobfitnoteloop == 'no') {
    res.redirect('../iteration-1/payslips-2');
  }
});

router.get(/jobdatefitnote-loop-handler/, function (req, res) {
  if (req.query.jobdatefitnotedayloop && req.query.jobdatefitnotemonthloop && req.query.jobdatefitnoteyearloop) {
    res.redirect('../iteration-1/payslips-2');
  } else {
    res.redirect('../iteration-1/job-date-fit-notes2');
  }
});


router.get(/jobanother-loop-handler/, function (req, res) {
  if (req.query.jobanotherloop == 'yes') {
    res.redirect('../iteration-1/job-title2');
  } else if (req.query.jobanotherloop == 'no') {
    res.redirect('../iteration-1/pension/personal-pension1');
  }
});


// *******

router.get(/jobpersonalpension-handler/, function (req, res) {
  if (req.query.jobpersonalpension == 'yes') {
    res.redirect('../../iteration-1/pension/personal-pension-name1');
  } else if (req.query.jobpersonalpension == 'no') {
    res.redirect('../../iteration-1/answers');
  }
});

router.get(/jobpensiontitle-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often1');
});

router.get(/jobpersonalpensionhowoften-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoften == 'every week' || req.query.jobpersonalpensionhowoften == 'every 2 weeks' || req.query.jobpersonalpensionhowoften == 'every 4 weeks' || req.query.jobpersonalpensionhowoften == 'every calendar month' || req.query.jobpersonalpensionhowoften == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoften == 'once a year') {
    res.redirect('../../iteration-1/pension/personal-pension-how-much1');
  } else {
    res.redirect('personal-pension-how-often1');
  }
});

router.get(/jobpersonalpensionhowmuch-handler/, function (req, res) {
  res.redirect('personal-pension-another1');
});

router.get(/jobpersonalpensionanother-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanother == 'yes') {
    res.redirect('../../iteration-1/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanother == 'no') {
    res.redirect('../../../answers');
  }
});

// *******

// Personal Pension (Loop)

router.get(/jobpersonalpension-loop-handler/, function (req, res) {
  if (req.query.jobpersonalpensionloop == 'yes') {
    res.redirect('../../iteration-1/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionloop == 'no') {
    res.redirect('../../../answers');
  }
});

router.get(/jobpensiontitle-loop-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often2');
});

router.get(/jobpersonalpensionhowoften-loop-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoftenloop == 'every week' || req.query.jobpersonalpensionhowoftenloop == 'every 2 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every 4 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every calendar month' || req.query.jobpersonalpensionhowoftenloop == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoftenloop == 'once a year') {
    res.redirect('../../iteration-1/pension/personal-pension-how-much2');
  } else {
    res.redirect('personal-pension-how-often2');
  }
});

router.get(/jobpersonalpensionhowmuch-loop-handler/, function (req, res) {
  res.redirect('personal-pension-another2');
});

router.get(/jobpersonalpensionanother-loop-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanotherloop == 'yes') {
    res.redirect('../../iteration-1/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanotherloop == 'no') {
    res.redirect('../../answers');
  }
});

// ************************
// PENSIONS Iteration 1
// ************************

router.get(/statepension-handler/, function (req, res) {
  if (req.query.statepension== 'yes') {
    res.redirect('../iteration1/state-pension-how-often');
  } else if (req.query.statepension == 'no') {
    res.redirect('../iteration1/pension-name');
  }
});

router.get(/statepensionhowoften-handler/, function (req, res) {
  if (req.query.statepensionhowoften == 'every week' || req.query.statepensionhowoften == 'every 2 weeks' || req.query.statepensionhowoften == 'every 4 weeks' || req.query.statepensionhowoften == 'every 13 weeks (quarterly)' || req.query.statepensionhowoften == 'once a year') {
    res.redirect('../iteration1/state-pension-how-much');
  } else {
    res.redirect('../iteration1/state-pension-how-often');
  }
});

router.get(/statepensionhowmuch-handler/, function (req, res) {
  res.redirect('../iteration1/pension-another-1');
});

router.get(/statepensionanother-handler/, function (req, res) {
  if (req.query.statepensionanother == 'yes') {
    res.redirect('../iteration1/pension-name');
  } else if (req.query.statepensionanother == 'no') {
    res.redirect('../iteration1/answers-state-pension');
  }
});

router.get(/pensiontitle-handler/, function (req, res) {
  res.redirect('../iteration1/pension-how-often');
});

router.get(/pensionhowoften-handler/, function (req, res) {
  if (req.query.pensionhowoften == 'every week' || req.query.pensionhowoften == 'every 2 weeks' || req.query.pensionhowoften == 'every 4 weeks' || req.query.pensionhowoften == 'every calendar month' || req.query.pensionhowoften == 'every 13 weeks (quarterly)' || req.query.pensionhowoften == 'once a year') {
    res.redirect('../iteration1/pension-how-much');
  } else {
    res.redirect('../iteration1/pension-how-often');
  }
});

router.get(/personalpensionhowmuch-handler/, function (req, res) {
  res.redirect('../iteration1/pension-another-2');
});

router.get(/personalpensionanother-handler/, function (req, res) {
  if (req.query.personalpensionanother == 'yes') {
    res.redirect('../iteration1/pension-name');
  } else if (req.query.personalpensionanother == 'no') {
    res.redirect('../iteration1/answers-state-pension');
  }
});


// ************************
// PENSIONS Iteration 2
// ************************


router.get(/statepensioniteration2-handler/, function (req, res) {
  if (req.query.statepension== 'yes') {
    res.redirect('../iteration2/state-pension-how-often');
  } else if (req.query.statepension == 'no') {
    res.redirect('../iteration2/pension-name');
  }
});

router.get(/statepensionhowofteniteration2-handler/, function (req, res) {
  if (req.query.statepensionhowoften == 'every week' || req.query.statepensionhowoften == 'every 2 weeks' || req.query.statepensionhowoften == 'every 4 weeks' || req.query.statepensionhowoften == 'every 13 weeks (quarterly)' || req.query.statepensionhowoften == 'once a year') {
    res.redirect('../iteration2/state-pension-how-much');
  } else {
    res.redirect('../iteration2/state-pension-how-often');
  }
});

router.get(/statepensionhowmuchiteration2-handler/, function (req, res) {
  res.redirect('../iteration2/pension-another-1');
});

router.get(/statepensionanotheriteration2-handler/, function (req, res) {
  if (req.query.statepensionanother == 'yes') {
    res.redirect('../iteration2/pension-name');
  } else if (req.query.statepensionanother == 'no') {
    res.redirect('../iteration2/pension-credit-receive');
  }
});

router.get(/pensiontitleiteration2-handler/, function (req, res) {
  res.redirect('../iteration2/pension-how-often');
});

router.get(/pensionhowofteniteration2-handler/, function (req, res) {
  if (req.query.pensionhowoften == 'every week' || req.query.pensionhowoften == 'every 2 weeks' || req.query.pensionhowoften == 'every 4 weeks' || req.query.pensionhowoften == 'every calendar month' || req.query.pensionhowoften == 'every 13 weeks (quarterly)' || req.query.pensionhowoften == 'once a year') {
    res.redirect('../iteration2/pension-how-much');
  } else {
    res.redirect('../iteration2/pension-how-often');
  }
});

router.get(/savingscredititeration2-handler/, function (req, res) {
  if (req.query.savingscredititeration2 == 'every week') {
    res.redirect('../iteration2/Savings-credit-how-much');
  } else if (req.query.savingscredititeration2 == 'every 4 weeks'){
    res.redirect('../iteration2/Savings-credit-how-much');
  } else {
    res.redirect('../iteration2/Savings-credit-how-often');
  }
});


router.get(/scpersonalpensionhowmuchiteration2-handler/, function (req, res) {
  res.redirect('../iteration2/answers');
});

router.get(/personalpensionhowmuchiteration2-handler/, function (req, res) {
  res.redirect('../iteration2/pension-another-2');
});

router.get(/personalpensionanotheriteration2-handler/, function (req, res) {
  if (req.query.personalpensionanother == 'yes') {
    res.redirect('../iteration2/pension-name');
  } else if (req.query.personalpensionanother == 'no') {
    res.redirect('../iteration2/pension-credit-receive');
  }
});

router.get(/pensioncredititeration2-handler/, function (req, res) {
  if (req.query.pensioncredit == 'yes') {
    res.redirect('../iteration2/pension-credit-type');
  } else if (req.query.pensioncredit == 'no') {
    res.redirect('../iteration2/answers');
  }
});

router.get(/pensioncredittypeiteration2-handler/, function (req, res) {

    if (req.query.pensioncredittype == 'GC') {
    res.redirect('../iteration2/passport-pensioncredit');
    } else if (req.query.pensioncredittype == 'GCwithSC') {
      res.redirect('../iteration2/passport-pensioncredit');
    } else if (req.query.pensioncredittype == 'SC') {
      res.redirect('../iteration2/answers');
    } else {
      res.redirect('../iteration2/pension-credit-type');
    }
});

router.get(/pensioncredithowofteniteration2-handler/, function (req, res) {
  if (req.query.pensioncredithowoften == 'every week' || req.query.pensioncredithowoften == 'every 2 weeks' || req.query.pensioncredithowoften == 'every 4 weeks' || req.query.pensioncredithowoften == 'every 13 weeks (quarterly)' || req.query.pensioncredithowoften == 'once a year') {
    res.redirect('../iteration2/pension-credit-how-much');
  } else {
    res.redirect('../iteration2/pension-credit-how-often');
  }
});



// ************************
// MAINTENANCE PAYMENTS
// ************************

router.get(/maintenancefor-handler/, function (req, res) {
  if (req.query.maintenancefor == 'for you') {
    applicant.maintenancefor = 'for you';
    res.redirect('../maintenance/maintenance-how-often');
  } if (req.query.maintenancefor == 'for your children') {
    applicant.maintenancefor = 'for your children';
    res.redirect('../maintenance/answers');
  } else if (req.query.maintenancefor == 'both of the above') {
    applicant.maintenancefor = 'both of the above';
    res.redirect('../maintenance/maintenance-how-often');
  }
});

router.get(/maintenancehowoften-handler/, function (req, res) {
  if (applicant.maintenancefor == 'for you') {
    res.redirect('../maintenance/maintenance-how-much-you');
  } else if (applicant.maintenancefor == 'both of the above') {
    res.redirect('../maintenance/maintenance-how-much-you-only');
  } 
});

router.get(/maintenanceyouhowmuch-handler/, function (req, res) {
  res.redirect('../maintenance/answers');
});

router.get(/maintenanceyouonlyhowmuch-handler/, function (req, res) {
  res.redirect('../maintenance/answers');
});




// ************************
// BENEFITS
// ************************

router.get(/universalcredit-handler/, function (req, res) {
  if (req.query.universalcredit == 'yes') {
    res.redirect('../benefits/tax-credits');
  } if (req.query.universalcredit == 'no') {
    res.redirect('../benefits/tax-credits');
  } else if (req.query.universalcredit == 'not-yet') {
    res.redirect('../benefits/tax-credits');
  }
});

router.get(/taxcredits-handler/, function (req, res) {
  if (req.query.taxcredits == 'yes') {
    res.redirect('../benefits/tax-credits-type');
  } else if (req.query.taxcredits == 'no') {
    res.redirect('../benefits/other-benefits');
  }
});

router.get(/taxcredittype-handler/, function (req, res) {
  if (req.query.taxcredittype == 'WTCCTC') {
    res.redirect('../benefits/other-benefits');
  } if (req.query.taxcredittype == 'WTCDisability') {
    res.redirect('../benefits/other-benefits');
  } if (req.query.taxcredittype == 'WTC') {
    res.redirect('../benefits/other-benefits');
  } else if (req.query.taxcredittype == 'CTC') {
    res.redirect('../benefits/other-benefits');
  }
});

router.get(/otherbenefits-handler/, function (req, res) {
  res.redirect('../benefits/answers');
});

// ******************************
// MONEY FROM OTHER SOURCES - MVP
// ******************************

router.get(/howpaying-handler/, function (req, res) {
  if (req.query.howpaying == 'money from friends or family') {
    res.redirect('../mvp/none-how-much');
  } else if (req.query.howpaying == 'savings') {
    res.redirect('../mvp/none-how-much');
  } else if (req.query.howpaying == 'donations') {
    res.redirect('../mvp/none-how-much');
  } else if (req.query.howpaying == 'none of these') {
    res.redirect('../mvp/none-how-supporting');
  }
});

router.get(/nonehowsupporting-handler/, function (req, res) {
  res.redirect('../mvp/none-how-much');
});

router.get(/nonehowmuch-handler/, function (req, res) {
  res.redirect('../mvp/answers');
});

// **************************************
// MONEY FROM OTHER SOURCES - ITERATION 1
// **************************************

router.get(/howpayingiteration1-handler/, function (req, res) {
  if (req.query.howpaying == 'money from friends or family') {   
    res.redirect('../iteration-1/none-how-much-friends');
  } else if (req.query.howpaying == 'savings') {
    res.redirect('../iteration-1/none-how-much-savings');
  } else if (req.query.howpaying == 'donations') {
    res.redirect('../iteration-1/none-how-much-donations');
  } else if (req.query.howpaying.toString() == 'money from friends or family,savings,donations') {
    res.redirect('../iteration-1/none-how-much-friends');
  } else if (req.query.howpaying.toString() == 'money from friends or family,savings') {
    res.redirect('../iteration-1/none-how-much-friends');
  } else if (req.query.howpaying.toString() == 'money from friends or family,donations') {
    res.redirect('../iteration-1/none-how-much-friends');
  } else if (req.query.howpaying.toString() == 'savings,donations') {
    res.redirect('../iteration-1/none-how-much-savings');
  } else if (req.query.howpaying == 'none of these') {
    res.redirect('../iteration-1/none-how-supporting');
  }
});

router.get(/nonehowsupporting1-handler/, function (req, res) {
  res.redirect('../iteration-1/answers');
});

router.get(/nonehowmuch1-handler/, function (req, res) {
  res.redirect('../iteration-1/answers');
});

// ************************
// SUBMIT APPLICATION
// ************************

router.get(/evidencebyemailmvp-handler/, function (req, res) {
  res.redirect('../mvp/declaration');
});

router.get(/evidencebyemailiteration1-handler/, function (req, res) {
  res.redirect('../iteration-1/declaration');
});

router.get(/evidencebyemail-iteration-5-handler/, function (req, res) {
  if (req.query.evidencebyemail == 'post') {
    res.redirect('declaration');
  } else if (req.query.evidencebyemail && req.query.emailconfirm == 'emailconfirm') {
    res.redirect('declaration');
  } else {
    res.redirect('email-or-post');
  }
});

router.get(/evidencebyemail-iteration-6-handler/, function (req, res) {
  if (req.query.evidencebyemail == 'post') {
    res.redirect('declaration');
  } else if (req.query.evidencebyemail && req.query.emailconfirm == 'emailconfirm') {
    res.redirect('email');
  } else {
    res.redirect('email-or-post');
  }
});

// ************************
// SAVE & RESTORE (MVP)
// ************************

router.get(/resumeapplication-handler/, function (req, res) {
  if (req.query.memorableword == '' && req.query.reference == '' && req.query.day == '' && req.query.month == '' && req.query.year == '') {
    res.redirect('/apply/save-restore/mvp/return-application-error4');
  } else if (req.query.memorableword == '' && req.query.reference && req.query.day && req.query.month && req.query.year) {
    res.redirect('/apply/save-restore/mvp/return-application-error1');
  } else if (req.query.memorableword && req.query.reference == '' && req.query.day && req.query.month && req.query.year) {
      res.redirect('/apply/save-restore/mvp/return-application-error2');
  } else if (req.query.memorableword && req.query.reference && req.query.day == '' && req.query.month && req.query.year) {
      res.redirect('/apply/save-restore/mvp/return-application-error3');
  } else if (req.query.memorableword && req.query.reference && req.query.day && req.query.month == '' && req.query.year) {
      res.redirect('/apply/save-restore/mvp/return-application-error3');
  } else if (req.query.memorableword && req.query.reference && req.query.day && req.query.month && req.query.year == '') {
      res.redirect('/apply/save-restore/mvp/return-application-error3');
  } else if (req.query.memorableword && req.query.reference && req.query.day && req.query.month && req.query.year) {
    res.redirect('/apply/save-restore/mvp/task-list-in-progress');
  } else {
    res.redirect('/apply/save-restore/mvp/start-again');
  }
});

router.get(/partnerSaveRestore-handler/, function (req, res) {
  if (req.query.partner == 'yes' ) {
    applicant.partner = true;
    res.redirect('/apply/save-restore/mvp/asylum/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/apply/save-restore/mvp/asylum/claimed-asylum-single');
  }
});

router.get(/whatispartnersincomeSaveRestore-handler/, function (req, res) {
  if (req.query.incomepartner.includes('earned-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('UCWTC-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('maintenance-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('maternitypaternity-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('apprenticeship-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('trustfunds-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('selfemployed-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner == 'benefits-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner == 'pension-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.incomepartner == 'nil-income') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } 
});

router.get(/whatissingleincomeSaveRestore-handler/, function (req, res) {
  if (req.query.incomesingle.includes('earned-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('UCWTC-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle == 'benefits-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } else if (req.query.incomesingle == 'nil-income') {
    res.redirect('/apply/save-restore/mvp/save-application');
  } 
});

router.get(/asylumsingleSaveRestore-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/apply/save-restore/mvp/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  }
});

router.get(/asylumPartnerSaveRestore-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('../../kickouts/developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-partner');
  }
});

router.get(/asylumdecisionSaveRestore-handler/, function (req, res) {
  if (req.query.asylumdecision == 'still-waiting') {
    res.redirect('/apply/save-restore/mvp/asylum/who-is-supporting-you');
  } else if (req.query.asylumdecision == 'given-permission') {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.asylumdecision == 'refused-permission') {
    res.redirect('/apply/save-restore/mvp/asylum/who-is-supporting-you');
  }
});

router.get(/whoissupportingSaveRestore-handler/, function (req, res) {
  if (req.query.whoissupporting.includes('uk-visas')) {
    res.redirect('/apply/save-restore/mvp/asylum/passport');
  } else if (req.query.whoissupporting == 'local-authority') {
    res.redirect('/apply/save-restore/mvp/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'a-charity') {
    res.redirect('/apply/save-restore/mvp/asylum/what-type-of-support');
  } else if (req.query.whoissupporting.toString() == 'local-authority,a-charity') {
    res.redirect('/apply/save-restore/mvp/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'none') {
    res.redirect('/apply/save-restore/mvp/asylum/tell-us-supporting-you');
  } 
});

router.get(/telluswhoissupportingyouSaveRestore-handler/, function (req, res) {
  res.redirect('/apply/save-restore/mvp/asylum/what-type-of-support');
});

router.get(/whatsupportSaveRestore-handler/, function (req, res) {
  if (req.query.whatsupport.includes('cash')) {
    res.redirect('/apply/save-restore/mvp/asylum/how-often-receive');
  } else if (req.query.whatsupport.includes('vouchers')) {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.whatsupport.includes('prepaid-card')) {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  } else if (req.query.whatsupport.includes('food-meals')) {
    res.redirect('/apply/save-restore/mvp/money-coming-in-single');
  }
});

router.get(/asylumhowoftenSaveRestore-handler/, function (req, res) {
  if (req.query.asylumhowoften == 'every week' || req.query.asylumhowoften == 'every 2 weeks' || req.query.asylumhowoften == 'every 4 weeks' || req.query.asylumhowoften == 'every calendar month') {
    res.redirect('/apply/save-restore/mvp/asylum/how-much-you-receive');
  } else {
    res.redirect('/apply/save-restore/mvp/asylum/how-often-receive');
  }
});

router.get(/asylumhowmuchSaveRestore-handler/, function (req, res) {
  res.redirect('/apply/save-restore/mvp/answers-asylum');
});

router.get(/saveapplicationSaveRestore-handler/, function (req, res) {
  if (req.query.saveapplication == 'yes') {
    res.redirect('/apply/save-restore/mvp/memorable-word');
  } else if (req.query.saveapplication == 'no') {
    res.redirect('/apply/save-restore/mvp/answers');
  }
});

// ************************
// SAVE & RESTORE (Iteration 1)
// ************************

router.get(/saveforlaterSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.saveforlater == 'yes' ) {
    applicant.saveforlater = true;
    res.redirect('/apply/save-restore/iteration-1/text-or-email-bys');
  } else if (req.query.saveforlater == 'no') {
    applicant.saveforlater = false;
    res.redirect('/apply/save-restore/iteration-1/answers');
  }
});

router.get(/carehomeSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.carehome == 'yes' ) {
    res.redirect('/apply/save-restore/iteration-1/partner');
  } else if (req.query.carehome == 'no') {
    res.redirect('/apply/save-restore/iteration-1/partner');
  }
});

router.get(/capitalsavingsSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.capitalsavings == 'yes' ) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.capitalsavings == 'no') {
    res.redirect('/apply/save-restore/iteration-1/education');
  }
});

router.get(/educationSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.education == 'yes' ) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.education == 'no') {
    res.redirect('/apply/save-restore/iteration-1/save-for-later');
  }
});

router.get(/resumeapplicationtextiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-text-code');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/further-check');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/resumeapplicationemailiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-email-code');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/further-check');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/saveapplicationtextiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-text-code-verify');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-text');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/saveapplicationemailiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-email-code-verify');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-email');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/saveapplicationtextBYSiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-text-code-verify');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-text-bys');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/saveapplicationemailBYSiteration1-handler/, function (req, res) {
  if (req.query.code == '') {
    res.redirect('/apply/save-restore/iteration-1/enter-email-code-verify');
  } else if (req.query.code) {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-email-bys');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/memorablewordtextiteration1-handler/, function (req, res) {
  if (req.query.memorableword == '') {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-text-bys');
  } else if (req.query.memorableword) {
    res.redirect('/apply/save-restore/iteration-1/saved-textmessage-bys');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/memorablewordemailiteration1-handler/, function (req, res) {
  if (req.query.memorableword == '') {
    res.redirect('/apply/save-restore/iteration-1/memorable-word-email-bys');
  } else if (req.query.memorableword) {
    res.redirect('/apply/save-restore/iteration-1/saved-email-bys');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});


router.get(/furthercheckiteration1-handler/, function (req, res) {
  if (req.query.memorablewordenter == '') {
    res.redirect('/apply/save-restore/iteration-1/further-check-error');
  } else if (req.query.memorablewordenter) {
    res.redirect('/apply/save-restore/iteration-1/task-list-in-progress');    
  } else {
    res.redirect('/apply/save-restore/iteration-1/start-again');
  }
});

router.get(/partnerSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.partner == 'yes' ) {
    applicant.partner = true;
    res.redirect('/apply/save-restore/iteration-1/asylum/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/apply/save-restore/iteration-1/asylum/claimed-asylum-single');
  }
});

router.get(/whatispartnersincomeSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.incomepartner.includes('earned-income')) {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner.includes('maintenance-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('maternitypaternity-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('apprenticeship-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('trustfunds-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner.includes('selfemployed-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomepartner == 'benefits-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'benefits-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner.toString() == 'pension-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner == 'pension-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.incomepartner == 'nil-income') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } 
});

router.get(/whatissingleincomeSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.incomesingle.includes('earned-income')) {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../../../kickouts/developed');
  } else if (req.query.incomesingle == 'benefits-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } else if (req.query.incomesingle == 'nil-income') {
    res.redirect('/apply/save-restore/iteration-1/capital-savings');
  } 
});

router.get(/asylumsingleSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.redirect('/apply/save-restore/iteration-1/asylum/asylum-decision');
  } else if (req.query.asylumsingle == 'no') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  }
});

router.get(/asylumPartnerSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('../../kickouts/developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-partner');
  }
});

router.get(/asylumdecisionSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.asylumdecision == 'still-waiting') {
    res.redirect('/apply/save-restore/iteration-1/asylum/ukvi');
  } else if (req.query.asylumdecision == 'given-permission') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.asylumdecision == 'refused-permission') {
    res.redirect('/apply/save-restore/iteration-1/asylum/ukvi');
  }
});

router.get(/ukviSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.ukvi == 'yes') {
    res.redirect('/apply/save-restore/iteration-1/asylum/passport');
  } else if (req.query.ukvi == 'no') {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  }
});

router.get(/whoissupportingSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.whoissupporting.includes('uk-visas')) {
    res.redirect('/apply/save-restore/iteration-1/asylum/passport');
  } else if (req.query.whoissupporting == 'local-authority') {
    res.redirect('/apply/save-restore/iteration-1/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'a-charity') {
    res.redirect('/apply/save-restore/iteration-1/asylum/what-type-of-support');
  } else if (req.query.whoissupporting.toString() == 'local-authority,a-charity') {
    res.redirect('/apply/save-restore/iteration-1/asylum/what-type-of-support');
  } else if (req.query.whoissupporting == 'none') {
    res.redirect('/apply/save-restore/iteration-1/asylum/tell-us-supporting-you');
  } 
});

router.get(/telluswhoissupportingyouSaveRestoreiteration1-handler/, function (req, res) {
  res.redirect('/apply/save-restore/iteration-1/asylum/what-type-of-support');
});

router.get(/whatsupportSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.whatsupport.includes('cash')) {
    res.redirect('/apply/save-restore/iteration-1/asylum/how-often-receive');
  } else if (req.query.whatsupport.includes('vouchers')) {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.whatsupport.includes('prepaid-card')) {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  } else if (req.query.whatsupport.includes('food-meals')) {
    res.redirect('/apply/save-restore/iteration-1/money-coming-in-single');
  }
});

router.get(/asylumhowoftenSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.asylumhowoften == 'every week' || req.query.asylumhowoften == 'every 2 weeks' || req.query.asylumhowoften == 'every 4 weeks' || req.query.asylumhowoften == 'every calendar month') {
    res.redirect('/apply/save-restore/iteration-1/asylum/how-much-you-receive');
  } else {
    res.redirect('/apply/save-restore/iteration-1/asylum/how-often-receive');
  }
});

router.get(/asylumhowmuchSaveRestoreiteration1-handler/, function (req, res) {
  res.redirect('/apply/save-restore/iteration-1/answers-asylum');
});

router.get(/saveapplicationSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.saveapplication == 'yes') {
    res.redirect('/apply/save-restore/iteration-1/memorable-word');
  } else if (req.query.saveapplication == 'no') {
    res.redirect('/apply/save-restore/iteration-1/answers');
  }
});

router.get(/textemailSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.redirect('/apply/save-restore/iteration-1/email');
  } else if (req.query.textemail == 'textmessage') {
    res.redirect('/apply/save-restore/iteration-1/textmessage');
  }
});

router.get(/textemailmethodSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.redirect('/apply/save-restore/iteration-1/email-verify');
  } else if (req.query.textemail == 'textmessage') {
    res.redirect('/apply/save-restore/iteration-1/textmessage-verify');
  }
});

router.get(/textemailmethodBYSSaveRestoreiteration1-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.redirect('/apply/save-restore/iteration-1/email-verify-bys');
  } else if (req.query.textemail == 'textmessage') {
    res.redirect('/apply/save-restore/iteration-1/textmessage-verify-bys');
  }
});

// ************************
// SAVE & RESTORE (Iteration 2)
// ************************

router.get(/saveforlaterSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.saveforlater == 'yes' ) {
    applicant.saveforlater = true;
    res.render('apply/save-restore/iteration-2/text-or-email-bys', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.saveforlater == 'no') {
    applicant.saveforlater = false;
    res.render('apply/save-restore/iteration-2/answers', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/carehomeSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.carehome == 'yes' ) {
    res.render('apply/save-restore/iteration-2/partner', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.carehome == 'no') {
    res.render('apply/save-restore/iteration-2/partner', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/capitalsavingsSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.capitalsavings == 'yes' ) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.capitalsavings == 'no') {
    res.render('apply/save-restore/iteration-2/education', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/educationSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.education == 'yes' ) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.education == 'no') {
    res.render('apply/save-restore/iteration-2/save-for-later', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/resumeapplicationtextiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-text-code', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/further-check', {
      thirdparty : benificiary.thirdParty
    });   
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/resumeapplicationemailiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-email-code', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/further-check', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/saveapplicationtextiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-text-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/memorable-word-text', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/saveapplicationemailiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-email-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/memorable-word-email', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/saveapplicationtextBYSiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-text-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/memorable-word-text-bys', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/saveapplicationemailBYSiteration2-handler/, function (req, res) {
  if (req.query.code == '') {
    res.render('apply/save-restore/iteration-2/enter-email-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.code) {
    res.render('apply/save-restore/iteration-2/memorable-word-email-bys', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/memorablewordtextiteration2-handler/, function (req, res) {
  if (req.query.memorableword == '') {
    res.render('apply/save-restore/iteration-2/memorable-word-text-bys', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.memorableword) {
    res.render('apply/save-restore/iteration-2/saved-textmessage-bys', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/memorablewordemailiteration2-handler/, function (req, res) {
  if (req.query.memorableword == '') {
    res.render('apply/save-restore/iteration-2/memorable-word-email-bys', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.memorableword) {
    res.render('apply/save-restore/iteration-2/saved-email-bys', {
      thirdparty : benificiary.thirdParty
    });   
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});


router.get(/furthercheckiteration2-handler/, function (req, res) {
  if (req.query.memorablewordenter == '') {
    res.render('apply/save-restore/iteration-2/further-check-error', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.memorablewordenter) {
    res.render('apply/save-restore/iteration-2/task-list-in-progress', {
      thirdparty : benificiary.thirdParty
    });    
  } else {
    res.render('apply/save-restore/iteration-2/start-again', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/partnerSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.partner == 'yes' ) {
    applicant.partner = true;
    res.render('apply/save-restore/iteration-2/asylum/claimed-asylum-partner', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.render('apply/save-restore/iteration-2/asylum/claimed-asylum-single', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/whatispartnersincomeSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.incomepartner.includes('earned-income')) {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.includes('maintenance-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.includes('maternitypaternity-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.includes('apprenticeship-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.includes('trustfunds-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.includes('selfemployed-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner == 'benefits-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.toString() == 'benefits-income,pension-income,nil-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.toString() == 'benefits-income,nil-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner.toString() == 'pension-income,nil-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner == 'pension-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomepartner == 'nil-income') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } 
});

router.get(/whatissingleincomeSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.incomesingle.includes('earned-income')) {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.includes('maintenance-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle == 'benefits-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.toString() == 'benefits-income,pension-income,nil-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle == 'pension-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.incomesingle == 'nil-income') {
    res.render('apply/save-restore/iteration-2/capital-savings', {
      thirdparty : benificiary.thirdParty
    });
  } 
});

router.get(/asylumsingleSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.asylumsingle == 'yes') {
    res.render('apply/save-restore/iteration-2/asylum/asylum-decision', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.asylumsingle == 'no') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/asylumPartnerSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.render('kickouts/developed', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.asylumPartner == 'no') {
    res.render('apply/save-restore/iteration-2/money-coming-in-partner', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/asylumdecisionSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.asylumdecision == 'still-waiting') {
    res.render('apply/save-restore/iteration-2/asylum/ukvi', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.asylumdecision == 'given-permission') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.asylumdecision == 'refused-permission') {
    res.render('apply/save-restore/iteration-2/asylum/ukvi', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/ukviSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.ukvi == 'yes') {
    res.render('apply/save-restore/iteration-2/asylum/passport', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.ukvi == 'no') {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/whoissupportingSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.whoissupporting.includes('uk-visas')) {
    res.render('apply/save-restore/iteration-2/asylum/passport', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whoissupporting == 'local-authority') {
    res.render('apply/save-restore/iteration-2/asylum/what-type-of-support', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whoissupporting == 'a-charity') {
    res.render('apply/save-restore/iteration-2/asylum/what-type-of-support', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whoissupporting.toString() == 'local-authority,a-charity') {
    res.render('apply/save-restore/iteration-2/asylum/what-type-of-support', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whoissupporting == 'none') {
    res.render('apply/save-restore/iteration-2/asylum/tell-us-supporting-you', {
      thirdparty : benificiary.thirdParty
    });
  } 
});

router.get(/telluswhoissupportingyouSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/asylum/what-type-of-support', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/whatsupportSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.whatsupport.includes('cash')) {
    res.render('apply/save-restore/iteration-2/asylum/how-often-receive', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whatsupport.includes('vouchers')) {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whatsupport.includes('prepaid-card')) {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.whatsupport.includes('food-meals')) {
    res.render('apply/save-restore/iteration-2/money-coming-in-single', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/asylumhowoftenSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.asylumhowoften == 'every week' || req.query.asylumhowoften == 'every 2 weeks' || req.query.asylumhowoften == 'every 4 weeks' || req.query.asylumhowoften == 'every calendar month') {
    res.render('apply/save-restore/iteration-2/asylum/how-much-you-receive', {
      thirdparty : benificiary.thirdParty
    });
  } else {
    res.render('apply/save-restore/iteration-2/asylum/how-often-receive', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/asylumhowmuchSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/answers-asylum', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/saveapplicationSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.saveapplication == 'yes') {
    res.render('apply/save-restore/iteration-2/memorable-word', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.saveapplication == 'no') {
    res.render('apply/save-restore/iteration-2/answers', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/textemailSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.render('apply/save-restore/iteration-2/email', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.textemail == 'textmessage') {
    res.render('apply/save-restore/iteration-2/textmessage', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/textemailmethodSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.render('apply/save-restore/iteration-2/enter-email-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.textemail == 'textmessage') {
    res.render('apply/save-restore/iteration-2/enter-text-code-verify', {
      thirdparty : benificiary.thirdParty
    });
  }
});

router.get(/textemailmethodBYSSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.textemail == 'email' ) {
    res.render('apply/save-restore/iteration-2/enter-email-code-verify-bys', {
      thirdparty : benificiary.thirdParty
    });
  } else if (req.query.textemail == 'textmessage') {
    res.render('apply/save-restore/iteration-2/enter-text-code-verify-bys', {
      thirdparty : benificiary.thirdParty
    });
  }
});





// ************************
// BENEFITS (Iteration 1)
// ************************

router.get(/universalcredititeration1-handler/, function (req, res) {
  if (req.query.universalcredit == 'yes') {
    res.redirect('universal-credit-any');
  } if (req.query.universalcredit == 'no') {
    res.redirect('tax-credits');
  } else if (req.query.universalcredit == 'not-yet') {
    res.redirect('tax-credits');
  }
});

router.get(/universalcreditanyiteration1-handler/, function (req, res) {
  if (req.query.universalcreditany == 'yes') {
    res.redirect('universal-credit-935');
  } else if (req.query.universalcreditany == 'no') {
    res.redirect('universal-credit-435');
  }
});

router.get(/universalcredit935iteration1-handler/, function (req, res) {
  if (req.query.universalcredit935 == 'yes') {
    res.redirect('passport-935');
  } else if (req.query.universalcredit935 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/universalcredit435iteration1-handler/, function (req, res) {
  if (req.query.universalcredit435 == 'yes') {
    res.redirect('passport-435');
  } else if (req.query.universalcredit435 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/taxcreditsiteration1-handler/, function (req, res) {
  if (req.query.taxcredits == 'yes') {
    res.redirect('../benefits/tax-credits-type');
  } else if (req.query.taxcredits == 'no') {
    res.redirect('../benefits/other-benefits');
  }
});

router.get(/taxcredittypeiteration1-handler/, function (req, res) {
  if (req.query.taxcredittype == 'WTCCTC') {
    res.redirect('../benefits/other-benefits');
  } if (req.query.taxcredittype == 'WTCDisability') {
    res.redirect('../benefits/other-benefits');
  } if (req.query.taxcredittype == 'WTC') {
    res.redirect('../benefits/other-benefits');
  } else if (req.query.taxcredittype == 'CTC') {
    res.redirect('../benefits/other-benefits');
  }
});

router.get(/otherbenefitsiteration1-handler/, function (req, res) {
  res.redirect('../benefits/answers');
});

// ************************
// BENEFITS (Iteration 2 & 3)
// ************************

router.get(/universalcredititeration23-handler/, function (req, res) {
  if (req.query.universalcredit == 'yes') {
    res.redirect('tax-credits');
  } if (req.query.universalcredit == 'no') {
    res.redirect('tax-credits');
  } else if (req.query.universalcredit == 'not-yet') {
    res.redirect('tax-credits');
  }
});

router.get(/taxcreditsiteration23-handler/, function (req, res) {
  if (req.query.taxcredits == 'yes') {
    res.redirect('tax-credits-type');
  } else if (req.query.taxcredits == 'no') {
    res.redirect('other-benefits');
  }
});

router.get(/taxcredittypeiteration23-handler/, function (req, res) {
  if (req.query.taxcredittype == 'WTCCTC') {
    res.redirect('other-benefits');
  } if (req.query.taxcredittype == 'WTCDisability') {
    res.redirect('other-benefits');
  } if (req.query.taxcredittype == 'WTC') {
    res.redirect('other-benefits');
  } else if (req.query.taxcredittype == 'CTC') {
    res.redirect('other-benefits');
  }
});

router.get(/otherbenefitsiteration23-handler/, function (req, res) {
  res.redirect('additional-benefits');
});

router.get(/additionalbenefitsiteration23-handler/, function (req, res) {
  res.redirect('carers-allowance');
});

router.get(/carersallowanceiteration23-handler/, function (req, res) {
  res.redirect('answers');
});

// ************************
// COUNCIL TAX (Iteration 1)
// ************************

router.get(/counciltaxiteration1-handler/, function (req, res) {
  if (req.query.counciltax == 'yes') {
    res.redirect('council-tax-frequency');
  } else if (req.query.counciltax == 'no') {
    res.redirect('check-your-answers');
  }
});

router.get(/counciltaxfrequencyiteration1-handler/, function (req, res) {
  if (req.query.counciltaxfrequency == '10') {
    res.redirect('council-tax-month');
  } if (req.query.counciltaxfrequency == '12') {
    res.redirect('council-tax-month');
  } else if (req.query.counciltaxfrequency == 'lump') {
    res.redirect('council-tax-lump');
  }
});

router.get(/counciltaxmonthiteration1-handler/, function (req, res) {
  if (req.query.counciltaxmonth) {
    res.redirect('check-your-answers-month');
  } else {
    res.redirect('council-tax-month');
  }
});

router.get(/counciltaxlumpiteration1-handler/, function (req, res) {
  if (req.query.counciltaxlump) {
    res.redirect('check-your-answers-lump');
  } else {
    res.redirect('council-tax-lump');
  }
});

// ************************
// COUNCIL TAX (Iteration 2)
// ************************

router.get(/counciltaxiteration2-handler/, function (req, res) {
  if (req.query.counciltax == 'yes') {
    res.redirect('council-tax-frequency');
  } else if (req.query.counciltax == 'no') {
    res.redirect('check-your-answers');
  }
});

router.get(/counciltaxfrequencyiteration2-handler/, function (req, res) {
  if (req.query.counciltaxfrequency == '10') {
    res.redirect('council-tax-month');
  } else if (req.query.counciltaxfrequency == '12') {
    res.redirect('council-tax-month');
  } else if (req.query.counciltaxfrequency == 'yearly') {
    res.redirect('council-tax-lump');
  }
});

router.get(/counciltaxmonthlyperioditeration2-handler/, function (req, res) {
  if (req.query.counciltaxmonthlyperiod == '10') {
    res.redirect('council-tax-month');
  } else if (req.query.counciltaxmonthlyperiod == '12') {
    res.redirect('council-tax-month');
  }
});

router.get(/counciltaxmonthiteration2-handler/, function (req, res) {
  if (req.query.counciltaxmonth) {
    res.redirect('check-your-answers-month');
  } else {
    res.redirect('council-tax-month');
  }
});

router.get(/counciltaxlumpiteration2-handler/, function (req, res) {
  if (req.query.counciltaxlump) {
    res.redirect('check-your-answers-lump');
  } else {
    res.redirect('council-tax-lump');
  }
});

// ************************
// CONTACT DETAILS (Iteration 1)
// ************************

router.get(/telephone-handler/, function (req, res) {
  if (req.query.telephone) {
    res.redirect('telephone-confirm');
  } else if (req.query.telephoneconfirm == 'telephoneconfirm') {
    res.redirect('email');
  } else if (req.query.telephone && req.query.telephoneconfirm == 'telephoneconfirm') {
    res.redirect('email');
  } 
});

router.get(/telephoneconfirm-handler/, function (req, res) {
  if (req.query.telephoneconfirm == 'yes') {
    res.redirect('email');
  } else if (req.query.telephoneconfirm == 'no') {
    res.redirect('telephone');
  }
});

router.get(/email-handler/, function (req, res) {
  if (req.query.email) {
    res.redirect('email-confirm');
  } else if (req.query.emailconfirm == 'emailconfirm') {
    res.redirect('check-your-answers');
  } else if (req.query.email && req.query.emailconfirm) {
    res.redirect('check-your-answers');
  } else {
    res.redirect('email');
  }
});

router.get(/emailconfirm-handler/, function (req, res) {
  if (req.query.emailconfirm == 'yes') {
    res.redirect('check-your-answers');
  } else if (req.query.emailconfirm == 'no') {
    res.redirect('email');
  }
});

router.get(/emailsubmission-handler/, function (req, res) {
  if (req.query.email) {
    res.redirect('email-confirm');
  } else {
    res.redirect('email');
  }
});

router.get(/sendbyemail-iteration1-handler/, function (req, res) {
  if (req.query.email) {
    res.redirect('further-information-email-sent');
  } else {
    res.redirect('more-information-error');
  }
});

// ************************
// PAYE (ITERATION 2)
// ************************

router.get(/jobtitle-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-recent1');
});

router.get(/jobrecent-iteration-2-handler/, function (req, res) {
  if (req.query.jobrecent == 'yes') {
    res.redirect('../iteration-2/job-start-date1');
  } else if (req.query.jobrecent == 'no') {
    res.redirect('../iteration-2/job-zero-hour1');
  }
});

router.get(/jobstartdate-iteration-2-handler/, function (req, res) {
  if (req.query.jobstartdateday && req.query.jobstartdatemonth && req.query.jobstartdateyear) {
    res.redirect('../iteration-2/job-zero-hour1');
  } else {
    res.redirect('../iteration-2/job-start-date1');
  }
});
router.get(/zerohour-iteration-2-handler/, function (req, res) {
  if (req.query.zerohour == 'yes') {
    res.redirect('../iteration-2/job-how-often1');
  } else if (req.query.zerohour == 'no') {
    res.redirect('../iteration-2/job-hours1');
  }
});

router.get(/jobhours-iteration-2-handler/, function (req, res) {
  if (req.query.jobhours) {
    res.redirect('../iteration-2/job-how-often1');
  } else {
    res.redirect('../iteration-2/job-hours1');
  }
});



router.get(/joboften-iteration-2-handler/, function (req, res) {
  if (req.query.joboften == 'every week' || req.query.joboften == 'every 2 weeks' || req.query.joboften == 'every 4 weeks' || req.query.joboften == 'every calendar month') {
    res.redirect('../iteration-2/job-fit-notes1');
  } else if (req.query.joboften == 'it varies') {
    res.redirect('../iteration-2/job-date-last-worked1');
  } else {
    res.redirect('../iteration-2/job-how-often1');
  }
});

router.get(/jobdatelastworked-iteration-2-handler/, function (req, res) {
  if (req.query.jobdatelastworkedday && req.query.jobdatelastworkedmonth && req.query.jobdatelastworkedyear) {
    res.redirect('../iteration-2/job-fit-notes1');
  } else {
    res.redirect('../iteration-2/job-date-last-worked1');
  }
});

router.get(/jobfitnote-iteration-2-handler/, function (req, res) {
  if (req.query.jobfitnote == 'yes') {
    res.redirect('../iteration-2/job-date-fit-notes1');
  } else if (req.query.jobfitnote == 'no') {
    res.redirect('../iteration-2/job-bonus-1');
  }
});

router.get(/jobdatefitnote-iteration-2-handler/, function (req, res) {
  if (req.query.jobdatefitnoteday && req.query.jobdatefitnotemonth && req.query.jobdatefitnoteyear) {
    res.redirect('../iteration-2/job-bonus-1');
  } else {
    res.redirect('../iteration-2/job-date-fit-notes1');
  }
});


router.get(/jobanother-iteration-2-handler/, function (req, res) {
  if (req.query.jobanother == 'yes') {
    res.redirect('../iteration-2/job-title2');
  } else if (req.query.jobanother == 'no') {
    res.redirect('../iteration-2/pension/personal-pension1');
  }
});

router.get(/bonus-iteration-2-handler/, function (req, res) {
  if (req.query.bonus == 'yes') {
    res.redirect('../iteration-2/job-another1');
  } else if (req.query.bonus == 'no') {
    res.redirect('../iteration-2/job-work-expenses1');
  }
});

router.get(/jobgross-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-tax1');
});

router.get(/jobtax-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-national-insurance1');
});

router.get(/jobnationalinsurance-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-work-pension1');
});

router.get(/jobworkpension-iteration-2-handler/, function (req, res) {
  if (req.query.workpension == 'yes') {
    res.redirect('../iteration-2/job-work-pension-how-much1');
  } else if (req.query.workpension == 'no') {
    res.redirect('../iteration-2/job-answers1');
  }
});

router.get(/jobworkpension-how-much-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-answers1');
});

router.get(/jobworkexpenses-iteration-2-handler/, function (req, res) {
  if (req.query.workexpenses == 'yes') {
    res.redirect('../iteration-2/job-another1');
  } else if (req.query.workexpenses == 'no')  {
    res.redirect('../iteration-2/payslips-1');
  }
});

router.get(/jobbonus-how-much-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-work-expenses1');
});

// *******

// Job (Loop)

router.get(/jobtitle-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-recent2');
});

router.get(/jobrecent-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobrecentloop == 'yes') {
    res.redirect('../iteration-2/job-start-date2');
  } else if (req.query.jobrecentloop == 'no') {
    res.redirect('../iteration-2/job-zero-hour2');
  }
});

router.get(/jobstartdate-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobstartdatedayloop && req.query.jobstartdatemonthloop && req.query.jobstartdateyearloop) {
    res.redirect('../iteration-2/job-zero-hour2');
  } else {
    res.redirect('../iteration-2/job-start-date2');
  }
});

router.get(/zerohour-loop-iteration-2-handler/, function (req, res) {
  if (req.query.zerohourloop == 'yes') {
    res.redirect('../iteration-2/job-how-often2');
  } else if (req.query.zerohourloop == 'no') {
    res.redirect('../iteration-2/job-hours2');
  }
});

router.get(/jobhours-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobhoursloop) {
    res.redirect('../iteration-2/job-how-often2');
  } else {
    res.redirect('../iteration-2/job-hours2');
  }
});

router.get(/joboften-loop-iteration-2-handler/, function (req, res) {
  if (req.query.joboftenloop == 'every week' || req.query.joboftenloop == 'every 2 weeks' || req.query.joboftenloop == 'every 4 weeks' || req.query.joboftenloop == 'every calendar month') {
    res.redirect('../iteration-2/job-fit-notes2');
  } else if (req.query.joboftenloop == 'it varies') {
    res.redirect('../iteration-2/job-date-last-worked2');
  } else {
    res.redirect('../iteration-2/job-how-often2');
  }
});

router.get(/jobdatelastworked-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobdatelastworkeddayloop && req.query.jobdatelastworkedmonthloop && req.query.jobdatelastworkedyearloop) {
    res.redirect('../iteration-2/job-fit-notes2');
  } else {
    res.redirect('../iteration-2/job-date-last-worked2');
  }
});

router.get(/jobfitnote-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobfitnoteloop == 'yes') {
    res.redirect('../iteration-2/job-date-fit-notes2');
  } else if (req.query.jobfitnoteloop == 'no') {
    res.redirect('../iteration-2/job-another2');
  }
});

router.get(/jobdatefitnote-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobdatefitnotedayloop && req.query.jobdatefitnotemonthloop && req.query.jobdatefitnoteyearloop) {
    res.redirect('../iteration-2/job-another2');
  } else {
    res.redirect('../iteration-2/job-date-fit-notes2');
  }
});


router.get(/jobanother-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobanotherloop == 'yes') {
    res.redirect('../iteration-2/job-title2');
  } else if (req.query.jobanotherloop == 'no') {
    res.redirect('../iteration-2/pension/personal-pension2');
  }
});

router.get(/bonus-loop-iteration-2-handler/, function (req, res) {
  if (req.query.bonus == 'yes') {
    res.redirect('../iteration-2/job-another2');
  } else if (req.query.bonus == 'no') {
    res.redirect('../iteration-2/job-work-expenses2');
  }
});

router.get(/jobgross-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-tax2');
});

router.get(/jobtax-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-national-insurance2');
});

router.get(/jobnationalinsurance-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-work-pension2');
});

router.get(/jobworkpension-loop-iteration-2-handler/, function (req, res) {
  if (req.query.workpension2 == 'yes') {
    res.redirect('../iteration-2/job-work-pension-how-much2');
  } else if (req.query.workpension2 == 'no') {
    res.redirect('../iteration-2/job-answers2');
  }
});

router.get(/jobworkpension-how-much-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-answers2');
});


router.get(/jobbonus-how-much-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../iteration-2/job-work-expenses2');
});


// *******

router.get(/jobpersonalpension-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpension == 'yes') {
    res.redirect('../../iteration-2/pension/personal-pension-name1');
  } else if (req.query.jobpersonalpension == 'no') {
    res.redirect('../../iteration-2/answers');
  }
});

router.get(/jobpensiontitle-iteration-2-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often1');
});

router.get(/jobpersonalpensionhowoften-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoften == 'every week' || req.query.jobpersonalpensionhowoften == 'every 2 weeks' || req.query.jobpersonalpensionhowoften == 'every 4 weeks' || req.query.jobpersonalpensionhowoften == 'every calendar month' || req.query.jobpersonalpensionhowoften == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoften == 'once a year') {
    res.redirect('../../iteration-2/pension/personal-pension-how-much1');
  } else {
    res.redirect('personal-pension-how-often1');
  }
});

router.get(/jobpersonalpensionhowmuch-iteration-2-handler/, function (req, res) {
  res.redirect('personal-pension-another1');
});

router.get(/jobpersonalpensionanother-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanother == 'yes') {
    res.redirect('../../iteration-2/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanother == 'no') {
    res.redirect('../../../answers');
  }
});

// *******

// Personal Pension (Loop)

router.get(/jobpersonalpension-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpensionloop == 'yes') {
    res.redirect('../../iteration-2/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionloop == 'no') {
    res.redirect('../../../answers');
  }
});

router.get(/jobpensiontitle-loop-iteration-2-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often2');
});

router.get(/jobpersonalpensionhowoften-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoftenloop == 'every week' || req.query.jobpersonalpensionhowoftenloop == 'every 2 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every 4 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every calendar month' || req.query.jobpersonalpensionhowoftenloop == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoftenloop == 'once a year') {
    res.redirect('../../iteration-2/pension/personal-pension-how-much2');
  } else {
    res.redirect('personal-pension-how-often2');
  }
});

router.get(/jobpersonalpensionhowmuch-loop-iteration-2-handler/, function (req, res) {
  res.redirect('personal-pension-another2');
});

router.get(/jobpersonalpensionanother-loop-iteration-2-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanotherloop == 'yes') {
    res.redirect('../../iteration-2/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanotherloop == 'no') {
    res.redirect('../../answers');
  }
});

// ************************
// PAYE (ITERATION 3)
// ************************

router.get(/jobtitle-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-recent1');
});

router.get(/jobrecent-iteration-3-handler/, function (req, res) {
  if (req.query.jobrecent == 'yes') {
    res.redirect('../iteration-3/job-start-date1');
  } else if (req.query.jobrecent == 'no') {
    res.redirect('../iteration-3/job-zero-hour1');
  }
});

router.get(/jobstartdate-iteration-3-handler/, function (req, res) {
  if (req.query.jobstartdateday && req.query.jobstartdatemonth && req.query.jobstartdateyear) {
    res.redirect('../iteration-3/job-zero-hour1');
  } else {
    res.redirect('../iteration-3/job-start-date1');
  }
});
router.get(/zerohour-iteration-3-handler/, function (req, res) {
  if (req.query.zerohour == 'yes') {
    res.redirect('../iteration-3/job-how-often1');
  } else if (req.query.zerohour == 'no') {
    res.redirect('../iteration-3/job-hours1');
  }
});

router.get(/jobhours-iteration-3-handler/, function (req, res) {
  if (req.query.jobhours) {
    res.redirect('../iteration-3/job-how-often1');
  } else {
    res.redirect('../iteration-3/job-hours1');
  }
});



router.get(/joboften-iteration-3-handler/, function (req, res) {
  if (req.query.joboften == 'every week' || req.query.joboften == 'every 2 weeks' || req.query.joboften == 'every 4 weeks' || req.query.joboften == 'every calendar month') {
    res.redirect('../iteration-3/job-fit-notes1');
  } else if (req.query.joboften == 'it varies') {
    res.redirect('../iteration-3/job-date-last-worked1');
  } else {
    res.redirect('../iteration-3/job-how-often1');
  }
});

router.get(/jobdatelastworked-iteration-3-handler/, function (req, res) {
  if (req.query.jobdatelastworkedday && req.query.jobdatelastworkedmonth && req.query.jobdatelastworkedyear) {
    res.redirect('../iteration-3/job-fit-notes1');
  } else {
    res.redirect('../iteration-3/job-date-last-worked1');
  }
});

router.get(/jobfitnote-iteration-3-handler/, function (req, res) {
  if (req.query.jobfitnote == 'yes') {
    res.redirect('../iteration-3/job-date-fit-notes1');
  } else if (req.query.jobfitnote == 'no') {
    res.redirect('../iteration-3/payslips-1');
  }
});

router.get(/jobdatefitnote-iteration-3-handler/, function (req, res) {
  if (req.query.jobdatefitnoteday && req.query.jobdatefitnotemonth && req.query.jobdatefitnoteyear) {
    res.redirect('../iteration-3/payslips-1');
  } else {
    res.redirect('../iteration-3/job-date-fit-notes1');
  }
});


router.get(/jobanother-iteration-3-handler/, function (req, res) {
  if (req.query.jobanother == 'yes') {
    res.redirect('../iteration-3/job-title2');
  } else if (req.query.jobanother == 'no') {
    res.redirect('../iteration-3/pension/personal-pension1');
  }
});

router.get(/bonus-iteration-3-handler/, function (req, res) {
  if (req.query.bonus == 'yes') {
    res.redirect('../iteration-3/job-another1');
  } else if (req.query.bonus == 'no') {
    res.redirect('../iteration-3/job-work-expenses1');
  }
});

router.get(/jobgross-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-tax1');
});

router.get(/jobtax-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-national-insurance1');
});

router.get(/jobnationalinsurance-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-work-pension1');
});

router.get(/jobworkpension-iteration-3-handler/, function (req, res) {
  if (req.query.workpension == 'yes') {
    res.redirect('../iteration-3/job-work-pension-how-much1');
  } else if (req.query.workpension == 'no') {
    res.redirect('../iteration-3/job-answers1');
  }
});

router.get(/jobworkpension-how-much-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-answers1');
});

router.get(/jobworkexpenses-iteration-3-handler/, function (req, res) {
  if (req.query.workexpenses == 'yes') {
    res.redirect('../iteration-3/job-another1');
  } else if (req.query.workexpenses == 'no')  {
    res.redirect('../iteration-3/payslips-1');
  }
});

router.get(/jobbonus-how-much-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-work-expenses1');
});

// *******

// Job (Loop)

router.get(/jobtitle-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-recent2');
});

router.get(/jobrecent-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobrecentloop == 'yes') {
    res.redirect('../iteration-3/job-start-date2');
  } else if (req.query.jobrecentloop == 'no') {
    res.redirect('../iteration-3/job-zero-hour2');
  }
});

router.get(/jobstartdate-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobstartdatedayloop && req.query.jobstartdatemonthloop && req.query.jobstartdateyearloop) {
    res.redirect('../iteration-3/job-zero-hour2');
  } else {
    res.redirect('../iteration-3/job-start-date2');
  }
});

router.get(/zerohour-loop-iteration-3-handler/, function (req, res) {
  if (req.query.zerohourloop == 'yes') {
    res.redirect('../iteration-3/job-how-often2');
  } else if (req.query.zerohourloop == 'no') {
    res.redirect('../iteration-3/job-hours2');
  }
});

router.get(/jobhours-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobhoursloop) {
    res.redirect('../iteration-3/job-how-often2');
  } else {
    res.redirect('../iteration-3/job-hours2');
  }
});

router.get(/joboften-loop-iteration-3-handler/, function (req, res) {
  if (req.query.joboftenloop == 'every week' || req.query.joboftenloop == 'every 2 weeks' || req.query.joboftenloop == 'every 4 weeks' || req.query.joboftenloop == 'every calendar month') {
    res.redirect('../iteration-3/job-fit-notes2');
  } else if (req.query.joboftenloop == 'it varies') {
    res.redirect('../iteration-3/job-date-last-worked2');
  } else {
    res.redirect('../iteration-3/job-how-often2');
  }
});

router.get(/jobdatelastworked-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobdatelastworkeddayloop && req.query.jobdatelastworkedmonthloop && req.query.jobdatelastworkedyearloop) {
    res.redirect('../iteration-3/job-fit-notes2');
  } else {
    res.redirect('../iteration-3/job-date-last-worked2');
  }
});

router.get(/jobfitnote-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobfitnoteloop == 'yes') {
    res.redirect('../iteration-3/job-date-fit-notes2');
  } else if (req.query.jobfitnoteloop == 'no') {
    res.redirect('../iteration-3/payslips-2');
  }
});

router.get(/jobdatefitnote-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobdatefitnotedayloop && req.query.jobdatefitnotemonthloop && req.query.jobdatefitnoteyearloop) {
    res.redirect('../iteration-3/payslips-2');
  } else {
    res.redirect('../iteration-3/job-date-fit-notes2');
  }
});


router.get(/jobanother-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobanotherloop == 'yes') {
    res.redirect('../iteration-3/job-title2');
  } else if (req.query.jobanotherloop == 'no') {
    res.redirect('../iteration-3/pension/personal-pension2');
  }
});

router.get(/bonus-loop-iteration-3-handler/, function (req, res) {
  if (req.query.bonus == 'yes') {
    res.redirect('../iteration-3/job-another2');
  } else if (req.query.bonus == 'no') {
    res.redirect('../iteration-3/job-work-expenses2');
  }
});

router.get(/jobgross-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-tax2');
});

router.get(/jobtax-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-national-insurance2');
});

router.get(/jobnationalinsurance-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-work-pension2');
});

router.get(/jobworkpension-loop-iteration-3-handler/, function (req, res) {
  if (req.query.workpension2 == 'yes') {
    res.redirect('../iteration-3/job-work-pension-how-much2');
  } else if (req.query.workpension2 == 'no') {
    res.redirect('../iteration-3/job-answers2');
  }
});

router.get(/jobworkpension-how-much-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-answers2');
});


router.get(/jobbonus-how-much-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../iteration-3/job-work-expenses2');
});


// *******

router.get(/jobpersonalpension-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpension == 'yes') {
    res.redirect('../../iteration-3/pension/personal-pension-name1');
  } else if (req.query.jobpersonalpension == 'no') {
    res.redirect('../../iteration-3/answers');
  }
});

router.get(/jobpensiontitle-iteration-3-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often1');
});

router.get(/jobpersonalpensionhowoften-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoften == 'every week' || req.query.jobpersonalpensionhowoften == 'every 2 weeks' || req.query.jobpersonalpensionhowoften == 'every 4 weeks' || req.query.jobpersonalpensionhowoften == 'every calendar month' || req.query.jobpersonalpensionhowoften == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoften == 'once a year') {
    res.redirect('../../iteration-3/pension/personal-pension-how-much1');
  } else {
    res.redirect('personal-pension-how-often1');
  }
});

router.get(/jobpersonalpensionhowmuch-iteration-3-handler/, function (req, res) {
  res.redirect('personal-pension-another1');
});

router.get(/jobpersonalpensionanother-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanother == 'yes') {
    res.redirect('../../iteration-3/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanother == 'no') {
    res.redirect('../../../answers');
  }
});

// *******

// Personal Pension (Loop)

router.get(/jobpersonalpension-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpensionloop == 'yes') {
    res.redirect('../../iteration-3/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionloop == 'no') {
    res.redirect('../../../answers');
  }
});

router.get(/jobpensiontitle-loop-iteration-3-handler/, function (req, res) {
  res.redirect('../pension/personal-pension-how-often2');
});

router.get(/jobpersonalpensionhowoften-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpensionhowoftenloop == 'every week' || req.query.jobpersonalpensionhowoftenloop == 'every 2 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every 4 weeks' || req.query.jobpersonalpensionhowoftenloop == 'every calendar month' || req.query.jobpersonalpensionhowoftenloop == 'every 13 weeks (quarterly)' || req.query.jobpersonalpensionhowoftenloop == 'once a year') {
    res.redirect('../../iteration-3/pension/personal-pension-how-much2');
  } else {
    res.redirect('personal-pension-how-often2');
  }
});

router.get(/jobpersonalpensionhowmuch-loop-iteration-3-handler/, function (req, res) {
  res.redirect('personal-pension-another2');
});

router.get(/jobpersonalpensionanother-loop-iteration-3-handler/, function (req, res) {
  if (req.query.jobpersonalpensionanotherloop == 'yes') {
    res.redirect('../../iteration-3/pension/personal-pension-name2');
  } else if (req.query.jobpersonalpensionanotherloop == 'no') {
    res.redirect('../../answers');
  }
});

//Payslip Upload

router.get(/payslip-iteration-3-handler/, function (req, res) {
  if (req.query.uploadskip == 'uploadskip') {
    res.redirect('job-another1');
  } else if (req.query.uploadskip == '') {
    res.redirect('job-another1');
  } else {
    res.redirect('job-upload1');
  }
});

router.get(/payslip-loop-iteration-3-handler/, function (req, res) {
  if (req.query.uploadskiploop == 'uploadskiploop') {
    res.redirect('job-another2');
  } else if (req.query.uploadskiploop == '') {
    res.redirect('job-another2');
  } else {
    res.redirect('job-upload2');
  }
});

// ************************
// STUDENTS (Iteration 1)
// ************************

router.get(/coursetype-handler/, function (req, res) {
  if (req.query.Coursetype == 'yes') {
    res.redirect('name-of-establishment');
  } else if (req.query.coursetype == 'no') {
    res.redirect('name-of-establishment');
  }
});



router.get(/overseas-handler/, function (req, res) {
  if (req.query.overseas == 'yes') {
    res.redirect('country');
  } else if (req.query.overseas == 'no') {
    res.redirect('financial-help');
  }
});


router.get(/coursefinishdate-handler/, function (req, res) {
  res.redirect('term1-dates');
});


router.get(/downloadreports/, function (req, res) {
  res.redirect('financial-help');
});




router.get(/financialhelp-handler/, function (req, res) {
  if (req.query.financialhelp.includes('SFE-help')) {
    res.redirect('cya');
  } else if (req.query.financialhelp.includes('SAAS-help')) {
    res.redirect('cya');
  } else if (req.query.financialhelp.includes('SFW-help')) {
    res.redirect('cya');
  } else if (req.query.financialhelp.includes('NHS-help')) {
    res.redirect('#');
  } else if (req.query.financialhelp.includes('none-help')) {
    res.redirect('who-pays');
  } else if (req.query.financialhelp.toString() == 'SFE-help,SAAS-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'loanmaintenance-help,bursary-help,money-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'loanmaintenance-help,bursary-help,money-help,scholarships-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'loanmaintenance-help,bursary-help,money-help,scholarships-help,overseas-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'bursary-help,money-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'bursary-help,money-help,scholarships-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'bursary-help,money-help,scholarships-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'bursary-help,money-help,scholarships-help,overseas-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'money-help,scholarships-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'money-help,scholarships-help,overseas-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'scholarships-help,overseas-help') {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp == 'none-help') {
    res.redirect('money-from-parents');
  } 
});

router.get(/livingcost-handler/, function (req, res) {
  if (req.query.livingcost.includes('parents-help')) {
    res.redirect('parents');
  } else  if (req.query.livingcost.includes('HEI-help')) {
    res.redirect('HEI-type');
  
  } else if (req.query.livingcost.includes('loanmaintenance-help')) {
    res.redirect('cya');
  } else if (req.query.livingcost.includes('other-help')) {
    res.redirect('cya');
  } else if (req.query.livingcost.includes('NHS-help')) {
    res.redirect('cya');
  }else if (req.query.livingcost.includes('overseas-help')) {
    res.redirect('cya');
  } else if (req.query.livingcost.includes('none-help')) {
    res.redirect('who-pays');
  } else if (req.query.livingcost.toString() == 'loanmaintenance-help,HEI-help') {
    res.redirect('HEI-type');
  }else if (req.query.livingcost.toString() == 'loanmaintenance-help,other-help') {
    res.redirect('cya');
  }else if (req.query.livingcost.toString() == 'loanmaintenance-help,NHS-help') {
    res.redirect('cya');
  }else if (req.query.livingcost.toString() == 'loanmaintenance-help,overseas-help') {
    res.redirect('cya');
  }else if (req.query.livingcost.toString() == 'loanmaintenance-help,parents-help') {
    res.redirect('parents');
  } else if (req.query.livingcost.toString() == 'loanmaintenance-help,HEI-help,other-help') {
    res.redirect('HEI-type');
  } else if (req.query.livingcost.toString() == 'loanmaintenance-help,HEI-help,other-help,NHS-help') {
    res.redirect('HEI-type');
  } else if (req.query.livingcost.toString() == 'loanmaintenance-help,HEI-help,other-help,parents-help,NHS-help') {
    res.redirect('parents');
    res.redirect('HEI-type');
  } else if (req.query.livingcost.toString() == 'HEI-help,other-help') {
    res.redirect('HEI-type');
  } else if (req.query.livingcost.toString() == 'HEI-help,parents-help') {
    res.redirect('parents');
    res.redirect('HEI-type');
  } else if (req.query.livingcost.toString() == 'HEI-help,other-help,NHS-help') {
    res.redirect('HEI-type');
  } 
});


router.get(/HEI-handler/, function (req, res) {
  if (req.query.HEI.includes ('livingcosts-income')) {
    res.redirect('HEI-livcostsamount');
  } else if (req.query.HEI.includes ('accommodation-income')) {
    res.redirect('HEI-accommodation');
  } else if (req.query.HEI.includes ('none-income')) {
    res.redirect('cya');
  } else if (req.query.livingcost.toString() == ('livingcosts-income,accommodation-income')) {
  res.redirect('HEI-livcostamount');
  res.redirect('HEI-accommodation');
}
});

router.get(/amountlivcosts-handler/, function (req, res) {
  var HEI = req.session.data['HEI'];
  if (req.query.amount && HEI.includes ('accommodation-income')) {
    res.redirect('HEI-accommodation');
  } else if (req.query.amount){
    res.redirect('cya');
  }
});

router.get(/accommodation-handler/, function (req, res) {
  if (req.query.amount) {
    res.redirect('cya');
  } else {
    res.redirect('HEI-accommodation');
  }
});


router.get(/moneyfromparents-handler/, function (req, res) {
  var livingcost = req.session.data['livingcost'];
  if (req.query.moneyfromparents && livingcost.includes('HEI-help')) {
    res.redirect('HEI-type');
  } else if (req.query.amount){
    res.redirect('cya');
  }
}); 

// ************************
// ASSESS
// ************************

router.get(/assess-search-handler/, function (req, res) {
    res.redirect('evidence-case');
});

// ************************
// Eligibility Checker Divorce
// ************************

router.get(/applyonlinesplit-handler/, function (req, res) {
  if (req.query.applyonline == 'yes') {
    res.redirect('/apply/what-you-will-need-split');
  } else if (req.query.applyonline == 'no') {
    res.redirect('/kickouts/apply-offline');
  }
});

router.get(/countrysplit-handler/, function (req, res) {
  if (req.query.country == 'England') {
    res.redirect('/beforeyoustart/care-home-split');
  } else if (req.query.country == 'Scotland') {
    res.redirect('/beforeyoustart/care-home-split');
  } else if (req.query.country == 'Wales') {
    res.redirect('/beforeyoustart/care-home-split');
  } else if (req.query.country == 'Northern Ireland') {
    res.redirect('/kickouts/northern-ireland-split');
  } else {
    res.redirect('/beforeyoustart/country-split');
  }
});

router.get(/gppracticesplit-handler/, function (req, res) {
  if (req.query.gppractice == 'yes') {
    res.redirect('/beforeyoustart/date-of-birth-split');
  } else if (req.query.gppractice == 'no') {
    res.redirect('/beforeyoustart/date-of-birth-split');
  } else {
    res.redirect('/beforeyoustart/gp-practice-split');
  }
});

router.get(/highlandssplit-handler/, function (req, res) {
  if (req.query.highlands == 'yes') {
    res.redirect('/beforeyoustart/date-of-birth-split');
  } else if (req.query.highlands == 'no') {
    res.redirect('/beforeyoustart/date-of-birth-split');
  } else {
    res.redirect('/beforeyoustart/highlands-split');
  }
});

router.get(/dateofbirthsplit-handler/, function (req, res) {

  var today = new Date();
  var date = new Date(req.query.year,req.query.month,req.query.day,0,0,0);
  var difference = (today-date)/(1000*60*60*24*365);

  if (difference <= 16) {
    res.redirect('/beforeyoustart/passport/u16-passport');
  } else if (difference > 16 && difference <= 19) {
    res.redirect('/beforeyoustart/full-time-education-split');
  } else if (difference > 19) {
    res.redirect('/beforeyoustart/care-home-split');
  } else {
    res.redirect('/beforeyoustart/date-of-birth-split');
  }
});

router.get(/fulltimeeducationsplit-handler/, function (req, res) {
  if (req.query.fulltimeeducation == 'yes') {
    res.redirect('/beforeyoustart/passport/u19-passport');
  } else if (req.query.fulltimeeducation == 'no') {
    res.redirect('/beforeyoustart/care-home-split');
  } else {
    res.redirect('/beforeyoustart/full-time-education-split');
  }
});

router.get(/carehomesplit-handler/, function (req, res) {
  if (req.query.carehome == 'yes') {
    res.redirect('/beforeyoustart/care-home-support-split');
  } else if (req.query.carehome == 'no') {
    res.redirect('/beforeyoustart/partner');
  } else {
    res.redirect('/beforeyoustart/care-home-split');
  }
});

router.get(/carehomesupportsplit-handler/, function (req, res) {
  if (req.query.carehomesupport == 'yes') {
    res.redirect('/beforeyoustart/care-home-name-split');
  } else if (req.query.carehomesupport == 'no') {
    res.redirect('/kickouts/developed');
  } else {
    res.redirect('/beforeyoustart/care-home-split');
  }
});

router.get(/carehomenamesplit-handler/, function (req, res) {
  if (req.query.carehomename) {
    res.redirect('/beforeyoustart/care-home-answers');
  } else {
    res.redirect('/beforeyoustart/care-home-name-split');
  }
});

router.get(/savingssplit-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/check-your-answers-check-eligibility');
  } else {
    res.redirect('/beforeyoustart/more-than-6000');
  }
});

 router.get(/educationtrainingsplit-handler/, function (req, res) {
if (req.query.educationtraining== 'yes') {
   res.redirect('/beforeyoustart/full-time-edu');
 } else  {
    res.redirect('/beforeyoustart/money-coming-in-single');
  
  }
});

router.get(/alevel-handler/, function (req, res) {
  if (req.query.alevel== 'yes') {
    res.redirect('/beforeyoustart/full-time-edu');
  } else  {
    res.redirect('/beforeyoustart/check-your-answers-check-eligibility');
  
  }
});


// ************************
// BENEFITS (Iteration 6)
// ************************

router.get(/universalcredititeration6-handler/, function (req, res) {
  if (req.query.universalcredit == 'yes') {
    res.redirect('universal-credit-any');
  } if (req.query.universalcredit == 'no') {
    res.redirect('tax-credits');
  } else if (req.query.universalcredit == 'not-yet') {
    res.redirect('universal-credit-awaiting');
  }
});

router.get(/universalcreditanyiteration6-handler/, function (req, res) {
  if (req.query.universalcreditany == 'yes') {
    res.redirect('universal-credit-935');
  } else if (req.query.universalcreditany == 'no') {
    res.redirect('universal-credit-435');
  }
});

router.get(/universalcredit935iteration6-handler/, function (req, res) {
  if (req.query.universalcredit935 == 'yes') {
    res.redirect('passport-935');
  } else if (req.query.universalcredit935 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/universalcredit435iteration6-handler/, function (req, res) {
  if (req.query.universalcredit435 == 'yes') {
    res.redirect('passport-435');
  } else if (req.query.universalcredit435 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/taxcreditsiteration6-handler/, function (req, res) {
  if (req.query.taxcredits == 'yes') {
    res.redirect('tax-credits-type');
  } else if (req.query.taxcredits == 'no') {
    res.redirect('income-support');
  }
});

router.get(/taxcredittypeiteration6-handler/, function (req, res) {
  if (req.query.taxcredittype == 'WTCCTC') {
    res.redirect('tax-credit-income');
  } else if (req.query.taxcredittype == 'WTCDisability') {
    res.redirect('tax-credit-income');
  } else if (req.query.taxcredittype == 'WTC') {
    res.redirect('income-support');
  } else if (req.query.taxcredittype == 'CTC') {
    res.redirect('tax-credit-income');
  } else {
    res.redirect('tax-credits-type');
  }
});

router.get(/taxcreditincomeiteration6-handler/, function (req, res) {
  if (req.query.taxcreditincome == 'yes') {
    res.redirect('passport-taxcredits');
  } else if (req.query.taxcreditincome == 'no') {
    res.redirect('income-support');
  } else {
    res.redirect('tax-credit-income');
  }
});

router.get(/incomesupportiteration6-handler/, function (req, res) {
  if (req.query.incomesupport == 'yes') {
    res.redirect('passport-incomesupport');
  } else if (req.query.incomesupport == 'no') {
    res.redirect('other-benefits');
  } else {
    res.redirect('income-support');
  }
});




router.get(/otherbenefitsiteration6-handler/, function (req, res) {
  res.redirect('additional-benefits.html') 
  
});

router.get(/additionalbenefitsiteration6-handler/, function (req, res) {


  if (req.query.additionalbenefits.includes('incomesupport')) {
    res.redirect('passport-incomesupport')
   } else 
    res.redirect('#');
});




router.get(/anyotherbenefitsiteration6-handler/, function (req, res) {

  var universalCredit = req.session.data['universalcredit'];
  var taxCredits = req.session.data['taxcredits'];


  if (req.query.anyotherbenefits == 'yes') {
    res.redirect('choose-benefit');
  } else if (universalCredit == 'no' && taxCredits == 'no' && req.query.anyotherbenefits == 'no') {
    res.redirect('any-other-benefits-error');
  } else if (req.query.anyotherbenefits == 'no') {
    res.redirect('carers-allowance-other-benefit');
  }
});

router.get(/addanotherbenefititeration6-handler/, function (req, res) {

var benefitList = req.session.data['benefitList'];

// Benefits that include passporting

if (req.query.benefitanother == 'yes') {
  res.redirect('choose-benefit');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Income support')) {
  res.redirect('passport-incomesupport');
} else if (req.query.benefitanother == 'no' && benefitList.includes('JSA (Jobseeker\'s allowance)')) {
  res.redirect('jobseekers-allowance-type');
} else if (req.query.benefitanother == 'no' && benefitList.includes('ESA (Employment and support allowance)')) {
  res.redirect('employment-support-allowance-type');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Pension credit')) {
  res.redirect('pension-credit-type');

// Other benefits

} else if (req.query.benefitanother == 'no' && benefitList.includes('PIP (Personal independence payment)')) {
  res.redirect('personal-independence-payment');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Disability living allowance')) {
  res.redirect('disability-living-allowance');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Attendance allowance')) {
  res.redirect('attendance-allowance-rate');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Industrial injuries disablement benefit')) {
  res.redirect('industrial-injuries-disablement-benefit');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Carer\'s allowance')) {
  res.redirect('carers-allowance');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Incapacity Benefit')) {
  res.redirect('incapacity-benefit');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Severe disablement allowance')) {
  res.redirect('severe-disablement-allowance');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Armed Forces Compensation Scheme')) {
  res.redirect('armed-forces-compensation');
} else if (req.query.benefitanother == 'no' && benefitList.includes('War disablement pension')) {
  res.redirect('war-disablement-pension');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
  res.redirect('bereavement-allowance-amount');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Widowed parent\'s allowance')) {
  res.redirect('widowed-parents-allowance');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Bereavement support payment')) {
  res.redirect('bereavement-support-rate');
} else if (req.query.benefitanother == 'no' && benefitList.includes('War widow\'s or widower\'s pension')) {
  res.redirect('war-widow-pension');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Industrial death benefit')) {
  res.redirect('industrial-death-benefit');
} else if (req.query.benefitanother == 'no' && benefitList.includes('Maternity allowance')) {
  res.redirect('maternity-allowance');
} else if (req.query.benefitanother == 'no') {
  res.redirect('carers-allowance-other-benefit');

// Refresh page in all other circumstances

} else {
  res.redirect('benefit-added');
}

});

router.get(/choosebenefititeration6-handler/, function (req, res) {

  var benefitList = req.session.data.benefitList

  // If no array exists, create one called 'benefitList'. If one already exists, do nothing.

  benefitList = ( typeof benefitList != 'undefined' && benefitList instanceof Array ) ? benefitList : []

  // Create a variable of the posted information

  var benefitName = req.session.data['additionalBenefits'];

  // Add the posted information into the 'benefitList' array

  benefitList.push(benefitName);

  req.session.data.benefitList = benefitList;

  console.log(benefitList)

  console.log('Benefits list contains', benefitList.length, 'items')

  // Redirect to the 'Do you get another?' page

  res.redirect('benefit-added');

});

router.get(/jobseekerstypeiteration-5-handler/, function (req, res) {

  var benefitList = req.session.data['benefitList'];
  
  // Benefits that include passporting
  
    if (req.query.jobseekerstype == 'income') {
      res.redirect('passport-jsa');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('ESA (Employment and support allowance)')) {
      res.redirect('employment-support-allowance-type');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Pension credit')) {
      res.redirect('pension-credit-type');
  
  // Other benefits
  
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('PIP (Personal independence payment)')) {
      res.redirect('personal-independence-payment');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Disability living allowance')) {
      res.redirect('disability-living-allowance');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Attendance allowance')) {
      res.redirect('attendance-allowance-rate');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Industrial injuries disablement benefit')) {
      res.redirect('industrial-injuries-disablement-benefit');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Carer\'s allowance')) {
      res.redirect('carers-allowance');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Incapacity Benefit')) {
      res.redirect('incapacity-benefit');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Severe disablement allowance')) {
      res.redirect('severe-disablement-allowance');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Armed Forces Compensation Scheme')) {
      res.redirect('armed-forces-compensation');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('War disablement pension')) {
      res.redirect('war-disablement-pension');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.jobseekerstype == 'contribution' && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.jobseekerstype == 'contribution') {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('jobseekers-allowance-type');
    }
});

router.get(/employmentsupporttypeiteration-5-handler/, function (req, res) {

  var benefitList = req.session.data['benefitList'];
  
  // Benefits that include passporting
    if (req.query.employmentsupporttype == 'income') {
      res.redirect('passport-esa');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Pension credit')) {
      res.redirect('pension-credit-type');
  
  // Other benefits
  
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('PIP (Personal independence payment)')) {
      res.redirect('personal-independence-payment');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Disability living allowance')) {
      res.redirect('disability-living-allowance');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Attendance allowance')) {
      res.redirect('attendance-allowance-rate');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Industrial injuries disablement benefit')) {
      res.redirect('industrial-injuries-disablement-benefit');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Carer\'s allowance')) {
      res.redirect('carers-allowance');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Incapacity Benefit')) {
      res.redirect('incapacity-benefit');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Severe disablement allowance')) {
      res.redirect('severe-disablement-allowance');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Armed Forces Compensation Scheme')) {
      res.redirect('armed-forces-compensation');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('War disablement pension')) {
      res.redirect('war-disablement-pension');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.employmentsupporttype == 'contribution' && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.employmentsupporttype == 'contribution') {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('employment-support-allowance-type');
    }
});


router.get(/piptypeiteration6-handler/, function (req, res) {

  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Disability living allowance'))) {
      res.redirect('disability-living-allowance');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Attendance allowance'))) {
      res.redirect('attendance-allowance-rate');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Industrial injuries disablement benefit'))) {
      res.redirect('industrial-injuries-disablement-benefit');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Carer\'s allowance'))) {
      res.redirect('carers-allowance');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Incapacity Benefit'))) {
      res.redirect('incapacity-benefit');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.dailyliving == 'daily-living' || req.query.mobility == 'mobility') {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('personal-independence-payment');
    }  

});

router.get(/dlatypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Attendance allowance'))) {
      res.redirect('attendance-allowance-rate');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Industrial injuries disablement benefit'))) {
      res.redirect('industrial-injuries-disablement-benefit');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Carer\'s allowance'))) {
      res.redirect('carers-allowance');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Incapacity Benefit'))) {
      res.redirect('incapacity-benefit');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.dlacare == 'dlacare' || req.query.dlamobility == 'dlamobility') {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('disability-living-allowance');
    }  
});

router.get(/attendanceallowancetypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.attendanceallowance && benefitList.includes('Industrial injuries disablement benefit')) {
      res.redirect('industrial-injuries-disablement-benefit');
    } else if (req.query.attendanceallowance && benefitList.includes('Carer\'s allowance')) {
      res.redirect('carers-allowance');
    } else if (req.query.attendanceallowance && benefitList.includes('Incapacity Benefit')) {
      res.redirect('incapacity-benefit');
    } else if (req.query.attendanceallowance && benefitList.includes('Severe disablement allowance')) {
      res.redirect('severe-disablement-allowance');
    } else if (req.query.attendanceallowance && benefitList.includes('Armed Forces Compensation Scheme')) {
      res.redirect('armed-forces-compensation');
    } else if (req.query.attendanceallowance && benefitList.includes('War disablement pension')) {
      res.redirect('war-disablement-pension');
    } else if (req.query.attendanceallowance && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.attendanceallowance && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.attendanceallowance && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.attendanceallowance && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.attendanceallowance && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.attendanceallowance && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.attendanceallowance) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('attendance-allowance-rate');
    }
});

router.get(/industrialinjuriestypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Carer\'s allowance'))) {
      res.redirect('carers-allowance');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Incapacity Benefit'))) {
      res.redirect('incapacity-benefit');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.injuriesweek || req.query.injuries2weeks || req.query.injuries4weeks) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('industrial-injuries-disablement-benefit');
    }
});

router.get(/carersallowancetypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Catch if Attendance Allowance Rate entered in Carers Allowance section

    if (req.query.carersallowanceweek.match(/^(57.30|58.70|85.60|87.65)$/) || req.query.carersallowance4weeks.match(/^(57.30|58.70|85.60|87.65)$/)) {
      res.redirect('carers-allowance-confirm');

  // Other benefits
  
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Incapacity Benefit'))) {
      res.redirect('incapacity-benefit');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.carersallowanceweek || req.query.carersallowance4weeks) && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.carersallowanceweek || req.query.carersallowance4weeks) {
      res.redirect('answers');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('carers-allowance');
    }

});

router.get(/carersallowanceconfirmiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits

    if (req.query.carersallowanceconfirm == 'no') {
      res.redirect('benefit-added');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Incapacity Benefit'))) {
      res.redirect('incapacity-benefit');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.carersallowanceconfirm == 'yes') && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.carersallowanceconfirm == 'yes') {
      res.redirect('answers');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('carers-allowance');
    }

});

router.get(/incapacitybenefittypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Severe disablement allowance'))) {
      res.redirect('severe-disablement-allowance');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Armed Forces Compensation Scheme'))) {
      res.redirect('armed-forces-compensation');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('War disablement pension'))) {
      res.redirect('war-disablement-pension');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Bereavement allowance (previously Widow\'s Pension)'))) {
      res.redirect('bereavement-allowance-amount');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Widowed parent\'s allowance'))) {
      res.redirect('widowed-parents-allowance');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Bereavement support payment'))) {
      res.redirect('bereavement-support-rate');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('War widow\'s or widower\'s pension'))) {
      res.redirect('war-widow-pension');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Industrial death benefit'))) {
      res.redirect('industrial-death-benefit');
    } else if ((req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) && (benefitList.includes('Maternity allowance'))) {
      res.redirect('maternity-allowance');
    } else if (req.query.incapacitybenefitweek || req.query.incapacitybenefit2weeks) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('incapacity-benefit');
    }

});

router.get(/severedisablementtypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.severedisablement && benefitList.includes('Armed Forces Compensation Scheme')) {
      res.redirect('armed-forces-compensation');
    } else if (req.query.severedisablement && benefitList.includes('War disablement pension')) {
      res.redirect('war-disablement-pension');
    } else if (req.query.severedisablement && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.severedisablement && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.severedisablement && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.severedisablement && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.severedisablement && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.severedisablement && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.severedisablement) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('severe-disablement-allowance');
    }

});

router.get(/armedforcescstypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.armedforcescs && benefitList.includes('War disablement pension')) {
      res.redirect('war-disablement-pension');
    } else if (req.query.armedforcescs && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.armedforcescs && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.armedforcescs && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.armedforcescs && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.armedforcescs && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.armedforcescs && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.armedforcescs) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('armed-forces-compensation');
    }

});

router.get(/wardisablementtypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.wardisablement && benefitList.includes('Bereavement allowance (previously Widow\'s Pension)')) {
      res.redirect('bereavement-allowance-amount');
    } else if (req.query.wardisablement && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.wardisablement && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.wardisablement && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.wardisablement && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.wardisablement && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.wardisablement) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('war-disablement-pension');
    }

});

router.get(/bereavementallowancetypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.bereavementallowance && benefitList.includes('Widowed parent\'s allowance')) {
      res.redirect('widowed-parents-allowance');
    } else if (req.query.bereavementallowance && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.bereavementallowance && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.bereavementallowance && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.bereavementallowance && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.bereavementallowance) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('bereavement-allowance-amount');
    }

});

router.get(/widowedparentstypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.widowedparents && benefitList.includes('Bereavement support payment')) {
      res.redirect('bereavement-support-rate');
    } else if (req.query.widowedparents && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.widowedparents && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.widowedparents && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.widowedparents) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('widowed-parents-allowance');
    }

});

router.get(/bereavementsupporttypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.bereavementsupport && benefitList.includes('War widow\'s or widower\'s pension')) {
      res.redirect('war-widow-pension');
    } else if (req.query.bereavementsupport && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.bereavementsupport && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.bereavementsupport) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('bereavement-support-rate');
    }
});

router.get(/warwidowtypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.warwidow && benefitList.includes('Industrial death benefit')) {
      res.redirect('industrial-death-benefit');
    } else if (req.query.warwidow && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.warwidow) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('war-widow-pension');
    }
});

router.get(/industrialdeathtypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.industrialdeath && benefitList.includes('Maternity allowance')) {
      res.redirect('maternity-allowance');
    } else if (req.query.industrialdeath) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('industrial-death-benefit');
    }
});

router.get(/maternityallowancetypeiteration6-handler/, function (req, res) {
  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.maternityallowance) {
      res.redirect('carers-allowance-other-benefit');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('industrial-death-benefit');
    }
});

router.get(/carersallowanceotherbenefititeration6-handler/, function (req, res) {

  var benefitList = req.session.data['benefitList'];

  // Other benefits
  
    if (req.query.carersallowanceother && benefitList.includes('PIP (Personal independence payment)')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother && benefitList.includes('Disability living allowance')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother && benefitList.includes('Attendance allowance')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother && benefitList.includes('Industrial injuries disablement benefit')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother && benefitList.includes('Armed forces independence payment')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother && benefitList.includes('War disablement pension')) {
      res.redirect('someone-else-carer-benefit');
    } else if (req.query.carersallowanceother) {
      res.redirect('answers');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('carers-allowance-other-benefit');
    }

});

router.get(/someoneelsecarertypeiteration6-handler/, function (req, res) {

  // Other benefits
  
    if (req.query.someoneelsecarer) {
      res.redirect('answers');
  
  // Refresh page in all other circumstances
  
    } else {
      res.redirect('someone-else-carer-benefit');
    }
});


// ***********************
// Education and Training 
// ***********************

// ***********************
// Iteration 2 
// ***********************

router.get(/whopays-handler/, function (req, res) {
  
   if (req.query.tuitionfee.includes('sfe-pay')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.tuitionfee.includes('sfw-pay')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.tuitionfee.includes('saas-pay')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.tuitionfee.includes('nhs-pay')) {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.tuitionfee.includes('none-pay')) {
    res.redirect('cya');
  } else if (req.query.tuitionfee.includes('myself-pay')) {
      res.redirect('tuition-fee-how-much');
  } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay,none-help') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'nhs-pay,none-help') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'saas-pay,nhs-pay,') {
    res.redirect('kickouts/students-developed');
  } else if (req.query.tuitionfee.toString() == 'sfw-pay,nhs-pay') {
    res.redirect('kickouts/students-developed');
  }  else {
    res.redirect('who-pays');
  }
});




router.get(/tuitioniteration2-handler/, function (req, res) {
  
  if (req.query.tuition == 'yes') {
    res.redirect('../Iteration-2/tuition-fee-how-much');
  } else if (req.query.tuition == 'no') {
    res.redirect('cya');
  }
});

router.get(/tuitionfeehowmuchiteration2-handler/, function (req, res) {
  if (req.query.tuitionfeehowmuch) {
    res.redirect('cya');
  } else {
    res.redirect('../Iteration-2/tuition-fee-how-much');
  }
});



// ***********************
// Iteration 3
// ***********************



router.get(/whopaysiteration3-handler/, function (req, res) {
  
  if (req.query.tuitionfee.includes('sfe-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('sfw-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('saas-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('nhs-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('none-pay')) {
   res.redirect('contribution-type');
 } else if (req.query.tuitionfee.includes('myself-pay')) {
     res.redirect('tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'saas-pay,nhs-pay,') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 }  else {
   res.redirect('who-pays');
 }
});

router.get(/savingssplititeration3-handler/, function (req, res) {
  if (req.query.savings== 'yes') {
    res.redirect('/kickouts/developed');
  } else if (req.query.savings== 'no') {
    res.redirect('/beforeyoustart/student/iteration-3/check-your-answers-check-eligibility.html');
  } else {
    res.redirect('/beforeyoustart/student/iteration3/more-than-6000');
  }
});

router.get(/tuitionfeehowmuchiteration3-handler/, function (req, res) {
  if (req.query.tuitionfeehowmuch) {
    res.redirect('contribution-type');
  } else {
    res.redirect('../Iteration-3/tuition-fee-how-much');
  }
});


router.get(/contributiontype-handler/, function (req, res) {
  if (req.query.contributiontype.includes('parents')) {
    res.redirect('parents-how-often');
  } else if (req.query.contributiontype.includes('relatives')) {
    res.redirect('relatives-how-often');
  } else if (req.query.contributiontype.includes('friends')) {
    res.redirect('friends-how-often');
  } else if (req.query.contributiontype.includes('none')) {
    res.redirect('money-another-1');
  } else if (req.query.contributiontype.toString() == 'parents,relatives,friends') {
    res.redirect('parents-how-often');
  } else if (req.query.incomepartner.toString() == 'parents,relatives') {
    res.redirect('parents-how-often');
  } else if (req.query.incomepartner.toString() == 'parents,friends') {
    res.redirect('parents-how-often');
  } else if (req.query.incomepartner.toString() == 'relatives,friends') {
    res.redirect('relatives-how-often');
  }  else {
    res.redirect('contribution-type');
  }
});



router.get(/parents-handler/, function (req, res) {
  
  if (req.query.parents == 'yes') {
    res.redirect('../Iteration-3/parents-how-often');
  } else if (req.query.parents == 'no') {
    res.redirect('relatives');
  }
});


router.get(/parentshowoften-handler/, function (req, res) {
  if (req.query.parentshowoften == 'every week' || req.query.parentshowoften == 'every month' || req.query.parentshowoften == 'every term') {
    res.redirect('../Iteration-3/parents-how-much');
  } else {
    res.redirect('../Iteration-3/parents-how-often');
  }
});

router.get(/parentshowmuch-handler/, function (req, res) {
  var contributiontype = req.session.data['contributiontype'];

    if (req.query.parentshowmuch && contributiontype.includes('relatives')) {
    res.redirect('relatives-how-often');
  } else if (req.query.parentshowmuch && contributiontype.includes('friends')) {
    res.redirect('friends-how-often');
  } else if (req.query.parentshowmuch) {
    res.redirect('money-another-1');
   } else {
    res.redirect('parents-how-much');
  }
});
router.get(/relatives-handler/, function (req, res) {
  
  if (req.query.relatives == 'yes') {
    res.redirect('../Iteration-3/relatives-how-often');
  } else if (req.query.relatives == 'no') {
    res.redirect('friends');
  }
});

router.get(/relativeshowoften-handler/, function (req, res) {
  if (req.query.relativeshowoften == 'every week' || req.query.relativeshowoften == 'every month' || req.query.relativeshowoften == 'every term') {
    res.redirect('../Iteration-3/relatives-how-much');
  } else {
    res.redirect('../Iteration-3/relatives-how-often');
  }
});

router.get(/relativeshowmuch-handler/, function (req, res) {
  var contributiontype = req.session.data['contributiontype'];

  if (req.query.relativeshowmuch && contributiontype.includes('friends')) {
    res.redirect('friends-how-often');
  } else  if (req.query.relativeshowmuch){
    res.redirect('money-another-1');
  } else {
    res.redirect('relatives-how-much');
  }
});


router.get(/moneyanother-handler/, function (req, res) {
  
  if (req.query.moneyanother == 'yes') {
    res.redirect('cya');
  } else if (req.query.moneyanother == 'no') {
    res.redirect('cya');
  }
});

router.get(/moneyanothername-handler/, function (req, res) {
  
  if (req.query.moneyanothername) {
    res.redirect('cya');
  } else {
    res.redirect('money-another-name');
  }
});
router.get(/friendshowoften-handler/, function (req, res) {
  if (req.query.friendshowoften == 'every week' || req.query.friendshowoften == 'every month' || req.query.friendshowoften == 'every term') {
    res.redirect('friends-how-much');
  } else {
    res.redirect('friends-how-often');
  }
});


router.get(/friendshowmuch-handler/, function (req, res) {
  if (req.query.friendshowmuch) {
    res.redirect('money-another-1');
  } else {
    res.redirect('friends-how-much');
  }
});



// ************************************
// Education and Training (Iteration 5)
// ************************************




//** router.get(/finalyear-iteration5-handler/, function (req, res) {
  //** if (req.query.finalyear == 'yes') {
  //**   res.redirect('course-finish-date');
  //** } else if (req.query.finalyear == 'no') {
  //**   res.redirect('academic-start');
  //** }
//** });

router.get(/finalyear-iteration5-handler/, function (req, res) {
  res.redirect('cya.html');
});



router.get(/academic-iteration5-handler/, function (req, res) {
  res.redirect('christmas-break.html');
});

router.get(/christmasbreak-iteration5-handler/, function (req, res) {
  res.redirect('christmas-end.html');
});

router.get(/christmasend-iteration5-handler/, function (req, res) {
  res.redirect('easter-break.html');
});

router.get(/easterbreak-iteration5-handler/, function (req, res) {
  res.redirect('easter-end.html');
});

router.get(/easterend-iteration5-handler/, function (req, res) {
  res.redirect('summer-break.html');
});

router.get(/summerbreak-iteration5-handler/, function (req, res) {
  res.redirect('final-year');
});

//** router.get(/christmasdates-iteration5-handler/, function (req, res) {
 //**  res.redirect('easter-dates.html');
//** });


//** router.get(/easterdates-iteration5-handler/, function (req, res) {
 //**  res.redirect('summer-dates.html');
//** });

//** router.get(/summerdates-iteration5-handler/, function (req, res) {
  //** res.redirect('cya');
//** });


// ***********************************************
// Education and Training Iteration - 5b
// ***********************************************

router.get(/finalyear-iteration5b-handler/, function (req, res) {
   if (req.query.finalyear == 'yes') {
    res.redirect('course-finish-date');
  } else if (req.query.finalyear == 'no') {
   res.redirect('cya');
 }
 });

 router.get(/coursefinishdate-iteration5b-handler/, function (req, res) {
  res.redirect('cya');
});


// ************************************
// Education and Training (Iteration 6)
// ************************************


//Education and training//

router.get(/nameofcourse-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/overseas-student.html');
});

router.get(/overseasiteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/academic-start.html');
});


//router.get(/finalyear-iteration6-handler/, function (req, res) {
// 
//  if (req.query.finalyear == 'yes') {
//   res.redirect('../education-and-training/course-finish-date');
//  } else if (req.query.finalyear == 'no') {
//    res.redirect('../education-and-training/academic-start');
//  }
//});

router.get(/finalyear-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/cya.html');
});

router.get(/academiciteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/christmas-break.html');
});

router.get(/christmasbreak-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/christmas-end.html');
});

router.get(/christmasend-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/easter-break.html');
});

router.get(/easterbreak-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/easter-end.html');
});

router.get(/easterend-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/summer-break.html');
});

router.get(/summerbreak-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/final-year.html');
});

router.get(/coursefinishdate-iteration6-handler/, function (req, res) {
  res.redirect('../education-and-training/christmas-break.html');
});

// *******************************************************************
// Education and Training-2 (Iteration/ Release 6) - NEW with Term dates
// ********************************************************************


//Edu and training - Iteration 2 with Term dates

router.get(/nameofcourse-iteration6b2-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration2/overseas-student.html');
});

router.get(/overseasiteration6b2-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration2/how-many-terms.html');
});


router.get(/howmanyterms-iteration6b2-handler/, function (req, res) {
  if (req.query.terms == 'one') {
    res.redirect('../edu-and-train-iteration2/term1-dates');
  } else if (req.query.terms == 'two') {
    res.redirect('../edu-and-train-iteration2/term1-dates');
  } else if (req.query.terms == 'three') {
    res.redirect('../edu-and-train-iteration2/term1-dates');
  } else {
  res.redirect('/kickouts/students-developed.html');
}
});

router.get(/term1dates-iteration6b2-handler/, function (req, res) {
  var terms = req.session.data['terms'];

  if (terms.includes('one')) {
    res.redirect('../edu-and-train-iteration2/final-year');
  } else if (terms.includes('two')) {
    res.redirect('../edu-and-train-iteration2/term2-dates');
  } else if (terms.includes('three')) {
    res.redirect('../edu-and-train-iteration2/term2-dates');
  }  
});

router.get(/term2dates-iteration6b2-handler/, function (req, res) {
  var terms = req.session.data['terms'];

  
 if (terms.includes('two')) {
    res.redirect('../edu-and-train-iteration2/final-year');
  } else if (terms.includes('three')) {
    res.redirect('../edu-and-train-iteration2/term3-dates');
  }  
});
 
router.get(/term3dates-iteration6b2-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration2/final-year');
}); 


router.get(/finalyear-iteration6b2-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration2/cya.html');
});

// *******************************************************************
// Education and Training -3 (Iteration/ Release 6) - NEW with Term dates
// ********************************************************************


//Edu and training - Iteration 3 with Term dates

router.get(/nameofcourse-iteration6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/how-many-terms.html');
});

router.get(/overseas6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/cya.html');
  
});


router.get(/howmanyterms-iteration6b3-handler/, function (req, res) {
  if (req.query.howmanyterms == 'yes') {
    res.redirect('term1-dates');
  } else if  (req.query.howmanyterms == 'no') {
    res.redirect('/kickouts/students-developed.html');
  }
});


router.get(/term1dates-iteration6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/term2-dates.html');
});

router.get(/term2dates-iteration6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/term3-dates.html');
});

router.get(/term3dates-iteration6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/final-year.html');
});

router.get(/finalyear-iteration6b3-handler/, function (req, res) {
  res.redirect('../edu-and-train-iteration3/overseas-student.html');
});


// ********************************************************************//
// Release 6.2 Education and Training -  with Term Dates Play back
// ********************************************************************//

router.get(/fulltimeedu6-2-handler/, function (req, res) {
  res.redirect('../edu-and-train/name-of-establishment.html');
});

router.get(/nameofcourse-iteration6-2-handler/, function (req, res) {
  res.redirect('../edu-and-train/term-dates-playback.html');
});

router.get(/termdatesall-iteration6-2-handler/, function (req, res) {
  if (req.query.termdatesall == 'yes') {
    res.redirect('../edu-and-train/final-year');
  } else if  (req.query.termdatesall == 'no') {
    res.redirect('../edu-and-train/how-many-terms');
  }
});


router.get(/howmanyterms-iteration6-2-handler/, function (req, res) {
  if (req.query.howmanyterms == 'yes') {
    res.redirect('term1-dates');
  } else if  (req.query.howmanyterms == 'no') {
    res.redirect('academic-start');
  }
});

router.get(/term1dates-iteration6-2-handler/, function (req, res) {
  res.redirect('term2-dates.html');
});

router.get(/term2dates-iteration6-2-handler/, function (req, res) {
  res.redirect('term3-dates.html');
});

router.get(/term3dates-iteration6-2-handler/, function (req, res) {
  res.redirect('final-year.html');
});



router.get(/academicstart-iteration6-2-handler/, function (req, res) {
  res.redirect('course-finish-date.html');
});

router.get(/ourse-finishdate-iteration6-2-handler/, function (req, res) {
  res.redirect('final-year.html');
});

router.get(/finalyear-iteration6-2-handler/, function (req, res) {
  res.redirect('overseas-student.html');
});

router.get(/overseas-iteration6-2-handler/, function (req, res) {
  res.redirect('cya.html');
  
});



// ************************************
// Education and Training (Iteration 6b)
// ************************************

router.get(/overseasiteration6b-handler/, function (req, res) {
  res.redirect('../education-and-training/final-year.html');
});

router.get(/finalyear-iteration6b-handler/, function (req, res) {
  if (req.query.finalyear == 'yes') {
    res.redirect('../education-and-training/course-finish-date.html');
  } else if (req.query.finalyear == 'no') {
    res.redirect('../education-and-training/cya.html');
  }
});


router.get(/coursefinishdate-iteration6b-handler/, function (req, res) {
  res.redirect('../education-and-training/cya.html');
});

//*********************************************//
//Iteration 6 - Money to support your education//
//*********************************************//

router.get(/whopaysiteration6-handler/, function (req, res) {
  
 if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay') {
  res.redirect('../money-support-edu/tuition-fee-how-much');
} else if (req.query.tuitionfee.toString() == 'myself-pay,sfw-pay') {
  res.redirect('../money-support-edu/tuition-fee-how-much');
} else if (req.query.tuitionfee.toString() == 'myself-pay,saas-pay') {
  res.redirect('../money-support-edu/tuition-fee-how-much');
}else  if (req.query.tuitionfee.includes('sfe-pay')) {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.includes('sfw-pay')) {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.includes('saas-pay')) {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.includes('nhs-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('none-pay')) {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.includes('myself-pay')) {
     res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay') {
   res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay') {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/contribution-type');
 } else if (req.query.tuitionfee.toString() == 'nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'saas-pay,nhs-pay,') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 }  else {
   res.redirect('who-pays');
 }
});




router.get(/awarditeration6-handler/, function (req, res) {
  if (req.query.awardnotice== 'yes') {
    res.redirect('../money-support-edu/contribution-type');
  } else if (req.query.awardnotice == 'no') {
    res.redirect('../money-support-edu/contribution-type');
  }
});

router.get(/tuitionfeehowmuchiteration6-handler/, function (req, res) {
  if (req.query.tuitionfeehowmuch) {
    res.redirect('../money-support-edu/contribution-type');
  } else {
    res.redirect('../iteration-6/tuition-fee-how-much');
  }
});

router.get(/contributiontypeiteration6-handler/, function (req, res) {
  if (req.query.contributiontype.includes('parents')) {
    res.redirect('../money-support-edu/parents-how-often');
  } else if (req.query.contributiontype.includes('relatives')) {
    res.redirect('../money-support-edu/relatives-how-often');
  } else if (req.query.contributiontype.includes('friends')) {
    res.redirect('../money-support-edu/friends-how-often');
  } else if (req.query.contributiontype.includes('none')) {
    res.redirect('../money-support-edu/money-another-1');
  } else if (req.query.contributiontype.toString() == 'parents,relatives,friends') {
    res.redirect('../money-support-edu/parents-how-often');
  } else if (req.query.incomepartner.toString() == 'parents,relatives') {
    res.redirect('../money-support-edu/parents-how-often');
  } else if (req.query.incomepartner.toString() == 'parents,friends') {
    res.redirect('../money-support-edu/parents-how-often');
  } else if (req.query.incomepartner.toString() == 'relatives,friends') {
    res.redirect('../money-support-edu/relatives-how-often');
  }  else {
    res.redirect('../money-support-edu/contribution-type');
  }
});


router.get(/parentshowofteniteration6-handler/, function (req, res) {
  if (req.query.parentshowoften == 'every week' || req.query.parentshowoften == 'every month' || req.query.parentshowoften == 'every term') {
    res.redirect('../money-support-edu/parents-how-much');
  } else {
    res.redirect('../money-support-edu/parents-how-often');
  }
});

router.get(/parentshowmuchiteration6-handler/, function (req, res) {
  var contributiontype = req.session.data['contributiontype'];

    if (req.query.parentshowmuch && contributiontype.includes('relatives')) {
    res.redirect('../money-support-edu/relatives-how-often');
  } else if (req.query.parentshowmuch && contributiontype.includes('friends')) {
    res.redirect('../money-support-edu/friends-how-often');
  } else if (req.query.parentshowmuch) {
    res.redirect('../money-support-edu/money-another-1');
   } else {
    res.redirect('../money-support-edu/parents-how-much');
  }
});
router.get(/relativesiteration6-handler/, function (req, res) {
  
  if (req.query.relatives == 'yes') {
    res.redirect('../money-support-edu/relatives-how-often');
  } else if (req.query.relatives == 'no') {
    res.redirect('../money-support-edu/friends');
  }
});

router.get(/relativeshowofteniteration6-handler/, function (req, res) {
  if (req.query.relativeshowoften == 'every week' || req.query.relativeshowoften == 'every month' || req.query.relativeshowoften == 'every term') {
    res.redirect('../money-support-edu/relatives-how-much');
  } else {
    res.redirect('../money-support-edu/relatives-how-often');
  }
});

router.get(/relativeshowmuchiteration6-handler/, function (req, res) {
  var contributiontype = req.session.data['contributiontype'];

  if (req.query.relativeshowmuch && contributiontype.includes('friends')) {
    res.redirect('../money-support-edu/friends-how-often');
  } else  if (req.query.relativeshowmuch){
    res.redirect('../money-support-edu/money-another-1');
  } else {
    res.redirect('../money-support-edu/relatives-how-much');
  }
});


router.get(/moneyanotheriteration6-handler/, function (req, res) {
  res.redirect('../money-support-edu/cya');
});

//**********************************//
//Iteration 6 - Where you live //
//**********************************//

router.get(/hospital-iteration6-handler/, function (req, res) {
  if (req.query.hospital == 'yes') {
    res.redirect('../where-you-live/live-with-parents');
  } else if (req.query.hospital == 'no') {
    res.redirect('../where-you-live/live-with-parents');
  }
});

router.get(/liveparentsiteration6-handler/, function (req, res) {
  if (req.query.livewithparents == 'yes') {
    res.redirect('../where-you-live/cya');
  } else if (req.query.livewithparents == 'no') {
    res.redirect('../where-you-live/type-of-property');
  }
});


router.get(/typepropertyiteration6-handler/, function (req, res) {


  if (req.query.typeproperty == 'someoneelse-prop') {
    res.redirect('../where-you-live/cya');
  } else if (req.query.typeproperty.includes('rentprop')) {
    res.redirect('#');
  } else if (req.query.typeproperty.includes('own-prop')) {
    res.redirect('#');
  } else if (req.query.typeproperty.includes('shared-prop')) {
    res.redirect('#');
  } else if (req.query.typeproperty.toString() == 'noadd-prop') {
    res.redirect('#');
  }  else {
    res.redirect('../where-you-live/type-of-property');
  }
});

//*********************************************//
//Iteration 6b - Money to support your education//
//*********************************************//
router.get(/whopaysiteration6b-handler/, function (req, res) {
  
  if (req.query.tuitionfee.includes('sfe-pay')) {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.includes('sfw-pay')) {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.includes('saas-pay')) {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.includes('nhs-pay')) {
   res.redirect('/kickouts/students-developed');
 } else if (req.query.tuitionfee.includes('none-pay')) {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.includes('myself-pay')) {
     res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay,sfw-pay') {
   res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'myself-pay,sfe-pay') {
   res.redirect('../money-support-edu/tuition-fee-how-much');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.toString() == 'sfe-pay,sfw-pay') {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,saas-pay') {
   res.redirect('../money-support-edu/paid-to-you');
 } else if (req.query.tuitionfee.toString() == 'nhs-pay,none-help') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'saas-pay,nhs-pay,') {
   res.redirect('kickouts/students-developed');
 } else if (req.query.tuitionfee.toString() == 'sfw-pay,nhs-pay') {
   res.redirect('kickouts/students-developed');
 }  else {
   res.redirect('who-pays');
 }
});



router.get(/paidtoyouiteration6b-handler/, function (req, res) {

  if (req.query.paidtoyou == '8430.00') {
    res.redirect('../money-support-edu/contribution-type.html');
  } else {
    res.redirect('../money-support-edu/3-terms.html');
  }
});

router.get(/3termsiteration6b-handler/, function (req, res) {
  if (req.query.terms == 'yes') {
    res.redirect('../money-support-edu/term-dates.html');
  } else {
    res.redirect('../money-support-edu/evidenceneeded.html');
  }
});

router.get(/termdatesiteration6b-handler/, function (req, res) {
res.redirect('../money-support-edu/contribution-type.html');
});

router.get(/moneyanotheriteration6b-handler/, function (req, res) {
    res.redirect('../money-support-edu/cya');
});


//*******************************//
// Iteration 7 - Where you live  //
//*******************************//

router.get(/hospital-iteration7-handler/, function (req, res) {
  if (req.query.hospital == 'yes') {
    res.redirect('../where-you-live/live-with-parents');
  } else if (req.query.hospital == 'no') {
    res.redirect('../where-you-live/live-with-parents');
  }
});

router.get(/liveparents-iteration7-handler/, function (req, res) {
  if (req.query.livewithparents == 'yes') {
    res.redirect('../where-you-live/cya');
  } else if (req.query.livewithparents == 'no') {
    res.redirect('../where-you-live/type-of-property');
  }
});


router.get(/wheredoyoulive-handler/, function (req, res) {

   if (req.query.typeproperty.includes('rent-prop')) {
    res.redirect('../where-you-live/tenancy-start-end');
 } else if (req.query.typeproperty.includes('someoneelse-prop')) {
    res.redirect('../where-you-live/cya');
  } else if (req.query.typeproperty.includes('own-prop')){
    res.redirect('#');
  } else if (req.query.typeproperty.includes('shared-prop')) {
    res.redirect('#');
  } else if (req.query.typeproperty.includes('noadd-prop')) {
    res.redirect('#');
  }  
});



router.get(/tenancydate-iteration7-handler/, function (req, res) {
  res.redirect('accomodation-type.html');
});

router.get(/accomodation-iteration7-handler/, function (req, res) {
  if (req.query.accomodation == 'private') {
    res.redirect('rent-how-often');
  } else if (req.query.accomodation == 'unihalls') {
    res.redirect('rent-cost-uni');
  }
});

router.get(/rentcostuni-handler/, function (req, res) {
  res.redirect('gas-electricity');
});

router.get(/rentcostprivate-handler/, function (req, res) {
  res.redirect('gas-electricity');
});
router.get(/renthowoften-iteration7-handler/, function (req, res) {
  res.redirect('rent-how-much');
});



router.get(/gaselectricity-iteration7-handler/, function (req, res) {
  
  if (req.query.gaselectricity.includes('meal-only')) {
   res.redirect('meal-term');
 } else if (req.query.gaselectricity.includes('energy-bill')) {
   res.redirect('energy-term');
 } else if (req.query.gaselectricity.includes('meal-energy-bill')) {
   res.redirect('meal-term');
 } else if (req.query.gaselectricity.includes('none-bill')) {
   res.redirect('rent-one-room');
 
 }
});

router.get(/mealterm-iteration7-handler/, function (req, res) {
  res.redirect('meal-type');
});




router.get(/mealtype-iteration7-handler/, function (req, res) {
  var gaselectricity = req.session.data['gaselectricity'];

  if (req.query.mealtype && gaselectricity == 'meal-energy-bill') {
    res.redirect('energy-term');
  } else  if (req.query.mealtype){
    res.redirect('rent-one-room');
  
  }
});

router.get(/energyterm-iteration7-handler/, function (req, res) {
  res.redirect('energy-type');
});

router.get(/energytype-iteration7-handler/, function (req, res) {
  res.redirect('rent-one-room');
});


router.get(/rentoneroom-iteration7-handler/, function (req, res) {
  var accomodation = req.session.data['accomodation'];

  if (req.query.rentoneroom && accomodation == 'private') {
    res.redirect('council-tax');

  } else  if (req.query.rentoneroom){
    res.redirect('cya');
  
  }
});

router.get(/counciltax-iteration7-handler/, function (req, res) {
if (req.query.counciltax == 'yes') {
  res.redirect('council-tax-frequency');
} else if (req.query.counciltax == 'no') {
  res.redirect('cya');
}
});

router.get(/counciltaxfrequency-iteration7-handler/, function (req, res)  {

  res.redirect('council-tax-month');
});

router.get(/counciltaxmonth-iteration7-handler/, function (req, res)  {

  res.redirect('cya');
});














  //*******************************//
// Iteration 7 - Where you live_iteration_1 //
//*******************************//

router.get(/hospital-iteration7b-handler/, function (req, res) {
  if (req.query.hospital == 'yes') {
    res.redirect('../where-you-live_iteration_1/live-with-parents');
  } else if (req.query.hospital == 'no') {
    res.redirect('../where-you-live_iteration_1/live-with-parents');
  }
});

router.get(/liveparents-iteration7b-handler/, function (req, res) {
  if (req.query.livewithparents == 'yes') {
    res.redirect('../where-you-live_iteration_1/cya');
  } else if (req.query.livewithparents == 'no') {
    res.redirect('../where-you-live_iteration_1/type-of-property');
  }
});


router.get(/wheredoyoulive-iteration7b-handler/, function (req, res) {

   if (req.query.typeproperty.includes('rent-prop')) {
    res.redirect('../where-you-live_iteration_1/accomodation-type');
 } else if (req.query.typeproperty.includes('someoneelse-prop')) {
    res.redirect('../where-you-live_iteration_1/cya');
  } else if (req.query.typeproperty.includes('own-prop')){
    res.redirect('#');
  } else if (req.query.typeproperty.includes('shared-prop')) {
    res.redirect('#');
  } else if (req.query.typeproperty.includes('noadd-prop')) {
    res.redirect('#');
  }  
});



router.get(/tenancydate-iteration7b-handler/, function (req, res) {
  res.redirect('rent-cost-uni');
});

router.get(/accomodation-iteration7b-handler/, function (req, res) {
  if (req.query.accomodation == 'private') {
    res.redirect('tenancy-start');
  } else if (req.query.accomodation == 'unihalls') {
    res.redirect('tenancy-start-end');
  }
});


router.get(/tenancystartdate-iteration7b-handler/, function (req, res) {
  res.redirect('type-enddate');
});

router.get(/typeenddate-iteration7b-handler/, function (req, res) {
  if (req.query.typeenddate == 'yes') {
    res.redirect('tenancy-end');
  } else if (req.query.typeenddate == 'no') {
    res.redirect('return-to-accomodation');
  }
  });


  router.get(/return-iteration7b-handler/, function (req, res) {
    if (req.query.return == 'yes') {
      res.redirect('return-date');
    } else if (req.query.return == 'no') {
      res.redirect('rent-how-often');
    }
    });

    router.get(/return-date-iteration7b-handler/, function (req, res) {
      res.redirect('rent-how-often');
    });


  router.get(/tenancyend-iteration7b-handler/, function (req, res) {
    res.redirect('return-to-accomodation');
  });



router.get(/rentcostuni-iteration7b-handler/, function (req, res) {
  res.redirect('gas-electricity');
});

router.get(/rentcostprivate-iteration7b-handler/, function (req, res) {
  res.redirect('gas-electricity');
});
router.get(/renthowoften-iteration7b-handler/, function (req, res) {
  res.redirect('rent-how-much');
});



router.get(/gaselectricity-iteration7b-handler/, function (req, res) {
  
  if (req.query.gaselectricity.includes('meal-only')) {
   res.redirect('meal-term');
 } else if (req.query.gaselectricity.includes('meal-energy-bill')) {
  res.redirect('meal-term');
 }
 else if (req.query.gaselectricity.includes('energy-bill')) {
   res.redirect('energy-term');
 
 } else if (req.query.gaselectricity.includes('none-bill')) {
   res.redirect('rent-one-room');
 
 }
});

router.get(/mealterm-iteration7b-handler/, function (req, res) {
  res.redirect('meal-type');
});




router.get(/mealtype-iteration7b-handler/, function (req, res) {
  var gaselectricity = req.session.data['gaselectricity'];

  if (req.query.mealtype == 'meal-plan') {
    res.redirect('meal-plan-how-much');
  }
  else if (req.query.mealtype && gaselectricity == 'meal-energy-bill') {
    res.redirect('energy-term');
  } 
  
   else  if (req.query.mealtype){
    res.redirect('rent-one-room');
  
  }
});



router.get(/mealplan-howmuch-handler/, function (req, res) {
  var gaselectricity = req.session.data['gaselectricity'];

  if (req.query.mealplancost && gaselectricity == 'meal-energy-bill') {
    res.redirect('energy-term');

  } else  if (req.query.mealplancost){
    res.redirect('rent-one-room');
  
  }
});






router.get(/energyterm-iteration7b-handler/, function (req, res) {
  res.redirect('energy-type');
});

router.get(/energytype-iteration7b-handler/, function (req, res) {
  res.redirect('rent-one-room');
});


router.get(/rentoneroom-iteration7b-handler/, function (req, res) {
  var accomodation = req.session.data['accomodation'];

  if (req.query.rentoneroom && accomodation == 'private') {
    res.redirect('council-tax');

  } else  if (req.query.rentoneroom){
    res.redirect('cya');
  
  }
});

router.get(/counciltax-iteration7b-handler/, function (req, res) {
if (req.query.counciltax == 'yes') {
  res.redirect('council-tax-frequency');
} else if (req.query.counciltax == 'no') {
  res.redirect('cya');
}
});

router.get(/counciltaxfrequency-iteration7b-handler/, function (req, res)  {

  res.redirect('council-tax-month');
});

router.get(/counciltaxmonth-iteration7b-handler/, function (req, res)  {

  res.redirect('cya');
});

//SAVE AND RESUME
//RESUME APPLICATION
// Myself or someone else

router.get(/whoapply-handler/, function (req, res) {
  if (req.query.whoapply == 'myself') {
    res.redirect('text-or-email-resume');
  } else if (req.query.whoapply == 'someonelese') {
    res.redirect('#');
  }
  });

  //text or email resume

router.get(/emailmobileResume-handler/, function (req, res) {
  if (req.query.emailmobile == 'email') {
    res.redirect('resume_details_email');
  } else if (req.query.emailmobile == 'textmessage') {
    res.redirect('resume_details_mobile');
  }
  });

//enter mobile code

router.get(/resume-code-handler/, function (req, res) {
  res.redirect('task-list');
});

//*******************************/
//SAVE APPPLICATION - ITERATION 1
//********************************/



//Myself or someone else
router.get(/applyingforsave-handler/, function (req, res) {
  if (req.query.applyingfor == 'myself') {
    res.redirect('country-split');
  } else if (req.query.applyingfor == 'someonelese') {
    res.redirect('#');
  }
  });

  //Country Split
  router.get(/countrysave-handler/, function (req, res) {
    if (req.query.country == 'England') {
      res.redirect('care-home');
    } else if (req.query.country == 'Scotland') {
      res.redirect('care-home');
    } else if (req.query.country == 'Wales') {
      res.redirect('care-home');
    } else if (req.query.country == 'Northern Ireland') {
      res.redirect('#');
    } else {
      res.redirect('country-split');
    }
  });

  router.get(/carehomeSave-handler/, function (req, res) {
    if (req.query.carehome == 'yes') {
      res.redirect('#');
    } else if (req.query.carehome == 'no') {
      res.redirect('partner');
    } else {
      res.redirect('care-home');
    }
  });

  //Partner

  router.get(/partnerSave-handler/, function (req, res) {
    if (req.query.partner == 'yes') {
      res.redirect('#');
    } else if (req.query.partner == 'no') {
      res.redirect('claimed-asylum-single');
    } else {
      res.redirect('partner');
    }
  });

  //Asylum

  router.get(/asylumsingleSave-handler/, function (req, res) {
    if (req.query.asylumsingle == 'yes') {
      res.redirect('#');
    } else if (req.query.asylumsingle == 'no') {
      res.redirect('education');
    } else {
      res.redirect('claimed-asylum-single');
    }
  });


  //Education

  router.get(/educationSave-handler/, function (req, res) {
    if (req.query.education == 'yes') {
      res.redirect('#');
    } else if (req.query.education == 'no') {
      res.redirect('money-coming-in-single');
    } else {
      res.redirect('education');
    }
  });


  //Money-coming-in

  router.get(/whatissingleincomeSave-handler/, function (req, res) {
    if (req.query.incomesingle.includes('maintenance-income')) {
      res.redirect('../kickouts/developed');
    } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
      res.redirect('../kickouts/developed');
    } else if (req.query.incomesingle.includes('apprenticeship-income')) {
      res.redirect('../kickouts/developed');
    } else if (req.query.incomesingle.includes('trustfunds-income')) {
      res.redirect('../kickouts/developed');
    } else if (req.query.incomesingle.includes('selfemployed-income')) {
      res.redirect('../kickouts/developed');
    } else if (req.query.incomesingle == 'pension-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle == 'earned-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle == 'benefits-income') {
        res.redirect('more-than-6000');
    } else if (req.query.incomesingle == 'nil-income') {
        res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
      res.redirect('more-than-6000');
    } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
      res.redirect('more-than-6000');
    } else {
      res.redirect('money-coming-in-single');
    }
  });

  //More-than -6000 savngs

  router.get(/savingsSave-handler/, function (req, res) {
    if (req.query.savings == 'yes') {
      res.redirect('#');
    } else if (req.query.savings == 'no') {
      res.redirect('save-application');
    } else {
      res.redirect('more-than-6000');
    }
  });

  //Do you want to save application

  router.get(/saveprogressSave-handler/, function (req, res) {
    if (req.query.saveprogress == 'yes') {
      res.redirect('text-or-email-save');
    } else if (req.query.saveprogress == 'no') {
      res.redirect('#');
    } else {
      res.redirect('save-application');
    }
  });

  //Text or mobile


router.get(/textoremailSave-handler/, function (req, res) {
  if (req.query.textemail == 'email') {
    res.redirect('save_details_email');
  } else if (req.query.textemail == 'textmessage') {
    res.redirect('save_details_mobile');
  }
  });


  router.get(/save-code-handler/, function (req, res) {
    res.redirect('application-saved');
  });



//*******************************/
//SAVE APPPLICATION - ITERATION 2
//********************************/
//BEFORE YOU START

  //Country Split
  router.get(/countrysave-iteration2-handler/, function (req, res) {
    if (req.query.country == 'England') {
      res.redirect('../before-you-start/care-home');
    } else if (req.query.country == 'Scotland') {
      res.redirect('../before-you-start/care-home');
    } else if (req.query.country == 'Wales') {
      res.redirect('../before-you-start/care-home');
    } else if (req.query.country == 'Northern Ireland') {
      res.redirect('#');
    } else {
      res.redirect('country-split');
    }
  });

//care home

router.get(/carehomeSave-iteration2-handler/, function (req, res) {
  if (req.query.carehome == 'yes' ) {
    res.redirect('partner');
  } else if (req.query.carehome == 'no') {
    res.redirect('partner');
  }
});

  //Partner

  router.get(/partnerSave-iteration2-handler/, function (req, res) {
    if (req.query.partner == 'yes') {
      res.redirect('#');
    } else if (req.query.partner == 'no') {
      res.redirect('claimed-asylum-single');
    } else {
      res.redirect('partner');
    }
  });

  //Asylum

  router.get(/asylumsingleSave-iteration2-handler/, function (req, res) {
    if (req.query.asylumsingle == 'yes') {
      res.redirect('#');
    } else if (req.query.asylumsingle == 'no') {
      res.redirect('education');
    } else {
      res.redirect('claimed-asylum-single');
    }
  });


  //Education

  router.get(/educationSave-iteration2-handler/, function (req, res) {
    if (req.query.education == 'yes') {
      res.redirect('#');
    } else if (req.query.education == 'no') {
      res.redirect('money-coming-in-single');
    } else {
      res.redirect('education');
    }
  });

//Money coming in Single

//Money-coming-in

router.get(/whatissingleincomeSave-iteration2-handler/, function (req, res) {
  if (req.query.incomesingle.includes('maintenance-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('maternitypaternity-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('apprenticeship-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('trustfunds-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle.includes('selfemployed-income')) {
    res.redirect('../kickouts/developed');
  } else if (req.query.incomesingle == 'pension-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle == 'earned-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle == 'benefits-income') {
      res.redirect('more-than-6000');
  } else if (req.query.incomesingle == 'nil-income') {
      res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income,nil-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,benefits-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income,nil-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income,nil-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,earned-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,benefits-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'pension-income,nil-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,benefits-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'earned-income,nil-income') {
    res.redirect('more-than-6000');
  } else if (req.query.incomesingle.toString() == 'benefits-income,nil-income') {
    res.redirect('more-than-6000');
  } else {
    res.redirect('money-coming-in-single');
  }
});

//More-than -6000 savngs

router.get(/savingsSave-iteration2-handler/, function (req, res) {
  if (req.query.savings == 'yes') {
    res.redirect('#');
  } else if (req.query.savings == 'no') {
    res.redirect('check-your-answers');
  } else {
    res.redirect('more-than-6000');
  }
});







//SAVE APPLICATION

//Myself or someone else
router.get(/applyingforsave-iteration2-handler/, function (req, res) {
  if (req.query.applyingfor == 'myself') {
    res.redirect('save-application');
  } else if (req.query.applyingfor == 'someonelese') {
    res.redirect('task-list');
  }
  });


//Do you want to save application
 router.get(/saveprogressSave-iteration2-handler/, function (req, res) {
   if (req.query.saveprogress == 'yes') {
      res.redirect('text-or-email-save');
      } else if (req.query.saveprogress == 'no') {
        res.redirect('task-list');
      } else {
        res.redirect('save-application');
      }
    });

router.get(/textoremailSave-iteration2-handler/, function (req, res) {
    if (req.query.textemail == 'email') {
        res.redirect('save_details_email');
    } else if (req.query.textemail == 'textmessage') {
        res.redirect('save_details_mobile');
    }
      });


router.get(/save-code-iteration2-handler/, function (req, res) {
  res.redirect('application-saved');
   });

router.get(/whatisyournameSave-handler/, function (req, res) {
res.redirect('address');
     });

router.get(/addressSave-handler/, function (req, res) {
res.redirect('nhs-number');
       });

router.get(/whatisyournhsSave-handler/, function (req, res) {
res.redirect('what-is-your-dob');
 });


 router.get(/whatisyourdobSave-handler/, function (req, res) {
  res.redirect('sight-impaired');
   });




   //RESUME APPLICATION

   router.get(/emailmobileResume-iteration2-handler/, function (req, res) {
    if (req.query.emailmobile == 'email') {
      res.redirect('resume_details_email');
    } else if (req.query.emailmobile == 'textmessage') {
      res.redirect('resume_details_mobile');
    }
    });
  


    router.get(/resume-code-iteration2-handler/, function (req, res) {
      res.redirect('../save-application/task-list');
    });




    

    //PAIGE DOUTEL TEST

    router.get(/dogsdoyoulike-handler/, function (req, res) {
      if (req.query.dogsdoyoulike == 'yes') {
        res.redirect('like-dogs-yes');
      } else {
        res.redirect('like-dogs-no');
      }
    });

    router.get(/whatisyourname-handler/, function (req, res) {
      res.redirect('../dogs-survey/do-you-like');
    });


        //PAIGE DOUTEL UX CODE CLUB

        router.get(/pineapplepizza-handler/, function (req, res) {
          if (req.query.pineapplepizza == 'yes') {
            res.redirect('animalq');
          } else {
            res.redirect('animalq');
          }
        });
    
        router.get(/whatisyourname-handler/, function (req, res) {
          res.redirect('../dogs-survey/do-you-like');
        });