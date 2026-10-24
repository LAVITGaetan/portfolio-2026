import { CONTACT_FIELD_LIMITS, CONTACT_SUBJECTS } from "../data/contact";

export type ContactMessage = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, field: string): string {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
}

/** Returns null when a field is missing or out of bounds: the client checks are only a convenience. */
export function parseContactForm(formData: FormData): ContactMessage | null {
    // The name ends up in the mail subject, so line breaks are flattened.
    const name = readField(formData, "name").replace(/\s+/g, " ");
    const email = readField(formData, "email");
    const message = readField(formData, "message");
    const subject = CONTACT_SUBJECTS.find((item) => item.id === readField(formData, "subject"));

    if (
        !subject ||
        name.length === 0 ||
        name.length > CONTACT_FIELD_LIMITS.nameMax ||
        email.length > CONTACT_FIELD_LIMITS.emailMax ||
        !EMAIL_PATTERN.test(email) ||
        message.length < CONTACT_FIELD_LIMITS.messageMin ||
        message.length > CONTACT_FIELD_LIMITS.messageMax
    ) {
        return null;
    }

    return { name, email, subject: subject.label, message };
}
