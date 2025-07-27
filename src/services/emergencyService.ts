import { doc, setDoc, collection, addDoc, updateDoc, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { locationService, LocationData } from './locationService';

export interface EmergencyAlert {
  id: string;
  userId: string;
  type: 'sos' | 'medical' | 'fire' | 'police' | 'general';
  location: LocationData;
  address: string;
  timestamp: number;
  status: 'active' | 'responded' | 'resolved';
  responders: string[];
  message?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  location: LocationData;
  distance: number;
  status: 'available' | 'responding' | 'busy';
  skills: string[];
  rating: number;
}

class EmergencyService {
  async createEmergencyAlert(
    userId: string, 
    type: EmergencyAlert['type'], 
    message?: string
  ): Promise<string> {
    try {
      const location = await locationService.getCurrentLocation();
      const address = await locationService.reverseGeocode(location.latitude, location.longitude);
      
      const alert: Omit<EmergencyAlert, 'id'> = {
        userId,
        type,
        location,
        address,
        timestamp: Date.now(),
        status: 'active',
        responders: [],
        message
      };

      const docRef = await addDoc(collection(db, 'emergencyAlerts'), alert);
      
      // Notify nearby volunteers
      this.notifyNearbyVolunteers(docRef.id, location);
      
      // Send to emergency services (simulated)
      this.notifyEmergencyServices(alert);
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating emergency alert:', error);
      throw error;
    }
  }

  async findNearbyVolunteers(location: LocationData, radiusKm: number = 5): Promise<Volunteer[]> {
    try {
      // Simulate volunteer data - in real app, this would come from database
      const mockVolunteers: Volunteer[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          location: {
            latitude: location.latitude + 0.001,
            longitude: location.longitude + 0.001,
            accuracy: 10,
            timestamp: Date.now()
          },
          distance: 0.3,
          status: 'available',
          skills: ['First Aid', 'CPR'],
          rating: 4.8
        },
        {
          id: '2',
          name: 'Mike Chen',
          location: {
            latitude: location.latitude + 0.002,
            longitude: location.longitude - 0.001,
            accuracy: 15,
            timestamp: Date.now()
          },
          distance: 0.7,
          status: 'available',
          skills: ['Security', 'First Aid'],
          rating: 4.6
        },
        {
          id: '3',
          name: 'Emma Davis',
          location: {
            latitude: location.latitude - 0.001,
            longitude: location.longitude + 0.002,
            accuracy: 8,
            timestamp: Date.now()
          },
          distance: 1.2,
          status: 'available',
          skills: ['Medical', 'Emergency Response'],
          rating: 4.9
        }
      ];

      return mockVolunteers.filter(volunteer => volunteer.distance <= radiusKm);
    } catch (error) {
      console.error('Error finding volunteers:', error);
      return [];
    }
  }

  private async notifyNearbyVolunteers(alertId: string, location: LocationData): Promise<void> {
    const volunteers = await this.findNearbyVolunteers(location);
    
    // In a real app, this would send push notifications
    volunteers.forEach(volunteer => {
      console.log(`Notifying volunteer ${volunteer.name} about emergency ${alertId}`);
      // Send push notification or SMS
    });
  }

  private notifyEmergencyServices(alert: Omit<EmergencyAlert, 'id'>): void {
    // In a real app, this would integrate with emergency services APIs
    console.log('Emergency services notified:', {
      type: alert.type,
      location: alert.location,
      address: alert.address,
      timestamp: new Date(alert.timestamp).toISOString()
    });
  }

  async updateAlertStatus(alertId: string, status: EmergencyAlert['status']): Promise<void> {
    try {
      await updateDoc(doc(db, 'emergencyAlerts', alertId), { status });
    } catch (error) {
      console.error('Error updating alert status:', error);
      throw error;
    }
  }

  subscribeToUserAlerts(userId: string, callback: (alerts: EmergencyAlert[]) => void): () => void {
    const q = query(
      collection(db, 'emergencyAlerts'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    return onSnapshot(q, (snapshot) => {
      const alerts: EmergencyAlert[] = [];
      snapshot.forEach((doc) => {
        alerts.push({ id: doc.id, ...doc.data() } as EmergencyAlert);
      });
      callback(alerts);
    });
  }
}

export const emergencyService = new EmergencyService();