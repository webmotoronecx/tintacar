const EARTH_RADIUS_KM = 6371;

export type LatLng = {
  lat: number;
  lng: number;
};

const toRadians = (deg: number): number => (deg * Math.PI) / 180;

/** Great-circle distance in kilometres (haversine) */
export function distanceKm(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}
