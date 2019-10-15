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
    res.redirect('/apply/what-you-will-need');
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

router.get(/partner-handler/, function (req, res) {
  if (req.query.partner == 'yes') {
    applicant.partner = true;
    res.redirect('/beforeyoustart/asylum/claimed-asylum-partner');
  } else if (req.query.partner == 'no') {
    applicant.partner = false;
    res.redirect('/beforeyoustart/asylum/claimed-asylum-single');
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
    res.redirect('/beforeyoustart/more-than-6000');
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
    res.redirect('../../beforeyoustart/money-coming-in-single');
  }
});

router.get(/asylumPartner-handler/, function (req, res) {
  if (req.query.asylumPartner == 'yes') {
    res.redirect('../../kickouts/developed');
  } else if (req.query.asylumPartner == 'no') {
    res.redirect('../../beforeyoustart/money-coming-in-partner');
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
// PENSIONS
// ************************

router.get(/statepension-handler/, function (req, res) {
  if (req.query.statepension== 'yes') {
    res.redirect('../pension/state-pension-how-often');
  } else if (req.query.statepension == 'no') {
    res.redirect('../pension/pension-name');
  }
});

router.get(/statepensionhowoften-handler/, function (req, res) {
  if (req.query.statepensionhowoften == 'every week' || req.query.statepensionhowoften == 'every 2 weeks' || req.query.statepensionhowoften == 'every 4 weeks' || req.query.statepensionhowoften == 'every 13 weeks (quarterly)' || req.query.statepensionhowoften == 'once a year') {
    res.redirect('../pension/state-pension-how-much');
  } else {
    res.redirect('../pension/state-pension-how-often');
  }
});

router.get(/statepensionhowmuch-handler/, function (req, res) {
  res.redirect('../pension/pension-another-1');
});

router.get(/statepensionanother-handler/, function (req, res) {
  if (req.query.statepensionanother == 'yes') {
    res.redirect('../pension/pension-name');
  } else if (req.query.statepensionanother == 'no') {
    res.redirect('answers');
  }
});

router.get(/pensiontitle-handler/, function (req, res) {
  res.redirect('../pension/pension-how-often');
});

router.get(/pensionhowoften-handler/, function (req, res) {
  if (req.query.pensionhowoften == 'every week' || req.query.pensionhowoften == 'every 2 weeks' || req.query.pensionhowoften == 'every 4 weeks' || req.query.pensionhowoften == 'every calendar month' || req.query.pensionhowoften == 'every 13 weeks (quarterly)' || req.query.pensionhowoften == 'once a year') {
    res.redirect('pension-how-much');
  } else {
    res.redirect('pension-how-often');
  }
});

router.get(/personalpensionhowmuch-handler/, function (req, res) {
  res.redirect('pension-another-2');
});

router.get(/personalpensionanother-handler/, function (req, res) {
  if (req.query.personalpensionanother == 'yes') {
    res.redirect('pension-name');
  } else if (req.query.personalpensionanother == 'no') {
    res.redirect('answers');
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

router.get(/applyingforSaveRestoreiteration2-handler/, function (req, res) {
  if (req.query.applyingfor == 'myself' ) {
    benificiary.thirdParty = false;
    res.render('apply/save-restore/iteration-2/care-home', {
      thirdparty : benificiary.thirdParty
    }); 
  } else if (req.query.applyingfor == 'someoneelse' ) {
    benificiary.thirdParty = false;
    res.redirect('/apply/save-restore/iteration-2/applying-for');
  } else if (req.query.applyingfor.includes('understand') ) {
    benificiary.thirdParty = true;
    res.render('apply/save-restore/iteration-2/care-home', {
      thirdparty : benificiary.thirdParty
    });
  }
});


router.get(/answersSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/answers-saved', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/tasklistSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/task-list', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/beneficiarySaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/name-of-beneficiary', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/nameSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/date-of-birth', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/dobSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/address', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/addressSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/nhs-number', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/nhsnumberSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/sight-impaired', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/sightimpairedSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/details/answers', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/detailsSaveRestoreiteration2-handler/, function (req, res) {
  res.render('apply/save-restore/iteration-2/text-or-email', {
    thirdparty : benificiary.thirdParty
  });
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
// BENEFITS (Iteration 5)
// ************************

router.get(/universalcredititeration5-handler/, function (req, res) {
  if (req.query.universalcredit == 'yes') {
    res.redirect('universal-credit-any');
  } if (req.query.universalcredit == 'no') {
    res.redirect('tax-credits');
  } else if (req.query.universalcredit == 'not-yet') {
    res.redirect('universal-credit-awaiting');
  }
});

router.get(/universalcreditanyiteration5-handler/, function (req, res) {
  if (req.query.universalcreditany == 'yes') {
    res.redirect('universal-credit-935');
  } else if (req.query.universalcreditany == 'no') {
    res.redirect('universal-credit-435');
  }
});

router.get(/universalcredit935iteration5-handler/, function (req, res) {
  if (req.query.universalcredit935 == 'yes') {
    res.redirect('passport-935');
  } else if (req.query.universalcredit935 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/universalcredit435iteration5-handler/, function (req, res) {
  if (req.query.universalcredit435 == 'yes') {
    res.redirect('passport-435');
  } else if (req.query.universalcredit435 == 'no') {
    res.redirect('tax-credits');
  }
});

router.get(/taxcreditsiteration5-handler/, function (req, res) {
  if (req.query.taxcredits == 'yes') {
    res.redirect('tax-credits-type');
  } else if (req.query.taxcredits == 'no') {
    res.redirect('any-other-benefits');
  }
});

router.get(/taxcredittypeiteration5-handler/, function (req, res) {
  if (req.query.taxcredittype == 'WTCCTC') {
    res.redirect('any-other-benefits');
  } if (req.query.taxcredittype == 'WTCDisability') {
    res.redirect('any-other-benefits');
  } if (req.query.taxcredittype == 'WTC') {
    res.redirect('any-other-benefits');
  } else if (req.query.taxcredittype == 'CTC') {
    res.redirect('any-other-benefits');
  }
});

router.get(/anyotherbenefitsiteration5-handler/, function (req, res) {
  if (req.query.anyotherbenefits == 'yes') {
    res.redirect('other-benefits1');
  } else if (req.query.anyotherbenefits == 'no') {
    res.redirect('carers-allowance');
  }
});

router.get(/otherbenefits1iteration5-handler/, function (req, res) {

  var listofBenefits1 = ['Armed forces independence payment', 'Attendance allowance', 'Bereavement allowance', 'Bereavement payment', 'Bereavement support payment', 'Budgeting loan', 'Carer\'s allowance', 'Carer\'s allowance Supplement (Scotland only)', 'Child benefit', 'Christmas bonus', 'Cold weather payment', 'Council tax reduction', 'Disability living allowance', 'Discretionary housing payment', 'ESA (Employment and support allowance)', 'Funeral payment', 'Guardian\'s allowance', 'Healthy start', 'Help with health costs', 'Housing benefit', 'Income support', 'Industrial injuries disablement benefit', 'JSA (Jobseeker\'s allowance)', 'Maternity allowance', 'Pension credit', 'PIP (Personal independence payment)', 'Reduced earnings allowance', 'Severe disablement allowance', 'State retirement pension', 'Statutory adoption pay', 'Statutory maternity pay', 'Statutory paternity pay', 'Statutory Shared Parental Pay (ShPP)', 'Statutory sick pay', 'Sure start maternity grant', 'Universal credit', 'Vaccine damage payment', 'War disablement pension', 'War widow\'s or widower\'s pension', 'Welfare Supplementary payments (Northern Ireland)', 'Widowed parent\'s allowance', 'Winter fuel payment'];

  if (!listofBenefits1.includes(req.query.inputautocomplete1)) {
    res.redirect('other-benefits1');
  } else if (req.query.inputautocomplete1.includes('Income support'))  {
    res.redirect('passport-incomesupport');
  } else {
    res.redirect('other-benefits-another1');
  }


});

router.get(/otherbenefits2iteration5-handler/, function (req, res) {

var listofBenefits2 = ['Armed forces independence payment', 'Attendance allowance', 'Bereavement allowance', 'Bereavement payment', 'Bereavement support payment', 'Budgeting loan', 'Carer\'s allowance', 'Carer\'s allowance Supplement (Scotland only)', 'Child benefit', 'Christmas bonus', 'Cold weather payment', 'Council tax reduction', 'Disability living allowance', 'Discretionary housing payment', 'ESA (Employment and support allowance)', 'Funeral payment', 'Guardian\'s allowance', 'Healthy start', 'Help with health costs', 'Housing benefit', 'Income support', 'Industrial injuries disablement benefit', 'JSA (Jobseeker\'s allowance)', 'Maternity allowance', 'Pension credit', 'PIP (Personal independence payment)', 'Reduced earnings allowance', 'Severe disablement allowance', 'State retirement pension', 'Statutory adoption pay', 'Statutory maternity pay', 'Statutory paternity pay', 'Statutory Shared Parental Pay (ShPP)', 'Statutory sick pay', 'Sure start maternity grant', 'Universal credit', 'Vaccine damage payment', 'War disablement pension', 'War widow\'s or widower\'s pension', 'Welfare Supplementary payments (Northern Ireland)', 'Widowed parent\'s allowance', 'Winter fuel payment'];

if (!listofBenefits2.includes(req.query.inputautocomplete2)) {
  res.redirect('other-benefits2');
} else if (req.query.inputautocomplete2.includes('Income support'))  {
  res.redirect('passport-incomesupport');
} else {
  res.redirect('other-benefits-another2');
}

});

router.get(/benefitanother1-iteration-5-handler/, function (req, res) {
  if (req.query.benefitanother1 == 'yes') {
    res.redirect('other-benefits2');
  } else if (req.query.benefitanother1 == 'no' && req.session.data['inputautocomplete1'].includes('JSA (Jobseeker\'s allowance)')) {
    res.redirect('jobseekers-allowance-type');
  } else if (req.query.benefitanother1 == 'no' && req.session.data['inputautocomplete1'].includes('ESA (Employment and support allowance)')) {
    res.redirect('employment-support-allowance-type');
  } else if (req.query.benefitanother1 == 'no' && req.session.data['inputautocomplete1'].includes('Pension credit')) {
    res.redirect('pension-credit-type');
  } else if (req.query.benefitanother1 == 'no') {
    res.redirect('carers-allowance');
  } else {
    res.redirect('other-benefits-another1');
  }
});

router.get(/otherbenefits2iteration5-handler/, function (req, res) {
  res.redirect('other-benefits-another2');
});

router.get(/benefitanother2-iteration-5-handler/, function (req, res) {

  var benefit1 = req.session.data['inputautocomplete1'] || 'N/A';
  var benefit2 = req.session.data['inputautocomplete2'] || 'N/A';

  if (req.query.benefitanother2 == 'yes') {
    res.redirect('other-benefits2');
  } else if (req.query.benefitanother2 == 'no' && (benefit1.includes('JSA (Jobseeker\'s allowance)') || benefit2.includes('JSA (Jobseeker\'s allowance)'))) {
    res.redirect('jobseekers-allowance-type');
  } else if (req.query.benefitanother2 == 'no' && (benefit1.includes('ESA (Employment and support allowance)') || benefit2.includes('ESA (Employment and support allowance)'))) {
    res.redirect('employment-support-allowance-type');
  } else if (req.query.benefitanother2 == 'no' && (benefit1.includes('Pension credit') || benefit2.includes('Pension credit'))) {
    res.redirect('pension-credit-type');
  } else if (req.query.benefitanother2 == 'no') {
    res.redirect('carers-allowance');
  } else {
    res.redirect('other-benefits-another1');
  }
});

router.get(/jobseekerstypeiteration-5-handler/, function (req, res) {

  var benefit1 = req.session.data['inputautocomplete1'] || 'N/A';
  var benefit2 = req.session.data['inputautocomplete2'] || 'N/A';

  if (req.query.jobseekerstype == 'income') {
    res.redirect('passport-jsa');
  } else if (req.query.jobseekerstype == 'contribution' && (benefit1.includes('ESA (Employment and support allowance)') || benefit2.includes('ESA (Employment and support allowance)'))) {
    res.redirect('employment-support-allowance-type');
  } else if (req.query.jobseekerstype == 'contribution' && (benefit1.includes('Pension credit') || benefit2.includes('Pension credit'))) {
    res.redirect('pension-credit-type');
  } else if (req.query.jobseekerstype == 'contribution') {
    res.redirect('carers-allowance');
  }
});

router.get(/employmentsupporttypeiteration-5-handler/, function (req, res) {

  var benefit1 = req.session.data['inputautocomplete1'] || 'N/A';
  var benefit2 = req.session.data['inputautocomplete2'] || 'N/A';

  if (req.query.employmentsupporttype == 'income') {
    res.redirect('passport-esa');
  } else if (req.query.employmentsupporttype == 'contribution' && (benefit1.includes('Pension credit') || benefit2.includes('Pension credit'))) {
    res.redirect('pension-credit-type');
  } else if (req.query.employmentsupporttype == 'contribution') {
    res.redirect('carers-allowance');
  }
});

router.get(/pensioncredittypeiteration5-handler/, function (req, res) {
  if (req.query.pensioncredittype == 'GC') {
    res.redirect('passport-pensioncredit');
  } else if (req.query.pensioncredittype == 'GCwithSC') {
    res.redirect('passport-pensioncredit');
  } else if (req.query.pensioncredittype == 'SC') {
    res.redirect('carers-allowance');
  }
});

router.get(/additionalbenefitsiteration5-handler/, function (req, res) {
  res.redirect('carers-allowance');
});

router.get(/carersallowanceiteration5-handler/, function (req, res) {
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
  if (req.query.coursetype == 'yes') {
    res.redirect('name-of-establishment');
  } else if (req.query.coursetype == 'no') {
    res.redirect('name-of-establishment');
  }
});

router.get(/finalyear-handler/, function (req, res) {
  if (req.query.finalyear == 'yes') {
    res.redirect('course-finish-date');
  } else if (req.query.finalyear == 'no') {
    res.redirect('financial-help');
  }
});

router.get(/overseas-handler/, function (req, res) {
  if (req.query.finalyear == 'yes') {
    res.redirect('country');
  } else if (req.query.finalyear == 'no') {
    res.redirect('final-year');
  }
});



router.get(/coursefinishdate-handler/, function (req, res) {
  res.redirect('financial-help');
});

router.get(/financialhelp-handler/, function (req, res) {
  if (req.query.financialhelp.includes('loanmaintenance-help')) {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.includes('bursary-help')) {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.includes('money-help')) {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.includes('scholarships-help')) {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.includes('overseas-help')) {
    res.redirect('money-from-parents');
  } else if (req.query.financialhelp.toString() == 'loanmaintenance-help,bursary-help') {
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

router.get(/moneyfromparents-handler/, function (req, res) {
  if (req.query.moneyfromparents == 'yes') {
    res.redirect('parents-income-assessed');
  } else if (req.query.moneyfromparents == 'no') {
    res.redirect('...');
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
    res.redirect('/beforeyoustart/education-or-training');
  } else {
    res.redirect('/beforeyoustart/more-than-6000');
  }
});

router.get(/educationtrainingsplit-handler/, function (req, res) {
  if (req.query.educationtraining== 'yes') {
    res.redirect('/kickouts/students-developed');
  } else if (req.query.educationtraining== 'no') {
    res.redirect('/beforeyoustart/check-your-answers-check-eligibility');
  } else {
    res.redirect('/beforeyoustart/more-than-6000');
  }
});


