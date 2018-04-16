var faker = require('faker');

var currentEpochTime = Math.floor(new Date() / 1000);
var secondsInADay = 86400;

var users = {};
var jobs = {};
var jobApplications = {};

function generateUniqueJob() {
  var newJob = {
    "JobId": {
      S: faker.random.uuid()
    },
    "CountryId": {
      S: faker.random.number({
        'min': 1,
        'max': 20
      }).toString()
    },
    "JobTitle": {
      S: faker.name.jobTitle()
    },
    "JobType": {
      S: faker.name.jobType()
    },
    "JobShortSummary": {
      S: faker.lorem.paragraphs(5)
    },
    "JobDescription": {
      S: faker.lorem.paragraphs(30)
    },
    "ClosingTime": {  
      N: faker.random.number({
        'min': currentEpochTime + secondsInADay,
        'max': currentEpochTime + (secondsInADay * 10)
      }).toString()
    }
  };

  jobs[newJob.JobId.S] = newJob;
  return newJob;
}

function generateUniqueUser() {
  var newUser = {
    "UserId": {
      S: faker.random.uuid()
    },
    "FirstName": {
      S: faker.name.firstName()
    },
    "LastName": {
      S: faker.name.lastName()
    }
  };

  users[newUser.UserId.S] = newUser;
  return newUser;
}

function generateJobApplication(job, user) {
  var newJobApplication = {
    "JobId" : job.JobId,
    "UserId": user.UserId,
    "JobTitle": job.JobTitle,    
    "TimeApplied": {
      "N": faker.random.number({
        'min': currentEpochTime + secondsInADay,
        'max': job.ClosingTime.N
      }).toString()
    },
    "Resume": {
      "S": faker.lorem.paragraphs(30)
    },
    "ApplicationForm": {
      "S": JSON.stringify(faker.helpers.userCard())
    }
  };

  var key = generateJobApplicationKey(job, user);
  jobApplications[key] = newJobApplication;

  return newJobApplication;
}

function generateJobApplicationKey(job, user) {
  return job.JobId.S + '_' + user.UserId.S;
}

function generateAllData(numberOfJobs, numberOfUsers) {
  for (var i=0; i<numberOfUsers; i++) {
    generateUniqueUser();
  }

  for (var i=0; i<numberOfJobs; i++) {
    var job = generateUniqueJob();

    var numberOfJobApplications = faker.random.number({
                                    'min': 0,
                                    'max': numberOfUsers/10
                                  });

    for(var applications=0; applications<numberOfJobApplications; applications++) {
      // Ensure user has not applied to this job
      var user;    
      do {
        user = faker.random.objectElement(users);
      } while (generateJobApplicationKey(job, user) in jobApplications);

      generateJobApplication(job, user);
    }
  }

  return {
    'PL.User': users,
    'PL.Job': jobs,
    'PL.JobApplication': jobApplications
  };

}

module.exports.generateUniqueJob = generateUniqueJob;
module.exports.generateUniqueUser = generateUniqueUser;
module.exports.generateJobApplication = generateJobApplication;
module.exports.generateAllData = generateAllData;
