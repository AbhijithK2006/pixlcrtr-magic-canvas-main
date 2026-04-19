import { useState } from "react";
import { Reveal } from "../Reveal";
import { MagneticButton } from "../MagneticButton";
import { Send, Instagram, Mail, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setStatus("loading");

    try {
      // 1. Save to Supabase (Database Log)
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      
      if (error) throw error;

      // 2. Send Email via FormSubmit.co (Direct Notification)
      await fetch("https://formsubmit.co/ajax/hello.rubicstudio@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `New Inquiry: ${form.name.trim()} via Rubic Studio`,
          _captcha: "false" // Captcha is usually not needed for AJAX background calls
        })
      });

      setStatus("success");
      toast.success("Message received. We'll be in touch.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Could not send message. Please try again.");
      setStatus("idle");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <section data-theme="light" id="contact" className="relative overflow-hidden bg-background py-32 sm:py-44">
      <div className="pointer-events-none absolute left-[-10%] top-1/3 h-[50vh] w-[50vw] rounded-full bg-gradient-ice opacity-15 blur-3xl animate-float" />

      <div className="container relative grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">— Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight">
              Let's build something unforgettable.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-muted-foreground">
              Tell us about your idea, deadline or wildest constraint. We reply within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.rubicstudio@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                hello.rubicstudio@gmail.com
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-sm transition-colors hover:text-primary"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Instagram className="h-4 w-4" />
                </span>
                @rubicstudio
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="glass-light relative rounded-2xl p-8 shadow-card sm:p-10"
          >
            <Field
              id="name"
              label="Your name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Field
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Field
              id="message"
              textarea
              label="Tell us about your project"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
            />

            <div className="mt-8 flex justify-end">
              <MagneticButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending</>
                ) : status === "success" ? (
                  <><Check className="h-4 w-4" /> Sent</>
                ) : (
                  <>Send message <Send className="h-4 w-4" /></>
                )}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

const Field = ({
  id, label, value, onChange, type = "text", textarea,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  type?: string; textarea?: boolean;
}) => {
  const common = "peer w-full bg-transparent border-0 border-b border-border py-3 text-foreground placeholder-transparent outline-none transition-colors focus:border-primary";
  return (
    <div className="relative mt-6 first:mt-0">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={label}
          className={common + " resize-none"}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={common}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-3 origin-left font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 ease-out-expo peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-primary"
        style={{ transform: value ? "translateY(-20px) scale(0.9)" : undefined }}
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-ice transition-all duration-500 ease-out-expo peer-focus:w-full" />
    </div>
  );
};
