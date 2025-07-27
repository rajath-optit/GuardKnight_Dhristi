# Improving safety at large public events

## Project Drishti – Hackathon Submission
🏆 Project Drishti – AI-Powered Event Safety Platform
🎯 Objective:
Project Drishti is an intelligent situational awareness platform designed to act as the central nervous system for managing public event safety. By integrating cutting-edge Google AI technologies, it enables real-time monitoring, predictive analysis, and automated emergency response at large-scale events like music festivals or rallies.
🚀 Key Features:
1. **Predictive Bottleneck Analysis**:
- Ingests real-time video feeds via Vertex AI Vision.
- Analyzes crowd density, velocity, and flow.
- Forecasts congestion points 15–20 minutes in advance using Vertex AI Forecasting.
2. **AI-Powered Situational Summaries**:
- Commanders query in natural language (e.g., “Summarize West Zone threats”).
- Gemini Pro fuses video alerts, reports, and social media into actionable briefings.
3. **Intelligent Resource Dispatch**:
- Detects incidents from feeds or mobile app.
- Uses GPS + Google Maps API to route nearest responders via least congested path.
4. **Multimodal Anomaly Detection**:
- Gemini Pro identifies visual signatures of panic, fire, or smoke from live feeds.
- Triggers real-time, high-priority alerts.
5. **Go Beyond Innovations**:
- AI Lost & Found: Image-based person detection across feeds.
- Crowd Sentiment Analysis: Detects mood shifts indicating unrest.
- Autonomous Drone Dispatch for close-up incident inspection.
🧠 Tech Stack:
- **Firebase**: Auth, Firestore, Cloud Functions, Hosting, Realtime DB
- **Vertex AI & Gemini**: Computer vision, forecasting, NLP, anomaly detection
- **Google Maps Platform**: Live routing, geolocation, Places API
- **GCP**: Compute Engine, Cloud CDN, Cloud Storage
💡 What Makes It Unique:
- Unified multi-modal AI platform for proactive public safety
- Anonymous detection for privacy-first compliance (GDPR-ready)
- Scalable serverless infrastructure
- React Native + Web support for universal access
🏅 Competitive Edge:
- Only solution combining safety, prediction, and dispatch in one
- Uses enterprise-grade AI with proven Google ecosystem integration
- Real-time volunteer response network & cross-platform availability
Deployed with Firebase Studio for real-time monitoring and scalability. Project Drishti is not just reactive—it’s the future of proactive, intelligent crowd safety.


---------------
# command to run application:
## while signing up if stuch then wait for 4-5 second and then go back and login using saved password and username.[backend bug] [fierbase store username , password and few more info and lets you login]

1. npm run build

2 .Deploy to Firebase

3 .firebase deploy

# link : https://guardknight-dhristi.web.app/

# After logged in
<img width="1876" height="947" alt="image" src="https://github.com/user-attachments/assets/1fe08229-54fd-491e-8f50-459fbb4ac7f9" />
# AI AGENT
<img width="1888" height="947" alt="image" src="https://github.com/user-attachments/assets/dc029d26-01a2-41df-964a-d0eb6a4bfc84" />

## solve multilevel problem not only large crowd
# mode 1
<img width="1877" height="895" alt="image" src="https://github.com/user-attachments/assets/562d71f0-ab72-4385-936d-c1b3cd0fdc47" />

# mode 2
<img width="1906" height="882" alt="image" src="https://github.com/user-attachments/assets/c735fd0d-6a67-47e1-a27a-26628fedb810" />

# mode 3
<img width="1889" height="947" alt="image" src="https://github.com/user-attachments/assets/55292b46-2de8-49d4-8a5e-81428111c7cd" />
<img width="1870" height="878" alt="image" src="https://github.com/user-attachments/assets/7c1f6029-e986-4d54-b917-5337a681e1d3" />

# mode 4
<img width="1865" height="779" alt="image" src="https://github.com/user-attachments/assets/c27c1380-247f-498c-8520-537fe9986690" />
<img width="1875" height="892" alt="image" src="https://github.com/user-attachments/assets/af7d5d8c-12c6-4ccb-9436-13d52564fdbe" />

Thank you


-----------------------

# Below Few API that we were able to add due to Limited Time and internet issue

## Production-Ready Crowd Management Application backend steps decided : APIs & Implementation Guide.

### 1. Authentication & Backend Infrastructure
**Firebase (Google)**
- **Firebase Authentication**: Email/Password sign-in provider with createUserWithEmailAndPassword for user creation and sign-in
- **Firestore Database**: Real-time NoSQL database for user data and crowd metrics
- **Cloud Functions**: Serverless backend logic for AI processing
- **Firebase Storage**: Secure image storage for lost person photos

