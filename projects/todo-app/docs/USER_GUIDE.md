# User Guide

## Getting Started

### What is Todo App?

Todo App is a modern, accessible task management application designed to help you organize and track your daily activities. Built with React and TypeScript, it offers a clean interface with powerful features while maintaining excellent performance and accessibility standards.

### Key Features

- ✅ **Task Management**: Create, edit, delete, and organize your todos
- 🔍 **Smart Filtering**: View all tasks, only active ones, or completed ones
- 💾 **Local Storage**: Your data persists automatically in your browser
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Clean Interface**: Intuitive design focused on productivity

## Interface Overview

### Main Components

```
┌─────────────────────────────────────────┐
│              Todo App                    │ ← Header
├─────────────────────────────────────────┤
│           Add New Todo                   │ ← Form Section
│ ┌─────────────────────────────────────┐ │
│ │ Title: [_________________]          │ │
│ │ Description: [______________]       │ │
│ │ Due Date: [____]  [Add Todo]       │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ [All: 5] [Active: 3] [Completed: 2]    │ ← Filter Bar
├─────────────────────────────────────────┤
│ ☐ Buy groceries          [Edit][Delete]│ ← Todo List
│ ☑ Walk the dog           [Edit][Delete]│
│ ☐ Finish project         [Edit][Delete]│
└─────────────────────────────────────────┘
```

### Navigation Elements

1. **Header**: App title and description
2. **Add Todo Form**: Create new tasks
3. **Filter Bar**: Switch between view modes
4. **Todo List**: Your tasks with actions
5. **Footer**: Additional information

## Adding Todos

### Basic Todo Creation

1. **Click on the title input field** or press `Tab` to navigate to it
2. **Enter a title** for your task (required, max 200 characters)
3. **Add a description** (optional, max 1000 characters)
4. **Set a due date** (optional, must be today or in the future)
5. **Click "Add Todo"** or press `Enter` to save

### Example

```
Title: "Buy groceries"
Description: "Milk, bread, eggs, and vegetables for the week"
Due Date: "2024-01-20" (optional)
```

### Input Validation

The app automatically validates your input:

- **Title Required**: You must enter a title
- **Length Limits**: Title (200 chars), Description (1000 chars)
- **Future Dates**: Due dates must be today or later
- **Real-time Feedback**: Errors appear as you type

### Error Messages

Common validation messages:
- "Title is required" - You left the title field empty
- "Title must be 200 characters or less" - Title too long
- "Due date must be in the future" - Selected past date

## Managing Todos

### Viewing Your Todos

Your todos appear in a list with the following information:
- **Checkbox**: Click to mark complete/incomplete
- **Title**: Main task description
- **Description**: Additional details (if provided)
- **Due Date**: When the task is due (if set)
- **Status Indicators**: Visual cues for overdue or due today
- **Action Buttons**: Edit and Delete options

### Todo Status Indicators

- **🔴 Overdue**: Red background for past due dates
- **🟡 Due Today**: Yellow highlight for today's tasks
- **✅ Completed**: Strikethrough text and checked box
- **⚪ Active**: Normal appearance for incomplete tasks

### Completing Todos

**Method 1: Click Checkbox**
- Click the checkbox next to any todo
- Completed todos show strikethrough text
- Click again to mark as incomplete

**Method 2: Keyboard Navigation**
- Press `Tab` to navigate to the checkbox
- Press `Space` or `Enter` to toggle completion

### Editing Todos

**To Edit a Todo:**
1. **Click the "Edit" button** next to the todo
2. **Modify the fields** in the inline editor
3. **Save changes** by clicking "Save" or pressing `Ctrl+Enter`
4. **Cancel editing** by clicking "Cancel" or pressing `Escape`

**Inline Editing Features:**
- Edit title, description, and due date
- Real-time validation during editing
- Keyboard shortcuts for quick actions
- Auto-focus on the first editable field

### Deleting Todos

**To Delete a Todo:**
1. **Click the "Delete" button** next to the todo
2. **Confirm deletion** in the dialog that appears
3. **The todo is permanently removed**

**Note**: Deleted todos cannot be recovered. Consider marking them as completed instead if you want to keep a record.

## Filtering and Organization

### Filter Options

Use the filter bar to view different sets of todos:

#### All Todos
- **Shows**: Every todo regardless of status
- **Use When**: You want to see your complete task list
- **Badge**: Shows total count (e.g., "All: 5")

#### Active Todos
- **Shows**: Only incomplete/pending todos
- **Use When**: Focusing on what needs to be done
- **Badge**: Shows active count (e.g., "Active: 3")
- **Default View**: App opens with active filter

