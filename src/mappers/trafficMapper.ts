import { CONFIG } from "../legacy/config";
import type {
  TrafficListItem,
  TrafficStandardFormat,
  TrafficStatus,
} from "../types/domain";

function jamToStatus(jamFactor: number): TrafficStatus {
  if (jamFactor < CONFIG.thresholds.goodMax) return "good";
  if (jamFactor < CONFIG.thresholds.moderateMax) return "moderate";
  return "heavy";
}

export function mapTrafficFlowToListItem(
  flowResult: TrafficStandardFormat,
): TrafficListItem {
  const jamFactor = flowResult.currentFlow.jamFactor;

  return {
    name: flowResult.location.description,
    jamLevel: jamFactor,
    speed: flowResult.currentFlow.speed,
    status: jamToStatus(jamFactor),
    freeFlow: flowResult.currentFlow.freeFlow,
  };
}

export function mapTrafficFlowsToListItems(
  flowResults: TrafficStandardFormat[],
): TrafficListItem[] {
  return flowResults.map(mapTrafficFlowToListItem);
}
