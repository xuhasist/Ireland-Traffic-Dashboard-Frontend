import type { DashboardConfig } from "./types";

// ================================
// CONFIG & DATA
// ================================
export const CONFIG = {
  defaultCity: "Dublin",
  cities: {
    Dublin: {
      center: [53.3493795, -6.2605593],
      bbox: {
        minLon: -6.3870259,
        minLat: 53.2987342,
        maxLon: -6.1148829,
        maxLat: 53.4105416,
      },
      roads: [
        {
          name: "O'Connell Street",
          lat: 53.3509547,
          lng: -6.2605881,
        },
        {
          name: "Grafton Street",
          lat: 53.3420874,
          lng: -6.2598865,
        },
        {
          name: "Dame Street",
          lat: 53.3441751,
          lng: -6.2646484,
        },
        {
          name: "Nassau Street",
          lat: 53.3432662,
          lng: -6.2592181,
        },
        {
          name: "Abbey Street",
          lat: 53.3485609,
          lng: -6.2581508,
        },
        {
          name: "Talbot Street",
          lat: 53.3504353,
          lng: -6.2563102,
        },
        {
          name: "Parnell Street",
          lat: 53.3501473,
          lng: -6.2670481,
        },
        {
          name: "College Green",
          lat: 53.3445818,
          lng: -6.2595687,
        },
        {
          name: "Westmoreland Street",
          lat: 53.3454921,
          lng: -6.259148,
        },
        {
          name: "Capel Street",
          lat: 53.3482491,
          lng: -6.2687204,
        },
        {
          name: "Jervis Street",
          lat: 53.3495105,
          lng: -6.2669459,
        },
        {
          name: "Parliament Street",
          lat: 53.3445312,
          lng: -6.2673698,
        },
        {
          name: "Pearse Street",
          lat: 53.344473,
          lng: -6.2511176,
        },
        {
          name: "Dorset Street",
          lat: 53.3535615,
          lng: -6.26836,
        },
        {
          name: "Baggot Street",
          lat: 53.3326025,
          lng: -6.243701,
        },
        {
          name: "Merrion Square",
          lat: 53.339152,
          lng: -6.2503308,
        },
        {
          name: "St Stephen's Green",
          lat: 53.3380517,
          lng: -6.2590232,
        },
        {
          name: "Thomas Street",
          lat: 53.3433655,
          lng: -6.2830178,
        },
        {
          name: "James's Street",
          lat: 53.3431108,
          lng: -6.2908996,
        },
        {
          name: "North Circular Road",
          lat: 53.3600583,
          lng: -6.263208,
        },
      ],
    },
    Cork: {
      center: [51.8985136, -8.4726423],
      bbox: {
        minLon: -8.6378543,
        minLat: 51.8273102,
        maxLon: -8.3551315,
        maxLat: 51.9701415,
      },
      roads: [
        {
          name: "St Patrick's Street",
          lat: 51.8983321,
          lng: -8.472843,
        },
        {
          name: "Grand Parade",
          lat: 51.8965952,
          lng: -8.4746255,
        },
        {
          name: "South Mall",
          lat: 51.8962452,
          lng: -8.4735832,
        },
        {
          name: "Oliver Plunkett Street",
          lat: 51.8975744,
          lng: -8.4725112,
        },
        {
          name: "Washington Street",
          lat: 51.897546,
          lng: -8.4792473,
        },
        {
          name: "Patrick's Quay",
          lat: 51.9003253,
          lng: -8.46299,
        },
        {
          name: "Anderson's Quay",
          lat: 51.8997441,
          lng: -8.4654267,
        },
        {
          name: "MacCurtain Street",
          lat: 51.9014929,
          lng: -8.468289,
        },
        {
          name: "North Main Street",
          lat: 51.8991007,
          lng: -8.4778687,
        },
        {
          name: "South Main Street",
          lat: 51.8958344,
          lng: -8.4762772,
        },
        {
          name: "Western Road",
          lat: 51.894201,
          lng: -8.4971505,
        },
        {
          name: "Sheares Street",
          lat: 51.8981759,
          lng: -8.4798997,
        },
        {
          name: "Lower Glanmire Road",
          lat: 51.9054278,
          lng: -8.4070232,
        },
        {
          name: "Douglas Road",
          lat: 51.8799283,
          lng: -8.4401663,
        },
        {
          name: "Blackrock Road",
          lat: 51.8970788,
          lng: -8.4162038,
        },
        {
          name: "Model Farm Road",
          lat: 51.8885654,
          lng: -8.5120059,
        },
        {
          name: "Bishopstown Road",
          lat: 51.8750631,
          lng: -8.5236275,
        },
        {
          name: "Wilton Road",
          lat: 51.8886193,
          lng: -8.5066859,
        },
        {
          name: "Carrigrohane Road",
          lat: 51.8933845,
          lng: -8.5113153,
        },
        {
          name: "Tivoli Road",
          lat: 51.9157267,
          lng: -8.4267312,
        },
      ],
    },
    Galway: {
      center: [53.2744122, -9.0490601],
      bbox: {
        minLon: -9.1426901,
        minLat: 53.2485189,
        maxLon: -8.9548381,
        maxLat: 53.3197423,
      },
      roads: [
        {
          name: "Eyre Square",
          lat: 53.2743794,
          lng: -9.0492256,
        },
        {
          name: "Shop Street",
          lat: 53.2724335,
          lng: -9.0532516,
        },
        {
          name: "Quay Street",
          lat: 53.2710451,
          lng: -9.0541484,
        },
        {
          name: "Forster Street",
          lat: 53.2753644,
          lng: -9.0443073,
        },
        {
          name: "Eglinton Street",
          lat: 53.274442,
          lng: -9.0521013,
        },
        {
          name: "University Road",
          lat: 53.2759778,
          lng: -9.0594264,
        },
        {
          name: "Newcastle Road",
          lat: 53.2734339,
          lng: -9.0626023,
        },
        {
          name: "Headford Road",
          lat: 53.2825559,
          lng: -9.0475886,
        },
        {
          name: "Tuam Road",
          lat: 53.287639,
          lng: -9.0272775,
        },
        {
          name: "Dublin Road",
          lat: 53.2764659,
          lng: -9.0047147,
        },
        {
          name: "Seamus Quirke Road",
          lat: 53.2750111,
          lng: -9.077236,
        },
        {
          name: "Bohermore",
          lat: 53.2787266,
          lng: -9.0449172,
        },
        {
          name: "Wellpark Road",
          lat: 53.282532,
          lng: -9.0332125,
        },
        {
          name: "Lough Atalia Road",
          lat: 53.2729697,
          lng: -9.043575,
        },
        {
          name: "Dock Road",
          lat: 53.2707321,
          lng: -9.0508911,
        },
        {
          name: "Fr Griffin Road",
          lat: 53.2685738,
          lng: -9.0581751,
        },
        {
          name: "Upper Salthill Road",
          lat: 53.2628238,
          lng: -9.0726056,
        },
        {
          name: "Lower Salthill Road",
          lat: 53.267217,
          lng: -9.0681442,
        },
        {
          name: "The Promenade",
          lat: 53.2608756,
          lng: -9.0721628,
        },
        {
          name: "Bóthar na dTreabh",
          lat: 53.2889785,
          lng: -9.0103081,
        },
      ],
    },
    Limerick: {
      center: [52.661252, -8.6301239],
      bbox: {
        minLon: -8.8070765,
        minLat: 52.5721036,
        maxLon: -8.4425444,
        maxLat: 52.757379,
      },
      roads: [
        {
          name: "O'Connell Street",
          lat: 52.6624879,
          lng: -8.6281364,
        },
        {
          name: "William Street",
          lat: 52.6630664,
          lng: -8.6247461,
        },
        {
          name: "Patrick Street",
          lat: 52.6650432,
          lng: -8.6252641,
        },
        {
          name: "Henry Street",
          lat: 52.6595324,
          lng: -8.6331845,
        },
        {
          name: "Cecil Street",
          lat: 52.6612553,
          lng: -8.6274949,
        },
        {
          name: "Shannon Street",
          lat: 52.6626878,
          lng: -8.6289253,
        },
        {
          name: "Thomas Street",
          lat: 52.6626688,
          lng: -8.625923,
        },
        {
          name: "Mulgrave Street",
          lat: 52.6596108,
          lng: -8.616968,
        },
        {
          name: "Roxboro Road",
          lat: 52.6563888,
          lng: -8.6180489,
        },
        {
          name: "Dublin Road",
          lat: 52.6636786,
          lng: -8.5969311,
        },
        {
          name: "Ennis Road",
          lat: 52.6729139,
          lng: -8.6691575,
        },
        {
          name: "Dock Road",
          lat: 52.646592,
          lng: -8.6693603,
        },
        {
          name: "Childers Road",
          lat: 52.6481385,
          lng: -8.6322412,
        },
        {
          name: "Ballinacurra Road",
          lat: 52.6439396,
          lng: -8.6460509,
        },
        {
          name: "South Circular Road",
          lat: 52.6524575,
          lng: -8.6390632,
        },
        {
          name: "Clare Street",
          lat: 52.6655905,
          lng: -8.6125188,
        },
        {
          name: "Parnell Street",
          lat: 52.6597442,
          lng: -8.6250059,
        },
        {
          name: "Barrington Street",
          lat: 52.6583164,
          lng: -8.6313605,
        },
        {
          name: "Newenham Street",
          lat: 52.6587455,
          lng: -8.6330813,
        },
        {
          name: "Catherine Street",
          lat: 52.661149,
          lng: -8.627609,
        },
      ],
    },
    Waterford: {
      center: [52.2609997, -7.1119081],
      bbox: {
        minLon: -7.1869522,
        minLat: 52.2102427,
        maxLon: -7.0338797,
        maxLat: 52.2798229,
      },
      roads: [
        {
          name: "The Quay",
          lat: 52.2393483,
          lng: -6.9724471,
        },
        {
          name: "Merchant's Quay",
          lat: 52.2637538,
          lng: -7.1181641,
        },
        {
          name: "Parade Quay",
          lat: 52.260621,
          lng: -7.1053366,
        },
        {
          name: "O'Connell Street",
          lat: 52.2618159,
          lng: -7.1137506,
        },
        {
          name: "Patrick Street",
          lat: 52.2600379,
          lng: -7.1122554,
        },
        {
          name: "John Street",
          lat: 52.2576216,
          lng: -7.1116742,
        },
        {
          name: "Michael Street",
          lat: 52.2588546,
          lng: -7.1118775,
        },
        {
          name: "Barronstrand Street",
          lat: 52.2616392,
          lng: -7.1116086,
        },
        {
          name: "High Street",
          lat: 52.2607268,
          lng: -7.1098613,
        },
        {
          name: "Catherine Street",
          lat: 52.2576502,
          lng: -7.1072702,
        },
        {
          name: "Bridge Street",
          lat: 52.2633838,
          lng: -7.1193588,
        },
        {
          name: "The Mall",
          lat: 52.2598087,
          lng: -7.1060535,
        },
        {
          name: "Dunmore Road",
          lat: 52.2469433,
          lng: -7.0799638,
        },
        {
          name: "Cork Road",
          lat: 52.2450579,
          lng: -7.1355153,
        },
        {
          name: "Dublin Road",
          lat: 52.1546054,
          lng: -8.2781502,
        },
        {
          name: "Tramore Road",
          lat: 52.2471469,
          lng: -7.1189771,
        },
        {
          name: "Ballybricken",
          lat: 52.2603785,
          lng: -7.1205244,
        },
        {
          name: "Manor Street",
          lat: 52.2543912,
          lng: -7.1142211,
        },
        {
          name: "New Street",
          lat: 52.2583185,
          lng: -7.1125192,
        },
        {
          name: "Poleberry",
          lat: 52.2517856,
          lng: -7.110356,
        },
      ],
    },
  },
  zoom: 13, // 市中心縮放級別
  //radius: 5000, // 5公里範圍
  timeZone: "Europe/Dublin", // 都柏林時區
  //updateInterval: 5 * 60 * 1000, // 5分鐘自動更新
  updateInterval: 5 * 1000, // 5秒自動更新 (測試用)
  thresholds: {
    // jam factor 分級標準
    goodMax: 4,
    moderateMax: 7,
  },
  pagination: {
    trafficItemsPerPage: 10,
    incidentItemsPerPage: 5,
  },
  charts: {
    speedTrendMaxPoints: 10, // 折線圖最多顯示點數
    speedTrendYMax: 60, // 折線圖 Y 軸最大值
  },
} as DashboardConfig;
