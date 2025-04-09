const flightDetailsStep1 = [
  {
    search_metadata: {
      id: "67f515901b3d273608c28f7f",
      status: "Success",
      json_endpoint:
        "https://serpapi.com/searches/78e30d21128635e1/67f515901b3d273608c28f7f.json",
      created_at: "2025-04-08 12:24:48 UTC",
      processed_at: "2025-04-08 12:24:48 UTC",
      google_flights_url:
        "https://www.google.com/travel/flights?hl=en&gl=us&curr=USD&tfs=CBwQAhoeEgoyMDI1LTA0LTA4agcIARIDTEhScgcIARIDREVMGh4SCjIwMjUtMDQtMTRqBwgBEgNERUxyBwgBEgNMSFJCAQFIAXABmAEB&tfu=EgIIAQ",
      raw_html_file:
        "https://serpapi.com/searches/78e30d21128635e1/67f515901b3d273608c28f7f.html",
      prettify_html_file:
        "https://serpapi.com/searches/78e30d21128635e1/67f515901b3d273608c28f7f.prettify",
      total_time_taken: 1.26,
    },
    search_parameters: {
      engine: "google_flights",
      hl: "en",
      gl: "us",
      departure_id: "LHR",
      arrival_id: "DEL",
      outbound_date: "2025-04-08",
      return_date: "2025-04-14",
      currency: "USD",
    },
    best_flights: [
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 19:45",
            },
            arrival_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-08 22:00",
            },
            duration: 75,
            airplane: "Airbus A220-300 Passenger",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 1181",
            legroom: "30 in",
            extensions: [
              "Average legroom (30 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "Carbon emissions estimate: 56 kg",
            ],
          },
          {
            departure_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-09 10:50",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 22:50",
            },
            duration: 510,
            airplane: "Boeing 777",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 226",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 436 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 770,
            name: "Paris Charles de Gaulle Airport",
            id: "CDG",
            overnight: true,
          },
        ],
        total_duration: 1355,
        carbon_emissions: {
          this_flight: 494000,
          typical_for_this_route: 476000,
          difference_percent: 4,
        },
        price: 1204,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3hCUmpFeE9ERjhRVVl5TWpZYUN3anZxd2NRQWhvRFZWTkVPQnh3NzZzSCIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkNERyIsbnVsbCwiQUYiLCIxMTgxIl0sWyJDREciLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJBRiIsIjIyNiJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 19:50",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 09:20",
            },
            duration: 540,
            airplane: "Boeing 787",
            airline: "Virgin Atlantic",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/VS.png",
            travel_class: "Premium Economy",
            flight_number: "VS 300",
            extensions: [
              "Extra reclining seat",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 714 kg",
            ],
            overnight: true,
          },
        ],
        total_duration: 540,
        carbon_emissions: {
          this_flight: 715000,
          typical_for_this_route: 476000,
          difference_percent: 50,
        },
        price: 1576,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/VS.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ1ZXVXpNd01Cb0xDSUhQQ1JBQ0dnTlZVMFE0SEhDQnp3az0iLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJERUwiLG51bGwsIlZTIiwiMzAwIl1dXQ==",
      },
    ],
    other_flights: [
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 18:10",
            },
            arrival_airport: {
              name: "Helsinki Airport",
              id: "HEL",
              time: "2025-04-08 23:00",
            },
            duration: 170,
            airplane: "Airbus A350",
            airline: "Finnair",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AY.png",
            travel_class: "Economy",
            flight_number: "AY 1338",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 166 kg",
            ],
          },
          {
            departure_airport: {
              name: "Helsinki Airport",
              id: "HEL",
              time: "2025-04-09 18:30",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-10 05:20",
            },
            duration: 500,
            airplane: "Airbus A330",
            airline: "Finnair",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AY.png",
            travel_class: "Economy",
            flight_number: "AY 121",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 412 kg",
            ],
            overnight: true,
          },
        ],
        layovers: [
          {
            duration: 1170,
            name: "Helsinki Airport",
            id: "HEL",
            overnight: true,
          },
        ],
        total_duration: 1840,
        carbon_emissions: {
          this_flight: 579000,
          typical_for_this_route: 476000,
          difference_percent: 22,
        },
        price: 963,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AY.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3hCV1RFek16aDhRVmt4TWpFYUN3amY3d1VRQWhvRFZWTkVPQnh3Mys4RiIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkhFTCIsbnVsbCwiQVkiLCIxMzM4Il0sWyJIRUwiLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJBWSIsIjEyMSJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 18:10",
            },
            arrival_airport: {
              name: "Warsaw Frederic Chopin",
              id: "WAW",
              time: "2025-04-08 21:45",
            },
            duration: 155,
            airplane: "Boeing 737MAX 8 Passenger",
            airline: "LOT",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LO.png",
            travel_class: "Economy",
            flight_number: "LO 280",
            legroom: "30 in",
            extensions: [
              "Average legroom (30 in)",
              "In-seat power & USB outlets",
              "Stream media to your device",
              "Carbon emissions estimate: 114 kg",
            ],
          },
          {
            departure_airport: {
              name: "Warsaw Frederic Chopin",
              id: "WAW",
              time: "2025-04-09 15:50",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-10 02:55",
            },
            duration: 455,
            airplane: "Boeing 787",
            airline: "LOT",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LO.png",
            travel_class: "Economy",
            flight_number: "LO 71",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 285 kg",
            ],
            overnight: true,
          },
        ],
        layovers: [
          {
            duration: 1085,
            name: "Warsaw Frederic Chopin",
            id: "WAW",
            overnight: true,
          },
        ],
        total_duration: 1695,
        carbon_emissions: {
          this_flight: 400000,
          typical_for_this_route: 476000,
          difference_percent: -16,
        },
        price: 1027,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/LO.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3BNVHpJNE1IeE1UemN4R2dzSW1hSUdFQUlhQTFWVFJEZ2NjSm1pQmc9PSIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIldBVyIsbnVsbCwiTE8iLCIyODAiXSxbIldBVyIsIjIwMjUtMDQtMDkiLCJERUwiLG51bGwsIkxPIiwiNzEiXV1d",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 20:05",
            },
            arrival_airport: {
              name: "Zurich Airport",
              id: "ZRH",
              time: "2025-04-08 22:45",
            },
            duration: 100,
            airplane: "Airbus A220-300 Passenger",
            airline: "SWISS",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LX.png",
            travel_class: "Economy",
            flight_number: "LX 339",
            legroom: "30 in",
            extensions: [
              "Average legroom (30 in)",
              "Carbon emissions estimate: 96 kg",
            ],
            plane_and_crew_by: "Air Baltic",
          },
          {
            departure_airport: {
              name: "Zurich Airport",
              id: "ZRH",
              time: "2025-04-09 12:10",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 23:35",
            },
            duration: 475,
            airplane: "Airbus A330",
            airline: "SWISS",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LX.png",
            travel_class: "Economy",
            flight_number: "LX 146",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 383 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 805,
            name: "Zurich Airport",
            id: "ZRH",
            overnight: true,
          },
        ],
        total_duration: 1380,
        carbon_emissions: {
          this_flight: 479000,
          typical_for_this_route: 476000,
          difference_percent: 1,
        },
        price: 1287,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/LX.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3RNV0RNek9YeE1XREUwTmhvTENJN3RCeEFDR2dOVlUwUTRISENPN1FjPSIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIlpSSCIsbnVsbCwiTFgiLCIzMzkiXSxbIlpSSCIsIjIwMjUtMDQtMDkiLCJERUwiLG51bGwsIkxYIiwiMTQ2Il1dXQ==",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 20:25",
            },
            arrival_airport: {
              name: "Munich International Airport",
              id: "MUC",
              time: "2025-04-08 23:20",
            },
            duration: 115,
            airplane: "Airbus A320neo",
            airline: "Lufthansa",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LH.png",
            travel_class: "Economy",
            flight_number: "LH 2481",
            legroom: "29 in",
            extensions: [
              "Below average legroom (29 in)",
              "In-seat USB outlet",
              "Carbon emissions estimate: 85 kg",
            ],
          },
          {
            departure_airport: {
              name: "Munich International Airport",
              id: "MUC",
              time: "2025-04-09 13:00",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 23:55",
            },
            duration: 445,
            airplane: "Airbus A380",
            airline: "Lufthansa",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/LH.png",
            travel_class: "Economy",
            flight_number: "LH 762",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 426 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 820,
            name: "Munich International Airport",
            id: "MUC",
            overnight: true,
          },
        ],
        total_duration: 1380,
        carbon_emissions: {
          this_flight: 512000,
          typical_for_this_route: 476000,
          difference_percent: 8,
        },
        price: 1291,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/LH.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3hNU0RJME9ERjhURWczTmpJYUN3aUI4QWNRQWhvRFZWTkVPQnh3Z2ZBSCIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIk1VQyIsbnVsbCwiTEgiLCIyNDgxIl0sWyJNVUMiLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJMSCIsIjc2MiJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 18:45",
            },
            arrival_airport: {
              name: "Chhatrapati Shivaji Maharaj International Airport Mumbai",
              id: "BOM",
              time: "2025-04-09 08:45",
            },
            duration: 570,
            airplane: "Boeing 787",
            airline: "Virgin Atlantic",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/VS.png",
            travel_class: "Premium Economy",
            flight_number: "VS 354",
            extensions: [
              "Extra reclining seat",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 712 kg",
            ],
            overnight: true,
          },
          {
            departure_airport: {
              name: "Chhatrapati Shivaji Maharaj International Airport Mumbai",
              id: "BOM",
              time: "2025-04-09 12:30",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 14:40",
            },
            duration: 130,
            airplane: "Airbus A321",
            airline: "IndiGo",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
            travel_class: "Economy",
            flight_number: "6E 6028",
            ticket_also_sold_by: ["Virgin Atlantic"],
            legroom: "28 in",
            extensions: [
              "Below average legroom (28 in)",
              "Carbon emissions estimate: 87 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 225,
            name: "Chhatrapati Shivaji Maharaj International Airport Mumbai",
            id: "BOM",
          },
        ],
        total_duration: 925,
        carbon_emissions: {
          this_flight: 800000,
          typical_for_this_route: 476000,
          difference_percent: 68,
        },
        price: 1342,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3hXVXpNMU5IdzJSVFl3TWpnYUN3aVdtQWdRQWhvRFZWTkVPQnh3bHBnSSIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkJPTSIsbnVsbCwiVlMiLCIzNTQiXSxbIkJPTSIsIjIwMjUtMDQtMDkiLCJERUwiLG51bGwsIjZFIiwiNjAyOCJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 21:45",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 10:55",
            },
            duration: 520,
            airplane: "Boeing 787",
            airline: "Air India",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AI.png",
            travel_class: "Business Class",
            flight_number: "AI 2016",
            extensions: [
              "Lie flat seat",
              "Free Wi-Fi",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 1595 kg",
            ],
            overnight: true,
          },
        ],
        total_duration: 520,
        carbon_emissions: {
          this_flight: 1595000,
          typical_for_this_route: 476000,
          difference_percent: 235,
        },
        price: 1790,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AI.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ1pCU1RJd01UWWFDd2lIOWdvUUFob0RWVk5FT0J4d2gvWUsiLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJERUwiLG51bGwsIkFJIiwiMjAxNiJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 20:35",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 09:45",
            },
            duration: 520,
            airplane: "Boeing 787",
            airline: "Air India",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AI.png",
            travel_class: "Business Class",
            flight_number: "AI 2018",
            extensions: [
              "Lie flat seat",
              "Free Wi-Fi",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 1595 kg",
            ],
            overnight: true,
          },
        ],
        total_duration: 520,
        carbon_emissions: {
          this_flight: 1595000,
          typical_for_this_route: 476000,
          difference_percent: 235,
        },
        price: 1892,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AI.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ1pCU1RJd01UZ2FDd2oreFFzUUFob0RWVk5FT0J4dy9zVUwiLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJERUwiLG51bGwsIkFJIiwiMjAxOCJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 18:50",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 08:00",
            },
            duration: 520,
            airplane: "Airbus A350",
            airline: "British Airways",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/BA.png",
            travel_class: "Premium Economy",
            flight_number: "BA 257",
            extensions: [
              "Extra reclining seat",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 604 kg",
            ],
            overnight: true,
          },
        ],
        total_duration: 520,
        carbon_emissions: {
          this_flight: 604000,
          typical_for_this_route: 476000,
          difference_percent: 27,
        },
        price: 3396,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/BA.png",
        departure_token:
          "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ1ZDUVRJMU54b0xDTnZjRkJBQ0dnTlZVMFE0SEhEYjNCUT0iLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJERUwiLG51bGwsIkJBIiwiMjU3Il1dXQ==",
      },
    ],
    price_insights: {
      lowest_price: 963,
      price_level: "high",
      typical_price_range: [620, 790],
      price_history: [
        [1738886400, 632],
        [1738972800, 631],
        [1739059200, 629],
        [1739145600, 634],
        [1739232000, 632],
        [1739318400, 627],
        [1739404800, 627],
        [1739491200, 631],
        [1739577600, 640],
        [1739664000, 643],
        [1739750400, 624],
        [1739836800, 626],
        [1739923200, 634],
        [1740009600, 643],
        [1740096000, 648],
        [1740182400, 646],
        [1740268800, 646],
        [1740355200, 647],
        [1740441600, 627],
        [1740528000, 648],
        [1740614400, 628],
        [1740700800, 625],
        [1740787200, 622],
        [1740873600, 633],
        [1740960000, 635],
        [1741046400, 637],
        [1741132800, 673],
        [1741219200, 675],
        [1741305600, 687],
        [1741392000, 689],
        [1741478400, 689],
        [1741564800, 683],
        [1741651200, 671],
        [1741737600, 662],
        [1741824000, 692],
        [1741910400, 688],
        [1741996800, 692],
        [1742083200, 733],
        [1742169600, 721],
        [1742256000, 717],
        [1742342400, 709],
        [1742428800, 715],
        [1742515200, 687],
        [1742601600, 730],
        [1742688000, 717],
        [1742774400, 714],
        [1742860800, 758],
        [1742947200, 727],
        [1743033600, 693],
        [1743120000, 775],
        [1743206400, 760],
        [1743292800, 784],
        [1743375600, 796],
        [1743462000, 804],
        [1743548400, 787],
        [1743634800, 804],
        [1743721200, 856],
        [1743807600, 852],
        [1743894000, 854],
        [1743980400, 852],
        [1744066800, 963],
      ],
    },
    airports: [
      {
        departure: [
          {
            airport: {
              id: "LHR",
              name: "Heathrow Airport",
            },
            city: "London",
            country: "United Kingdom",
            country_code: "GB",
            image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRpN9RbtOSTDqKIPxWc_D6rdSysaWVh6d-NW7yz7yFXKRwh5RN5BpNIoXEwH1XVcFdLWqn6Sm8_Y_zmeg",
            thumbnail:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYH83YXny8hR4M7k5BMFq4vUT6LNtVABQzgs2pg-hcpSZq3oMBOQK3xh591AAJv2Qx4uvFZUGqOVt4kuoCUOklISunmndJleOoSef_7QE",
          },
        ],
        arrival: [
          {
            airport: {
              id: "DEL",
              name: "Indira Gandhi International Airport",
            },
            city: "New Delhi",
            country: "India",
            country_code: "IN",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRqzwP-0z4pH29-KifVzfrxM5wwXx56g3Hoo_ebldH9Fy8a8EjGqPzd3fZqJSKoE5tSIRC2iGJxgqzQ",
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7HqndXM-ihFCu1qUKosYR--X_yXSd-0mkQHeSUaG5rkpq5Y6uxD8CMmYUCdngZE7mV0onuN2zv_aVxGGO8xv4FMcpMlWvbXdvJFcemY",
          },
        ],
      },
      {
        departure: [
          {
            airport: {
              id: "DEL",
              name: "Indira Gandhi International Airport",
            },
            city: "New Delhi",
            country: "India",
            country_code: "IN",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRqzwP-0z4pH29-KifVzfrxM5wwXx56g3Hoo_ebldH9Fy8a8EjGqPzd3fZqJSKoE5tSIRC2iGJxgqzQ",
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7HqndXM-ihFCu1qUKosYR--X_yXSd-0mkQHeSUaG5rkpq5Y6uxD8CMmYUCdngZE7mV0onuN2zv_aVxGGO8xv4FMcpMlWvbXdvJFcemY",
          },
        ],
        arrival: [
          {
            airport: {
              id: "LHR",
              name: "Heathrow Airport",
            },
            city: "London",
            country: "United Kingdom",
            country_code: "GB",
            image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRpN9RbtOSTDqKIPxWc_D6rdSysaWVh6d-NW7yz7yFXKRwh5RN5BpNIoXEwH1XVcFdLWqn6Sm8_Y_zmeg",
            thumbnail:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYH83YXny8hR4M7k5BMFq4vUT6LNtVABQzgs2pg-hcpSZq3oMBOQK3xh591AAJv2Qx4uvFZUGqOVt4kuoCUOklISunmndJleOoSef_7QE",
          },
        ],
      },
    ],
  },
];

