import { LocationData } from './locationService';

export interface CrowdData {
  wifiDevices: number;
  bluetoothDevices: number;
  totalDevices: number;
  density: 'Low' | 'Medium' | 'High' | 'Critical';
  bottleneckRisk: number; // 0-100
  estimatedPeople: number;
  location: LocationData;
  timestamp: number;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

class CrowdService {
  private isScanning = false;
  private scanInterval: NodeJS.Timeout | null = null;

  async startCrowdMonitoring(callback: (data: CrowdData) => void): Promise<void> {
    if (this.isScanning) return;
    
    this.isScanning = true;
    
    // Simulate real-time crowd monitoring
    this.scanInterval = setInterval(async () => {
      try {
        const crowdData = await this.scanCrowdDensity();
        callback(crowdData);
      } catch (error) {
        console.error('Crowd monitoring error:', error);
      }
    }, 3000);
  }

  stopCrowdMonitoring(): void {
    this.isScanning = false;
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
  }

  private async scanCrowdDensity(): Promise<CrowdData> {
    // Simulate Wi-Fi and Bluetooth device detection
    const baseWifi = 35;
    const baseBluetooth = 20;
    
    const wifiDevices = baseWifi + Math.floor(Math.random() * 30 - 15);
    const bluetoothDevices = baseBluetooth + Math.floor(Math.random() * 20 - 10);
    const totalDevices = Math.max(0, wifiDevices) + Math.max(0, bluetoothDevices);
    
    // Estimate actual people (not all devices are carried by different people)
    const estimatedPeople = Math.floor(totalDevices * 0.7);
    
    let density: CrowdData['density'];
    let bottleneckRisk: number;
    
    if (totalDevices < 30) {
      density = 'Low';
      bottleneckRisk = Math.random() * 20;
    } else if (totalDevices < 60) {
      density = 'Medium';
      bottleneckRisk = 20 + Math.random() * 30;
    } else if (totalDevices < 90) {
      density = 'High';
      bottleneckRisk = 50 + Math.random() * 30;
    } else {
      density = 'Critical';
      bottleneckRisk = 80 + Math.random() * 20;
    }

    return {
      wifiDevices: Math.max(0, wifiDevices),
      bluetoothDevices: Math.max(0, bluetoothDevices),
      totalDevices,
      density,
      bottleneckRisk,
      estimatedPeople,
      location: {
        latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
        longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
        accuracy: 10,
        timestamp: Date.now()
      },
      timestamp: Date.now()
    };
  }

  async generateHeatmap(centerLat: number, centerLng: number, radius: number = 0.01): Promise<HeatmapPoint[]> {
    const points: HeatmapPoint[] = [];
    const gridSize = 20;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const lat = centerLat - radius + (2 * radius * i / gridSize);
        const lng = centerLng - radius + (2 * radius * j / gridSize);
        
        // Simulate crowd intensity based on distance from center and random factors
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2)
        );
        
        const baseIntensity = Math.max(0, 1 - (distanceFromCenter / radius));
        const randomFactor = Math.random() * 0.5;
        const intensity = Math.min(1, baseIntensity + randomFactor);
        
        if (intensity > 0.1) {
          points.push({ lat, lng, intensity });
        }
      }
    }
    
    return points;
  }

  async findSafeRoutes(from: LocationData, to: LocationData): Promise<any[]> {
    // Simulate route finding with crowd avoidance
    return [
      {
        id: 'route1',
        name: 'Main Route',
        distance: '1.2 km',
        duration: '15 min',
        crowdLevel: 'Medium',
        safety: 85,
        waypoints: [
          { lat: from.latitude, lng: from.longitude },
          { lat: from.latitude + 0.001, lng: from.longitude + 0.001 },
          { lat: to.latitude, lng: to.longitude }
        ]
      },
      {
        id: 'route2',
        name: 'Safe Route',
        distance: '1.5 km',
        duration: '18 min',
        crowdLevel: 'Low',
        safety: 95,
        waypoints: [
          { lat: from.latitude, lng: from.longitude },
          { lat: from.latitude - 0.001, lng: from.longitude + 0.002 },
          { lat: to.latitude, lng: to.longitude }
        ]
      }
    ];
  }

  async reportCrowdIssue(location: LocationData, issueType: string, description: string): Promise<void> {
    // In a real app, this would send to authorities or crowd management system
    console.log('Crowd issue reported:', {
      location,
      issueType,
      description,
      timestamp: new Date().toISOString()
    });
  }
}

export const crowdService = new CrowdService();