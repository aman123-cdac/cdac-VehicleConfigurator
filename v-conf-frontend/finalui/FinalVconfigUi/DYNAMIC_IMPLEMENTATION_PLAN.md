# VehicleConfig - Dynamic Project Implementation Guide

## Current Project Structure

```
src/
├── pages/
│   ├── WelcomePage.jsx          (Dashboard Home)
│   ├── Configurator.jsx          (Vehicle Configuration)
│   ├── DefaultConfigPage.jsx     (Default Config)
│   ├── Register.jsx              (User Registration)
│   ├── SignIn.jsx                (User Login)
│   ├── Home.jsx                  (Landing Page)
│   ├── OAuthHandler.jsx          (OAuth Callback)
│   ├── RegistrationSuccess.jsx   (Registration Confirmation)
│   └── DashboardHome.jsx         (Unused)
├── components/
├── services/
│   ├── authService.js
│   ├── vehicleService.js
│   ├── welcomeService.js
│   ├── defaultConfigService.js
│   └── orderService.js
└── api/
```

---

## PAGE-BY-PAGE DYNAMIC IMPLEMENTATION PLAN

### 1. **WelcomePage.jsx** (Dashboard Home)

**Current State**: Static hardcoded data  
**Required Dynamic Data**:

- User profile information
- Recent configurations list
- Configuration statistics

**Backend APIs Needed**:

```
GET /api/user/profile
GET /api/configurations/recent?limit=6
GET /api/configurations/stats
```

**Service Layer**: `configurationService.js` (NEW)

```javascript
export const configurationService = {
  getRecentConfigs(limit = 6) {
    return API.get(`/api/configurations/recent?limit=${limit}`);
  },
  getConfigStats() {
    return API.get(`/api/configurations/stats`);
  },
};
```

**Data Structure**:

```javascript
{
  configs: [
    {
      id: 1,
      vehicleModel: "Tesla Model 5",
      type: "Sedan",
      color: "Deep Blue",
      interior: "Black and White",
      price: 86990,
      createdAt: "2026-01-28"
    }
  ],
  stats: {
    totalConfigs: 5,
    totalPrice: 450000,
    avgPrice: 90000
  }
}
```

---

### 2. **Configurator.jsx** (Vehicle Configuration)

**Current State**: Needs to be checked  
**Required Dynamic Data**:

- Available vehicle segments
- Manufacturers by segment
- Models by manufacturer
- Available options (colors, interiors, features)
- Real-time pricing

**Backend APIs Needed**:

```
GET /api/vehicles/segments
GET /api/vehicles/manufacturers?segmentId=:id
GET /api/vehicles/models?manufacturerId=:id
GET /api/vehicles/options/:modelId
GET /api/vehicles/pricing/:modelId
POST /api/configurations/save
```

**Service Layer**: Update `vehicleService.js`

```javascript
export const vehicleService = {
  getSegments() {
    return API.get(`/api/vehicles/segments`);
  },
  getManufacturers(segmentId) {
    return API.get(`/api/vehicles/manufacturers?segmentId=${segmentId}`);
  },
  getModels(manufacturerId) {
    return API.get(`/api/vehicles/models?manufacturerId=${manufacturerId}`);
  },
  getOptions(modelId) {
    return API.get(`/api/vehicles/options/${modelId}`);
  },
  getPricing(modelId, options) {
    return API.post(`/api/vehicles/pricing/${modelId}`, options);
  },
  saveConfiguration(data) {
    return API.post(`/api/configurations/save`, data);
  },
};
```

**Data Structure**:

```javascript
{
  segments: [
    { id: 1, name: "Sedan", icon: "sedan" },
    { id: 2, name: "SUV", icon: "suv" }
  ],
  options: {
    colors: [
      { id: 1, name: "Deep Blue", hex: "#003D99" },
      { id: 2, name: "Racing Yellow", hex: "#FFFF00" }
    ],
    interiors: [
      { id: 1, name: "Black and White", price: 0 },
      { id: 2, name: "Chalk Leather", price: 5000 }
    ],
    features: [
      { id: 1, name: "Sunroof", price: 2000 },
      { id: 2, name: "Premium Audio", price: 3000 }
    ]
  },
  basePrice: 50000,
  totalPrice: 60000
}
```

