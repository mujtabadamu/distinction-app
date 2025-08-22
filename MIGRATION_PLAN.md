# 🚀 NEW-APP MIGRATION PLAN

## Complete Migration Guide: schools-distinction-app → new-app with RTK Query

---

## 📋 **MIGRATION OVERVIEW**

This document provides a step-by-step guide to migrate the latest UI and business logic from `schools-distinction-app` to `new-app`, ensuring all API calls use RTK Query hooks instead of direct service calls.

**Key Principles:**

- ✅ All API calls must use RTK Query hooks
- ✅ Maintain business logic consistency
- ✅ Preserve latest UI/UX improvements
- ✅ Ensure proper error handling and loading states

---

## 🎯 **EXECUTION ORDER**

**Start with Group 1** → **Group 2** → **Group 3** → **Group 4** → **Group 5** → **Group 6** → **Group 7** → **Group 8**

Each group builds upon the previous one, ensuring dependencies are in place before migrating components that use them.

---

## 📋 **QUICK REFERENCE CHECKLIST**

- [x] **Group 1:** Assets & Dependencies ✅ COMPLETED
- [x] **Group 2:** Core UI Components ✅ COMPLETED
- [ ] **Group 3:** Course Management System
- [x] **Group 4:** Dashboard Enhancements ✅ COMPLETED
- [x] **Group 5:** Chatbot Enhancements ✅ COMPLETED
- [ ] **Group 6:** API & Hooks Migration
- [ ] **Group 7:** Enhanced Components
- [ ] **Group 8:** Final Integration & Testing

---

## 🎯 **GROUP 1: CORE ASSETS & DEPENDENCIES**

**What to do:** Copy missing assets and add new dependencies
**Files to migrate:** Icons, images, and package dependencies

### **Prompt Template:**

```
Migrate the following assets and dependencies from schools-distinction-app to new-app:

1. Copy all missing icons from schools-distinction-app/src/assets/icons/ to new-app/src/assets/icons/
2. Copy missing images: PhoneWriteUpDesktop.svg, iphoneWriteUp.svg, notificationBg.svg
3. Add these dependencies to new-app/package.json:
   - "@mdxeditor/editor": "^3.40.0"
   - "clsx": "^2.1.1"
   - "tailwind-merge": "^3.3.1"
   - "mathlive": "^0.106.0"

Ensure all assets are properly copied and dependencies are installed.
```

### **Files to Copy:**

```
schools-distinction-app/src/assets/icons/ → new-app/src/assets/icons/
├── hugeicons-arrow-expand.svg
├── hugeicons-arrow-shrink.svg
├── hugeicons-delete-02.svg
├── hugeicons-pencil-edit-02.svg
├── hugeicons-text-indent.svg
├── hugeicons-book-edit.svg
├── hugeicons-bookmark-01.svg
├── hugeicons-certificate-01.svg
├── hugeicons-eye.svg
├── hugeicons-file-01.svg
├── hugeicons-globe.svg
├── hugeicons-internet.svg
├── hugeicons-locked.svg
├── hugeicons-mailbox-01.svg
├── hugeicons-note.svg
├── hugeicons-play-circle.svg
├── hugeicons-property-view.svg
├── hugeicons-school-report-card.svg
├── hugeicons-share-08.svg
├── hugeicons-sparkles.svg
└── hugeicons-stars.svg

schools-distinction-app/src/assets/images/ → new-app/src/assets/images/
├── PhoneWriteUpDesktop.svg
├── iphoneWriteUp.svg
└── notificationBg.svg
```

---

## 🧩 **GROUP 2: CORE UI COMPONENTS**

**What to do:** Copy essential UI components that are missing
**Files to migrate:** Rich text editor, sheet component, course components

### **Prompt Template:**

```
Copy these core UI components from schools-distinction-app to new-app:

1. Rich Text Editor System:
   - Copy src/components/richTextEditor/ to new-app/src/components/
   - Update imports to use RTK Query hooks where needed

2. Sheet Component:
   - Copy src/components/sheet/ to new-app/src/components/
   - Ensure it works with new-app's styling system

3. Course Components:
   - Copy src/components/courseComponets/ to new-app/src/components/
   - Update any API calls to use RTK Query hooks

4. Additional Components:
   - Copy src/components/lessonTypeIcon/ to new-app/src/components/
   - Copy src/components/textLoading/ to new-app/src/components/
   - Copy src/components/fullscreen/ to new-app/src/components/

Update all imports and ensure components work with new-app's architecture.
```

