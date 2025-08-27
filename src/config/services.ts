export const SERVICES = [
  { id: "consult30", label: "פגישת ייעוץ - ללא עלות", duration: 30, buffer: 0 },
  { id: "session60", label: "פגישה ראשונה", duration: 90, buffer: 10 },
  { id: "session30", label: "פגישת ביניים", duration: 60, buffer: 10 },
];

export type Service = typeof SERVICES[0];