---

### 3. **DefaultConfigPage.jsx** (Default Configuration)

**Current State**: Likely static  
**Required Dynamic Data**:

- Pre-configured vehicle templates
- Customization options
- Save user configuration

**Backend APIs Needed**:

```
GET /api/default-configs/:modelId
GET /api/templates/:templateId
POST /api/configurations/:configId/customize
```

**Service Layer**: Update `defaultConfigService.js`

---

### 4. **SignIn.jsx** (User Login)

**Current State**: Functional with backend  
**Status**: ✅ Already Dynamic
**Existing Service**: `authService.signIn()`

**No changes needed** - Already integrated with backend

---

### 5. **Register.jsx** (User Registration)

**Current State**: Functional with backend  
**Status**: ✅ Already Dynamic
**Existing Service**: `authService.register()`

**Enhancement Needed**:

```javascript
// Add validation endpoint
export const authService = {
  // ... existing methods
  validateUsername(username) {
    return API.get(`/api/auth/validate/username?username=${username}`);
  },
  validateEmail(email) {
    return API.get(`/api/auth/validate/email?email=${email}`);
  },
};
```

---

### 6. **Home.jsx** (Landing Page)

**Current State**: Unknown  
**Required Dynamic Data**:

- Featured vehicles
- Customer testimonials
- Blog posts/news
- Statistics

**Backend APIs Needed**:

```
GET /api/public/featured-vehicles
GET /api/public/testimonials
GET /api/public/news
GET /api/public/stats
```

---

### 7. **OAuthHandler.jsx** (OAuth Callback)

**Current State**: Functional  
**Status**: ✅ Already Dynamic
**Existing Service**: `authService.oauthRedirect()`

**No changes needed**

---

### 8. **RegistrationSuccess.jsx** (Registration Confirmation)

**Current State**: Static display  
**Enhancement Possible**:

- Send confirmation email API
- Download registration PDF
- Track registration status

**Backend APIs Needed**:

```
POST /api/registration/:userId/confirm
GET /api/registration/:userId/pdf
```

---

## IMPLEMENTATION PRIORITY

### Phase 1 (High Priority - Core Functionality)

1. ✅ **WelcomePage.jsx** - Most visited
   - Fetch user profile
   - Fetch recent configurations
   - Fetch statistics

2. ✅ **Configurator.jsx** - Main feature
   - Fetch all vehicle data
   - Real-time pricing
   - Save configurations

3. ✅ **Register.jsx** - Enhancement
   - Add email/username validation

### Phase 2 (Medium Priority)

1. **DefaultConfigPage.jsx** - Template browsing
   - Fetch templates
   - Fetch template details

2. **Home.jsx** - Landing page
   - Fetch featured vehicles
   - Fetch testimonials

### Phase 3 (Low Priority)

1. **RegistrationSuccess.jsx** - Nice-to-have
   - PDF generation
   - Email confirmation

---

## BACKEND API ENDPOINTS CHECKLIST

### Authentication (Already have)

- [x] POST /api/auth/login
- [x] POST /api/registration
- [x] GET /oauth2/redirect

### User Management (NEW)

- [ ] GET /api/user/profile
- [ ] PUT /api/user/profile
- [ ] POST /api/user/validate/email
- [ ] POST /api/user/validate/username

### Vehicle Data (NEW)

- [ ] GET /api/vehicles/segments
- [ ] GET /api/vehicles/manufacturers
- [ ] GET /api/vehicles/models
- [ ] GET /api/vehicles/options/:modelId
- [ ] POST /api/vehicles/pricing

### Configurations (NEW)

- [ ] GET /api/configurations/recent
- [ ] GET /api/configurations/stats
- [ ] POST /api/configurations/save
- [ ] PUT /api/configurations/:id
- [ ] DELETE /api/configurations/:id
- [ ] GET /api/configurations/:id

### Templates (NEW)

- [ ] GET /api/templates
- [ ] GET /api/templates/:id
- [ ] POST /api/configurations/:configId/customize

### Public Data (NEW)

