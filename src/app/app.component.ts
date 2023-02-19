import { Component, OnInit } from "@angular/core";
import Amplify, { PubSub, Auth } from "aws-amplify";

import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

Amplify.configure({
  Auth: {
    identityPoolId: "us-west-2:190044d9-f6bd-48f9-9506-bf8912e0520c",
    region: "us-west-2",
    userPoolId: "us-west-2_4g8biDpNl",
    userPoolWebClientId: "pjmrp13a6irqa4sctoujqhii6"
  }
});

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "us-west-2",
    aws_pubsub_endpoint:
      "wss://apf6hmlwvx9ez-ats.iot.us-west-2.amazonaws.com/mqtt"
  })
);

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";

  constructor() {
    Amplify.PubSub.subscribe("request-app").subscribe({
      next: data => console.log("Message received", data),
      error: error => console.error(error),
      close: () => console.log("Done")
    });
  }
  ngOnInit() {
    setTimeout(this.getUser, 1000);
  }

  async addMessage() {
    await PubSub.publish("request-app", { msg: "Hello to all subscribers!" });
    console.log("done");
  }

  getUser() {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => console.log(user))
      .catch(err => console.log(err));
  }
}
