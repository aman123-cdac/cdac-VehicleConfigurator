# VehicleConfig - Complete Implementation Guide
## Backend to Frontend Integration

Based on your backend structure and design plan, here's the complete roadmap.

---

## PART 1: BACKEND API ENDPOINTS TO IMPLEMENT

### 1. Authentication Endpoints (Already Exists ✅)
```
POST   /api/auth/login
POST   /api/registration
GET    /oauth2/redirect
```

### 2. User Management Endpoints (NEW)
```
GET    /api/user/profile                     → Get logged-in user profile
PUT    /api/user/profile                     → Update user profile
GET    /api/user/validate/email              → Validate email availability
GET    /api/user/validate/username           → Validate username availability
```

### 3. Vehicle Endpoints (NEW)
```
GET    /api/vehicles                         → List all vehicle models
GET    /api/vehicles/{id}                    → Get specific vehicle details
GET    /api/vehicles/segments                → Get vehicle segments (Sedan, SUV, etc.)
GET    /api/vehicles/manufacturers?segmentId → Get manufacturers by segment
GET    /api/vehicles/models?manufacturerId   → Get models by manufacturer
```

### 4. Vehicle Components Endpoints (NEW)
```
GET    /api/vehicles/{vehicleId}/components     → Get all components for vehicle
GET    /api/vehicles/{vehicleId}/components/interior
GET    /api/vehicles/{vehicleId}/components/exterior
GET    /api/vehicles/{vehicleId}/components/features
GET    /api/vehicles/{vehicleId}/components/accessories
POST   /api/vehicles/{vehicleId}/pricing        → Calculate price with selected options
```

### 5. Configuration Endpoints (NEW)
```
POST   /api/configurations                   → Create new configuration
GET    /api/configurations                   → Get user's all configurations
GET    /api/configurations/{id}              → Get specific configuration
PUT    /api/configurations/{id}              → Update configuration
DELETE /api/configurations/{id}              → Delete configuration
GET    /api/configurations/recent?limit=6    → Get recent configurations
GET    /api/configurations/stats             → Get configuration statistics
POST   /api/configurations/{id}/save-draft   → Save draft configuration
```

### 6. Default Configuration Endpoints (NEW)
```
GET    /api/default-configs                  → List all templates
GET    /api/default-configs/{id}             → Get template details
POST   /api/default-configs/{id}/use         → Use template to create config
```

### 7. Invoice Endpoints (NEW)
```
POST   /api/invoices                         → Create invoice from configuration
GET    /api/invoices/{id}                    → Get invoice details
GET    /api/invoices                         → Get user's invoices
GET    /api/invoices/{id}/pdf                → Download invoice as PDF
POST   /api/invoices/{id}/place-order        → Place order from invoice
```

### 8. Excel Upload Endpoints (NEW)
```
POST   /api/excel/upload                     → Upload bulk configurations
GET    /api/excel/history                    → Get upload history
GET    /api/excel/download-template          → Download CSV template
```

### 9. Public Endpoints (NEW)
```
GET    /api/public/featured-vehicles         → Featured vehicles for homepage
GET    /api/public/testimonials              → Customer testimonials
GET    /api/public/stats                     → Website statistics
```

---

## PART 2: FRONTEND SERVICE LAYER STRUCTURE

### Files to Create:

```
src/services/
├── userService.js              (User profile, validation)
├── vehicleService.js           (Vehicles, segments, models, components)
├── configurationService.js     (CRUD configurations)
├── defaultConfigService.js     (Templates/defaults)
├── invoiceService.js           (Invoice generation & download)
├── excelService.js             (Excel uploads)
├── pricingService.js           (Real-time price calculation)
└── publicService.js            (Public data, featured, testimonials)
```

---

## PART 3: SERVICE FILE EXAMPLES

### userService.js
```javascript
import API from "../api/api";

export const userService = {
  // Get logged-in user profile
  getProfile() {
    return API.get("/api/user/profile");
  },

  // Update user profile
  updateProfile(data) {
    return API.put("/api/user/profile", data);
  },

  // Validate email
  validateEmail(email) {
    return API.get(`/api/user/validate/email?email=${email}`);
  },

  // Validate username
  validateUsername(username) {
    return API.get(`/api/user/validate/username?username=${username}`);
  }
};
```

