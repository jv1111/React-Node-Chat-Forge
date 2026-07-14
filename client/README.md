# Project Structure

```text
src/
│
├── api/                          # API request modules
│   ├── axios.js                  # Axios instance and configuration
│   ├── client.api.js             # Client API endpoints
│   ├── conversation.api.js       # Conversation API endpoints
│   ├── message.api.js            # Message API endpoints
│   └── project.api.js            # Project API endpoints
│
├── assets/                       # Static assets
│   ├── images/                   # Image files
│   ├── icons/                    # SVGs and icon assets
│   └── fonts/                    # Custom fonts
│
├── components/                   # Reusable UI components
│   │
│   ├── ui/                       # Generic reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   └── Modal.jsx
│   │
│   ├── chat/                     # Chat-specific components
│   │   ├── ConversationItem.jsx
│   │   ├── ConversationList.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── MessageList.jsx
│   │   └── MessageInput.jsx
│   │
│   └── layout/                   # Layout components
│       ├── Sidebar.jsx
│       ├── Header.jsx
│       └── MainLayout.jsx
│
├── hooks/                        # Custom React hooks
│   ├── useConversation.js
│   ├── useMessages.js
│   └── useClient.js
│
├── layouts/                      # Application layouts
│   └── AppLayout.jsx
│
├── pages/                        # Route pages
│   ├── Chat.jsx
│   ├── Login.jsx
│   └── NotFound.jsx
│
├── services/                     # Business logic and state management
│   ├── conversation.service.js
│   ├── message.service.js
│   └── client.service.js
│
├── utils/                        # Utility functions
│   ├── formatDate.js
│   └── helpers.js
│
├── App.jsx                       # Root application component
├── main.jsx                      # Application entry point
└── index.css                     # Global styles
```
