import type {
  BBox,
  IncidentStandardFormat,
  Road,
  TrafficStandardFormat,
} from "../types/domain";

const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n));

export class TomTomService {
  static API_KEY = "PEooaTjLuccn1ZmqjT25dDIfEIoXaIRh";
  static BASE_URL = "https://api.tomtom.com/traffic/services";

  static async fetchTrafficFlow(
    roads: Road[],
  ): Promise<{ results: (TrafficStandardFormat | null)[] }> {
    const tasks = roads.map((road) =>
      this.#fetchFlowForPoint(road.lat, road.lng, road.name),
    );
    const results = (await Promise.all(tasks)).filter(Boolean);

    return { results };
  }

  static async #fetchFlowForPoint(
    lat: number,
    lng: number,
    roadName: string,
  ): Promise<TrafficStandardFormat | null> {
    const url = `${this.BASE_URL}/4/flowSegmentData/absolute/22/json?point=${lat},${lng}&unit=KMPH&key=${this.API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.#convertToStandardFormat(data, roadName);
    } catch (error) {
      console.error(
        `Error fetching traffic flow for point (${lat}, ${lng}):`,
        error,
      );
      return null;
    }
  }

  static #convertToStandardFormat(
    tomtomData: any,
    roadName: string,
  ): TrafficStandardFormat {
    const flow = tomtomData.flowSegmentData;

    const freeFlow = Number(flow.freeFlowSpeed) || 0;
    const currentSpeed = Number(flow.currentSpeed) || 0;

    const speedDiff = freeFlow - currentSpeed;
    const jamFactor = freeFlow > 0 ? (speedDiff / freeFlow) * 10 : 0;

    return {
      location: {
        description: roadName,
        shape: {
          links: [
            {
              points: (() => {
                const coordArr = flow?.coordinates?.coordinate;
                const parsed = Array.isArray(coordArr)
                  ? coordArr.map((c) => ({
                      lat: Number(c.latitude),
                      lng: Number(c.longitude),
                    }))
                  : [];
                return parsed.length >= 2 ? parsed : [];
              })(),
            },
          ],
        },
      },
      currentFlow: {
        speed: Math.round(currentSpeed),
        freeFlow,
        jamFactor: Number(clamp(Number(jamFactor.toFixed(1)), 0, 10)),
        traversability: flow.roadClosure ? "closed" : "open",
      },
    };
  }

  static async fetchIncidents(
    bbox: BBox,
  ): Promise<{ results: IncidentStandardFormat[] } | null> {
    const fields =
      "{incidents{type,geometry{type,coordinates},properties{id,iconCategory,magnitudeOfDelay,events{description,code,iconCategory},startTime,endTime,from,to,length,delay,roadNumbers,timeValidity,probabilityOfOccurrence,numberOfReports,lastReportTime,tmc{countryCode,tableNumber,tableVersion,direction,points{location,offset}}}}}";
    const url =
      `${this.BASE_URL}/5/incidentDetails` +
      `?key=${this.API_KEY}` +
      `&bbox=${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}` +
      `&language=en-GB` +
      `&fields=${fields}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.#convertIncidentsToStandardFormat(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      return null;
    }
  }

  static #convertIncidentsToStandardFormat(tomtomData: any): {
    results: IncidentStandardFormat[];
  } {
    return {
      results: tomtomData.incidents.map((incident: any) => {
        const iconCategory = incident.properties.iconCategory;
        return {
          incidentDetails: {
            id: incident.properties.id,
            type: this.getIncidentType(iconCategory),
            criticality: this.getSeverityLevel(iconCategory),
            description: incident.properties.events[0]?.description,
            startTime: incident.properties.startTime,
            endTime: incident.properties.endTime,
          },
          location: {
            shape: {
              links: [
                {
                  points: incident.geometry.coordinates.map(
                    (coord: [number, number]) => ({
                      lat: coord[1],
                      lng: coord[0],
                    }),
                  ),
                },
              ],
            },
            description:
              incident.properties.from + " to " + incident.properties.to,
          },
          impact: {
            delayInSeconds: incident.properties.delay,
            affectedRoads: incident.properties.roadNumbers,
          },
          icon: this.getIncidentIcon(iconCategory),
        };
      }),
    };
  }

  static getIncidentIcon(iconCategory: number): string {
    const iconMap: Record<number, string> = {
      0: "❓",
      1: "💥",
      2: "🌫️",
      3: "⚠️",
      4: "🌧️",
      5: "🧊",
      6: "⚡",
      7: "🚧",
      8: "⛔",
      9: "🏗️",
      10: "💨",
      11: "🌊",
      14: "❌",
    };

    return iconMap[iconCategory] ?? "";
  }

  static getIncidentType(iconCategory: number): string {
    const typeMap: Record<number, string> = {
      0: "Unknown",
      1: "Accident",
      2: "Fog",
      3: "Dangerous Conditions",
      4: "Rain",
      5: "Ice",
      6: "Heavy Traffic",
      7: "Lane Closed",
      8: "Road Closed",
      9: "Road Works",
      10: "Wind",
      11: "Flooding",
      14: "Broken Down Vehicle",
    };
    return typeMap[iconCategory] ?? "Unknown";
  }

  static getSeverityLevel(iconCategory: number): "minor" | "major" | "moderate" | "Unknown" {
    const typeMap: Record<number, "minor" | "major" | "moderate" | "Unknown"> = {
      0: "Unknown",
      1: "major",
      2: "moderate",
      3: "moderate",
      4: "minor",
      5: "major",
      6: "minor",
      7: "moderate",
      8: "major",
      9: "moderate",
      10: "moderate",
      11: "major",
      14: "moderate",
    };
    return typeMap[iconCategory] ?? "Unknown";
  }
}
