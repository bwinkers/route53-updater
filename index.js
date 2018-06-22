var AWS = require('aws-sdk');

var route53 = new AWS.Route53();

module.exports = function addRecord(zone, hostname, ip, identifier, weight=100, ttl=60) {
  
  // Create a healthcheck
  //var healthCheckId = createHealthCheck(ip, hostname);
  
  // Create the record
  var params = {
  ChangeBatch: {
   Changes: [
      {
     Action: "CREATE", 
     ResourceRecordSet: {
     // HealthCheckId: healthCheckId, 
      Name: hostname, 
      ResourceRecords: [
         {
        Value: ip
       }
      ], 
      SetIdentifier: identifier, 
      TTL: ttl, 
      Type: "A", 
      Weight: weight
     }
    }
   ], 
   Comment: "Node app server registering itself as ready to take traffic."
  }, 
  HostedZoneId: zone
 };
 route53.changeResourceRecordSets(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   /*
   data = {
    ChangeInfo: {
     Comment: "Web servers for example.com", 
     Id: "/change/C2682N5HXP0BZ4", 
     Status: "PENDING", 
     SubmittedAt: <Date Representation>
    }
   }
   */
 });
};

function createHealthCheck(ip, hostname) {
  var check =  {
    "Type": "AWS::Route53::HealthCheck",
    "Properties": {
      "HealthCheckConfig": {
        "IPAddress": ip,
        "Port": "3000",
        "Type": "HTTP",
        "ResourcePath": "/aws-route53-healthcheck",
        "FullyQualifiedDomainName": hostname,
        "RequestInterval": "30",
        "FailureThreshold": "3"
      },
      "HealthCheckTags" : [{
        "Key": "environment",
        "Value": "development"
      }]
    }
  };
  
  return 'xxx';
}
