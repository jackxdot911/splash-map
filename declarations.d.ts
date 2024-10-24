// declarations.d.ts
declare module "@devvie/bottom-sheet" {
    // You can add more specific types here if you know them
    export default any;
    export interface BottomSheetMethods {
      open: () => void;
      close: () => void;
      snapTo: (index: number) => void;
    }
  }
  