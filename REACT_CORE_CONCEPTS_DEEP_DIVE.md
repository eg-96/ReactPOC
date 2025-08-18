# React Core Concepts Deep Dive

This document provides in-depth explanations of key React concepts—Hooks (`useEffect`, `useState`), Custom Hooks, Context, and Reducers—framed.

---

## 1. Hooks: useState, useEffect, useCallback & useMemmo

### What is `useState` and how does it work internally?
- `useState` is a React Hook that lets you add state to functional components. It returns a stateful value and a function to update it.
- Internally, React maintains a linked list of hooks for each component. When a component renders, React calls hooks in the same order, associating each call with a specific slot in the list. This is why hooks must be called unconditionally and in the same order on every render.
- State updates via the setter function trigger a re-render, and React schedules the update efficiently using its reconciliation algorithm.

### What is `useEffect` and how does it relate to the React lifecycle?
- `useEffect` lets you perform side effects in function components (e.g., data fetching, subscriptions, manual DOM manipulation).
- It combines the behavior of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.
- The first argument is a function (the effect), and the second is a dependency array. The effect runs after render, and cleanup (if returned) runs before the next effect or on unmount.
- React batches effects for performance and ensures they run after the DOM is updated.

### What is `useCallback` and when should you use it?
- `useCallback` is a hook that returns a memoized version of a callback function. The function reference only changes if one of its dependencies has changed. This is especially useful for passing stable function references to child components, preventing unnecessary re-renders or effect executions when the parent re-renders.

#### Example Use Cases for `useCallback`:
- Use `useCallback` when you need to pass a function as a prop to a child component that relies on referential equality (e.g., in dependency arrays or React.memo).

### What is `useMemo` and when should you use it?
- `useMemo` is a hook that returns a memoized value. It only recalculates the value when one of its dependencies changes. This is useful for optimizing expensive calculations or ensuring referential equality for objects/arrays between renders.

#### Example Use Cases for `useMemo`:
- Use `useMemo` to avoid recalculating derived data unless its dependencies change, especially for performance-critical or computationally expensive operations.

#### Example Use Cases:
- Use `useCallback` when you need to pass a function as a prop to a child component that relies on referential equality (e.g., in dependency arrays or React.memo).
- Use `useMemo` to avoid recalculating derived data unless its dependencies change, especially for performance-critical or computationally expensive operations.

### Interview Q&A
- **Q:** Why must hooks be called at the top level of a component?
  **A:** To ensure React can track the order and association of hooks with their respective state or effect slots. Conditional or nested calls would break this mapping, leading to bugs.
- **Q:** How does React optimize re-renders with hooks?
  **A:** React uses a fiber tree and schedules updates efficiently, only re-rendering components whose state or props have changed. Hooks like `useMemo` and `useCallback` further optimize by memoizing values and functions.
- **Q:** What problems do `useCallback` and `useMemo` solve?
  **A:** They help prevent unnecessary re-renders and recalculations by memoizing functions and values, ensuring referential stability across renders.
- **Q:** Can overusing `useCallback` and `useMemo` hurt performance?
  **A:** Yes. Both hooks add memory and CPU overhead. Use them only when profiling shows a real performance benefit or when referential equality is required.

---

## 2. Custom Hooks

### What are custom hooks and why use them?
- Custom hooks are JavaScript functions that use one or more built-in hooks to encapsulate reusable logic.
- They allow you to share stateful logic across components without duplicating code or relying on higher-order components or render props.
- Custom hooks can return any value (state, functions, objects) and can use other hooks internally.

### Interview Q&A
- **Q:** How do custom hooks help with separation of concerns?
  **A:** They allow you to extract logic (e.g., data fetching, form handling) from UI components, making both more focused and testable.
- **Q:** Can custom hooks use other custom hooks?
  **A:** Yes, hooks are composable. This enables building complex abstractions from simple, reusable pieces.
- **Q:** How do you test custom hooks?
  **A:** Use libraries like React Testing Library’s `renderHook` to test hook logic in isolation, asserting on returned values and effects.

---

## 3. Context


### What is React Context and how does it work?
- Context provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling).
- It consists of a Provider (which supplies the value) and Consumers (which read the value, typically via `useContext`).
- Under the hood, React uses a context object and tracks which components consume it. When the value changes, React triggers a re-render for all consumers.

#### Deep Dive: The Provider Component
The `Provider` is a special component that comes from the Context API. It is used to "provide" data or functionality to all components nested inside it, without having to pass props down manually at every level. For example, if you have a `TodoContext`, it will have an associated `TodoContext.Provider` component. You wrap parts of your component tree with this `Provider` and supply a `value` prop, which contains the data or functions you want to share (such as the list of todos and methods to add or remove them). Any component inside this tree can then access the provided value using the `useContext` hook.

In the context of the `TodoProvider` in this project, the `Provider` is used to wrap the application's children and supply the current state (todos, loading, error) to all nested components. This enables any component within the provider's subtree to access and react to changes in the todo state, without prop drilling. The `Provider` is a key part of React's context mechanism, enabling state and logic to be shared efficiently across many components in your application.

### Interview Q&A
- **Q:** When should you use context, and when should you avoid it?
  **A:** Use context for truly global data (theme, user, locale, etc.). Avoid for high-frequency updates or deeply nested state, as it can cause unnecessary re-renders.
- **Q:** How does React optimize context updates?
  **A:** React uses reference equality to determine if the context value has changed. Memoizing the value (e.g., with `useMemo`) can prevent unnecessary re-renders.
