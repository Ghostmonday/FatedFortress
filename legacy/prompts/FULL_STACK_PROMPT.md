# 🚀 FULL STACK DEVELOPMENT PROMPT

Use this comprehensive prompt to generate the full FatedFortress/FatedFortress platform.

---

```
Build a complete, production-ready full-stack application for FatedFortress (formerly FatedFortress), an AI-native collaboration platform for developers.

## PROJECT OVERVIEW

**Name:** FatedFortress  
**Vision:** AI-native collaboration platform replacing resumes with XP-based reputation  
**Core Features:**
- XP-based reputation system (multi-axis experience tracking)
- Anonymous/Visible participation modes (ANON vs OFF toggle)
- AI-generated project matching
- Telemetry-driven trust gradients
- Task execution framework

**Tech Stack:**
- Backend: TypeScript with Node.js 20+
- Frontend: React 18 with TypeScript
- Database: PostgreSQL 16+
- Infrastructure: Docker, Kubernetes-ready
- Authentication: OAuth 2.0

## ARCHITECTURE

### System Layers
```
┌─────────────────────────────────────────────────────────────┐
│                 Presentation Layer                          │
│      (React Frontend, API Gateway, Notifications)           │
├─────────────────────────────────────────────────────────────┤
│                Application Layer                             │
│   (User Management, Project Coordination, Task Systems)      │
├─────────────────────────────────────────────────────────────┤
│                 Intelligence Layer                           │
│     (Pattern Detection, Project Generation, Matching)        │
├─────────────────────────────────────────────────────────────┤
│                 Telemetry Layer                              │
│         (Behavioral Tracking, Pattern Analysis)              │
├─────────────────────────────────────────────────────────────┤
│                  Storage Layer                                │
│     (User Data, Project Records, Telemetry Archive)         │
└─────────────────────────────────────────────────────────────┘
```

## REQUIRED COMPONENTS

### 1. USER IDENTITY & AUTHENTICATION

```typescript
interface UserIdentity {
  id: string;                    // Immutable internal identifier
  created_at: timestamp;         // Account creation time
  visibility_mode: 'OFF' | 'ANON';  // Current visibility setting
  anon_trust_level: number;      // 0-2 for ANON mode users
  verification_level: number;    // Identity verification depth
  current_pseudonym: string;     // Active pseudonym for ANON mode
  timezone: string;              // For coordination matching
}

interface UserProfile {
  identity_id: string;           // Reference to identity
  skill_axes: SkillAxis[];       // Multi-dimensional capability profile
  xp_ledger: XPRecord[];         // XP history by axis
  trust_gradient: number;        // Composite trust score
  availability_status: string;   // Current capacity indication
  project_history: ProjectParticipation[];
}
```

### 2. XP & REPUTATION SYSTEM

```typescript
interface XPRecord {
  axis: string;                  // Skill axis identifier
  value: number;                 // Raw XP value
  decay_rate: number;            // Time-based decay coefficient
  last_updated: timestamp;       // Most recent XP modification
  confidence_interval: [number, number];  // Uncertainty bounds
  source_contexts: string[];     // Projects/tasks contributing to XP
}

