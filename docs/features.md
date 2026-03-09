# Project Features

## Core Kanban Functionality
- **Drag and Drop Board**: Move tasks seamlessly between columns.
- **Default Columns**: Todo, In Progress, In Review, Completed.
- **Task Management**: Create, view, and edit tasks.
- **Task Details**:
  - Title and descriptions (short and detailed).
  - Assignees (support for multiple team members).
  - Dynamic Due Date Selection (user-defined dates map directly to card tiles).
  - Priority labels (High, Medium, Low).
  - Subtasks with completion tracking.
  - Attachments and comments counters.
- **Confetti Celebration**: Visual confetti effect when a task is moved to the "Completed" column.

## Toolbar & View Options
- **Filter by Assignee**: View tasks assigned to specific team members or all users.
- **Sort Tasks**: Sort tasks alphabetically by title or use the default manual order.
- **Group By**: 
  - **Status**: Traditional Kanban view.
  - **Assignee**: Swimlane view by team member. Supports drag-and-drop reassignment between user columns.
- **Show/Hide Completed**: Toggle visibility of the Completed column to reduce clutter.

## Collaboration & Sharing
- **Add Assignee**: Modal to invite new team members via email.
- **Share Project**: Modal to generate and copy a shareable link to the board.
  - **Interactive Copy Button**: Features a green gradient success state and a custom confetti blast (Orange, Dark Gray, White) upon copying the link.
- **More Options Menu**: Dropdown for exporting the board, accessing settings, and archiving the board.

## Settings & Profile
- **Settings Page**: Comprehensive settings modal with tabs for:
  - **General**: Theme selection (Light, Dark, System), Language, and Timezone preferences.
  - **Notifications**: Granular control over email and push notifications for assignments, mentions, and due dates.
  - **Board Preferences**: Customize default view (Kanban/List), visibility of completed tasks, and compact mode.
  - **Advanced**: Options to export data (JSON, CSV) and a danger zone for account deletion.
- **Profile Page**: Detailed profile modal with tabs for:
  - **Personal Info**: Update profile photo, full name, email, and bio.
  - **Security**: Manage password, enable Two-Factor Authentication (2FA), and view/revoke active sessions.
  - **Activity Log**: View a timeline of recent actions performed on the account.

## UI/UX
- **Dark Mode Interface**: Sleek, modern dark theme built with Tailwind CSS.
- **Responsive Design**: Fluid layout that adapts to different screen sizes.
- **Interactive Modals**: Clean overlays for task editing, sharing, and inviting users.
- **File Attachments**: Support for drag-and-drop file attachments on tasks.
