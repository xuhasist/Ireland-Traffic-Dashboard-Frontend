import type {
  IncidentListItem,
  IncidentStandardFormat,
} from "../types/domain";

function minutesAgoToText(minutesAgo: number): string {
  if (!Number.isFinite(minutesAgo) || minutesAgo < 0) return "--";
  if (minutesAgo < 60) return `${minutesAgo} mins ago`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
}

export function mapIncidentToListItem(
  incidentResult: IncidentStandardFormat,
): IncidentListItem {
  const startTime = new Date(incidentResult.incidentDetails.startTime);
  const minutesAgo = Math.floor((Date.now() - startTime.getTime()) / 60000);
  const delayMinutes = Math.floor(incidentResult.impact.delayInSeconds / 60);

  return {
    type: incidentResult.incidentDetails.type.replaceAll("_", " "),
    icon: incidentResult.icon,
    location: incidentResult.location.description,
    time: minutesAgoToText(minutesAgo),
    delay: `${delayMinutes} min delay`,
    severity: incidentResult.incidentDetails.criticality,
  };
}

export function mapIncidentsToListItems(
  incidentResults: IncidentStandardFormat[],
): IncidentListItem[] {
  return incidentResults.map(mapIncidentToListItem);
}
