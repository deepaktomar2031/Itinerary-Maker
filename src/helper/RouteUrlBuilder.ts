import { IStop } from "../Interface/IStop";
import { ORIGIN_KEY, DESTINATION_KEY, WAYPOINT_KEY, API_KEY } from "../constant/constants";

export class RouteUrlBuilder {
    private baseUrl: string;
    private queryString: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.queryString = "";
    }

    isEmpty() {
        if (this.queryString != "") this.queryString += `&`;
    }

    addOrigin(itineraryStop: IStop[]): void {
        this.isEmpty();
        const originlatitude = itineraryStop[0].geolocation.latitude;
        const originlongitude = itineraryStop[0].geolocation.longitude;
        this.queryString += `${ORIGIN_KEY}${originlatitude},${originlongitude}`;
    }

    addDestination(itineraryStop: IStop[]): void {
        this.isEmpty();
        const destinationlatitude = itineraryStop[itineraryStop.length - 1].geolocation.latitude;
        const destinationlongitude = itineraryStop[itineraryStop.length - 1].geolocation.longitude;
        this.queryString += `${DESTINATION_KEY}${destinationlatitude},${destinationlongitude}`;
    }

    addWayPoint(itineraryStop: IStop[]): void {
        this.isEmpty();
        let wayPoints = "";
        // excluding source & destination (first & last)
        for (let index = 1; index < itineraryStop.length - 1; ++index) {
            wayPoints += `${itineraryStop[index].geolocation.latitude},${itineraryStop[index].geolocation.longitude}`;
            if (index != itineraryStop.length - 2) wayPoints += `|`;
        }
        this.queryString += `${WAYPOINT_KEY}${wayPoints}`;
    }

    addApiKey(apiKey: string): void {
        this.isEmpty();
        this.queryString += `${API_KEY}${apiKey}`;
    }

    build(): string {
        this.isEmpty();
        if (this.queryString != "") return this.baseUrl + "?" + this.queryString;

        return this.baseUrl;
    }
}