**Documentation**: https://firebase.google.com/docs/auth/web/start
**React Native Firebase**: https://rnfirebase.io/auth/usage

### 2. AI & Machine Learning Services
**Google Cloud AI Platform**
- **Vertex AI Vision API**: Advanced face detection and matching for lost persons
- **Gemini Pro API**: Intelligent chatbot responses and natural language processing
- **Cloud Vision API**: Real-time threat detection (smoke, fire, panic analysis)
- **Speech-to-Text & Text-to-Speech**: Voice interaction with Knight Guardian

**Documentation**: https://cloud.google.com/vertex-ai/docs

### 3. Maps & Location Services
**Google Maps Platform**
- **Maps JavaScript API**: Comprehensive mapping solution for real-time location tracking
- **Places API**: Venue information and crowd-prone location data
- **Directions API**: Emergency route optimization
- **Geolocation API**: Precise user positioning

**Documentation**: https://developers.google.com/maps/documentation/api-picker

### 4. Device Detection & Sensor APIs
**Web Bluetooth API**: Detect nearby Bluetooth devices
**Navigator.getBattery()**: Device monitoring
**Geolocation API**: Continuous location tracking
**DeviceMotionEvent**: Accelerometer and gyroscope data

### 5. Real-Time Communication
**Firebase Cloud Messaging (FCM)**: Push notifications and emergency alerts
**WebRTC**: Peer-to-peer communication for emergency coordination
**Socket.io**: Real-time crowd density updates

## 📱 Implementation Architecture

### Frontend Framework
**React Native with Expo**
- Cross-platform compatibility (iOS/Android/Web)
- Hot reloading for rapid development
- Extensive library ecosystem

### Backend Services
```javascript
// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your production Firebase config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 🚀 Advanced Feature Implementation

### 1. Smart Authentication System
```javascript
// Fixed Authentication Flow
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const handleSignUp = async (email, password, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      phoneNumber,
      emergencyContacts: [],
      volunteerLevel: 'basic',
      createdAt: new Date()
    });
    return userCredential;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};
```

### 2. Real-Time Crowd Density Detection
```javascript
// WiFi/Bluetooth Device Detection
const detectNearbyDevices = async () => {
  const devices = [];
  
  // Bluetooth scanning
  if (navigator.bluetooth) {
    try {
      const bluetoothDevices = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
      devices.push(...bluetoothDevices);
    } catch (error) {
      console.log('Bluetooth not available');
    }
  }
  
  // WiFi signal strength analysis
  const connection = navigator.connection;
  if (connection) {
    const signalStrength = connection.downlink;
    const estimatedDevices = Math.floor(signalStrength * 10); // Estimation algorithm
    return { deviceCount: devices.length + estimatedDevices, signalStrength };
  }
  
  return { deviceCount: devices.length, signalStrength: 0 };
};
```

### 3. AI-Powered Face Matching for Lost Persons
```javascript
// Google Cloud Vision API Integration
const findMatchingFace = async (uploadedImage, searchDatabase) => {
  try {
    const visionClient = new ImageAnnotatorClient();
    
    // Detect faces in uploaded image
    const [result] = await visionClient.faceDetection({
      image: { content: uploadedImage }
    });
    
    const faces = result.faceAnnotations;
    if (faces.length === 0) {
      return { found: false, message: 'No faces detected in image' };
    }
    
    // Compare with database images using Vertex AI
    const matchResults = await Promise.all(
      searchDatabase.map(async (dbImage) => {
        const similarity = await compareImages(uploadedImage, dbImage);
        return { image: dbImage, similarity };
      })
    );
    
    const bestMatch = matchResults.reduce((prev, current) => 
      prev.similarity > current.similarity ? prev : current
    );
    
    return {
      found: bestMatch.similarity > 0.8,
      match: bestMatch,
      confidence: bestMatch.similarity
    };
  } catch (error) {
    throw new Error(`Face matching failed: ${error.message}`);
  }
};
```

### 4. Intelligent Knight Guardian Chatbot
```javascript
// Gemini Pro Integration for Smart Responses
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const knightGuardianResponse = async (userInput, currentMode, userContext) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    You are Knight Guardian, an AI safety companion. 
    Current safety mode: ${currentMode}
    User context: ${JSON.stringify(userContext)}
    User input: "${userInput}"
    
    Provide helpful, contextual safety guidance based on the current mode:
    - Solo Mode: Personal safety tips, threat assessment
    - Lost Mode: Search guidance, emergency procedures
    - Crowd Mode: Crowd navigation, density warnings
    - Hiking Mode: Trail safety, group coordination
    
    Keep responses concise, actionable, and encouraging.
  `;
  
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    // Fallback responses based on mode
    const fallbackResponses = {
      solo: "Stay alert and trust your instincts. I'm monitoring your surroundings.",
      lost: "I'm scanning for matches. Keep the search area photo clear and well-lit.",
      crowd: "Current crowd density is being monitored. I'll alert you to any bottlenecks.",
      hiking: "Group tracking active. Ensure all members check in every 30 minutes."
    };
    return fallbackResponses[currentMode.toLowerCase()] || "I'm here to help keep you safe.";
  }
};
```

