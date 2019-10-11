
import { Component, OnInit } from "@angular/core";
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit{

  constructor(
    private backgroundGeolocation: BackgroundGeolocation
  ) { }

  ngOnInit() {
    console.log("--------------------->calling init")
    this.startBackgroundGeolocation();
  }

  startBackgroundGeolocation() {
    console.log("--------------------->hello");
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 10,
      distanceFilter: 30,
      interval:1000,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log("--------------------->location",location);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.stationary)
        .subscribe((stationary) => {
          console.log("--------------------->stationary", stationary);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.error)
        .subscribe((error) => {
          console.log("--------------------->error", error);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.start)
        .subscribe((start) => {
          console.log("--------------------->start", start);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.stop)
        .subscribe((stop) => {
          console.log("--------------------->stop", stop);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.background)
        .subscribe((background) => {
          console.log("--------------------->background", background);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.foreground)
        .subscribe((foreground) => {
          console.log("foreground", foreground);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.abort_requested)
        .subscribe((abort_requested) => {
          console.log("abort_requested", abort_requested);
        });
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.error)
        .subscribe((error) => {
          console.log("error", error);
        });
    });

    // start recording location
    this.backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // this.backgroundGeolocation.stop();
  }
}