- **Q:** Can you have multiple contexts in an app?
  **A:** Yes, you can nest and compose as many contexts as needed for modularity and separation of concerns.

---

## 4. Reducers

### What is a reducer in React and how does `useReducer` work?
- A reducer is a pure function that takes the current state and an action, and returns the new state. It’s inspired by the Redux pattern.
- `useReducer` is a React hook that provides an alternative to `useState` for complex state logic or when the next state depends on the previous one.
- It returns the current state and a dispatch function to send actions.

### Interview Q&A
- **Q:** When should you use `useReducer` over `useState`?
  **A:** Use `useReducer` for complex state logic, multiple sub-values, or when state transitions are best described by actions (e.g., forms, undo/redo, state machines).
- **Q:** How does React ensure reducer purity?
  **A:** Reducers must be pure functions—no side effects, no mutations. React relies on this for predictable state updates and efficient re-renders.
- **Q:** Can you combine `useReducer` with context?
  **A:** Yes, this is a common pattern for global state management: use context to provide state and dispatch, and `useReducer` to manage updates.

---

## 5. React Architecture: Interview Q&A

### Q: What is the difference between presentational and container components? Why is this separation useful?
**A:** Presentational components focus on how things look (UI), receiving data and callbacks via props, and rarely have their own state. Container components focus on how things work (logic, data fetching, state management), and pass data down to presentational components. This separation improves reusability, testability, and maintainability by decoupling UI from business logic.

### Q: How do you structure a large-scale React application for maintainability and scalability?
**A:** Use a feature-based folder structure, colocate related files (components, hooks, styles, tests), and separate concerns (UI, logic, data fetching). Leverage context and custom hooks for shared logic, and use code splitting to optimize performance. Consistent naming and modular design are key.

### Q: What are the pros and cons of colocating state versus lifting state up?
**A:** Colocating state keeps it close to where it’s used, reducing prop drilling and making components more self-contained. Lifting state up is necessary when multiple components need to share or synchronize state. The trade-off is between simplicity and the need for shared state; over-lifting can lead to complex, tightly coupled trees.

### Q: How do you implement feature-based folder structure in React, and what are its benefits?
**A:** Group files by feature (e.g., `features/todos/` with its own components, hooks, styles, tests) rather than by type. This makes it easier to scale, onboard new developers, and refactor, as all related code is in one place.

### Q: What is code splitting in React, and how does it improve performance?
**A:** Code splitting breaks your app into smaller bundles that are loaded on demand, reducing initial load time. React supports this via `React.lazy` and `Suspense` for dynamic imports, enabling faster, more responsive apps.

### Q: How do you handle cross-cutting concerns (e.g., logging, analytics, error boundaries) in a React app?
**A:** Use higher-order components, custom hooks, or context providers to encapsulate cross-cutting concerns. Error boundaries are special components for catching render errors. Analytics and logging can be handled in effect hooks or middleware-like abstractions.

### Q: What are the trade-offs between using Context API and third-party state management libraries (Redux, Zustand, Recoil, etc.)?
**A:** Context is great for low-frequency, global state (theme, user, locale). For complex, high-frequency, or large-scale state, libraries like Redux or Zustand offer better performance, middleware, dev tools, and patterns for side effects. Choose based on app complexity and team familiarity.

### Q: How do you ensure separation of concerns between UI, business logic, and data fetching in React?
**A:** Use custom hooks for business logic and data fetching, keep UI components focused on rendering, and use context for shared state. This modular approach improves testability and maintainability.

### Q: What is the role of custom hooks in enforcing architectural boundaries?
**A:** Custom hooks encapsulate logic and side effects, making it easy to share and test business logic independently of UI. They help enforce separation of concerns and keep components clean.

### Q: How do you approach dependency injection or inversion of control in React?
**A:** Use context providers to inject dependencies (e.g., services, API clients) at the top level, and consume them via hooks. This decouples components from concrete implementations and improves testability.

### Q: How do you manage side effects and async flows in a scalable React architecture?
**A:** Encapsulate side effects in custom hooks, use `useEffect` for lifecycle management, and leverage libraries like React Query for advanced async flows. Keep side effects out of reducers and UI components.

### Q: What patterns do you use to avoid prop drilling in deeply nested component trees?
**A:** Use context to provide shared state or functions, or adopt state management libraries for more complex needs. Custom hooks can also help by encapsulating logic and state access.

### Q: How do you architect for testability in React applications?
**A:** Write pure, stateless components where possible, use dependency injection via context, colocate tests with features, and use React Testing Library for integration tests. Keep logic in hooks for easy unit testing.

### Q: What is the importance of immutability in React state management?
**A:** Immutability enables efficient change detection, predictable state updates, and helps React optimize re-renders. Always return new objects/arrays when updating state.

### Q: How do you handle error boundaries and fallback UIs in a robust React architecture?
**A:** Use error boundary components to catch and handle errors in the component tree, and provide user-friendly fallback UIs. This prevents the entire app from crashing due to a single error.

### Q: How do you approach accessibility (a11y) and internationalization (i18n) in a scalable React app?
**A:** Use semantic HTML, ARIA attributes, and test with screen readers for accessibility. For i18n, use libraries like react-intl or i18next, and structure your app to support multiple languages and locales from the start.

---

## 6. Best Practices
- Always call hooks at the top level of your component or custom hook.
- Use custom hooks to encapsulate and share logic.
- Memoize context values to avoid unnecessary re-renders.
- Keep reducers pure and state immutable.
- Prefer `useReducer` for complex state, `useState` for simple state.
- Use TypeScript for type safety in hooks, context, and reducers.