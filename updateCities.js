/**
 * Update Ireland city road coordinates using OSM Nominatim.
 * - Obeys public Nominatim policy: max 1 request/sec + custom User-Agent.
 * - Uses countrycodes=ie to reduce ambiguity.
 *
 * Ref:
 *  - Search API: https://nominatim.org/release-docs/latest/api/Search/
 *  - Usage policy: https://operations.osmfoundation.org/policies/nominatim/
 */

import fs from "node:fs/promises";

const INPUT = "./cities.json";   // 把你那份資料存成這個檔名
const OUTPUT = "./cities.updated.json";

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "ireland-traffic-dashboard/1.0 (contact: liuyufan0213@gmail.com)"; // 務必改成你的資訊

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function nominatimSearch(q) {
  const url = new URL(NOMINATIM);
  url.searchParams.set("q", q);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "ie"); // Ireland
  url.searchParams.set("dedupe", "1");

  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept-Language": "en",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Nominatim HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data?.[0] ?? null;
}

function toNum(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

async function main() {
  const raw = await fs.readFile(INPUT, "utf-8");
  const cities = JSON.parse(raw);

  for (const [cityName, city] of Object.entries(cities)) {
    // 1) update city center + bbox (optional but recommended)
    const cityQuery = `${cityName}, Ireland`;
    console.log(`City: ${cityQuery}`);

    const cityHit = await nominatimSearch(cityQuery);
    if (cityHit) {
      const lat = toNum(cityHit.lat);
      const lon = toNum(cityHit.lon);
      if (lat && lon) city.center = [lat, lon];

      // Nominatim boundingbox = [southLat, northLat, westLon, eastLon]
      const bb = cityHit.boundingbox?.map(toNum);
      if (bb?.length === 4 && bb.every((v) => v !== null)) {
        const [southLat, northLat, westLon, eastLon] = bb;
        city.bbox = {
          minLon: westLon,
          minLat: southLat,
          maxLon: eastLon,
          maxLat: northLat,
        };
      }
    } else {
      console.warn(`  ⚠️ City not found: ${cityQuery}`);
    }

    // Respect 1 req/sec
    await sleep(1100);

    // 2) update each road
    for (const r of city.roads ?? []) {
      const roadQuery = `${r.name}, ${cityName}, Ireland`;
      console.log(`  Road: ${roadQuery}`);

      const hit = await nominatimSearch(roadQuery);
      if (hit) {
        const lat = toNum(hit.lat);
        const lon = toNum(hit.lon);
        if (lat && lon) {
          r.lat = lat;
          r.lng = lon;
        } else {
          console.warn(`    ⚠️ No numeric lat/lon: ${roadQuery}`);
        }
      } else {
        console.warn(`    ⚠️ Road not found: ${roadQuery}`);
      }

      // Respect 1 req/sec
      await sleep(1100);
    }
  }

  await fs.writeFile(OUTPUT, JSON.stringify(cities, null, 2), "utf-8");
  console.log(`\n✅ Done. Wrote: ${OUTPUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