### **Files to Copy:**

```
schools-distinction-app/src/components/ → new-app/src/components/
├── richTextEditor/
│   ├── richTextEditor.tsx
│   ├── MathFormulaPlugin.tsx
│   └── MathPlugin.tsx
├── sheet/
│   └── sheet.tsx
├── courseComponets/
│   ├── index.ts
│   ├── module-list.tsx
│   └── tabs.tsx
├── lessonTypeIcon/
├── textLoading/
└── fullscreen/
```

---

## 📚 **GROUP 3: COURSE MANAGEMENT SYSTEM**

**What to do:** Migrate the complete course editing and management system
**Files to migrate:** Course editing pages, insights, module management

### **Prompt Template:**

```
Migrate the complete course management system from schools-distinction-app to new-app:

1. Course Editing Pages:
   - Copy src/pages/courses/editCourse/ to new-app/src/pages/courses/
   - Copy src/pages/courses/courseView/courseInsight.pages.tsx
   - Copy src/pages/courses/courseView/modules-list-view.tsx
   - Copy src/pages/courses/shareCourseModal.tsx

2. Update App.tsx routing:
   - Add routes for /courses/:id/edit
   - Add routes for /courses/:id/insights
   - Import EditCourse and CourseInsight components

3. API Integration:
   - Add RTK Query endpoints for lesson groups, lessons, and lesson items
   - Update all API calls in course components to use RTK Query hooks
   - Ensure proper error handling and loading states

4. Update imports and ensure all course management features work properly.
```

### **Files to Copy:**

```
schools-distinction-app/src/pages/courses/ → new-app/src/pages/courses/
├── editCourse/
│   ├── editCourse.tsx
│   ├── ArticleLessonItemEdit.tsx
│   ├── VideoLessonItemEdit.tsx
│   ├── lessonItemEdit.tsx
│   └── titleEdit.tsx
├── courseView/
│   ├── courseInsight.pages.tsx
│   └── modules-list-view.tsx
└── shareCourseModal.tsx
```

### **RTK Query Endpoints to Add:**

```typescript
// Add to src/store/enhancedApi.ts
enhancedGetLessonGroups: build.query<LessonGroupsResponse, LessonGroupsRequest>({
  query: (courseId) => ({
    url: `/distinction/lessons/groups/${courseId}`,
    method: 'GET',
  }),
}),

enhancedCreateLessonGroup: build.mutation<CreateLessonGroupResponse, CreateLessonGroupRequest>({
  query: (payload) => ({
    url: '/distinction/lessons/groups',
    method: 'POST',
    body: payload,
  }),
}),

enhancedUpdateLessonGroup: build.mutation<UpdateLessonGroupResponse, UpdateLessonGroupRequest>({
  query: ({ id, ...payload }) => ({
    url: `/distinction/lessons/groups/${id}`,
    method: 'PUT',
    body: payload,
  }),
}),

enhancedDeleteLessonGroup: build.mutation<DeleteLessonGroupResponse, DeleteLessonGroupRequest>({
  query: (id) => ({
    url: `/distinction/lessons/groups/${id}`,
    method: 'DELETE',
  }),
}),
```

---

## 📊 **GROUP 4: DASHBOARD ENHANCEMENTS**

**What to do:** Add notification and event components to dashboard
**Files to migrate:** Notification cards and dashboard components

### **Prompt Template:**

```
Add dashboard enhancements from schools-distinction-app to new-app:

1. Notification Components:
   - Copy src/pages/learnerDashboard/components/NotificationCard.tsx
   - Copy src/pages/learnerDashboard/components/UpComingEventCard.tsx
   - Update studentDashboard.tsx to include these components

2. Integration:
   - Add notification cards to the dashboard layout
   - Ensure they fetch data using RTK Query hooks
   - Add proper loading states and error handling

3. Styling:
   - Ensure components match new-app's design system
   - Update any styled-components to work with new-app's theme

Make sure the dashboard displays notifications and upcoming events properly.
```

### **Files to Copy:**