### vehicleService.js (UPDATED)
```javascript
import API from "../api/api";

export const vehicleService = {
  // List all vehicles
  getAllVehicles() {
    return API.get("/api/vehicles");
  },

  // Get vehicle by ID
  getVehicleById(id) {
    return API.get(`/api/vehicles/${id}`);
  },

  // Get segments
  getSegments() {
    return API.get("/api/vehicles/segments");
  },

  // Get manufacturers
  getManufacturers(segmentId) {
    return API.get(`/api/vehicles/manufacturers?segmentId=${segmentId}`);
  },

  // Get models
  getModels(manufacturerId) {
    return API.get(`/api/vehicles/models?manufacturerId=${manufacturerId}`);
  },

  // Get components for vehicle
  getComponents(vehicleId) {
    return API.get(`/api/vehicles/${vehicleId}/components`);
  },

  // Get specific component category
  getComponentsByCategory(vehicleId, category) {
    return API.get(`/api/vehicles/${vehicleId}/components/${category}`);
  },

  // Calculate pricing
  calculatePrice(vehicleId, selectedComponents) {
    return API.post(`/api/vehicles/${vehicleId}/pricing`, {
      selectedComponents
    });
  }
};
```

### configurationService.js (NEW)
```javascript
import API from "../api/api";

export const configurationService = {
  // Create new configuration
  create(data) {
    return API.post("/api/configurations", data);
  },

  // Get all user configurations
  getAll() {
    return API.get("/api/configurations");
  },

  // Get specific configuration
  getById(id) {
    return API.get(`/api/configurations/${id}`);
  },

  // Update configuration
  update(id, data) {
    return API.put(`/api/configurations/${id}`, data);
  },

  // Delete configuration
  delete(id) {
    return API.delete(`/api/configurations/${id}`);
  },

  // Get recent configurations
  getRecent(limit = 6) {
    return API.get(`/api/configurations/recent?limit=${limit}`);
  },

  // Get statistics
  getStats() {
    return API.get("/api/configurations/stats");
  },

  // Save draft
  saveDraft(id, data) {
    return API.post(`/api/configurations/${id}/save-draft`, data);
  }
};
```

### invoiceService.js (NEW)
```javascript
import API from "../api/api";

export const invoiceService = {
  // Create invoice
  create(configurationId) {
    return API.post("/api/invoices", { configurationId });
  },

  // Get invoice
  getById(id) {
    return API.get(`/api/invoices/${id}`);
  },

  // Get all invoices
  getAll() {
    return API.get("/api/invoices");
  },

  // Download PDF
  downloadPdf(id) {
    return API.get(`/api/invoices/${id}/pdf`, {
      responseType: 'blob'
    });
  },

  // Place order
  placeOrder(invoiceId) {
    return API.post(`/api/invoices/${invoiceId}/place-order`);
  }
};
```

### pricingService.js (NEW)
```javascript
import API from "../api/api";

export const pricingService = {
  // Calculate real-time price
  calculateTotal(vehicleId, selectedOptions) {
    return API.post(`/api/vehicles/${vehicleId}/pricing`, {
      selectedOptions
    });
  }
};
```

### defaultConfigService.js (UPDATED)
```javascript
import API from "../api/api";

export const defaultConfigService = {
  // Get all templates
  getAll() {
    return API.get("/api/default-configs");
  },

  // Get template by ID
  getById(id) {
    return API.get(`/api/default-configs/${id}`);
  },

  // Use template to create config
  useTemplate(templateId) {
    return API.post(`/api/default-configs/${templateId}/use`);
  }
};
```

---

## PART 4: FRONTEND PAGE STRUCTURE

### Routes to Implement:
```javascript
{
  path: "/",
  element: <Home />
}
{
  path: "/signin",
  element: <SignIn />
}
{
  path: "/register",
  element: <Register />
}
{
  path: "/welcome",
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <WelcomePage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
{
  path: "/default-config",
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <DefaultConfigPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
{
  path: "/configurator/:vehicleId",
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <Configurator />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
{
  path: "/invoice/:configurationId",
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <InvoicePage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
{
  path: "/excel-upload",
  element: (
    <ProtectedRoute>
      <DashboardLayout>
        <ExcelUploadPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
```

---

## PART 5: DATA FLOW & STATE MANAGEMENT

### Context to Create:
```
src/contexts/
├── AuthContext.jsx         (User auth & profile)
├── ConfigurationContext.jsx (Current configuration)
├── VehicleContext.jsx      (Vehicle data cache)
└── PricingContext.jsx      (Real-time pricing)
```

