declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHAT_ID?: string;
      BLACKLIST?: string;
      OPENAI_API_KEY: string;
      DATABASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