- [ ] GET /api/public/featured-vehicles
- [ ] GET /api/public/testimonials
- [ ] GET /api/public/news
- [ ] GET /api/public/stats

### Orders (Already exists)

- [ ] POST /api/orders/create
- [ ] GET /api/orders/:id
- [ ] GET /api/orders/user/:userId

---

## SUGGESTED IMPLEMENTATION APPROACH

### Step 1: Create/Update Services (Backend Integration)

Start with these files:

1. **configurationService.js** (NEW)

```
Purpose: Handle configuration data fetching and saving
Endpoints: /api/configurations/*
```

2. **userService.js** (NEW)

```
Purpose: Handle user profile and validation
Endpoints: /api/user/*
```

3. **templateService.js** (NEW)

```
Purpose: Handle template data
Endpoints: /api/templates/*
```

4. **Update vehicleService.js**

```
Purpose: Add pricing and options endpoints
```

### Step 2: Update Pages (One by One)

Priority order:

1. WelcomePage.jsx (Dashboard)
2. Configurator.jsx (Main feature)
3. Register.jsx (Validation)
4. DefaultConfigPage.jsx
5. Home.jsx

### Step 3: Add Context/State Management

Create `contexts/`:

```
- AuthContext.jsx (user, token)
- ConfigurationContext.jsx (selected config)
- VehicleContext.jsx (vehicle data)
```

---

## EXAMPLE: Making WelcomePage.jsx Dynamic

```javascript
import { useState, useEffect } from "react";
import { configurationService } from "../services/configurationService";
import { userService } from "../services/userService";

export default function WelcomePage() {
  const [user, setUser] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const userRes = await userService.getUserProfile();
        setUser(userRes.data);

        // Fetch recent configurations
        const configRes = await configurationService.getRecentConfigs(6);
        setConfigurations(configRes.data);

        // Fetch statistics
        const statsRes = await configurationService.getConfigStats();
        setStats(statsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Welcome back, {user?.name}!</h2>
      {/* Render configurations dynamically */}
      {configurations.map((config) => (
        <ConfigurationCard key={config.id} config={config} />
      ))}
    </div>
  );
}
```

---

## WHICH FILES YOU NEED FROM BACKEND

### Immediate (Start here)

1. **User Profile Endpoint**
   - GET /api/user/profile

2. **Recent Configurations Endpoint**
   - GET /api/configurations/recent?limit=6

3. **Configuration Statistics Endpoint**
   - GET /api/configurations/stats

### Next Phase

4. **Vehicle Segments Endpoint**
   - GET /api/vehicles/segments

5. **Vehicle Manufacturers Endpoint**
   - GET /api/vehicles/manufacturers?segmentId=:id

6. **Vehicle Models Endpoint**
   - GET /api/vehicles/models?manufacturerId=:id

7. **Vehicle Options Endpoint**
   - GET /api/vehicles/options/:modelId

---

## NEXT STEPS

1. **Confirm Backend Readiness**
   - Which of these endpoints already exist?
   - Which need to be created?

2. **Choose Starting Page**
   - Which page should we make dynamic first?
   - WelcomePage.jsx (recommended for quick wins)

3. **Create Services**
   - I can help you create the service files

4. **Update Pages**
   - I can help you update each page one by one

---

## REFERENCE STRUCTURE FOR NEW SERVICE FILES

```javascript
// services/configurationService.js
import API from "../api/api";

export const configurationService = {
  getRecentConfigs(limit = 6) {
    return API.get(`/api/configurations/recent?limit=${limit}`);
  },

  getConfigStats() {
    return API.get(`/api/configurations/stats`);
  },

  getConfigById(id) {
    return API.get(`/api/configurations/${id}`);
  },

  saveConfiguration(data) {
    return API.post(`/api/configurations/save`, data);
  },

  updateConfiguration(id, data) {
    return API.put(`/api/configurations/${id}`, data);
  },

  deleteConfiguration(id) {
    return API.delete(`/api/configurations/${id}`);
  },
};
```

---

**Ready to proceed? Let me know:**

1. Which backend endpoints already exist?
2. Which page should we start with?
3. Do you want me to create the service files?