### Example AuthContext:
```javascript
import { createContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userService.getProfile()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## PART 6: PAGE-BY-PAGE IMPLEMENTATION

### 1. Home.jsx (Landing Page)
**Status**: Needs Dynamic Data

**Data Required**:
- Featured vehicles
- Testimonials  
- Statistics

**Implementation**:
```javascript
import { useEffect, useState } from 'react';
import { publicService } from '../services/publicService';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, testimonialsRes, statsRes] = await Promise.all([
          publicService.getFeaturedVehicles(),
          publicService.getTestimonials(),
          publicService.getStats()
        ]);
        
        setFeatured(featuredRes.data);
        setTestimonials(testimonialsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      {/* Featured Vehicles Grid */}
      {/* Testimonials Section */}
      {/* Stats Section */}
      {/* CTA Section */}
    </div>
  );
}
```

### 2. WelcomePage.jsx (Dashboard) ✅
**Already Dynamic**: Fetching recent configs and stats

**Enhancements**:
- Add user greeting
- Add quick action callbacks
- Add navigation to pages

### 3. DefaultConfigPage.jsx
**Status**: Needs Dynamic Data

**Data Required**:
- Default configuration templates
- Template details with full specs

**Implementation Steps**:
1. Fetch templates from backend
2. Display as grid/cards
3. Add filters (price, vehicle type)
4. Add "Use Template" action

### 4. Configurator.jsx ✅
**Already Dynamic**: Fetching components and calculating pricing

**Status**: GOOD - Keep as is!

### 5. InvoicePage.jsx (NEW)
**Status**: Needs Creation

**Data Required**:
- Configuration details
- Pricing breakdown
- Invoice template

### 6. ExcelUploadPage.jsx (NEW)
**Status**: Needs Creation

**Data Required**:
- Upload history
- CSV template download

---

## PART 7: IMMEDIATE ACTION ITEMS

### Step 1: Create Service Files (2-3 hours)
1. ✅ userService.js
2. ✅ vehicleService.js (update)
3. ✅ configurationService.js
4. ✅ defaultConfigService.js (update)
5. ✅ invoiceService.js
6. ✅ excelService.js
7. ✅ pricingService.js
8. ✅ publicService.js

### Step 2: Create Context Files (1-2 hours)
1. AuthContext.jsx
2. ConfigurationContext.jsx
3. VehicleContext.jsx
4. PricingContext.jsx

### Step 3: Update Existing Pages (2-3 hours)
1. WelcomePage.jsx - Add user greeting
2. Configurator.jsx - Already done ✅
3. Register.jsx - Add validation

### Step 4: Create New Pages (4-5 hours)
1. Home.jsx - Make dynamic
2. DefaultConfigPage.jsx - Create
3. InvoicePage.jsx - Create
4. ExcelUploadPage.jsx - Create

### Step 5: Setup & Integration (1-2 hours)
1. Update App.jsx with new routes
2. Add context providers
3. Add error handling & loading states
4. Add toast notifications

---

## PART 8: BACKEND REQUIREMENTS CHECKLIST

### Required DTOs (Data Transfer Objects):

```
✅ UserDTO
  - id, name, email, username, phone
  - companyName, registrationNo, role
  
✅ VehicleDTO
  - id, name, segment, manufacturer
  - basePrice, description
  
✅ ComponentDTO
  - id, name, category, price
  - description, specifications
  
✅ ConfigurationDTO
  - id, vehicleId, selectedComponents
  - totalPrice, createdAt, updatedAt
  
✅ InvoiceDTO
  - id, configurationId, items
  - totalPrice, tax, grantTotal
  
✅ DefaultConfigDTO
  - id, name, vehicleId
  - selectedComponents, description
```

---

## PART 9: NEXT STEPS - What to Do Now

**Option A**: Create Service Files First
- I'll create all 8 service files
- Then we'll update pages one by one

**Option B**: Start with Most Critical Page
- WelcomePage (Dashboard) - Most visited
- Configurator - Main feature (already dynamic ✅)
- DefaultConfigPage - Templates

**Option C**: Setup Complete Ecosystem
- Create all services + contexts
- Update all pages together
- Test full flow end-to-end

---

## PART 10: QUICK REFERENCE - API Response Formats

### Vehicle API Response:
```json
{
  "id": 1,
  "name": "Tesla Model 5",
  "segment": "Sedan",
  "manufacturer": "Tesla",
  "basePrice": 50000,
  "image": "url",
  "specs": {...}
}
```

### Configuration API Response:
```json
{
  "id": 1,
  "vehicleId": 1,
  "vehicleDetails": {...},
  "selectedComponents": [
    {
      "componentId": 1,
      "category": "interior",
      "name": "Leather Seats",
      "price": 5000
    }
  ],
  "basePrice": 50000,
  "addOnsPrice": 5000,
  "totalPrice": 55000,
  "createdAt": "2026-01-28",
  "updatedAt": "2026-01-28"
}
```

### Invoice API Response:
```json
{
  "id": 1,
  "configurationId": 1,
  "invoiceNumber": "INV-2026-001",
  "items": [...],
  "subtotal": 55000,
  "tax": 9900,
  "total": 64900,
  "status": "pending",
  "createdAt": "2026-01-28"
}
```

---

## READY TO PROCEED?

**Please confirm which approach you prefer:**

1. ✅ **Create all service files** → Then update pages one by one
2. ✅ **Start with critical pages** → WelcomePage → DefaultConfigPage → InvoicePage
3. ✅ **Full ecosystem setup** → Services + Contexts + Pages all together

**Also confirm:**
- Do you have the backend endpoints implemented?
- Which ones are ready?
- Which ones need to be created?

I'm ready to start implementation! 🚀