```
schools-distinction-app/src/pages/learnerDashboard/components/ → new-app/src/pages/learnerDashboard/components/
├── NotificationCard.tsx
└── UpComingEventCard.tsx
```

### **Integration Steps:**

1. Update `src/pages/learnerDashboard/studentDashboard.tsx` to include notification components
2. Add RTK Query hooks for fetching quizathon and event data
3. Ensure proper loading states and error handling

---

## 🤖 **GROUP 5: CHATBOT ENHANCEMENTS**

**What to do:** Migrate enhanced chatbot features
**Files to migrate:** New chatbot modal and enhanced components

### **Prompt Template:**

```
Migrate chatbot enhancements from schools-distinction-app to new-app:

1. Chatbot Components:
   - Copy src/pages/chatbot/components/NewChatbotModal.tsx
   - Copy src/pages/chatbot/components/historyModal.tsx
   - Copy src/pages/chatbot/components/ChatInput.tsx
   - Copy src/pages/chatbot/new-chatbot.tsx

2. Integration:
   - Update existing chatbot components to use new features
   - Ensure all API calls use RTK Query hooks
   - Add proper routing for new chatbot features

3. Functionality:
   - Test that new chatbot modal works
   - Ensure chat history is properly managed
   - Verify all chatbot features function correctly

Update imports and ensure chatbot enhancements work seamlessly.
```

### **Files to Copy:**

```
schools-distinction-app/src/pages/chatbot/ → new-app/src/pages/chatbot/
├── components/
│   ├── NewChatbotModal.tsx
│   ├── historyModal.tsx
│   └── ChatInput.tsx
└── new-chatbot.tsx
```

### **RTK Query Hooks Already Available:**

```typescript
// These are already in enhancedApi.ts
useEnhancedGetMessages1Query,
useEnhancedGetWelcomeMessage1Query,
useEnhancedNewThreadMutation,
useEnhancedGetThreadsQuery,
useEnhancedDeleteThread1Mutation,
```

---

## 🔌 **GROUP 6: API & HOOKS MIGRATION**

**What to do:** Convert remaining direct service calls to RTK Query
**Files to migrate:** Hooks and API files

### **Prompt Template:**

```
Convert remaining direct service calls to RTK Query in new-app:

1. Hooks to Update:
   - src/hooks/general/useResendVerification.ts
   - src/hooks/general/useSubjects.ts
   - src/hooks/papers/useSinglePaperGet.ts
   - src/hooks/practice/usePracticeSync.ts
   - src/hooks/courses/useDownloadScorm.ts

2. Add Missing RTK Query Endpoints:
   - Add lesson group management endpoints
   - Add lesson item management endpoints
   - Add lesson management endpoints
   - Add email validation endpoint
   - Add student referral code endpoint

3. Update API Files:
   - Copy src/pages/lessons/lessonGroupApi.ts
   - Copy src/pages/lessons/lessonItemApi.ts
   - Copy src/pages/lessons/lessonsApi.ts
   - Convert all to use RTK Query hooks

4. Ensure all API calls use RTK Query hooks instead of direct service calls.
```

### **Files to Copy:**

```
schools-distinction-app/src/pages/lessons/ → new-app/src/pages/lessons/
├── lessonGroupApi.ts
├── lessonItemApi.ts
└── lessonsApi.ts
```

### **Hooks to Update:**

```typescript
// Current implementation (needs migration)
src / hooks / general / useResendVerification.ts;
src / hooks / general / useSubjects.ts;
src / hooks / papers / useSinglePaperGet.ts;
src / hooks / practice / usePracticeSync.ts;
src / hooks / courses / useDownloadScorm.ts;
```

### **RTK Query Endpoints to Add:**

```typescript
// Add to src/store/enhancedApi.ts
enhancedValidateEmail: build.mutation<ValidateEmailResponse, ValidateEmailRequest>({
  query: (email) => ({
    url: '/distinction/auth/validate-email',
    method: 'POST',
    body: { email },
  }),
}),

enhancedGetStudentReferralCode: build.query<StudentReferralCodeResponse, StudentReferralCodeRequest>({
  query: (matriculationNumber) => ({
    url: `/distinction/auth/student-referral-code/${matriculationNumber}`,
    method: 'GET',
  }),
}),

enhancedRegisterUploadedStudent: build.mutation<RegisterUploadedStudentResponse, RegisterUploadedStudentRequest>({
  query: (payload) => ({
    url: '/distinction/auth/register-uploaded-student',
    method: 'POST',
    body: payload,
  }),
}),
```

