import { existsSync } from "node:fs";
import path from "node:path";
import { LOGO } from "@/lib/config";

export const hasLogo = existsSync(path.join(process.cwd(), "public", LOGO.src));
