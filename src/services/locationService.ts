export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface MapboxFeature {
  id: string;
  type: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

class LocationService {
  private watchId: number | null = null;
  private currentLocation: LocationData | null = null;

  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          };
          this.currentLocation = locationData;
          resolve(locationData);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  startWatchingLocation(callback: (location: LocationData) => void): void {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported');
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };
        this.currentLocation = locationData;
        callback(locationData);
      },
      (error) => {
        console.error('Location watch error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000
      }
    );
  }

  stopWatchingLocation(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  async reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      // Using OpenStreetMap Nominatim API (free alternative to Google Maps)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  }

  async searchPlaces(query: string, proximity?: [number, number]): Promise<MapboxFeature[]> {
    try {
      // Using OpenStreetMap Nominatim for place search
      const proximityParam = proximity ? `&viewbox=${proximity[0]-0.1},${proximity[1]+0.1},${proximity[0]+0.1},${proximity[1]-0.1}&bounded=1` : '';
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}${proximityParam}&limit=5`
      );
      const data = await response.json();
      
      return data.map((item: any, index: number) => ({
        id: `${index}`,
        type: 'Feature',
        place_name: item.display_name,
        center: [parseFloat(item.lon), parseFloat(item.lat)],
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(item.lon), parseFloat(item.lat)]
        }
      }));
    } catch (error) {
      console.error('Place search error:', error);
      return [];
    }
  }

  getDistanceBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getCurrentLocationData(): LocationData | null {
    return this.currentLocation;
  }
}

export const locationService = new LocationService();