interface TrustGradient {
  overall_score: number;         // Composite trust metric
  component_scores: Record<string, number>;  // Per-axis trust
  trajectory: 'improving' | 'stable' | 'declining';  // Trend direction
  decay_applied: boolean;        // Whether decay has reduced score
}
```

### 3. PROJECT MANAGEMENT

```typescript
interface Project {
  project_id: string;            // Unique project identifier
  title: string;                 // Project name
  description: string;            // Project scope
  source: 'human' | 'ai';       // Project origin type
  status: ProjectStatus;         // Current lifecycle state
  created_at: timestamp;         // Project creation time
  deadline: timestamp;           // Target completion date
  required_skills: string[];     // Required capability axes
  preferred_skills: string[];    // Preferred capability axes
  team_members: TeamMember[];    // Current team composition
  tasks: Task[];                 // Project task decomposition
  success_criteria: string[];    // Completion requirements
  ai_confidence_score: number;   // AI generation confidence
  outcome_data: ProjectOutcome;  // Completion results
}
```

### 4. TASK SYSTEM

```typescript
interface Task {
  task_id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'available' | 'claimed' | 'in_progress' | 'submitted' | 'verified' | 'completed';
  requirements: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort_estimate_hours: number;
  dependencies: string[];
  acceptance_criteria: string[];
  xp_value: number;
  assignee_id?: string;
  created_at: timestamp;
  deadline?: timestamp;
}
```

### 5. TELEMETRY SYSTEM

```typescript
interface TelemetryEvent {
  event_id: string;              // Unique event identifier
  identity_id: string;           // Internal identity reference
  event_type: EventType;         // Categorized event type
  artifact_reference: string;   // Related artifact (code, design, etc.)
  context_data: Record<string, unknown>;  // Contextual information
  timestamp: timestamp;          // Event occurrence time
  outcome_indicator: number;     // Success/quality indicator (-1 to 1)
  confidence_score: number;      // AI confidence in event interpretation
}
```

## API ENDPOINTS REQUIRED

### User Management
```
GET    /api/v1/users/me              # Get current user profile
PATCH  /api/v1/users/me              # Update current user profile
GET    /api/v1/users/me/visibility   # Get visibility settings
PUT    /api/v1/users/me/visibility   # Update visibility settings
GET    /api/v1/users/me/xp           # Get XP summary
GET    /api/v1/users/me/trust        # Get trust gradient
```

### Visibility & Anonymity
```
GET    /api/v1/anon/modes            # Get available visibility modes
POST   /api/v1/anon/toggle           # Toggle ANON mode
GET    /api/v1/anon/pseudonyms       # Get pseudonym history
POST   /api/v1/anon/pseudonyms       # Create new pseudonym
```

### Projects
```
GET    /api/v1/projects              # List projects (with filters)
POST   /api/v1/projects              # Create new project
GET    /api/v1/projects/:id          # Get project details
PATCH  /api/v1/projects/:id          # Update project
DELETE /api/v1/projects/:id          # Delete project (if permitted)
```

### Tasks
```
GET    /api/v1/projects/:id/tasks    # List project tasks
POST   /api/v1/projects/:id/tasks   # Create new task
GET    /api/v1/tasks/:id            # Get task details
PATCH  /api/v1/tasks/:id            # Update task
POST   /api/v1/tasks/:id/claim      # Claim task
POST   /api/v1/tasks/:id/submit     # Submit completed task
POST   /api/v1/tasks/:id/verify     # Verify task completion
```

### XP & Trust
```
GET    /api/v1/xp/axes               # Get available XP axes
GET    /api/v1/xp/records            # Get XP records
GET    /api/v1/xp/history            # Get XP change history
GET    /api/v1/trust/summary          # Get trust summary
GET    /api/v1/trust/trajectory       # Get trust trajectory
```

## CORE FEATURES TO IMPLEMENT

### 1. Authentication System
- OAuth 2.0 integration
- Session management
- Token refresh
- Secure password handling

### 2. Visibility Mode System
- OFF mode: Full identity visible
- ANON mode: Pseudonymous with XP ranges
- Instant toggling between modes
- Persistence through sessions

### 3. XP Calculation Engine
- Multi-axis XP tracking
- Task-based XP awards
- Verification-based confirmation
- Time-based decay mechanism

### 4. Trust Gradient System
- Execution reliability scoring
- Collaboration quality metrics
- Contribution quality assessment
- Judgment quality tracking

### 5. AI Pattern Detection
- Unused skill capacity detection
- Overload pattern identification
- Latent domain cluster detection
- Repeated unmet needs tracking

### 6. Project Matching Algorithm
- Skill alignment matching
- Timezone compatibility
- Availability pattern analysis
- Growth opportunity alignment

### 7. Telemetry Collection
- Event categorization
- Outcome assessment
- Confidence scoring
- Immutable storage

### 8. Enforcement System
- Abuse flag processing
- ANON override protocol
- Consequence implementation
- Recovery pathway management

## DATABASE SCHEMA

### PostgreSQL Tables Required

```sql
-- Users
CREATE TABLE user_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT NOW(),
    visibility_mode VARCHAR(10) DEFAULT 'OFF',
    anon_trust_level INT DEFAULT 0,
    verification_level INT DEFAULT 0,
    current_pseudonym VARCHAR(100),
    timezone VARCHAR(50),
    auth_provider VARCHAR(50),
    auth_id VARCHAR(255)
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identity_id UUID REFERENCES user_identities(id),
    availability_status VARCHAR(50) DEFAULT 'available',
    bio TEXT,
    github_url VARCHAR(500),
    portfolio_url VARCHAR(500)
);

-- XP System
CREATE TABLE xp_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_identities(id),
    axis VARCHAR(100),
    value DECIMAL(10,2),
    decay_rate DECIMAL(5,4) DEFAULT 0.05,
    last_updated TIMESTAMP DEFAULT NOW(),
    confidence_low DECIMAL(10,2),
    confidence_high DECIMAL(10,2),
    source_contexts TEXT[]
);