---

## 🎨 **GROUP 7: ENHANCED COMPONENTS**

**What to do:** Migrate additional enhanced components
**Files to migrate:** File uploaders, lesson renderers, practice components

### **Prompt Template:**

```
Migrate enhanced components from schools-distinction-app to new-app:

1. File Uploader Components:
   - Copy src/components/fileUploader/ to new-app/src/components/
   - Update to use RTK Query for file uploads

2. Lesson Renderer Components:
   - Copy src/components/lessonRenderer/ to new-app/src/components/
   - Update ArticleRenderer.tsx and QuizRenderer.tsx
   - Copy bottomBar.tsx and rendererUtils.tsx

3. Practice Components:
   - Copy src/components/practice/SolutionDrawer.tsx
   - Update to use RTK Query hooks

4. Additional Components:
   - Copy src/components/alphaFeedbackBanner/
   - Copy src/components/courseVisibilityModal/
   - Copy src/components/custom/StudyPalSharedUI.tsx
   - Copy src/components/onboarding/useTourOnboarding.ts

5. Update all imports and ensure components work with new-app's architecture.
```

### **Files to Copy:**

```
schools-distinction-app/src/components/ → new-app/src/components/
├── fileUploader/
│   ├── CustomFileUploader.tsx
│   ├── FileUploadComponents.tsx
│   ├── FileUploaderWithProgress.tsx
│   └── index.ts
├── lessonRenderer/
│   ├── ArticleRenderer.tsx
│   ├── QuizRenderer.tsx
│   ├── bottomBar.tsx
│   └── rendererUtils.tsx
├── practice/
│   └── SolutionDrawer.tsx
├── alphaFeedbackBanner/
├── courseVisibilityModal/
├── custom/
│   └── StudyPalSharedUI.tsx
└── onboarding/
    └── useTourOnboarding.ts
```

---

## 🔧 **GROUP 8: FINAL INTEGRATION & TESTING**

**What to do:** Final integration and testing of all migrated components
**Files to migrate:** Integration fixes and testing

### **Prompt Template:**

```
Perform final integration and testing for new-app migration:

1. Integration Checks:
   - Verify all routes work properly in App.tsx
   - Check that all components import correctly
   - Ensure RTK Query hooks are properly connected
   - Test authentication flow end-to-end

2. API Testing:
   - Test all RTK Query endpoints
   - Verify error handling works
   - Check loading states display correctly
   - Test data caching and invalidation

3. UI Testing:
   - Verify all new components render correctly
   - Test responsive design on mobile
   - Check that styling is consistent
   - Test user interactions and flows

4. Fix any issues found and ensure the app works seamlessly.
```

### **Testing Checklist:**

- [ ] All routes work in App.tsx
- [ ] All components import without errors
- [ ] RTK Query hooks are properly connected
- [ ] Authentication flow works end-to-end
- [ ] All API endpoints return correct data
- [ ] Error handling displays proper messages
- [ ] Loading states show correctly
- [ ] Data caching and invalidation work
- [ ] All new components render properly
- [ ] Responsive design works on mobile
- [ ] Styling is consistent across components
- [ ] User interactions work as expected

---

## 🚨 **IMPORTANT NOTES**

### **RTK Query Requirements:**

- ✅ All API calls MUST use RTK Query hooks
- ✅ No direct service calls allowed
- ✅ Proper error handling required
- ✅ Loading states must be implemented
- ✅ Cache invalidation must be configured

### **Business Logic Consistency:**

- ✅ Maintain same user flows
- ✅ Preserve all functionality
- ✅ Keep same validation rules
- ✅ Maintain same error messages

### **UI/UX Consistency:**

- ✅ Match existing design system
- ✅ Preserve responsive behavior
- ✅ Maintain accessibility features
- ✅ Keep same user interactions

---

## 📞 **SUPPORT**

If you encounter issues during migration:

1. Check that all dependencies are installed
2. Verify RTK Query hooks are properly configured
3. Ensure all imports are correct
4. Test each component individually before integration

---

**Migration Status:** Ready to begin with Group 1
**Last Updated:** [Current Date]
**Version:** 1.0
