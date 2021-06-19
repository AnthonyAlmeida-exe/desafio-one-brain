// src/mocks/browser.js
import { setupWorker } from "msw";
import { handlers } from "./handlers";
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

//Não é recomendado incluir o Mock Service Worker na produção. Isso pode levar a uma experiência distorcida para seus usuários.
