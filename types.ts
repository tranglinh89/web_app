export enum AppStep {
  INTRO = 'INTRO',
  PASCAL = 'PASCAL',
  MECHANICS = 'MECHANICS',
  DESIGN = 'DESIGN',
  SUMMARY = 'SUMMARY'
}

export interface DesignData {
  s1_diameter: number;
  s2_diameter: number;
  frameMaterial: string;
  jointCount: number;
  notes: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  hardness: number; // 1-10
  cost: number; // 1-10
  workability: number; // 1-10
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}