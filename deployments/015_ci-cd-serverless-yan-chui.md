# Production Ready Serverless

[Source](https://livevideo.manning.com/course/38?continue=true)

* Continuous Integration: CI is a development practice that requires developers to integrate code into a shared repository several times a day. Each checkin-in is then verified by an automated build, allowing teams to detect problems early.
* **Integrtion testing**: integration of our code with system we can't change.
* **Continuous Integration**: integration of our change code with other code changes in the shared repository.

* Continuous Deployment (if everything is automated)
  1. Code review -> **leads to commiting code into the shared repository**
  2. Commit -> **triggers code build**
  3. Build (if we talk about Java or webpack with Node.js) - linting, test coverage -> **create deployment artifacts**
  4. Test (integration / functional tests, end-to-end) -> **produces ye/no and a person needs manually approve it**
  5. Production (blue/green OR canary deployment, feature flags)