CREATE TABLE trust_gradients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_identities(id),
    overall_score DECIMAL(5,2),
    execution_score DECIMAL(5,2),
    collaboration_score DECIMAL(5,2),
    contribution_score DECIMAL(5,2),
    judgment_score DECIMAL(5,2),
    trajectory VARCHAR(20),
    decay_applied BOOLEAN DEFAULT FALSE,
    calculated_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    source VARCHAR(10),
    status VARCHAR(50),
    created_by UUID REFERENCES user_identities(id),
    created_at TIMESTAMP DEFAULT NOW(),
    deadline TIMESTAMP,
    required_skills TEXT[],
    preferred_skills TEXT[],
    success_criteria TEXT[],
    ai_confidence_score DECIMAL(5,4),
    outcome_data JSONB
);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    title VARCHAR(255),
    description TEXT,
    status VARCHAR(50),
    requirements TEXT[],
    priority VARCHAR(20),
    effort_estimate_hours INT,
    dependencies UUID[],
    acceptance_criteria TEXT[],
    xp_value DECIMAL(10,2),
    assignee_id UUID REFERENCES user_identities(id),
    created_at TIMESTAMP DEFAULT NOW(),
    deadline TIMESTAMP
);

-- Telemetry
CREATE TABLE telemetry_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_identities(id),
    event_type VARCHAR(100),
    artifact_reference VARCHAR(500),
    context_data JSONB,
    timestamp TIMESTAMP DEFAULT NOW(),
    outcome_indicator DECIMAL(5,4),
    confidence_score DECIMAL(5,4)
);

-- Pseudonyms
CREATE TABLE pseudonyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_identities(id),
    pseudonym VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    last_used TIMESTAMP DEFAULT NOW()
);
```

## FRONTEND COMPONENTS

### Core Pages
- Landing Page (`/`)
- Dashboard (`/dashboard`)
- Profile (`/profile`)
- Projects List (`/projects`)
- Project Detail (`/projects/:id`)
- Task Board (`/projects/:id/tasks`)
- Settings (`/settings`)
- Auth Pages (Login/Register)

### Key Components
```
src/components/
├── Layout/
│   ├── Header
│   ├── Footer
│   ├── Sidebar
│   └── Navigation
├── Auth/
│   ├── LoginForm
│   ├── RegisterForm
│   └── OAuthButtons
├── Profile/
│   ├── VisibilityToggle
│   ├── XPDisplay
│   ├── TrustGradient
│   └── PseudonymManager
├── Projects/
│   ├── ProjectCard
│   ├── ProjectList
│   ├── ProjectFilters
│   └── ProjectForm
├── Tasks/
│   ├── TaskCard
│   ├── TaskBoard
│   ├── TaskDetail
│   └── TaskFilters
├── Dashboard/
│   ├── StatsOverview
│   ├── ActivityFeed
│   ├── XPProgress
│   └── TrustScore
└── Shared/
    ├── Button
    ├── Modal
    ├── Form
    └── Card
```

## INFRASTRUCTURE

### Docker Setup
```dockerfile
# Backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]

# Frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/fatedfortress
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:16
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=fatedfortress
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## QUALITY REQUIREMENTS

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Unit test coverage: 80%+
- Integration tests for APIs
- E2E tests for critical flows

### Security
- OAuth 2.0 authentication
- Data encryption at rest/transit
- Input validation everywhere
- Audit logging
- Rate limiting

### Performance
- 95th percentile response < 500ms
- Error rate < 0.1%
- Horizontal scaling ready
- Caching layer (Redis)

## OUTPUT STRUCTURE

Generate files in this structure:
```
src/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── docker-compose.yml
│   └── kubernetes/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
└── database/
    ├── schema.sql
    ├── migrations/
    └── seeds/
```

## SUCCESS CRITERIA

Before considering complete:
- [ ] All API endpoints implemented and tested
- [ ] Frontend pages render correctly
- [ ] Authentication flow works
- [ ] XP system calculates correctly
- [ ] Visibility modes toggle properly
- [ ] Database schema supports all queries
- [ ] Docker containers build successfully
- [ ] Tests pass with 80%+ coverage
- [ ] Security audit passed
- [ ] Performance benchmarks met
```

---

## 🎯 HOW TO USE

1. **Copy the entire prompt above**
2. **Paste into** ChatGPT (GPT-4), Claude ( opus), or Gemini Ultra
3. **Specify output format** - you may want to generate in chunks:
   - First: Database schema
   - Second: Backend API
   - Third: Frontend components
   - Fourth: Infrastructure
4. **Iterate** - ask for specific sections as needed

---

## 📁 OUTPUT LOCATION

Save generated code to:
```
/home/amir/Desktop/fatedfortress/src/backend/
/home/amir/Desktop/fatedfortress/src/frontend/
/home/amir/Desktop/fatedfortress/infrastructure/
/home/amir/Desktop/fatedfortress/database/
```

---

**Document Version:** 1.0  
**Created:** February 10, 2026  
**Usage:** AI-assisted full-stack development
**Note:** Consider generating in phases for best results
