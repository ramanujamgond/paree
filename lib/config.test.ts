import { afterEach, describe, expect, it, vi } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

describe("WhatsApp order destination", () => {
  it.each([undefined, "", "invalid"])("uses the documented business number when config is %s", async (value) => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", value);
    vi.resetModules();
    const { whatsappNumber } = await import("@/lib/config");
    expect(buildWhatsAppUrl(whatsappNumber, "order")).toBe("https://wa.me/918984868900?text=order");
  });

  it("honours a valid configured number", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+91 98765 43210");
    vi.resetModules();
    const { whatsappNumber } = await import("@/lib/config");
    expect(whatsappNumber).toBe("919876543210");
  });
});
