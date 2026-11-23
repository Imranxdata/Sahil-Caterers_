import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Phone,
} from 'lucide-react';
import {
  businessConfig,
  buildTelUrl,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from '../config/businessConfig';
import { EVENT_TYPE_OPTIONS, FOOD_PREFERENCE_OPTIONS } from '../data/cateringData';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface CateringInquiryData {
  fullName: string;
  phone: string;
  whatsappNumber: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  guestCount: string;
  foodPreference: string;
  menuPreferences: string;
  budget: string;
  additionalDetails: string;
}

interface CateringInquiryFormProps {
  prefilledEventType?: string;
  prefilledMenuNote?: string;
  compact?: boolean;
}

const STEPS = [
  { number: 1, title: 'Your Details' },
  { number: 2, title: 'Event Details' },
  { number: 3, title: 'Food Preferences' },
  { number: 4, title: 'Review & Send' },
] as const;

function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatReadableDate(isoDate: string): string {
  if (!isoDate) return '';
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const CateringInquiryForm: React.FC<CateringInquiryFormProps> = ({
  prefilledEventType = '',
  prefilledMenuNote = '',
  compact = false,
}) => {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [redirectNotice, setRedirectNotice] = useState(false);

  const [formData, setFormData] = useState<CateringInquiryData>({
    fullName: '',
    phone: '',
    whatsappNumber: '',
    eventType: prefilledEventType || 'Wedding',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    guestCount: '',
    foodPreference: 'Both Veg & Non-Veg',
    menuPreferences: prefilledMenuNote || '',
    budget: '',
    additionalDetails: '',
  });

  useEffect(() => {
    if (prefilledEventType) {
      setFormData((prev) => ({ ...prev, eventType: prefilledEventType }));
    }
  }, [prefilledEventType]);

  useEffect(() => {
    if (prefilledMenuNote) {
      setFormData((prev) => ({
        ...prev,
        menuPreferences: prev.menuPreferences
          ? prev.menuPreferences
          : `Interested in ${prefilledMenuNote}`,
      }));
    }
  }, [prefilledMenuNote]);

  const todayIso = useMemo(() => getTodayIso(), []);

  const updateField = (field: keyof CateringInquiryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (targetStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (targetStep === 1 || targetStep === 4) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Please enter your full name.';
      }
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        newErrors.phone = 'Please enter a valid 10-digit phone number.';
      }
      if (formData.whatsappNumber.trim()) {
        const waDigits = formData.whatsappNumber.replace(/\D/g, '');
        if (waDigits.length < 10 || waDigits.length > 15) {
          newErrors.whatsappNumber = 'Please enter a valid WhatsApp number or leave it blank.';
        }
      }
    }

    if (targetStep === 2 || targetStep === 4) {
      if (!formData.eventType.trim()) {
        newErrors.eventType = 'Please choose an event type.';
      }
      if (!formData.eventDate) {
        newErrors.eventDate = 'Please select your event date.';
      } else if (formData.eventDate < todayIso) {
        newErrors.eventDate = 'Event date cannot be in the past.';
      }
      if (!formData.eventLocation.trim()) {
        newErrors.eventLocation = 'Please enter the event location or venue.';
      }
      const guests = Number(formData.guestCount);
      if (!formData.guestCount || Number.isNaN(guests) || guests < 1) {
        newErrors.guestCount = 'Please enter an estimated number of guests.';
      }
    }

    if (targetStep === 3 || targetStep === 4) {
      if (!formData.foodPreference) {
        newErrors.foodPreference = 'Please select a food preference.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const generatedMessage = useMemo(() => {
    const lines = [
      'Hello Sahil Caterers! I would like to enquire about catering services.',
      '',
      'CUSTOMER DETAILS',
      `Name: ${formData.fullName.trim() || '-'}`,
      `Phone: ${formData.phone.trim() || '-'}`,
      ...(formData.whatsappNumber.trim()
        ? [`WhatsApp: ${formData.whatsappNumber.trim()}`]
        : []),
      '',
      'EVENT DETAILS',
      `Event Type: ${formData.eventType || '-'}`,
      `Event Date: ${formatReadableDate(formData.eventDate) || '-'}`,
      `Event Time: ${formData.eventTime.trim() || 'Flexible / To be discussed'}`,
      `Location: ${formData.eventLocation.trim() || '-'}`,
      `Number of Guests: ${formData.guestCount || '-'}`,
      '',
      'FOOD REQUIREMENTS',
      `Preference: ${formData.foodPreference || '-'}`,
      `Menu Requirements: ${formData.menuPreferences.trim() || 'Open to menu suggestions'}`,
      '',
      `Budget: ${formData.budget.trim() || 'To be discussed'}`,
      '',
      'Additional Details:',
      formData.additionalDetails.trim() || 'None specified',
      '',
      'Please contact me regarding availability, menu options, and pricing.',
      '',
      'Thank you!',
    ];
    return lines.join('\n');
  }, [formData]);

  const handleSendWhatsApp = () => {
    if (!validateStep(4)) {
      if (!formData.fullName.trim() || formData.phone.replace(/\D/g, '').length < 10) {
        setStep(1);
      } else if (
        !formData.eventDate ||
        formData.eventDate < todayIso ||
        !formData.eventLocation.trim() ||
        !formData.guestCount
      ) {
        setStep(2);
      } else {
        setStep(3);
      }
      return;
    }

    const url = buildWhatsAppUrl(generatedMessage);
    if (!url) {
      setErrors({
        whatsappConfig:
          'WhatsApp number is not configured yet. Please add it in src/config/businessConfig.ts.',
      });
      return;
    }

    setRedirectNotice(true);
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = url;
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failures in restricted frames
    }
  };

  const progressPercent = (step / 4) * 100;

  return (
    <div
      className={`rounded-2xl border-2 border-[#F5DFB5]/45 bg-[#FAF0DC] text-[#3A0305] shadow-2xl ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold tracking-wider text-[#7E060B] uppercase tabular-nums">
            Step {step} of 4 · {STEPS[step - 1].title}
          </span>
          <span className="text-xs font-bold text-[#5E0307] tabular-nums">
            {Math.round(progressPercent)}%
          </span>
        </div>

        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#E5D0AA]">
          <div
            className="h-full bg-[#F39200] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {STEPS.map((s) => {
            const isCompleted = step > s.number;
            const isCurrent = step === s.number;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => {
                  if (s.number < step || validateStep(step)) {
                    setStep(s.number);
                  }
                }}
                className={`text-left text-[11px] font-bold transition-colors cursor-pointer truncate ${
                  isCurrent
                    ? 'text-[#7E060B]'
                    : isCompleted
                    ? 'text-[#3A0305]'
                    : 'text-[#8C6D59]'
                }`}
              >
                {s.number}. {s.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1 — Customer Details */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#3A0305]">
              Tell us about yourself
            </h3>
            <p className="mt-1 text-sm font-medium text-[#6B3D30]">
              So we can get back to you quickly with availability and menu options.
            </p>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-[#3A0305]">
              Full Name <span className="text-[#9E0B12]">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Aarav Patil"
              className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
            />
            {errors.fullName && (
              <p role="alert" className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-[#3A0305]">
                Phone Number <span className="text-[#9E0B12]">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="e.g. 98765 43210"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] tabular-nums focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
              {errors.phone && (
                <p role="alert" className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="whatsappNumber" className="block text-xs font-bold text-[#3A0305]">
                WhatsApp Number <span className="text-[#6B3D30] font-normal">(optional)</span>
              </label>
              <input
                id="whatsappNumber"
                type="tel"
                inputMode="tel"
                value={formData.whatsappNumber}
                onChange={(e) => updateField('whatsappNumber', e.target.value)}
                placeholder="If different from phone"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] tabular-nums focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
              {errors.whatsappNumber && (
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.whatsappNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — Event Details */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#3A0305]">
              Tell us about your event
            </h3>
            <p className="mt-1 text-sm font-medium text-[#6B3D30]">
              Share the occasion, date, venue, and expected guest count.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="eventType" className="block text-xs font-bold text-[#3A0305]">
                Type of Event <span className="text-[#9E0B12]">*</span>
              </label>
              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => updateField('eventType', e.target.value)}
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3 py-2.5 text-sm font-medium text-[#3A0305] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              >
                {EVENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.eventType && (
                <p className="mt-1 text-xs font-semibold text-[#9E0B12]">{errors.eventType}</p>
              )}
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-xs font-bold text-[#3A0305]">
                Number of Guests <span className="text-[#9E0B12]">*</span>
              </label>
              <input
                id="guestCount"
                type="number"
                min={1}
                inputMode="numeric"
                value={formData.guestCount}
                onChange={(e) => updateField('guestCount', e.target.value)}
                placeholder="e.g. 150"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] tabular-nums focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
              {errors.guestCount && (
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.guestCount}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="eventDate" className="block text-xs font-bold text-[#3A0305]">
                Event Date <span className="text-[#9E0B12]">*</span>
              </label>
              <input
                id="eventDate"
                type="date"
                min={todayIso}
                value={formData.eventDate}
                onChange={(e) => updateField('eventDate', e.target.value)}
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] tabular-nums focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
              {errors.eventDate && (
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.eventDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="eventTime" className="block text-xs font-bold text-[#3A0305]">
                Event Time <span className="text-[#6B3D30] font-normal">(optional)</span>
              </label>
              <input
                id="eventTime"
                type="text"
                value={formData.eventTime}
                onChange={(e) => updateField('eventTime', e.target.value)}
                placeholder="e.g. 12:30 PM Lunch or 7:30 PM Dinner"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
            </div>
          </div>

          <div>
            <label htmlFor="eventLocation" className="block text-xs font-bold text-[#3A0305]">
              Event Location / Venue <span className="text-[#9E0B12]">*</span>
            </label>
            <input
              id="eventLocation"
              type="text"
              value={formData.eventLocation}
              onChange={(e) => updateField('eventLocation', e.target.value)}
              placeholder="e.g. Badlapur East / Hall or Home Address"
              className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
            />
            {errors.eventLocation && (
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#9E0B12]">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.eventLocation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* STEP 3 — Food Preferences & Requirements */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#3A0305]">
              Food preferences &amp; requirements
            </h3>
            <p className="mt-1 text-sm font-medium text-[#6B3D30]">
              Let us know your Veg / Non-Veg preferences and dishes you have in mind.
            </p>
          </div>

          <div>
            <span className="block text-xs font-bold text-[#3A0305]">
              Food Preference <span className="text-[#9E0B12]">*</span>
            </span>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {FOOD_PREFERENCE_OPTIONS.map((option) => {
                const selected = formData.foodPreference === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => updateField('foodPreference', option)}
                    className={`min-h-[44px] rounded-lg border px-3 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#7E060B] bg-[#7E060B] text-[#F5DFB5] shadow-sm'
                        : 'border-[#3A0305]/20 bg-white text-[#3A0305] hover:border-[#7E060B]/60'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {errors.foodPreference && (
              <p className="mt-1 text-xs font-semibold text-[#9E0B12]">{errors.foodPreference}</p>
            )}
          </div>

          <div>
            <label htmlFor="menuPreferences" className="block text-xs font-bold text-[#3A0305]">
              Food Requirements / Menu Preferences
            </label>
            <textarea
              id="menuPreferences"
              rows={3}
              value={formData.menuPreferences}
              onChange={(e) => updateField('menuPreferences', e.target.value)}
              placeholder="e.g. Veg & Non-Veg Biryani, Pulao, Customizable Thalis, Starters, Desserts, Fresh Juices..."
              className="mt-1.5 w-full rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="budget" className="block text-xs font-bold text-[#3A0305]">
                Estimated Budget <span className="text-[#6B3D30] font-normal">(optional)</span>
              </label>
              <input
                id="budget"
                type="text"
                value={formData.budget}
                onChange={(e) => updateField('budget', e.target.value)}
                placeholder="e.g. ₹400 per plate or total budget"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
            </div>

            <div>
              <label
                htmlFor="additionalDetails"
                className="block text-xs font-bold text-[#3A0305]"
              >
                Special Requests <span className="text-[#6B3D30] font-normal">(optional)</span>
              </label>
              <input
                id="additionalDetails"
                type="text"
                value={formData.additionalDetails}
                onChange={(e) => updateField('additionalDetails', e.target.value)}
                placeholder="e.g. Spice preference, live counter, delivery only"
                className="mt-1.5 w-full min-h-[44px] rounded-lg border border-[#3A0305]/25 bg-white px-3.5 py-2.5 text-sm font-medium text-[#3A0305] placeholder:text-[#9D8377] focus:border-[#7E060B] focus:outline-none focus:ring-2 focus:ring-[#F39200]/40"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 — Review & Send via WhatsApp */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#3A0305]">
              Review your catering inquiry
            </h3>
            <p className="mt-1 text-sm font-medium text-[#6B3D30]">
              Clicking <strong>Ask for Inquiry</strong> opens WhatsApp with your details
              pre-filled. Simply press <strong>Send</strong> inside WhatsApp to reach Sahil
              Caterers.
            </p>
          </div>

          <div className="rounded-xl border border-[#3A0305]/15 bg-white p-4">
            <div className="flex items-center justify-between border-b border-[#3A0305]/10 pb-2">
              <span className="text-xs font-extrabold tracking-wide text-[#7E060B] uppercase">
                WhatsApp Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3A0305] hover:text-[#7E060B] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <pre className="mt-3 max-h-56 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#3A0305]">
              {generatedMessage}
            </pre>
          </div>

          {!isWhatsAppConfigured() && (
            <div className="rounded-md border border-amber-400 bg-amber-50 p-3 text-xs text-amber-900">
              WhatsApp number is not yet configured in <code>src/config/businessConfig.ts</code>.
            </div>
          )}

          {errors.whatsappConfig && (
            <p className="text-xs font-semibold text-[#9E0B12]">{errors.whatsappConfig}</p>
          )}

          {redirectNotice && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-start gap-2.5 rounded-lg border border-[#15803D]/35 bg-[#ECFDF3] p-3.5 text-xs text-[#14532D]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />
              <div>
                <p className="font-bold">Opening WhatsApp with your inquiry details…</p>
                <p className="mt-0.5">
                  Please press <strong>Send</strong> inside WhatsApp to complete your message to{' '}
                  {businessConfig.name} ({businessConfig.whatsappDisplay}).
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#3A0305]/15 pt-5">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#3A0305]/25 bg-white px-5 py-2 text-sm font-bold text-[#3A0305] transition-colors hover:bg-[#F5DFB5] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        ) : (
          <a
            href={buildTelUrl()}
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-[#7E060B] hover:underline tabular-nums"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Or call {businessConfig.rawPhone}</span>
          </a>
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#7E060B] px-6 py-2.5 text-sm font-bold text-[#F5DFB5] shadow-md transition-colors hover:bg-[#5E0307] cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#128C7E] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#0E7468] cursor-pointer"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>ASK FOR INQUIRY</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
