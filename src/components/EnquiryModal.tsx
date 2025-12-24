import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { site } from "../content/site";
import { useEnquiry } from "./EnquiryContext";

interface FormState {
  service: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

const emptyForm: FormState = {
  service: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  message: ""
};

const EnquiryModal = () => {
  const { isOpen, selectedService, closeModal } = useEnquiry();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        service: selectedService ?? prev.service
      }));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setErrors({});
      setSubmitted(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, selectedService]);

  const serviceOptions = useMemo(
    () => site.services.map((service) => service.name),
    []
  );

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.service) nextErrors.service = "Select a service.";
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.email.trim()) nextErrors.email = "Enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number.";
    if (!form.date.trim()) nextErrors.date = "Select a date.";
    if (!form.message.trim()) nextErrors.message = "Share a short brief.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    console.log("Enquiry submitted", form);
    setSubmitted(true);
    setForm(emptyForm);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <div className="w-full max-w-2xl rounded-none bg-sand text-ink shadow-soft">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-ink/50">Enquiry</p>
            <h2 id="enquiry-title" className="text-2xl font-display">
              Plan your experience
            </h2>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-none border border-ink/10 p-2 transition hover:border-ink/30"
            aria-label="Close enquiry modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-6">
          {submitted ? (
            <div className="rounded-none border border-ink/10 bg-white p-6 text-center">
              <p className="text-lg font-semibold">Thank you. We’ll be in touch shortly.</p>
              <p className="mt-2 text-sm text-ink/70">
                Your request has been logged. Connect your Formspree or CRM endpoint here later.
              </p>
              <button
                type="button"
                onClick={closeModal}
                className="mt-6 rounded-none bg-ink px-6 py-2 text-sm font-semibold text-cream"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-medium">
                Service type *
                <select
                  value={form.service}
                  onChange={(event) => setForm({ ...form, service: event.target.value })}
                  className="rounded-none border border-ink/15 bg-white px-4 py-2"
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && <span className="text-xs text-red-600">{errors.service}</span>}
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Name *
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="rounded-none border border-ink/15 bg-white px-4 py-2"
                  />
                  {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email *
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="rounded-none border border-ink/15 bg-white px-4 py-2"
                  />
                  {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Phone *
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="rounded-none border border-ink/15 bg-white px-4 py-2"
                  />
                  {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Event date *
                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm({ ...form, date: event.target.value })}
                    className="rounded-none border border-ink/15 bg-white px-4 py-2"
                  />
                  {errors.date && <span className="text-xs text-red-600">{errors.date}</span>}
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                Message *
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  rows={4}
                  className="rounded-none border border-ink/15 bg-white px-4 py-2"
                />
                {errors.message && <span className="text-xs text-red-600">{errors.message}</span>}
              </label>
              <button
                type="submit"
                className="mt-2 w-full rounded-none bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-ink/90"
              >
                Submit enquiry
              </button>
              <p className="text-xs text-ink/60">
                Form submission is currently logged to console. Replace with Formspree or your CRM
                endpoint when ready.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EnquiryModal;
