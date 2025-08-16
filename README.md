# React Practice: How to Structure a Modern React App

## Objective
Practice how to structure a React app: folders, components, and services. Use reusable components and apply clean architecture principles.

## Requirements
- Use the latest React features
- Hooks (`useEffect`, `useState`)
- Custom Hooks
- Context API
- Reducers

## Tasks and Guidelines

1. **Implement a list and filtering by user and completed status.**
2. **Store data in state.**
3. **Use component composition and props.**
4. **Apply basic styles with CSS or a library like Material UI or Bootstrap.**
5. **Focus on writing clean and readable code:**
	 - Use meaningful names
	 - Organize logic into single-responsibility functions/components
	 - Avoid code duplication
	 - Apply best practices, and preferably use TypeScript
6. **Fetch and display data using `fetch` or `axios`.**
7. **Handle loading and error states properly.**
8. **Implement common patterns like `useEffect` with async calls.**
9. **Get familiar with React testing (e.g., using Jest and React Testing Library).**

## Suggested Project Structure

```
src/
	components/        # Reusable UI components
	hooks/             # Custom hooks
	services/          # API calls and business logic
	context/           # React Context providers
	reducers/          # Reducer functions
	styles/            # CSS or style files
	App.tsx            # Main app component
	index.tsx          # Entry point
```

## Best Practices
- Use functional components and hooks.
- Keep components small and focused.
- Use context for global state when needed.
- Separate concerns: UI, logic, and data fetching.
- Write tests for components and logic.

---