const flightDetailsStep2 = [
  {
    search_metadata: {
      id: "67f5186da9d4b9ae7621128f",
      status: "Success",
      json_endpoint:
        "https://serpapi.com/searches/78e30d21128635e1/67f5186da9d4b9ae7621128f.json",
      created_at: "2025-04-08 12:37:01 UTC",
      processed_at: "2025-04-08 12:37:01 UTC",
      google_flights_url:
        "https://www.google.com/travel/flights?hl=en&gl=us&curr=USD&tfs=CBwQAhphEgoyMDI1LTA0LTA4IiAKA0xIUhIKMjAyNS0wNC0wOBoDQ0RHKgJBRjIEMTE4MSIfCgNDREcSCjIwMjUtMDQtMDkaA0RFTCoCQUYyAzIyNmoHCAESA0xIUnIHCAESA0RFTBoeEgoyMDI1LTA0LTE0agcIARIDREVMcgcIARIDTEhSQgEBSAFwAZgBAQ&tfu=EgIIAQ",
      raw_html_file:
        "https://serpapi.com/searches/78e30d21128635e1/67f5186da9d4b9ae7621128f.html",
      prettify_html_file:
        "https://serpapi.com/searches/78e30d21128635e1/67f5186da9d4b9ae7621128f.prettify",
      total_time_taken: 3.64,
    },
    search_parameters: {
      engine: "google_flights",
      hl: "en",
      gl: "us",
      departure_id: "LHR",
      arrival_id: "DEL",
      outbound_date: "2025-04-08",
      return_date: "2025-04-14",
      departure_token:
        "WyJDalJJYTB3MloyNDBRbWRqVkdkQlFtNHhlbEZDUnkwdExTMHRMUzB0TFhCcWRuWXhNMEZCUVVGQlIyWXhSbHBGUW5wUVNEQkJFZ3hCUmpFeE9ERjhRVVl5TWpZYUN3anZxd2NRQWhvRFZWTkVPQnh3NzZzSCIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkNERyIsbnVsbCwiQUYiLCIxMTgxIl0sWyJDREciLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJBRiIsIjIyNiJdXV0=",
      currency: "USD",
    },
    other_flights: [
      {
        flights: [
          {
            departure_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-14 03:55",
            },
            arrival_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 09:35",
            },
            duration: 550,
            airplane: "Boeing 787-10",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 872",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 327 kg",
            ],
            overnight: true,
          },
          {
            departure_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 20:35",
            },
            arrival_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-14 20:55",
            },
            duration: 80,
            airplane: "Airbus A321neo",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 1017",
            legroom: "29 in",
            extensions: [
              "Below average legroom (29 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "Carbon emissions estimate: 36 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 660,
            name: "Amsterdam Airport Schiphol",
            id: "AMS",
          },
        ],
        total_duration: 1290,
        carbon_emissions: {
          this_flight: 364000,
          typical_for_this_route: 457000,
          difference_percent: -20,
        },
        price: 1204,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
        booking_token:
          "WyJDalJJT1hsTVQwcFNZbWt6Ym10QlFtNUZOWGRDUnkwdExTMHRMUzB0TFMxMmRITnFNMEZCUVVGQlIyWXhSMGN3U0doQ1EwMUJFZ3hMVERnM01ueExUREV3TVRjYUN3anZxd2NRQWhvRFZWTkVPQnh3NzZzSCIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkNERyIsbnVsbCwiQUYiLCIxMTgxIl0sWyJDREciLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJBRiIsIjIyNiJdXSxbWyJERUwiLCIyMDI1LTA0LTE0IiwiQU1TIixudWxsLCJLTCIsIjg3MiJdLFsiQU1TIiwiMjAyNS0wNC0xNCIsIkxIUiIsbnVsbCwiS0wiLCIxMDE3Il1dXQ==",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-14 00:50",
            },
            arrival_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-14 06:55",
            },
            duration: 575,
            airplane: "Boeing 777",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 225",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 420 kg",
            ],
            overnight: true,
          },
          {
            departure_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-14 10:00",
            },
            arrival_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-14 10:30",
            },
            duration: 90,
            airplane: "Airbus A220-300 Passenger",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 1580",
            legroom: "30 in",
            extensions: [
              "Average legroom (30 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "Carbon emissions estimate: 53 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 185,
            name: "Paris Charles de Gaulle Airport",
            id: "CDG",
          },
        ],
        total_duration: 850,
        carbon_emissions: {
          this_flight: 474000,
          typical_for_this_route: 457000,
          difference_percent: 4,
        },
        price: 1204,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
        booking_token:
          "WyJDalJJT1hsTVQwcFNZbWt6Ym10QlFtNUZOWGRDUnkwdExTMHRMUzB0TFMxMmRITnFNMEZCUVVGQlIyWXhSMGN3U0doQ1EwMUJFZzVCUmpJeU5YeEJSakUxT0RBak1Sb0xDSWlzQnhBQ0dnTlZVMFE0SEhDSXJBYz0iLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJDREciLG51bGwsIkFGIiwiMTE4MSJdLFsiQ0RHIiwiMjAyNS0wNC0wOSIsIkRFTCIsbnVsbCwiQUYiLCIyMjYiXV0sW1siREVMIiwiMjAyNS0wNC0xNCIsIkNERyIsbnVsbCwiQUYiLCIyMjUiXSxbIkNERyIsIjIwMjUtMDQtMTQiLCJMSFIiLG51bGwsIkFGIiwiMTU4MCJdXV0=",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-14 03:55",
            },
            arrival_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 09:35",
            },
            duration: 550,
            airplane: "Boeing 787-10",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 872",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 327 kg",
            ],
            overnight: true,
          },
          {
            departure_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 13:25",
            },
            arrival_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-14 13:50",
            },
            duration: 85,
            airplane: "Embraer 195 E2",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 1009",
            legroom: "29 in",
            extensions: [
              "Below average legroom (29 in)",
              "In-seat USB outlet",
              "Carbon emissions estimate: 49 kg",
            ],
            plane_and_crew_by: "KLM Cityhopper",
          },
        ],
        layovers: [
          {
            duration: 230,
            name: "Amsterdam Airport Schiphol",
            id: "AMS",
          },
        ],
        total_duration: 865,
        carbon_emissions: {
          this_flight: 377000,
          typical_for_this_route: 457000,
          difference_percent: -18,
        },
        price: 1489,
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
        booking_token:
          "WyJDalJJT1hsTVQwcFNZbWt6Ym10QlFtNUZOWGRDUnkwdExTMHRMUzB0TFMxMmRITnFNMEZCUVVGQlIyWXhSMGN3U0doQ1EwMUJFZzVMVERnM01ueExUREV3TURrak1Sb0xDTldLQ1JBQ0dnTlZVMFE0SEhEVmlnaz0iLFtbIkxIUiIsIjIwMjUtMDQtMDgiLCJDREciLG51bGwsIkFGIiwiMTE4MSJdLFsiQ0RHIiwiMjAyNS0wNC0wOSIsIkRFTCIsbnVsbCwiQUYiLCIyMjYiXV0sW1siREVMIiwiMjAyNS0wNC0xNCIsIkFNUyIsbnVsbCwiS0wiLCI4NzIiXSxbIkFNUyIsIjIwMjUtMDQtMTQiLCJMSFIiLG51bGwsIktMIiwiMTAwOSJdXV0=",
      },
    ],
    airports: [
      {
        departure: [
          {
            airport: {
              id: "LHR",
              name: "Heathrow Airport",
            },
            city: "London",
            country: "United Kingdom",
            country_code: "GB",
            image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRpN9RbtOSTDqKIPxWc_D6rdSysaWVh6d-NW7yz7yFXKRwh5RN5BpNIoXEwH1XVcFdLWqn6Sm8_Y_zmeg",
            thumbnail:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYH83YXny8hR4M7k5BMFq4vUT6LNtVABQzgs2pg-hcpSZq3oMBOQK3xh591AAJv2Qx4uvFZUGqOVt4kuoCUOklISunmndJleOoSef_7QE",
          },
        ],
        arrival: [
          {
            airport: {
              id: "DEL",
              name: "Indira Gandhi International Airport",
            },
            city: "New Delhi",
            country: "India",
            country_code: "IN",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRqzwP-0z4pH29-KifVzfrxM5wwXx56g3Hoo_ebldH9Fy8a8EjGqPzd3fZqJSKoE5tSIRC2iGJxgqzQ",
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7HqndXM-ihFCu1qUKosYR--X_yXSd-0mkQHeSUaG5rkpq5Y6uxD8CMmYUCdngZE7mV0onuN2zv_aVxGGO8xv4FMcpMlWvbXdvJFcemY",
          },
        ],
      },
      {
        departure: [
          {
            airport: {
              id: "DEL",
              name: "Indira Gandhi International Airport",
            },
            city: "New Delhi",
            country: "India",
            country_code: "IN",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRqzwP-0z4pH29-KifVzfrxM5wwXx56g3Hoo_ebldH9Fy8a8EjGqPzd3fZqJSKoE5tSIRC2iGJxgqzQ",
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY7HqndXM-ihFCu1qUKosYR--X_yXSd-0mkQHeSUaG5rkpq5Y6uxD8CMmYUCdngZE7mV0onuN2zv_aVxGGO8xv4FMcpMlWvbXdvJFcemY",
          },
        ],
        arrival: [
          {
            airport: {
              id: "LHR",
              name: "Heathrow Airport",
            },
            city: "London",
            country: "United Kingdom",
            country_code: "GB",
            image:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRpN9RbtOSTDqKIPxWc_D6rdSysaWVh6d-NW7yz7yFXKRwh5RN5BpNIoXEwH1XVcFdLWqn6Sm8_Y_zmeg",
            thumbnail:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYH83YXny8hR4M7k5BMFq4vUT6LNtVABQzgs2pg-hcpSZq3oMBOQK3xh591AAJv2Qx4uvFZUGqOVt4kuoCUOklISunmndJleOoSef_7QE",
          },
        ],
      },
    ],
  },
];

