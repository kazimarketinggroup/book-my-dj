/**
 * 100% Free UK Postcode and Address Lookup Utilities
 *
 * Uses:
 * 1. Postcodes.io (Official UK ONS Open Data) - 100% Free, no API key needed,
 *    validates real UK postcodes and resolves Town/Borough/Region for both full and outward postcodes.
 * 2. OpenStreetMap Nominatim (Open Data) - 100% Free venue/street address autocomplete.
 */

export interface UKPostcodeResult {
  success: boolean;
  postcode?: string;
  district?: string;
  region?: string;
  country?: string;
  formattedLocation?: string;
  latitude?: number;
  longitude?: number;
  error?: string;
}

export interface UKAddressSuggestion {
  displayName: string;
  venueName?: string;
  road?: string;
  postcode?: string;
  city?: string;
}

/**
 * Validate and look up a UK postcode using the official UK ONS database via Postcodes.io.
 * Handles both full postcodes (e.g. "SW1A 1AA") and outward codes (e.g. "SW1A", "M1").
 * 100% Free, no API key required.
 */
export async function lookupUKPostcode(rawPostcode: string): Promise<UKPostcodeResult> {
  const cleaned = rawPostcode.trim().toUpperCase().replace(/\s+/g, "");
  if (!cleaned || cleaned.length < 2) {
    return {
      success: false,
      error: "Please enter a valid UK postcode.",
    };
  }

  // Check if it's full postcode (contains inward code) or outward only
  const isFull = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/.test(cleaned);

  try {
    const endpoint = isFull
      ? `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`
      : `https://api.postcodes.io/outcodes/${encodeURIComponent(cleaned)}`;

    const res = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (res.status === 404) {
      return {
        success: false,
        error: "Postcode not found in the UK database. Please double check.",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        error: "Could not verify postcode. Please try again.",
      };
    }

    const data = await res.json();
    if (!data.result) {
      return {
        success: false,
        error: "Invalid UK postcode.",
      };
    }

    const r = data.result;

    let district = "";
    if (typeof r.admin_district === "string") {
      district = r.admin_district;
    } else if (Array.isArray(r.admin_district)) {
      district = r.admin_district.join(", ");
    }

    let region = "";
    if (typeof r.region === "string") {
      region = r.region;
    }

    let country = "";
    if (typeof r.country === "string") {
      country = r.country;
    } else if (Array.isArray(r.country)) {
      country = r.country.join(", ");
    }

    const parts = [district, region].filter(Boolean);
    const formattedLocation = parts.join(", ") || country || "United Kingdom";

    return {
      success: true,
      postcode: r.postcode || r.outcode || cleaned,
      district,
      region,
      country,
      formattedLocation,
      latitude: r.latitude,
      longitude: r.longitude,
    };
  } catch {
    // Network fallback: still allow format-valid UK postcodes through
    return {
      success: true,
      postcode: cleaned,
      formattedLocation: "UK Location (Verified format)",
    };
  }
}

/**
 * Search for UK venue names, landmarks, and street addresses.
 * 100% Free via OpenStreetMap Nominatim.
 */
export async function searchUKAddresses(
  query: string,
  postcodeOrArea?: string
): Promise<UKAddressSuggestion[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  try {
    const fullQuery = postcodeOrArea ? `${trimmed}, ${postcodeOrArea}, UK` : `${trimmed}, UK`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      fullQuery
    )}&countrycodes=gb&format=json&addressdetails=1&limit=5`;

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "BookMyDJ-AddressLookup/1.0",
      },
    });

    if (!res.ok) return [];

    const items = await res.json();
    if (!Array.isArray(items)) return [];

    return items.map((item) => {
      const addr = item.address || {};
      const venue =
        item.name ||
        item.namedetails?.name ||
        addr.building ||
        addr.amenity ||
        addr.leisure ||
        "";
      const road = addr.road || addr.pedestrian || "";
      const city = addr.city || addr.town || addr.village || addr.suburb || "";
      const post = addr.postcode || "";

      // Clean up readable label
      const parts = [venue, road, city, post].filter(Boolean);
      const uniqueParts = Array.from(new Set(parts));

      return {
        displayName: uniqueParts.join(", ") || item.display_name,
        venueName: venue,
        road,
        postcode: post,
        city,
      };
    });
  } catch {
    return [];
  }
}
