import json, time, urllib.parse, urllib.request

TOMTOM_KEY = "PEooaTjLuccn1ZmqjT25dDIfEIoXaIRh"

SEED = {
  "Dublin": ["O'Connell Street","Grafton Street","Dame Street","Nassau Street","Abbey Street",
             "Talbot Street","Parnell Street","College Green","Westmoreland Street","Capel Street",
             "Jervis Street","Parliament Street","Pearse Street","Dorset Street","Baggot Street",
             "Merrion Square","St Stephen's Green","Thomas Street","James's Street","North Circular Road"],
  "Cork": ["St Patrick's Street","Grand Parade","South Mall","Oliver Plunkett Street","Washington Street",
           "Patrick's Quay","Anderson's Quay","MacCurtain Street","North Main Street","South Main Street",
           "Western Road","Sheares Street","Lower Glanmire Road","Douglas Road","Blackrock Road",
           "Model Farm Road","Bishopstown Road","Wilton Road","Carrigrohane Road","Tivoli Road"],
  "Galway": ["Eyre Square","Shop Street","Quay Street","Forster Street","Eglinton Street",
             "University Road","Newcastle Road","Headford Road","Tuam Road","Dublin Road",
             "Seamus Quirke Road","Bohermore","Wellpark Road","Lough Atalia Road","Dock Road",
             "Fr Griffin Road","Upper Salthill Road","Lower Salthill Road","The Promenade","Bóthar na dTreabh"],
  "Limerick": ["O'Connell Street","William Street","Patrick Street","Henry Street","Cecil Street",
               "Shannon Street","Thomas Street","Mulgrave Street","Roxboro Road","Dublin Road",
               "Ennis Road","Dock Road","Childers Road","Ballinacurra Road","South Circular Road",
               "Clare Street","Parnell Street","Barrington Street","Newenham Street","Catherine Street"],
  "Waterford": ["The Quay","Merchant's Quay","Parade Quay","O'Connell Street","Patrick Street",
                "John Street","Michael Street","Barronstrand Street","High Street","Catherine Street",
                "Bridge Street","The Mall","Dunmore Road","Cork Road","Dublin Road",
                "Tramore Road","Ballybricken","Manor Street","New Street","Poleberry"],
}

def geocode(name, city):
  q = urllib.parse.quote(f"{name}, {city}, Ireland")
  url = f"https://api.tomtom.com/search/2/geocode/{q}.json?key={urllib.parse.quote(TOMTOM_KEY)}&limit=5&countrySet=IE&typeahead=false"
  with urllib.request.urlopen(url) as r:
    data = json.loads(r.read().decode("utf-8"))
  results = data.get("results", [])
  if not results:
    return None

  city_lower = city.lower()
  def score(item):
    addr = item.get("address", {}) or {}
    muni = (addr.get("municipality","") or "").lower()
    sub = (addr.get("municipalitySubdivision","") or "").lower()
    return 2 if (city_lower in muni or city_lower in sub) else 0

  results.sort(key=score, reverse=True)
  pos = results[0].get("position")
  if not pos:
    return None
  return {"lat": pos["lat"], "lng": pos["lon"]}

out = {}
for city, roads in SEED.items():
  out[city] = {"roads": []}
  for name in roads:
    pos = geocode(name, city)
    if pos:
      out[city]["roads"].append({"name": name, **pos})
    time.sleep(0.15)

with open("ireland_roads.generated.json", "w", encoding="utf-8") as f:
  json.dump(out, f, ensure_ascii=False, indent=2)

print("✅ Generated ireland_roads.generated.json")