### 5. Emergency Alert System with Smart Detection
```javascript
// Smart Emergency Detection
const emergencyDetection = {
  audioAnalysis: async () => {
    // Detect panic sounds, screaming, etc.
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    // Implementation for audio pattern recognition
  },
  
  motionAnalysis: () => {
    // Detect rapid movements, falls
    window.addEventListener('devicemotion', (event) => {
      const acceleration = event.accelerationIncludingGravity;
      const magnitude = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
      );
      
      if (magnitude > 20) { // Threshold for emergency motion
        triggerEmergencyAlert('Motion emergency detected');
      }
    });
  },
  
  crowdDensityAlert: (density) => {
    if (density > 0.85) { // 85% capacity
      triggerEmergencyAlert('Critical crowd density reached');
    }
  }
};

const triggerEmergencyAlert = (reason) => {
  // Only trigger when actual emergency is detected
  const alertLevel = determineAlertLevel(reason);
  
  if (alertLevel >= 7) { // Only for serious emergencies
    startEmergencyCountdown(reason);
    notifyEmergencyContacts();
    sendLocationToResponders();
  }
};
```

## 🗺️ Premium Map Integration

### Google Maps with Real-Time Features
```javascript
// Advanced Google Maps Implementation
const initializeAdvancedMap = () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: userLocation,
    styles: [
      // Custom dark theme for better visibility
      { elementType: 'geometry', stylers: [{ color: '#1e1e1e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] }
    ],
    restriction: {
      latLngBounds: eventBounds, // Restrict to event area
    }
  });
  
  // Real-time crowd density heatmap
  const heatmap = new google.maps.visualization.HeatmapLayer({
    data: crowdDensityPoints,
    map: map,
    radius: 50,
    opacity: 0.7
  });
  
  // Dynamic route optimization
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: '#ff0000', // Red for emergency routes
      strokeWeight: 6
    }
  });
  
  return { map, heatmap, directionsService, directionsRenderer };
};
```

## 🔧 Complete Prompt for Development

### Development Prompt
```
Create a production-ready crowd management application with the following specifications:

BACKEND REQUIREMENTS:
1. Firebase Authentication with proper error handling and user profile creation
2. Firestore database with real-time sync for crowd data and user information
3. Google Cloud Vision API integration for face matching in lost person searches
4. Gemini Pro API for intelligent chatbot responses based on safety modes
5. Cloud Functions for serverless processing of AI requests

FRONTEND REQUIREMENTS:
1. React Native with Expo for cross-platform compatibility
2. Google Maps JavaScript API with custom styling and real-time heatmaps
3. Device sensor integration (accelerometer, GPS, camera)
4. Real-time WebSocket connections for crowd density updates
5. Voice-to-text and text-to-speech for accessibility

SAFETY FEATURES:
1. Solo Mode: Motion detection, threat assessment, emergency alerts
2. Lost Mode: AI-powered face matching with confidence scoring
3. Crowd Mode: Real-time density monitoring with bottleneck prediction
4. Hiking Mode: Group tracking with offline capabilities and SOS beacon

TECHNICAL SPECIFICATIONS:
- Use Firebase SDK v9+ with modular imports
- Implement proper error boundaries and loading states
- Add comprehensive input validation and sanitization
- Include offline functionality with data caching
- Ensure GDPR compliance with privacy controls
- Optimize for performance with lazy loading and code splitting

DEMO IMPLEMENTATION:
- Create working prototypes for all four safety modes
- Include tutorial overlays explaining each feature
- Add "API Integration Pending" notices for incomplete features
- Implement mock data for demonstration purposes
- Ensure responsive design for mobile and web platforms

The application should be enterprise-grade with proper architecture, error handling, and user experience design.

```