#### Completed Todos
- **Shows**: Only finished todos
- **Use When**: Reviewing accomplished tasks
- **Badge**: Shows completed count (e.g., "Completed: 2")

### Switching Filters

**Mouse**: Click any filter button
**Keyboard**: 
- `Tab` to navigate to filter buttons
- `Arrow keys` to move between filters
- `Enter` or `Space` to select

### Empty States

When a filter shows no todos:
- **"No todos found"** - No todos match the current filter
- **"Add your first todo above"** - You haven't created any todos yet
- **"All done! 🎉"** - No active todos remaining (all completed)

## Keyboard Navigation

### Full Keyboard Support

The app is fully accessible via keyboard:

#### Tab Navigation
- `Tab`: Move forward through interactive elements
- `Shift+Tab`: Move backward through interactive elements
- `Enter`: Activate buttons and submit forms
- `Space`: Toggle checkboxes and activate buttons
- `Escape`: Cancel editing or close dialogs

#### Filter Navigation
- `Arrow Keys`: Move between filter buttons
- `Home`: Jump to first filter
- `End`: Jump to last filter

#### Form Shortcuts
- `Ctrl+Enter`: Quick save when editing todos
- `Escape`: Cancel editing or clear form

#### Focus Indicators
- Clear visual outline around focused elements
- High contrast focus rings for visibility
- Logical tab order through the interface

### Screen Reader Support

#### Announcements
- **Live regions** announce todo additions, completions, and deletions
- **Status updates** when switching filters
- **Error messages** read aloud when validation fails
- **Progress updates** for form submissions

#### Labels and Descriptions
- All form fields have descriptive labels
- Buttons include purpose descriptions
- Complex interactions explained via ARIA attributes
- Landmark regions for easy navigation

#### Example Screen Reader Flow
1. "Todo App heading level 1"
2. "Add new todo section"
3. "Title, required, edit text"
4. "Description, edit text"
5. "Due date, date picker"
6. "Add todo button"

## Accessibility Features

### WCAG 2.1 AA Compliance

The app meets Web Content Accessibility Guidelines:

#### Visual Accessibility
- **Color Contrast**: 4.5:1 ratio or higher for all text
- **No Color-Only Information**: Status indicated by text and icons
- **Scalable Text**: Readable at 200% zoom
- **Focus Management**: Clear focus indicators

#### Motor Accessibility
- **Keyboard Only**: All features work without a mouse
- **Target Size**: Touch targets at least 44px for mobile
- **No Time Limits**: No automatic timeouts
- **Error Prevention**: Validation and confirmation dialogs

#### Cognitive Accessibility
- **Clear Labels**: Descriptive text for all controls
- **Consistent Navigation**: Predictable interface layout
- **Error Recovery**: Easy to correct mistakes
- **Help Text**: Context-sensitive assistance

### Assistive Technology Compatibility

Tested with:
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Voice Control**: Dragon NaturallySpeaking
- **Switch Navigation**: External switch devices
- **High Contrast**: Windows High Contrast mode

## Mobile Experience

### Responsive Design

The app adapts to different screen sizes:

#### Phone (< 768px)
- Single-column layout
- Larger touch targets
- Simplified navigation
- Full-width forms

#### Tablet (768px - 1024px)
- Two-column layout when space allows
- Touch-optimized controls
- Contextual menus
- Landscape/portrait support

#### Desktop (> 1024px)
- Full feature layout
- Hover states for interactions
- Keyboard shortcuts displayed
- Multiple columns for efficiency

### Touch Interactions

- **Tap**: Select and activate
- **Long Press**: Access context menus (where supported)
- **Swipe**: Navigate between sections (future feature)
- **Pinch to Zoom**: Accessibility zooming supported

### Mobile-Specific Features

- **Auto-capitalize**: First letter of titles
- **Input Types**: Appropriate keyboards (text, date)
- **Viewport Meta**: Prevents unwanted zooming
- **Touch Feedback**: Visual response to taps

## Data Management

### Local Storage

Your todos are automatically saved to your browser's local storage:

#### What Gets Saved
- All todo items (title, description, due date, completion status)
- Current filter selection
- Timestamps for creation and completion

#### Storage Limits
- **Typical Limit**: 5-10MB per domain
- **Todo Capacity**: Thousands of todos (depending on content)
- **Automatic Cleanup**: Old error logs removed automatically

#### Data Persistence
- **Browser Restart**: Todos remain after closing/reopening browser
- **Tab Refresh**: Data persists through page refreshes
- **Multiple Tabs**: Changes sync between tabs automatically

