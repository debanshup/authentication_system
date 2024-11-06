import { create } from "zustand";

// const useUserDataStore = create((set) => ({
//   userData: null,
//   isLoggedIn: false,
//   setUserData: (newUserData) => set({ userData: newUserData }),
//   clearUserData: () => set({ userData: null, isLoggedIn: false }),
// }));

// export default useUserDataStore;
// import { create } from 'zustand';

// interface UserData {
//   userData: { username?: string } | null;
//   isLoggedIn: boolean;
//   setUserData: (newUserData: { username: string }) => void;
//   clearUserData: () => void;
// }

// const useUserDataStore = create<UserData>((set) => ({
//   userData: null,
//   isLoggedIn: false,
//   setUserData: (newUserData) =>
//     set({ userData: newUserData, isLoggedIn: true }),
//   clearUserData: () => set({ userData: null, isLoggedIn: false }),
// }));

// export default useUserDataStore;