const flightDetailsStep3 = [
  {
    search_metadata: {
      id: "67f518d3006562d2036d5e98",
      status: "Success",
      json_endpoint:
        "https://serpapi.com/searches/cd78e31e5c8f777e/67f518d3006562d2036d5e98.json",
      created_at: "2025-04-08 12:38:43 UTC",
      processed_at: "2025-04-08 12:38:43 UTC",
      google_flights_url:
        "https://www.google.com/travel/flights?hl=en&gl=us&curr=USD&tfs=CBwQAhphEgoyMDI1LTA0LTA4IiAKA0xIUhIKMjAyNS0wNC0wOBoDQ0RHKgJBRjIEMTE4MSIfCgNDREcSCjIwMjUtMDQtMDkaA0RFTCoCQUYyAzIyNmoHCAESA0xIUnIHCAESA0RFTBphEgoyMDI1LTA0LTE0Ih8KA0RFTBIKMjAyNS0wNC0xNBoDQU1TKgJLTDIDODcyIiAKA0FNUxIKMjAyNS0wNC0xNBoDTEhSKgJLTDIEMTAxN2oHCAESA0RFTHIHCAESA0xIUkIBAUgBcAGYAQE&tfu=EgIIAQ",
      raw_html_file:
        "https://serpapi.com/searches/cd78e31e5c8f777e/67f518d3006562d2036d5e98.html",
      prettify_html_file:
        "https://serpapi.com/searches/cd78e31e5c8f777e/67f518d3006562d2036d5e98.prettify",
      total_time_taken: 9.09,
    },
    search_parameters: {
      engine: "google_flights",
      hl: "en",
      gl: "us",
      departure_id: "LHR",
      arrival_id: "DEL",
      outbound_date: "2025-04-08",
      return_date: "2025-04-14",
      booking_token:
        "WyJDalJJT1hsTVQwcFNZbWt6Ym10QlFtNUZOWGRDUnkwdExTMHRMUzB0TFMxMmRITnFNMEZCUVVGQlIyWXhSMGN3U0doQ1EwMUJFZ3hMVERnM01ueExUREV3TVRjYUN3anZxd2NRQWhvRFZWTkVPQnh3NzZzSCIsW1siTEhSIiwiMjAyNS0wNC0wOCIsIkNERyIsbnVsbCwiQUYiLCIxMTgxIl0sWyJDREciLCIyMDI1LTA0LTA5IiwiREVMIixudWxsLCJBRiIsIjIyNiJdXSxbWyJERUwiLCIyMDI1LTA0LTE0IiwiQU1TIixudWxsLCJLTCIsIjg3MiJdLFsiQU1TIiwiMjAyNS0wNC0xNCIsIkxIUiIsbnVsbCwiS0wiLCIxMDE3Il1dXQ==",
      currency: "USD",
    },
    selected_flights: [
      {
        flights: [
          {
            departure_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-08 19:45",
            },
            arrival_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-08 22:00",
            },
            duration: 75,
            airplane: "Airbus A220-300 Passenger",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 1181",
            legroom: "30 in",
            extensions: [
              "Average legroom (30 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "Carbon emissions estimate: 56 kg",
            ],
          },
          {
            departure_airport: {
              name: "Paris Charles de Gaulle Airport",
              id: "CDG",
              time: "2025-04-09 10:50",
            },
            arrival_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-09 22:50",
            },
            duration: 510,
            airplane: "Boeing 777",
            airline: "Air France",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
            travel_class: "Economy",
            flight_number: "AF 226",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              "On-demand video",
              "Carbon emissions estimate: 436 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 770,
            name: "Paris Charles de Gaulle Airport",
            id: "CDG",
            overnight: true,
          },
        ],
        total_duration: 1355,
        carbon_emissions: {
          this_flight: 494000,
          typical_for_this_route: 476000,
          difference_percent: 4,
        },
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
      },
      {
        flights: [
          {
            departure_airport: {
              name: "Indira Gandhi International Airport",
              id: "DEL",
              time: "2025-04-14 03:55",
            },
            arrival_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 09:35",
            },
            duration: 550,
            airplane: "Boeing 787-10",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 872",
            legroom: "31 in",
            extensions: [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "On-demand video",
              "Carbon emissions estimate: 327 kg",
            ],
            overnight: true,
          },
          {
            departure_airport: {
              name: "Amsterdam Airport Schiphol",
              id: "AMS",
              time: "2025-04-14 20:35",
            },
            arrival_airport: {
              name: "Heathrow Airport",
              id: "LHR",
              time: "2025-04-14 20:55",
            },
            duration: 80,
            airplane: "Airbus A321neo",
            airline: "KLM",
            airline_logo:
              "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
            travel_class: "Economy",
            flight_number: "KL 1017",
            legroom: "29 in",
            extensions: [
              "Below average legroom (29 in)",
              "Wi-Fi for a fee",
              "In-seat USB outlet",
              "Carbon emissions estimate: 36 kg",
            ],
          },
        ],
        layovers: [
          {
            duration: 660,
            name: "Amsterdam Airport Schiphol",
            id: "AMS",
          },
        ],
        total_duration: 1290,
        carbon_emissions: {
          this_flight: 364000,
          typical_for_this_route: 457000,
          difference_percent: -20,
        },
        type: "Round trip",
        airline_logo:
          "https://www.gstatic.com/flights/airline_logos/70px/KL.png",
      },
    ],
    baggage_prices: {
      together: ["1 free carry-on"],
    },
    booking_options: [
      {
        together: {
          book_with: "Air France",
          airline_logos: [
            "https://www.gstatic.com/flights/airline_logos/70px/AF.png",
          ],
          marketed_as: ["AF 1181", "AF 226", "KL 872", "KL 1017"],
          price: 1200,
          local_prices: [
            {
              currency: "GBP",
              price: 941,
            },
          ],
          baggage_prices: ["1 free carry-on"],
          booking_request: {
            url: "https://www.google.com/travel/clk/f",
            post_data:
              "u=EvwvCgJBRhoECAMQAUK2BgoCVVMSAmVuGhQtNzc0NTg5OTYyNzcyNDM0MzExOSIDVVNEKAA6BQj_qNouOgUIl9DiLkCjAUDfAUAdQB5AjAJA0QJAvgJA4AJA2AJA4QJA-wJA7QJAhANA7AJAlANA7wJAjQNAmANAmwNAqQNAmgNArwNAqwNAtQNAwwNAxANArgNAsANAkwNAwgNArANAvANAygNAywNAzANAtgNAxwNAzwNAzQNA1ANAwANA1QNIAFABWABifU1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMDEuMC40OTUxLjY3IFNhZmFyaS81MzcuMzYsZ3ppcChnZmUpiAEAogEYTUlTU0lOR19FWEVDVVRJT05fUkVTVUxUogENYjM4MzA5MTE3NF92MsIBdENqUklPWGxNVDBwU1lta3pibXRCUW01Rk5YZENSeTB0TFMwdExTMHRMUzEyZEhOcU0wRkJRVUZCUjJZeFIwY3dTR2hDUTAxQkVneExURGczTW54TFRERXdNVGNhQ3dqdnF3Y1FBaG9EVlZORU9CeHc3NnNI0gHZAmh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vdHJhdmVsL2ZsaWdodHM_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_qAEA4gKHAQoBSxIBMRgDIgQIABABKgYIABABGAE6WBAAGAEiAzB8MSpNSjB8QzB8RDB8STB8WjB8TzB8WTF8QjF8TTF8UDF8VTF8RjF8SzF8VzF8SDF8UzF8TDF8QTF8UTF8VDF8RTF8TjF8UjF8VjF8WDF8RzFSCEtSTERJNUxBkQEAAAAAAADwP6gBAKoDMUoCRlJSAzAwN1oCRlJyCwoEMy4zMBIDRVVSegsKBDIuODASA0dCUNoBB0FQUExJRUSqAzNKAkdCUgMwMDFaAkdCcgwKBTkwLjAwEgNHQlB6DAoFOTAuMDASA0dCUNoBB0FQUExJRUSqAzNKAlFYUgMwMDFaAkZScgwKBTM0LjA1EgNFVVJ6DAoFMjkuMDASA0dCUNoBB0FQUExJRUSqAzNKAlVCUgMwMDFaAkdCcgwKBTIzLjMyEgNHQlB6DAoFMjMuMzISA0dCUNoBB0FQUExJRUSqAzJKAllSUgFGcgwKBTg4LjAwEgNHQlB6DAoFODguMDASA0dCUNoBB0FQUExJRUTiAQJBRqoDM0oCQ0pSAzAwMVoCTkxyDAoFMTIuNDUSA0VVUnoMCgUxMC42MBIDR0JQ2gEHQVBQTElFRKoDL0oCSU5SAzAwMVoCSU5yCQoCNjISA0lOUnoLCgQwLjYwEgNHQlDaAQdBUFBMSUVEqgMzSgJQMlIDMDAxWgJJTnIMCgUxNC4xNhIDVVNEegwKBTExLjAwEgNHQlDaAQdBUFBMSUVEqgMzSgJSTlIDMDAxWgJOTHIMCgUxNC43ORIDRVVSegwKBTEyLjYwEgNHQlDaAQdBUFBMSUVEqgMxSgJXT1IDMDAxWgJJTnILCgQyLjI4EgNVU0R6CwoEMS44MBIDR0JQ2gEHQVBQTElFRKoDMkoCWVJSAUlyDAoFODAuMDASA0dCUHoMCgU4MC4wMBIDR0JQ2gEHQVBQTElFROIBAktMggQDCgEwigQ5EAIgDCicATIwQ2hhbmdlcyB0byB0aGlzIHRpY2tldCB3aWxsIGluY3VyIGEgcGVuYWx0eSBmZWUuigQnEAAgBiiWATIeVGhpcyB0aWNrZXQgaXMgbm9uLXJlZnVuZGFibGUuigQ9EAIgNSgXMjVDYW5jZWxsYXRpb24gb2YgdGhpcyB0aWNrZXQgd2lsbCBpbmN1ciBhIHBlbmFsdHkgZmVlLooEMhAAIAAoLjIqTm90IGluIGN1c3RvbS1mYXJlLWNsYXNzIE5PTi1CQVNJQy1FQ09OT01Z2AQAmgUUCgYIABABGAAKBggAEAEYARICEACaBRQKBggAEAAYAAoGCAAQABgBEgIQAIoCBAoCQUbAAgDyAgEw8gIBMfICATJ6CwoESVRBQRAeOgEwggELCMCpBxACGgNVU0SSAQQQASgKmAEyogE0SFgzZEFXS1VQcGxJQUFNcm9RQkQtLS0tLS0tLS1wZmJpbTJBQUFBQUdmMUdOWURnMVNFQboBBAgCEAHAAX_AAZYCwAGVAsABowHAAZECwAFwwAH1AcABiwHAAbYBwAGcAsABkwLAAdkBwAH-AcABlAHAAaYBwAGgAsAB4wHAAeIBwAGDAsABhQHAAfMBwAHcAcAB7QHAAbQBwAGaAcAB4QHAAasBwAGdAsABmwLAAUnAAXbAAawBwAG3AcABgQLAAesBwAHwAcAB-AHAAfcBwAGEAsAB9gHAAd0BwAGnAcABkALAAfoBwAGxAcABbMAB0gHAAekBwAHvAcABhQLKAQsI-N4FEAIaA0dCUNoBAPABAYgCAJoCaQoCMUEaA0xPTiICR0IqA0xPTjICR0JAAFIDMEFGcgYwQUY4QUFyBDA4QUFyAzBBRnICQUaiAQNHQlDCARJDQVJSSUVSLVNFVC1OT1QtSkrCARJDQVJSSUVSLVNFVC1OT1QtSkrSAQJBRqICAKoCTgoLCOuoBxACGgNVU0QaCwjAqQcQAhoDVVNEKgsI-N4FEAIaA0dCUDILCJTfBRACGgNHQlBCCwjrqAcQAhoDVVNESgsI-N4FEAIaA0dCUOACAOgCAfgCAZIDmAoK0gUK5gIKjwEKSggAGgMyMjMiA0xIUioDQ0RHMgcKAkFGEJ0JQhYyMDI1LTA0LTA4VDE5OjQ1KzAxOjAwShYyMDI1LTA0LTA4VDIyOjAwKzAyOjAwEAAaAkFGIJ0JKgNMSFIyA0NERzoWMjAyNS0wNC0wOFQxOTo0NSswMTowMEIWMjAyNS0wNC0wOFQyMjowMCswMjowMAqPAQpKCAAaAzc3MiIDQ0RHKgNERUwyBwoCQUYQ4gFCFjIwMjUtMDQtMDlUMTA6NTArMDI6MDBKFjIwMjUtMDQtMDlUMjI6NTArMDU6MzAQARoCQUYg4gEqA0NERzIDREVMOhYyMDI1LTA0LTA5VDEwOjUwKzAyOjAwQhYyMDI1LTA0LTA5VDIyOjUwKzA1OjMwEgNMSFIaA0RFTCIWMjAyNS0wNC0wOFQxOTo0NSswMTowMCoWMjAyNS0wNC0wOVQyMjo1MCswNTozMDICQUY4AEABCuYCCo8BCkoIABoDNzgxIgNERUwqA0FNUzIHCgJLTBDoBkIWMjAyNS0wNC0xNFQwMzo1NSswNTozMEoWMjAyNS0wNC0xNFQwOTozNSswMjowMBAAGgJLTCDoBioDREVMMgNBTVM6FjIwMjUtMDQtMTRUMDM6NTUrMDU6MzBCFjIwMjUtMDQtMTRUMDk6MzUrMDI6MDAKjwEKSggAGgMzMlEiA0FNUyoDTEhSMgcKAktMEPkHQhYyMDI1LTA0LTE0VDIwOjM1KzAyOjAwShYyMDI1LTA0LTE0VDIwOjU1KzAxOjAwEAEaAktMIPkHKgNBTVMyA0xIUjoWMjAyNS0wNC0xNFQyMDozNSswMjowMEIWMjAyNS0wNC0xNFQyMDo1NSswMTowMBIDREVMGgNMSFIiFjIwMjUtMDQtMTRUMDM6NTUrMDU6MzAqFjIwMjUtMDQtMTRUMjA6NTUrMDE6MDAyAktMOAFAARILCNzNAxACGgNHQlAaCwj43gUQAhoDR0JQIgkIABACGgNHQlAqCwickQIQAhoDR0JQMgQKAkFGOogECgsI-N4FEAIaA0dCUBILCNzNAxACGgNHQlAaCwickQIQAhoDR0JQIiAKAUwSCEVSTERJNUxBGAEiBAgAEAAqBggAEAAYADIBNCIgCgFFEghFUkxESTVMQRgBIgQIABAAKgYIABAAGAEyATQiIAoBSxIIS1JMREk1TEEYASIECAAQASoGCAAQARgAMgExIiAKAUsSCEtSTERJNUxBGAEiBAgAEAEqBggAEAEYATIBMTIUEghFUkxESTVMQSoAOAFCBAoACgAyFBIIS1JMREk1TEEqADgBQgQKAAoAOhkKCgiYAhACGgNHQlAaAkZSKgdBUFBMSUVEOhkKCgioRhACGgNHQlAaAkdCKgdBUFBMSUVEOhkKCgjUFhACGgNHQlAaAlFYKgdBUFBMSUVEOhkKCgicEhACGgNHQlAaAlVCKgdBUFBMSUVEOhkKCgjgRBACGgNHQlAaAllSKgdBUFBMSUVEOhkKCgikCBACGgNHQlAaAkNKKgdBUFBMSUVEOhgKCQg8EAIaA0dCUBoCSU4qB0FQUExJRUQ6GQoKCMwIEAIaA0dCUBoCUDIqB0FQUExJRUQ6GQoKCOwJEAIaA0dCUBoCUk4qB0FQUExJRUQ6GQoKCLQBEAIaA0dCUBoCV08qB0FQUExJRUQ6GQoKCMA-EAIaA0dCUBoCWVIqB0FQUExJRURCAwoBMJoDCQoESVRBQRIBMKoDBCgBQAG6AzMKLxgBKgIIASoCCAEqAggBKgIIATIMCgIIABICCAAaAggDQg0YAygBMADKAQQIABABEAA",
          },
        },
      },
    ],
    price_insights: {
      lowest_price: 1200,
      price_level: "typical",
      typical_price_range: [950, 1550],
    },
  },
];

export { flightDetailsStep1, flightDetailsStep2, flightDetailsStep3 };