### Privacy and Security

#### What We Don't Do
- No data sent to external servers
- No tracking or analytics (in base configuration)
- No account creation required
- No personal information collected

#### What We Do
- Store data only in your browser
- Use secure browser APIs
- Validate all inputs client-side
- Protect against common web vulnerabilities

### Data Export and Backup

While the app doesn't include built-in export features, you can:

#### Manual Backup
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Find "Local Storage" → your domain
4. Copy the "todos" entry
5. Save to a text file

#### Data Recovery
If data is lost:
1. Check browser storage in developer tools
2. Look for backup entries (auto-created)
3. Try different browser profiles
4. Contact support if needed

## Troubleshooting

### Common Issues

#### "My todos disappeared"
**Possible Causes:**
- Browser data cleared
- Private/incognito browsing
- Different browser profile

**Solutions:**
- Check browser history/recovery
- Look for data in developer tools
- Check other browsers you may have used

#### "App won't load"
**Possible Causes:**
- JavaScript disabled
- Browser compatibility
- Network issues

**Solutions:**
- Enable JavaScript in browser settings
- Try a different browser
- Clear browser cache

#### "Add button not working"
**Possible Causes:**
- Validation errors
- Missing title
- JavaScript errors

**Solutions:**
- Check that title field is filled
- Look for error messages
- Try refreshing the page

#### "Slow performance"
**Possible Causes:**
- Too many todos (1000+)
- Browser memory issues
- Other tabs consuming resources

**Solutions:**
- Delete old completed todos
- Close other browser tabs
- Restart browser

### Browser Compatibility

#### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

#### Unsupported Features
- Internet Explorer (not supported)
- Very old mobile browsers
- Browsers with JavaScript disabled

### Getting Help

#### Self-Help Resources
- Check this user guide
- Try browser developer tools
- Look for error messages in console

#### Reporting Issues
When reporting problems, include:
1. Browser name and version
2. Operating system
3. Steps to reproduce the issue
4. What you expected to happen
5. What actually happened
6. Any error messages

#### Contact Information
- GitHub Issues: [Repository URL]
- Email: [Support Email]
- Documentation: [Docs URL]

## Tips and Best Practices

### Productivity Tips

#### Effective Todo Writing
- **Be Specific**: "Buy groceries" vs "Buy milk, bread, eggs"
- **Use Action Verbs**: Start with "Call", "Write", "Review"
- **Set Realistic Due Dates**: Don't overcommit
- **Break Down Large Tasks**: Split complex projects into steps

#### Organization Strategies
- **Daily Review**: Check active todos each morning
- **Weekly Cleanup**: Delete or complete old todos
- **Priority Due Dates**: Use dates for truly time-sensitive items
- **Batch Similar Tasks**: Group related activities

#### Workflow Efficiency
- **Use Keyboard Shortcuts**: `Tab`, `Enter`, `Escape`
- **Filter Strategically**: Focus on active todos during work
- **Regular Maintenance**: Keep your list current and relevant
- **Celebrate Completions**: Review completed filter periodically

### Accessibility Tips

#### For Screen Reader Users
- Navigate by headings (H key in NVDA/JAWS)
- Use form mode for efficient editing
- Listen for live region announcements
- Explore with browse mode first

#### For Keyboard-Only Users
- Learn the tab order for faster navigation
- Use arrow keys in the filter section
- Remember `Ctrl+Enter` for quick saves
- `Escape` always cancels current action

#### for Low Vision Users
- Use browser zoom (Ctrl/Cmd + Plus)
- Try high contrast mode in OS settings
- Adjust browser font size preferences
- Consider using browser dark mode

### Performance Tips

#### Keep It Fast
- **Regular Cleanup**: Delete completed todos periodically
- **Reasonable Limits**: Avoid 1000+ active todos
- **Browser Maintenance**: Clear cache occasionally
- **Update Browser**: Use recent browser versions

#### Mobile Optimization
- **Close Background Tabs**: Free up memory
- **Good Network**: Ensure stable connection for initial load
- **Recent Mobile Browser**: Update mobile browsers regularly
- **Adequate Storage**: Keep some phone storage free

### Customization Options

While the app doesn't include built-in themes, you can:

#### Browser-Level Customization
- Use browser dark mode
- Adjust browser font sizes
- Apply browser zoom levels
- Use accessibility extensions

#### Future Features
The app is designed for extensibility. Potential future features:
- Custom themes and colors
- Categories and tags
- Search and advanced filtering
- Data sync across devices
- Team collaboration features

---

This user guide covers all aspects of using the Todo App effectively. For technical documentation, see the API documentation and development guide.